import React from "react";
import { Sparkles, X, Clock } from "lucide-react";
import { ADMIN_WHATSAPP_NUMBER } from "../lib/constants";

interface PremiumStatusBannerProps {
  name: string;
  premiumUntil: number;
  userEmail?: string | null;
  onClose: () => void;
}

// Muncul otomatis pas member Premium habis login (App.tsx yang nentuin
// kapan ditampilkan). Isinya:
// - Teks welcoming + tanggal expired paket.
// - Kalau sisa waktu <= 7 hari, ganti jadi mode "reminder" warna kuning
//   dengan tombol cepat buat perpanjang lewat WhatsApp admin.
const DAY_MS = 24 * 60 * 60 * 1000;
const REMINDER_THRESHOLD_DAYS = 7;

export default function PremiumStatusBanner({ name, premiumUntil, userEmail, onClose }: PremiumStatusBannerProps) {
  const now = Date.now();
  const daysLeft = Math.max(0, Math.ceil((premiumUntil - now) / DAY_MS));
  const isExpiringSoon = daysLeft <= REMINDER_THRESHOLD_DAYS;

  const dateLabel = new Date(premiumUntil).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const renewWaLink = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Halo Admin GamEdu, saya mau perpanjang paket premium saya sebelum habis.\nEmail akun saya: ${userEmail || "-"}`
  )}`;

  return (
    <div
      className={`w-full px-4 py-3 flex items-center justify-center gap-3 text-xs sm:text-sm font-bold text-center flex-wrap ${
        isExpiringSoon ? "bg-amber-400 text-amber-950" : "bg-blue-600 text-white"
      }`}
    >
      {isExpiringSoon ? <Clock className="w-4 h-4 shrink-0" /> : <Sparkles className="w-4 h-4 shrink-0 fill-white" />}

      {isExpiringSoon ? (
        <span>
          ⏰ Paket Premium <strong>{name}</strong> akan habis dalam{" "}
          <strong>{daysLeft === 0 ? "hari ini" : `${daysLeft} hari`}</strong> (sampai {dateLabel}). Yuk perpanjang biar
          akses game premium nggak kepotong!
        </span>
      ) : (
        <span>
          🎉 Selamat datang kembali, <strong>{name}</strong>! Paket Premium kamu aktif sampai{" "}
          <strong>{dateLabel}</strong>.
        </span>
      )}

      {isExpiringSoon && (
        <a
          href={renewWaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-amber-700 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-black hover:bg-amber-50 transition-colors"
        >
          Perpanjang via WhatsApp
        </a>
      )}

      <button
        onClick={onClose}
        className={`ml-1 p-1 rounded-full transition-colors cursor-pointer ${
          isExpiringSoon ? "hover:bg-amber-500/40" : "hover:bg-blue-500"
        }`}
        aria-label="Tutup"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
