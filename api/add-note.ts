// api/add-note.ts -> POST /api/add-note
// Ganti app.post("/api/add-note") lama. Catatan disimpan di subcollection
// users/{uid}/notes supaya otomatis kepisah per user (gak ketuker punya orang lain).

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

  const { text, author } = req.body || {};
  if (!text || !author) {
    return res.status(400).json({ error: "Text and Author are required." });
  }

  const notesRef = db.collection("users").doc(auth.uid).collection("notes");
  await notesRef.add({
    date: new Date().toISOString().split("T")[0],
    text,
    author,
    createdAt: Date.now(),
  });

  const snap = await notesRef.orderBy("date", "desc").get();
  return res.status(200).json({
    success: true,
    customNotes: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
  });
}
