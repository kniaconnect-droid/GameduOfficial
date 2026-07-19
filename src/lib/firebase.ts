// src/lib/firebase.ts
// Init Firebase client SDK. Nilai-nilai ini AMAN ditaruh di kode frontend
// (beda sama Admin SDK yang secret) — ambil dari Firebase Console >
// Project Settings > General > Your apps > SDK setup and configuration.
//
// Ditaruh sebagai VITE_* env var supaya gampang ganti antara dev/production
// tanpa hardcode, dan konsisten dengan cara Vite baca env var.

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
