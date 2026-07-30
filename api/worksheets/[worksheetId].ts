// api/worksheets/[worksheetId].ts
// Vercel serverless function -> otomatis jadi endpoint GET /api/worksheets/:worksheetId
//
// Pola sama persis dengan api/games/[gameId].ts: status premium SELALU dicek
// dari Firebase ID token yang diverifikasi di server (verifyAuth.ts), BUKAN
// dari query param atau apapun yang dikirim client. File PDF asli cuma boleh
// ke-stream kalau user terverifikasi premium.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";
import { findWorksheet } from "../_lib/worksheetsCatalog.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const worksheetId = req.query.worksheetId as string;
  const worksheet = findWorksheet(worksheetId);

  if (!worksheet) {
    return res.status(404).json({ error: "Worksheet tidak ditemukan" });
  }

  // Semua worksheet di katalog ini premium, tapi tetap dicek per-entry
  // (konsisten sama pola gamesCatalog.ts) supaya gampang kalau nanti ada
  // worksheet gratis.
  let isPremiumUser = false;
  if (worksheet.premium) {
    const { verifyRequest } = await import("../_lib/verifyAuth.js");
    const auth = await verifyRequest(req);
    isPremiumUser = auth?.premium === true;
  }

  if (worksheet.premium && !isPremiumUser) {
    return res.status(403).json({
      error: "premium_required",
      message: `Worksheet "${worksheet.title}" hanya bisa didownload oleh member Premium GamEdu.`,
    });
  }

  const filePath = path.join(process.cwd(), "server", "worksheets", worksheet.fileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Berkas worksheet tidak tersedia di server" });
  }

  const fileBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${worksheet.fileName}"`);
  // Jangan pernah di-cache -- status premium dicek ulang tiap request, sama
  // seperti alasan di api/games/[gameId].ts.
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  return res.status(200).send(fileBuffer);
}
