// api/admin-webhook-logs.ts -> GET /api/admin-webhook-logs
//
// Dipanggil dari admin.html buat nampilin log webhook Lynk.id terakhir --
// berguna buat DEBUG kalau ada transaksi yang gagal diproses otomatis oleh
// api/lynk-webhook.ts (misal field email/No. HP/judul produk di payload
// asli Lynk ternyata namanya beda dari yang ditebak di kode). Lihat "rawBody"
// di tiap log buat tau struktur JSON aslinya.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./_lib/firebaseAdmin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const providedSecret = req.headers["x-admin-secret"];
  if (!process.env.ADMIN_SECRET || providedSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Password admin salah atau belum diset di server." });
  }

  const snap = await db.collection("webhookLogs").orderBy("receivedAt", "desc").limit(20).get();

  return res.status(200).json({
    logs: snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  });
}
