import React, { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../lib/useAuth";
import gameduLogo from "../assets/images/gamedu_logo_1783910706826.jpg";

interface AuthModalProps {
  onClose: () => void;
  // Dipakai buat kasih tau kenapa modal ini muncul, misal habis klik "Premium".
  contextMessage?: string;
  initialMode?: "login" | "register";
}

// Modal login/daftar. BEDA dari AuthGate versi lama: ini nggak nge-block
// seluruh halaman. Homepage, pilih usia, dan game trial tetap bisa diakses
// tanpa modal ini muncul sama sekali. Modal ini cuma dipanggil pas user
// beneran butuh akun: mau lanjut ke Premium, atau klik "Masuk" di navbar
// (misalnya member lama yang sudah diaktifin admin, mau login lagi).
export default function AuthModal({ onClose, contextMessage, initialMode = "register" }: AuthModalProps) {
  const { register, login } = useAuth();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "register") {
        await register(email, password);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err: unknown) {
      setError(translateAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md px-4 animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <img
            src={gameduLogo}
            alt="GamEdu Logo"
            className="w-16 h-16 rounded-2xl object-contain shadow-md border border-slate-100 mx-auto mb-3"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-xl font-black text-slate-900">GamEdu</h1>
          <p className="text-sm text-slate-500 mt-1">
            {contextMessage || (mode === "login" ? "Masuk ke akun Anda" : "Buat akun baru, gratis")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Kata Sandi</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Minimal 6 karakter"
            />
          </div>

          {error && <p className="text-xs font-bold text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
          >
            {submitting ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar"}
          </button>
        </form>

        <button
          onClick={() => {
            setError(null);
            setMode(mode === "login" ? "register" : "login");
          }}
          className="w-full text-center text-xs text-blue-600 font-bold mt-4 cursor-pointer"
        >
          {mode === "login" ? "Belum punya akun? Daftar di sini" : "Sudah punya akun? Masuk"}
        </button>
      </div>
    </div>
  );
}

function translateAuthError(err: unknown): string {
  const code = (err as { code?: string })?.code || "";
  switch (code) {
    case "auth/email-already-in-use":
      return "Email ini sudah terdaftar. Coba masuk (login) saja.";
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/weak-password":
      return "Kata sandi terlalu pendek, minimal 6 karakter.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email atau kata sandi salah.";
    default:
      return "Terjadi kesalahan. Coba lagi.";
  }
}
