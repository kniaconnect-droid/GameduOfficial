// api/record-play.ts -> POST /api/record-play
// Ganti app.post("/api/record-play") lama. Riwayat main disimpan di
// subcollection users/{uid}/history.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./_lib/firebaseAdmin.js";
import { verifyRequest } from "./_lib/verifyAuth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const auth = await verifyRequest(req);
  if (!auth) {
    return res.status(401).json({ error: "Belum login." });
  }

  const { gameId, gameName, score, mistakes, durationSec, cognitiveGain } = req.body || {};

  const historyRef = db.collection("users").doc(auth.uid).collection("history");
  await historyRef.add({
    gameId,
    gameName,
    date: new Date().toISOString().split("T")[0],
    score: Number(score) || 0,
    mistakes: Number(mistakes) || 0,
    durationSec: Number(durationSec) || 0,
    cognitiveGain: cognitiveGain || "Fokus & Logika (+10%)",
    createdAt: Date.now(),
  });

  const snap = await historyRef.orderBy("createdAt", "desc").limit(50).get();
  return res.status(200).json({
    success: true,
    history: snap.docs.map((d) => d.data()),
  });
}
