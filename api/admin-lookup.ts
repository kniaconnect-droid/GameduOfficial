// api/admin-lookup.ts -> GET /api/admin-lookup?email=...
// Dipanggil dari admin.html buat nampilin status langganan user saat ini
// sebelum admin nge-klik "Aktifkan" -- biar keliatan kalau misal user itu
// masih premium sampai kapan.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { adminAuth, db } from "./_lib/firebaseAdmin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const providedSecret = req.headers["x-admin-secret"];
  if (!process.env.ADMIN_SECRET || providedSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Password admin salah atau belum diset di server." });
  }

  const email = String(req.query.email || "").trim().toLowerCase();
  if (!email) {
    return res.status(400).json({ error: "Email wajib diisi." });
  }

  let targetUser;
  try {
    targetUser = await adminAuth.getUserByEmail(email);
  } catch {
    return res.status(404).json({ error: "Email belum terdaftar di GamEdu." });
  }

  const snap = await db.collection("users").doc(targetUser.uid).get();
  const premiumUntil = (snap.data()?.premiumUntil as number | undefined) ?? null;
  const isPremiumNow = premiumUntil !== null && premiumUntil > Date.now();
  const whatsapp = (snap.data()?.whatsapp as string | undefined) ?? null;
  const name = (snap.data()?.name as string | undefined) ?? null;

  return res.status(200).json({
    email: targetUser.email,
    name,
    whatsapp,
    isPremiumNow,
    premiumUntil,
    premiumUntilLabel: premiumUntil
      ? new Date(premiumUntil).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
      : null
  });
}
