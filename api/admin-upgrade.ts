// api/admin-upgrade.ts -> POST /api/admin-upgrade
//
// Dipanggil dari admin.html (bukan dari app user). Proteksinya SENGAJA dibikin
// simpel: satu password rahasia (ADMIN_SECRET) yang cuma Nia yang tau, dicek
// lewat header "X-Admin-Secret". Ini cukup buat kasus "cuma 1 admin, akses
// manual sesekali" -- kalau nanti ada beberapa admin/staf, sebaiknya upgrade
// ke sistem role-based per akun.
//
// PENTING: ADMIN_SECRET wajib di-generate SEKALI (string acak panjang, bukan
// kata biasa) dan disimpan di Vercel Environment Variables. Jangan pernah
// commit ke git atau taruh di kode.
//
// Body: { email: string, months: number, password?: string }
// Efek: users/{uid}.premiumUntil di Firestore di-set ke (sekarang atau tanggal
// expired lama, mana yang lebih akhir) + (months x 30 hari). Kalau user sudah
// premium dan belum expired, otomatis DITAMBAH (bukan ditimpa) -- jadi aman
// dipanggil berkali-kali buat perpanjangan.
//
// FALLBACK MANUAL: karena pendaftaran gratis sudah dihapus (akun normalnya
// dibuat otomatis oleh api/lynk-webhook.ts), kalau email belum terdaftar
// endpoint ini sekarang BOLEH bikin akunnya langsung asal field "password"
// diisi (dipakai buat kasus webhook Lynk gagal memproses transaksi -- lihat
// koleksi Firestore "webhookLogs" buat cek transaksi yang gagal otomatis).

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminAuth, db } from "./_lib/firebaseAdmin.js";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_MONTH = 30;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const providedSecret = req.headers["x-admin-secret"];
  if (!process.env.ADMIN_SECRET || providedSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Password admin salah atau belum diset di server." });
  }

  const { email, months, password } = req.body || {};
  if (!email || !months || Number(months) <= 0) {
    return res.status(400).json({ error: "Email dan jumlah bulan wajib diisi." });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  let targetUser;
  try {
    targetUser = await adminAuth.getUserByEmail(normalizedEmail);
  } catch {
    if (!password || String(password).length < 6) {
      return res.status(404).json({
        error:
          "Email ini belum terdaftar di GamEdu. Isi field Password (minimal 6 karakter) buat sekalian bikinin akunnya, baru klik Aktifkan lagi."
      });
    }
    try {
      targetUser = await adminAuth.createUser({ email: normalizedEmail, password: String(password), emailVerified: true });
    } catch (err) {
      return res.status(400).json({
        error: err instanceof Error ? `Gagal bikin akun: ${err.message}` : "Gagal bikin akun."
      });
    }
  }

  const userRef = db.collection("users").doc(targetUser.uid);
  const snap = await userRef.get();
  const existingUntil = (snap.data()?.premiumUntil as number | undefined) ?? 0;
  const baseTimestamp = Math.max(Date.now(), existingUntil);
  const newPremiumUntil = baseTimestamp + Number(months) * DAYS_PER_MONTH * MS_PER_DAY;

  await userRef.set(
    {
      email: targetUser.email,
      premiumUntil: newPremiumUntil,
      lastActivatedAt: Date.now(),
      lastActivatedMonths: Number(months)
    },
    { merge: true }
  );

  return res.status(200).json({
    success: true,
    email: targetUser.email,
    premiumUntil: newPremiumUntil,
    premiumUntilLabel: new Date(newPremiumUntil).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  });
}
