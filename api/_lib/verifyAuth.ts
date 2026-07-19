// api/_lib/verifyAuth.ts
//
// Satu-satunya tempat yang boleh dipercaya buat nentuin status premium user.
// Jangan pernah baca status premium dari query param / body request client.
//
// Sumber kebenaran: field "premiumUntil" di dokumen Firestore users/{uid}.
// Ini di-set MANUAL oleh admin lewat api/admin-upgrade.ts (bukan self-service
// payment), dan otomatis "expired" begitu tanggalnya lewat -- gak perlu cron
// job atau proses tambahan buat nurunin status premium, karena kita bandingin
// tanggalnya langsung setiap kali dicek.

import type { VercelRequest } from "@vercel/node";
import { adminAuth, db } from "./firebaseAdmin.js";

export interface AuthResult {
  uid: string;
  email: string | undefined;
  premium: boolean;
  premiumUntil: number | null;
}

/**
 * Ambil & verifikasi Firebase ID token dari header "Authorization: Bearer <token>",
 * lalu cek status premium dari Firestore. Return null kalau token gak ada/gak valid.
 */
export async function verifyRequest(req: VercelRequest): Promise<AuthResult | null> {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/^Bearer (.+)$/);
  if (!match) return null;

  const idToken = match[1];

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    const snap = await db.collection("users").doc(decoded.uid).get();
    const premiumUntil = (snap.data()?.premiumUntil as number | undefined) ?? null;
    const premium = premiumUntil !== null && premiumUntil > Date.now();

    return { uid: decoded.uid, email: decoded.email, premium, premiumUntil };
  } catch (err) {
    console.error("[verifyAuth] Token gak valid:", err);
    return null;
  }
}
