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
import { findGame } from "../_lib/gamesCatalog.js";
// verifyRequest (dan Firebase Admin SDK yang berat buat di-init) sengaja
// di-import DINAMIS di bawah, cuma pas game-nya premium. Static import di sini
// bikin Firebase Admin ke-init di SETIAP cold start function ini -- termasuk
// buat game gratis yang sama sekali gak butuh Firebase. Ini penyumbang utama
// loading lambat, apalagi kalau game gratis makin banyak ke depannya.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const gameId = req.query.gameId as string;
  const game = findGame(gameId);

  if (!game) {
    return res.status(404).send("<h2>Game tidak ditemukan</h2>");
  }

  // Auth opsional buat game gratis (biar anak bisa langsung main tanpa login,
  // dan tanpa nunggu Firebase Admin ke-init sama sekali), tapi WAJIB buat game
  // premium.
  let isPremiumUser = false;
  if (game.premium) {
    const { verifyRequest } = await import("../_lib/verifyAuth.js");
    const auth = await verifyRequest(req);
    isPremiumUser = auth?.premium === true;
  }

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

  // PENTING: game ini dimuat di frontend lewat Blob URL (lihat SecureGamePlayer.tsx),
  // bukan lewat <iframe src="/api/games/..."> langsung. Dokumen Blob URL nggak
  // punya "alamat" yang jelas buat browser jadiin patokan resolve path relatif
  // seperti "/games-assets/...", jadi kalau dibiarkan, gambar/audio yang pakai
  // path model itu (bukan URL lengkap https://...) gagal dimuat sama sekali --
  // ini penyebab bug "gambar kosong" di game Aku Mengenal Warna.
  // Suntik <base href="..."> di awal <head> supaya SEMUA path relatif/root-relative
  // di game manapun otomatis kepatok ke origin situs asli, apapun cara framing-nya.
  const requestOrigin = `${(req.headers["x-forwarded-proto"] as string) || "https"}://${req.headers.host}`;
  fileContent = fileContent.replace(
    /<head(\s[^>]*)?>/i,
    (match) => `${match}\n<base href="${requestOrigin}/">`
  );

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
  // Diposisikan di POJOK KANAN ATAS (bukan bawah-kiri) dan dibikin lebih kecil/
  // transparan. Sebelumnya watermark ini fixed di bottom-left dengan z-index
  // 99999 -- di hampir semua game, tombol aksi utama ("Lanjut", "Main Lagi",
  // dsb.) atau materi soal juga ada di area bawah layar, jadi watermark selalu
  // menutupi elemen penting itu di layar HP yang kecil. Pojok kanan atas jauh
  // lebih jarang dipakai game untuk elemen interaktif.
  return `
    <!-- GamEdu Watermark -->
    <div style="position: fixed; top: 10px; right: 10px; z-index: 9999; display: flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.75); padding: 5px 10px; border-radius: 50px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 10px; font-weight: 800; color: #2B2250; box-shadow: 0 4px 12px rgba(43,34,80,0.15); border: 1.5px solid #FFA857; pointer-events: none; opacity: 0.55; max-width: 46vw;">
      <span style="font-size: 12px;">🎮</span>
      <span style="white-space: nowrap;">GamEdu <span style="font-size: 8px; color: #FFFFFF; background: #FF6FA0; padding: 1px 6px; border-radius: 20px; font-weight: bold; margin-left: 3px;">Usia ${ageRange}</span></span>
    </div>
  `;
}
