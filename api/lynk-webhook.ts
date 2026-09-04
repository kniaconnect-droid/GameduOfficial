// api/lynk-webhook.ts -> POST /api/lynk-webhook
//
// Endpoint yang didaftarkan di Lynk.id Dashboard > Settings > Integrations >
// Webhook. Setiap ada pembayaran SUKSES di link checkout "Member VIP 6 Bulan"
// atau "Member VIP 1 Tahun", Lynk.id akan panggil endpoint ini otomatis.
//
// Yang dilakukan endpoint ini:
//   1. Verifikasi X-Lynk-Signature (lihat dokumentasi resmi Lynk:
//      https://documenter.getpostman.com/view/43601478/2sBXc8o3kn) supaya
//      cuma request asli dari Lynk yang diproses.
//   2. Nentuin paket yang dibeli (6 Bulan / 1 Tahun) dari JUDUL PRODUK di
//      payload -- dicocokkan ke LYNK_PRODUCT_TITLE_6M / LYNK_PRODUCT_TITLE_1Y.
//   3. Bikin akun GamEdu otomatis (kalau emailnya belum terdaftar) dengan
//      password "vip" + 4 digit terakhir No. HP yang ditulis pembeli di Lynk.
//   4. Nambahin premiumUntil di Firestore users/{uid} sesuai durasi paket.
//
// ==========================================================================
// PENTING -- BACA INI SEBELUM PRODUCTION:
// Struktur JSON body webhook Lynk.id TIDAK didokumentasikan lengkap di
// halaman Postman-nya (cuma dijelasin field yang dipakai buat signature:
// refId, amount/grandTotal, message_id). Field-field lain seperti email
// pembeli, No. HP, dan judul produk kita TEBAK dari nama-nama field yang
// UMUM dipakai payment gateway Indonesia (lihat extractLynkFields di bawah).
//
// Endpoint ini SELALU nyimpen mentahan body yang diterima ke koleksi
// Firestore `webhookLogs` (lihat logWebhookEvent). Begitu ada 1 transaksi
// asli masuk, BUKA Firebase Console > Firestore > webhookLogs, lihat field
// "rawBody"-nya, dan cocokkan sama daftar path di extractLynkFields. Kalau
// nama field aslinya beda, tinggal update array kandidatnya di sini -- gak
// perlu ubah apa-apa selain fungsi extractLynkFields.
//
// Kalau ada transaksi yang gagal diproses otomatis (email gak ketemu / judul
// produk gak cocok / signature invalid), transaksi TETAP kesimpen di
// `webhookLogs` dengan status "failed" + alasannya, jadi admin bisa aktifin
// manual lewat admin.html (email + password sekarang bisa diisi manual di
// situ, lihat api/admin-upgrade.ts).
// ==========================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import { adminAuth, db } from "./_lib/firebaseAdmin.js";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// HARUS SAMA PERSIS dengan LYNK_PASSWORD_PREFIX di src/lib/constants.ts.
const LYNK_PASSWORD_PREFIX = "vip";

// Judul produk di Lynk.id buat masing-masing paket. Bisa di-override lewat
// Environment Variable di Vercel (LYNK_PRODUCT_TITLE_6M / _1Y) tanpa perlu
// redeploy kalau ternyata judul aslinya beda dikit (misal ada emoji/spasi).
const PRODUCT_TITLE_6M = (process.env.LYNK_PRODUCT_TITLE_6M || "GamEdu Langganan Premium 6 Bulan").toLowerCase();
const PRODUCT_TITLE_1Y = (process.env.LYNK_PRODUCT_TITLE_1Y || "GamEdu Langganan Premium 1 Tahun").toLowerCase();

const PLAN_DURATIONS_MS: Record<"6m" | "1y", number> = {
  "6m": 180 * MS_PER_DAY,
  "1y": 365 * MS_PER_DAY
};

interface ExtractedFields {
  refId: string | null;
  amount: string | null;
  messageId: string | null;
  email: string | null;
  phone: string | null;
  productTitle: string | null;
  buyerName: string | null;
}

// Ambil field-field yang kita butuhin dari body webhook, nyoba beberapa
// kemungkinan nama field sekaligus (payment gateway Indonesia sering beda-
// beda konvensi: camelCase, snake_case, nested di "data"/"buyer"/dst).
function pick(obj: unknown, paths: string[]): unknown {
  for (const path of paths) {
    const val = path.split(".").reduce<unknown>((acc, key) => {
      if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
      return undefined;
    }, obj);
    if (val !== undefined && val !== null && val !== "") return val;
  }
  return undefined;
}

function extractLynkFields(body: Record<string, unknown>): ExtractedFields {
  const refId = pick(body, ["refId", "ref_id", "data.refId", "data.ref_id"]);
  const amount = pick(body, ["grandTotal", "grand_total", "amount", "data.grandTotal", "data.amount", "total"]);
  const messageId = pick(body, ["message_id", "messageId", "data.message_id", "data.messageId", "id"]);

  const email = pick(body, [
    "buyer.email",
    "buyer_email",
    "email",
    "customer.email",
    "customer_email",
    "data.buyer.email",
    "data.email"
  ]);

  const phone = pick(body, [
    "buyer.phone",
    "buyer.no_hp",
    "buyer.whatsapp",
    "buyer_phone",
    "phone",
    "no_hp",
    "whatsapp",
    "customer.phone",
    "customer_phone",
    "data.buyer.phone",
    "data.phone"
  ]);

  const productTitle = pick(body, [
    "product.name",
    "product.title",
    "product_name",
    "productName",
    "productTitle",
    "item.name",
    "item.title",
    "title",
    "name",
    "data.product.name",
    "data.product_name"
  ]);

  const buyerName = pick(body, ["buyer.name", "buyer_name", "customer.name", "customer_name", "data.buyer.name"]);

  return {
    refId: refId != null ? String(refId) : null,
    amount: amount != null ? String(amount) : null,
    messageId: messageId != null ? String(messageId) : null,
    email: email != null ? String(email).trim().toLowerCase() : null,
    phone: phone != null ? String(phone) : null,
    productTitle: productTitle != null ? String(productTitle) : null,
    buyerName: buyerName != null ? String(buyerName) : null
  };
}

function validateSignature(fields: ExtractedFields, signatureHeader: string | undefined, merchantKey: string): boolean {
  if (!signatureHeader || !fields.refId || !fields.amount || !fields.messageId) return false;

  const signatureString = fields.amount + fields.refId + fields.messageId + merchantKey;
  const calculated = crypto.createHash("sha256").update(signatureString).digest("hex");

  const a = Buffer.from(calculated, "utf8");
  const b = Buffer.from(String(signatureHeader), "utf8");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function detectPlan(productTitle: string | null): "6m" | "1y" | null {
  if (!productTitle) return null;
  const normalized = productTitle.toLowerCase();
  if (normalized.includes(PRODUCT_TITLE_6M) || PRODUCT_TITLE_6M.includes(normalized)) return "6m";
  if (normalized.includes(PRODUCT_TITLE_1Y) || PRODUCT_TITLE_1Y.includes(normalized)) return "1y";
  // Fallback pencocokan longgar berdasarkan kata kunci durasi, jaga-jaga
  // kalau judul produk aslinya sedikit beda dari yang di-set di env var.
  if (normalized.includes("6 bulan") || normalized.includes("6bulan") || normalized.includes("6-bulan")) return "6m";
  if (normalized.includes("1 tahun") || normalized.includes("12 bulan") || normalized.includes("1tahun")) return "1y";
  return null;
}

function last4Digits(phone: string | null): string | null {
  if (!phone) return null;
  const digitsOnly = phone.replace(/[^0-9]/g, "");
  if (digitsOnly.length < 4) return null;
  return digitsOnly.slice(-4);
}

async function logWebhookEvent(entry: Record<string, unknown>) {
  try {
    await db.collection("webhookLogs").add({ ...entry, receivedAt: Date.now() });
  } catch (err) {
    console.error("[lynk-webhook] Gagal nyimpen log ke Firestore:", err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const merchantKey = process.env.LYNK_MERCHANT_KEY;
  if (!merchantKey) {
    console.error("[lynk-webhook] LYNK_MERCHANT_KEY belum di-set di Environment Variables.");
    return res.status(500).json({ error: "Server belum dikonfigurasi (LYNK_MERCHANT_KEY kosong)." });
  }

  const body = (req.body || {}) as Record<string, unknown>;
  const fields = extractLynkFields(body);
  const signatureHeader = (req.headers["x-lynk-signature"] as string | undefined) || undefined;

  const isValidSignature = validateSignature(fields, signatureHeader, merchantKey);
  if (!isValidSignature) {
    await logWebhookEvent({ status: "invalid_signature", fields, rawBody: body });
    return res.status(401).json({ error: "Signature tidak valid." });
  }

  // Idempotency: kalau message_id ini udah pernah diproses (Lynk retry
  // kiriman yang sama), jangan diproses dua kali.
  if (fields.messageId) {
    const existing = await db.collection("webhookEvents").doc(fields.messageId).get();
    if (existing.exists) {
      return res.status(200).json({ success: true, note: "Sudah diproses sebelumnya (idempotent)." });
    }
  }

  const plan = detectPlan(fields.productTitle);
  const passwordSuffix = last4Digits(fields.phone);

  if (!fields.email || !plan || !passwordSuffix) {
    await logWebhookEvent({
      status: "failed",
      reason: !fields.email
        ? "Email pembeli tidak ditemukan di payload."
        : !plan
        ? `Judul produk "${fields.productTitle}" tidak cocok dengan paket manapun.`
        : "No. HP pembeli tidak ditemukan / kurang dari 4 digit.",
      fields,
      rawBody: body
    });
    // Tetap balas 200 supaya Lynk gak retry terus-terusan (retry gak akan
    // memperbaiki payload yang memang gak lengkap/gak cocok). Transaksi ini
    // harus diaktifkan MANUAL lewat admin.html.
    return res.status(200).json({
      success: false,
      note: "Data tidak lengkap/tidak dikenali, transaksi dicatat untuk aktivasi manual."
    });
  }

  const password = `${LYNK_PASSWORD_PREFIX}${passwordSuffix}`;

  try {
    let userRecord;
    try {
      userRecord = await adminAuth.getUserByEmail(fields.email);
    } catch {
      userRecord = await adminAuth.createUser({
        email: fields.email,
        password,
        emailVerified: true,
        displayName: fields.buyerName || undefined
      });
    }

    const userRef = db.collection("users").doc(userRecord.uid);
    const snap = await userRef.get();
    const existingUntil = (snap.data()?.premiumUntil as number | undefined) ?? 0;
    const baseTimestamp = Math.max(Date.now(), existingUntil);
    const newPremiumUntil = baseTimestamp + PLAN_DURATIONS_MS[plan];

    await userRef.set(
      {
        email: fields.email,
        name: fields.buyerName || snap.data()?.name || "Orang Tua",
        whatsapp: fields.phone ? fields.phone.replace(/[^0-9]/g, "") : snap.data()?.whatsapp,
        premiumUntil: newPremiumUntil,
        lastActivatedAt: Date.now(),
        lastActivatedPlan: plan,
        lastActivationSource: "lynk-webhook",
        lastLynkRefId: fields.refId,
        lastLynkMessageId: fields.messageId
      },
      { merge: true }
    );

    if (fields.messageId) {
      await db.collection("webhookEvents").doc(fields.messageId).set({
        processedAt: Date.now(),
        email: fields.email,
        plan,
        premiumUntil: newPremiumUntil
      });
    }

    await logWebhookEvent({ status: "success", email: fields.email, plan, premiumUntil: newPremiumUntil, fields });

    return res.status(200).json({ success: true, email: fields.email, plan, premiumUntil: newPremiumUntil });
  } catch (err) {
    console.error("[lynk-webhook] Gagal memproses webhook:", err);
    await logWebhookEvent({
      status: "error",
      reason: err instanceof Error ? err.message : String(err),
      fields,
      rawBody: body
    });
    // 200 tetap dibalas supaya Lynk gak infinite-retry error yang sifatnya
    // bakal gagal terus (misal password policy Firebase); aktivasi manual
    // via admin.html jadi fallback-nya.
    return res.status(200).json({ success: false, note: "Terjadi kesalahan, dicatat untuk aktivasi manual." });
  }
}
