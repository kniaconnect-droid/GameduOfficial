// api/games/[gameId].ts
// Vercel serverless function -> otomatis jadi endpoint GET /api/games/:gameId
//
// Ganti dari app.get("/api/games/:gameId") di server.ts lama.
// Perbedaan paling penting dari versi lama: status premium SEKARANG dicek dari
// Firebase ID token yang diverifikasi di server (lihat verifyAuth.ts), BUKAN dari
// query param ?premium=true yang dulu bisa diketik manual di address bar.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";
import { verifyRequest } from "../_lib/verifyAuth.js";
import { findGame } from "../_lib/gamesCatalog.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const gameId = req.query.gameId as string;
  const game = findGame(gameId);

  if (!game) {
    return res.status(404).send("<h2>Game tidak ditemukan</h2>");
  }

  // Auth opsional buat game gratis (biar anak bisa langsung main tanpa login),
  // tapi WAJIB buat game premium.
  const auth = await verifyRequest(req);
  const isPremiumUser = auth?.premium === true;

  if (game.premium && !isPremiumUser) {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
    return res.status(200).send(renderLockScreen(game));
  }

  // Baca file game asli dari server/games/ (folder ini ikut ke-deploy sebagai
  // bagian dari source, jadi process.cwd() tetap bisa nemuin file-nya di Vercel).
  const filePath = path.join(process.cwd(), "server", "games", `${gameId}.html`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("<h2>Berkas game tidak tersedia di server</h2>");
  }

  let fileContent = fs.readFileSync(filePath, "utf-8");
  fileContent = fileContent.replace("</body>", `${renderWatermark(game.ageRange)}</body>`);

  res.setHeader("Content-Type", "text/html");
  // Jangan pernah di-cache (browser/CDN) -- status premium dicek ulang tiap
  // request, jadi respons ini nggak boleh disimpan dan dipakai lagi setelah
  // user expired.
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  // Iframe kita load lewat fetch + srcdoc di frontend (bukan src langsung),
  // jadi gak perlu ijinin cross-origin framing di sini.
  return res.status(200).send(fileContent);
}

function renderLockScreen(game: { name: string; ageRange: string }): string {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GamEdu Premium Lock</title>
      <style>
        body {
          margin: 0; padding: 0; display: flex; align-items: center; justify-content: center;
          height: 100vh; font-family: 'Segoe UI', system-ui, sans-serif;
          background: linear-gradient(135deg, #1b1140 0%, #0a0620 100%); color: #fff; text-align: center;
        }
        .lock-card {
          max-width: 440px; background: rgba(255, 255, 255, 0.08); padding: 40px 30px;
          border-radius: 28px; border: 2px solid rgba(255, 224, 130, 0.35);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5); backdrop-filter: blur(8px);
        }
        .icon { font-size: 5rem; margin-bottom: 20px; animation: bounce 2s infinite; }
        h2 { color: #ffe066; margin: 0 0 12px; font-size: 1.8rem; }
        p { font-size: 1rem; color: #cbd5e1; margin-bottom: 30px; line-height: 1.5; }
        button {
          background: linear-gradient(180deg, #ffe066 0%, #fb8500 100%);
          border: none; padding: 14px 28px; font-size: 1.1rem; font-weight: bold;
          border-radius: 50px; color: #4a2600; cursor: pointer; box-shadow: 0 6px 15px rgba(251,133,0,0.4);
          transition: transform 0.15s;
        }
        button:active { transform: scale(0.95); }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      </style>
    </head>
    <body>
      <div class="lock-card">
        <div class="icon">🔒</div>
        <h2>Game Premium GamEdu</h2>
        <p><strong>"${game.name}"</strong> adalah game eksklusif premium untuk merangsang kognitif anak usia ${game.ageRange}. Hubungi orang tua atau guru untuk mengaktifkan paket Premium!</p>
        <button onclick="window.parent.postMessage({type: 'TRIGGER_PAYMENT'}, '*')">Aktivasi GamEdu Premium</button>
      </div>
    </body>
    </html>
  `;
}

function renderWatermark(ageRange: string): string {
  return `
    <!-- GamEdu Watermark -->
    <div style="position: fixed; bottom: 14px; left: 14px; z-index: 99999; display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.92); padding: 8px 16px; border-radius: 50px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 800; color: #2B2250; box-shadow: 0 8px 24px rgba(43,34,80,0.22); border: 2px solid #FFA857; pointer-events: none;">
      <span style="font-size: 16px; animation: heartbeat 1.5s infinite;">🎮</span>
      <span>GamEdu <span style="font-size: 10px; color: #FFFFFF; background: #FF6FA0; padding: 2px 8px; border-radius: 20px; font-weight: bold; margin-left: 4px;">Usia ${ageRange}</span></span>
      <style>
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      </style>
    </div>
  `;
}
