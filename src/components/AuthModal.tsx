import React, { useState } from "react";
import { X, Crown } from "lucide-react";
import { useAuth } from "../lib/useAuth";
import { LYNK_PASSWORD_PREFIX } from "../lib/constants";
import gameduLogo from "../assets/images/logogamedu.jpeg";

interface AuthModalProps {
  onClose: () => void;
  // Dipakai buat kasih tau kenapa modal ini muncul, misal habis klik "Premium".
  contextMessage?: string;
  // Dipanggil kalau user belum punya akun & klik "Daftar Member VIP" --
  // App.tsx yang nentuin ini artinya buka PaymentModal.
  onWantVip: () => void;
}

// Modal LOGIN SAJA. Pendaftaran gratis sudah dihapus total dari app ini --
// satu-satunya cara punya akun adalah checkout paket Member VIP di Lynk.id,
// yang otomatis bikin akun & aktifin Premium lewat api/lynk-webhook.ts.
// Modal ini cuma dipanggil pas user beneran butuh login: mau lanjut ke
// Premium, atau klik "Masuk" di navbar buat member VIP yang mau login lagi.
export default function AuthModal({ onClose, contextMessage, onWantVip }: AuthModalProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      onClose();
    } catch (err: unknown) {
      setError(translateAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/60 backdrop-blur-md px-4 animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 border border-navy/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-navy/40 hover:text-navy hover:bg-cream transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <img
            src={gameduLogo}
            alt="GamEdu Logo"
            className="w-16 h-16 rounded-2xl object-contain shadow-md border border-navy/10 mx-auto mb-3"
            referrerPolicy="no-referrer"
          />
          <h1 className="font-display text-xl font-semibold text-navy">GamEdu</h1>
          <p className="text-sm text-navy/50 mt-1">{contextMessage || "Masuk ke akun Member VIP kamu"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-navy/60 block mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-gamedu-blue/40"
              placeholder="Email yang dipakai saat checkout"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-navy/60 block mb-1">Kata Sandi</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-navy/15 text-sm focus:outline-none focus:ring-2 focus:ring-gamedu-blue/40"
              placeholder={`${LYNK_PASSWORD_PREFIX} + 4 digit terakhir No. HP`}
            />
            <p className="text-[10px] text-navy/40 mt-1">
              Contoh: kalau No. HP kamu waktu checkout berakhiran <strong>4321</strong>, passwordnya{" "}
              <strong>{LYNK_PASSWORD_PREFIX}4321</strong>.
            </p>
          </div>

          {error && <p className="text-xs font-bold text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gamedu-blue hover:bg-gamedu-blue/90 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
          >
            {submitting ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <button
          onClick={onWantVip}
          className="w-full flex items-center justify-center gap-1.5 text-center text-xs text-coral font-bold mt-4 cursor-pointer"
        >
          <Crown className="w-3.5 h-3.5" />
          Belum punya akun? Daftar Member VIP
        </button>
      </div>
    </div>
  );
}

function translateAuthError(err: unknown): string {
  const code = (err as { code?: string })?.code || "";
  switch (code) {
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email atau kata sandi salah, atau akun belum aktif. Sudah checkout Member VIP?";
    default:
      return "Terjadi kesalahan. Coba lagi.";
  }
}
