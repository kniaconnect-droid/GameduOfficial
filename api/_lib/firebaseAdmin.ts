// api/_lib/firebaseAdmin.ts
//
// Init Firebase Admin SDK sekali aja, di-reuse tiap function dipanggil
// (function di Vercel bisa "warm" antar-request, jadi kita hindari re-init).
//
// WAJIB set 3 environment variable ini di Vercel Project Settings > Environment Variables:
//   FIREBASE_PROJECT_ID
//   FIREBASE_CLIENT_EMAIL
//   FIREBASE_PRIVATE_KEY   <- ambil dari Firebase Console > Project Settings >
//                              Service Accounts > Generate new private key (JSON)
//
// Private key dari file JSON itu mengandung karakter "\n" literal.
// Kalau ditempel langsung ke Vercel env var, "\n"-nya harus di-escape ulang
// jadi string, makanya kita .replace(/\\n/g, "\n") di bawah.

import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp(): App {
  const existing = getApps();
  if (existing.length > 0) return existing[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "[firebaseAdmin] Env var Firebase belum lengkap. Cek FIREBASE_PROJECT_ID, " +
      "FIREBASE_CLIENT_EMAIL, dan FIREBASE_PRIVATE_KEY di Vercel Project Settings."
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

const app = getAdminApp();

export const adminAuth = getAuth(app);
export const db = getFirestore(app);
