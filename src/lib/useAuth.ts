// src/lib/useAuth.ts
//
// Login email + password sederhana. Dipilih supaya admin (Nia) bisa nyari
// user berdasarkan email pas mau aktifin langganannya secara manual dari
// admin panel -- gak bisa dilakuin kalau usernya cuma sesi anonim.

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
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

  async function register(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, normalizeEmail(email), password);
  }

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

  return { user, loading, register, login, logout, getIdToken };
}
