// api/user-profile.ts -> GET & POST /api/user-profile
// Data disimpan per-user di Firestore: users/{uid}
// Status premium (isPremium, premiumUntil) SELALU dihitung ulang dari
// verifyRequest() -- bukan dari field yang mungkin ketinggalan di dokumen.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./_lib/firebaseAdmin.js";
import { verifyRequest } from "./_lib/verifyAuth.js";

const DEFAULT_PROFILE = {
  name: "Orang Tua",
  role: "parent" as const,
  studentName: "Ananda",
  studentAge: 4,
  history: [] as unknown[]
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = await verifyRequest(req);
  if (!auth) {
    return res.status(401).json({ error: "Belum login." });
  }

  const userRef = db.collection("users").doc(auth.uid);

  if (req.method === "GET") {
    const snap = await userRef.get();
    if (!snap.exists) {
      await userRef.set({ ...DEFAULT_PROFILE, email: auth.email, createdAt: Date.now() }, { merge: true });
    }
    const finalSnap = snap.exists ? snap : await userRef.get();
    const notesSnap = await userRef.collection("notes").orderBy("date", "desc").get();

    return res.status(200).json({
      user: {
        id: auth.uid,
        ...DEFAULT_PROFILE,
        ...finalSnap.data(),
        isPremium: auth.premium,
        premiumUntil: auth.premiumUntil
      },
      customNotes: notesSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
    });
  }

  if (req.method === "POST") {
    const { name, studentName, studentAge, role, whatsapp } = req.body || {};
    const update: Record<string, unknown> = {};
    if (name) update.name = name;
    if (studentAge) update.studentAge = Number(studentAge);
    if (studentName) update.studentName = studentName;
    if (role) update.role = role;
    if (whatsapp) update.whatsapp = String(whatsapp).replace(/[^0-9]/g, "");

    await userRef.set(update, { merge: true });
    const snap = await userRef.get();
    return res.status(200).json({
      success: true,
      user: { id: auth.uid, ...snap.data(), isPremium: auth.premium, premiumUntil: auth.premiumUntil }
    });
  }

  return res.status(405).send("Method Not Allowed");
}
