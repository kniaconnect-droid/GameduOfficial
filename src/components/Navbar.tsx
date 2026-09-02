import React from "react";
import { Sparkles, LogIn, ArrowLeft } from "lucide-react";
import { UserProfile } from "../types";
import gameduLogo from "../assets/images/logogamedu.jpeg";

interface NavbarProps {
  user: UserProfile;
  isLoggedIn: boolean;
  showBackButton: boolean;
  onGoHome: () => void;
  onBack: () => void;
  onOpenPayment: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export default function Navbar({
  user,
  isLoggedIn,
  showBackButton,
  onGoHome,
  onBack,
  onOpenPayment,
  onOpenAuth,
  onLogout
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 sm:py-4 shadow-sm select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Kiri: tombol kembali (kontekstual, cuma muncul kalau bukan di Beranda) + Logo */}
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={onBack}
              aria-label="Kembali"
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div
            onClick={onGoHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src={gameduLogo}
              alt="GamEdu Logo"
              className="w-10 h-10 rounded-xl object-contain shadow-md border border-slate-100 group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="hidden sm:block">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                Gam<span className="text-blue-600">Edu</span>
              </span>
              <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">E-Learning & Atensi Anak</p>
            </div>
          </div>
        </div>

        {/* Kanan: Premium Status / Upgrade + Login */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user.isPremium ? (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3.5 py-2 rounded-xl text-xs font-bold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span className="hidden xs:inline">GAMEDU </span>PREMIUM
            </div>
          ) : (
            <button
              onClick={onOpenPayment}
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
              Coba Premium
            </button>
          )}
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="text-[11px] font-bold text-slate-400 hover:text-slate-700 px-2 py-2 transition-colors cursor-pointer"
            >
              Keluar
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              Masuk
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
