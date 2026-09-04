// src/lib/useAuth.ts
//
// Login email + password sederhana. TIDAK ADA lagi pendaftaran gratis dari
// sisi client (lihat AuthModal.tsx) -- akun cuma dibuat lewat 2 jalur:
//   1. Otomatis oleh api/lynk-webhook.ts begitu pembayaran Member VIP sukses.
//   2. Manual oleh admin lewat admin.html (fallback kalau webhook gagal
//      memproses, misal format payload Lynk berubah).
// createUserWithEmailAndPassword sengaja TIDAK dipakai di sini lagi supaya
// gak ada jalur "daftar sendiri, gratis" dari UI manapun di app ini.

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User
} from "firebase/auth";
import { auth } from "./firebase";

// Samain persis sama normalisasi email di api/admin-upgrade.ts & admin-lookup.ts
// (.trim().toLowerCase()), biar email yang dicari admin selalu ketemu.
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, normalizeEmail(email), password);
  }

  async function logout() {
    await firebaseSignOut(auth);
  }

  /**
   * Ambil ID token buat dilampirkan ke header Authorization tiap fetch ke /api/*.
   */
  async function getIdToken(forceRefresh = false): Promise<string | null> {
    if (!auth.currentUser) return null;
    return auth.currentUser.getIdToken(forceRefresh);
  }

  return { user, loading, login, logout, getIdToken };
}
