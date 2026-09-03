import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, LogIn, ArrowLeft, ChevronDown, Menu, X } from "lucide-react";
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

// Menu usia: setiap usia punya dropdown ke Game - Worksheet - Materi
// (urutan disamakan dengan urutan kartu di halaman Kategori Usia).
const AGE_MENU = [3, 4, 5].map((age) => ({
  age,
  label: `Usia ${age} Tahun`,
  items: [
    { label: "Game", path: `/kategoriusia/${age}/katalog-game` },
    { label: "Worksheet", path: `/kategoriusia/${age}/worksheet` },
    { label: "Materi", path: `/kategoriusia/${age}/materi` }
  ]
}));

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
  const navigate = useNavigate();
  const [openAgeMenu, setOpenAgeMenu] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigasi ke anchor section di Beranda. Kalau lagi bukan di Beranda,
  // pindah dulu ke "/" lalu scroll ke section setelah render selesai.
  const goToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (window.location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  const goTo = (path: string) => {
    setMobileMenuOpen(false);
    setOpenAgeMenu(null);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 z-40 bg-orange-500 border-b border-orange-600/40 px-4 sm:px-6 py-3 shadow-sm select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Kiri: tombol kembali (kontekstual, cuma muncul kalau bukan di Beranda) + Logo */}
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={onBack}
              aria-label="Kembali"
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl border border-white/40 text-white hover:bg-white/10 transition-colors cursor-pointer"
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
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-contain shadow-md border border-white/60 bg-white group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="hidden sm:block">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Gam<span className="text-slate-900">Edu</span>
              </span>
              <p className="text-[9px] text-white/80 font-bold tracking-widest uppercase">E-Learning & Atensi Anak</p>
            </div>
          </div>
        </div>

        {/* Tengah: menu navigasi utama (desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => goTo("/")}
            className="px-3 py-2 rounded-lg text-sm font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Beranda
          </button>
          <button
            onClick={() => goToSection("manfaat-gamedu")}
            className="px-3 py-2 rounded-lg text-sm font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Why Gamedu
          </button>
          <button
            onClick={() => goToSection("tentang-kami")}
            className="px-3 py-2 rounded-lg text-sm font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Tentang Kami
          </button>

          {AGE_MENU.map(({ age, label, items }) => (
            <div
              key={age}
              className="relative"
              onMouseEnter={() => setOpenAgeMenu(age)}
              onMouseLeave={() => setOpenAgeMenu((cur) => (cur === age ? null : cur))}
            >
              <button
                onClick={() => setOpenAgeMenu((cur) => (cur === age ? null : age))}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                {label}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openAgeMenu === age && (
                <div className="absolute top-full left-0 pt-2 min-w-[160px]">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1">
                    {items.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => goTo(item.path)}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Kanan: Premium Status / Upgrade + Login + Hamburger (mobile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user.isPremium ? (
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3.5 py-2 rounded-xl text-xs font-bold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span className="hidden xs:inline">GAMEDU </span>PREMIUM
            </div>
          ) : (
            <button
              onClick={onOpenPayment}
              className="hidden sm:flex items-center gap-1.5 bg-white hover:bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-xs font-bold shadow-lg transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              Coba Premium
            </button>
          )}
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="hidden sm:block text-[11px] font-bold text-white/80 hover:text-white px-2 py-2 transition-colors cursor-pointer"
            >
              Keluar
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-white hover:bg-white/10 px-3 py-2 rounded-xl border border-white/40 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              Masuk
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-white/40 text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto mt-3 pb-1 flex flex-col gap-1">
          <button onClick={() => goTo("/")} className="text-left px-3 py-2.5 rounded-lg text-sm font-bold text-white hover:bg-white/10 cursor-pointer">
            Beranda
          </button>
          <button onClick={() => goToSection("manfaat-gamedu")} className="text-left px-3 py-2.5 rounded-lg text-sm font-bold text-white hover:bg-white/10 cursor-pointer">
            Why Gamedu
          </button>
          <button onClick={() => goToSection("tentang-kami")} className="text-left px-3 py-2.5 rounded-lg text-sm font-bold text-white hover:bg-white/10 cursor-pointer">
            Tentang Kami
          </button>

          {AGE_MENU.map(({ age, label, items }) => (
            <div key={age} className="border-t border-white/10 pt-1">
              <p className="px-3 py-1.5 text-xs font-black text-white/70 uppercase tracking-wider">{label}</p>
              {items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  className="w-full text-left pl-6 pr-3 py-2 rounded-lg text-sm font-semibold text-white/90 hover:bg-white/10 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}

          <div className="border-t border-white/10 mt-1 pt-2 flex items-center gap-2">
            {!user.isPremium && (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenPayment(); }}
                className="flex-1 flex items-center justify-center gap-1.5 bg-white text-orange-600 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                Coba Premium
              </button>
            )}
            {isLoggedIn ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                className="text-xs font-bold text-white/80 px-3 py-2.5 cursor-pointer"
              >
                Keluar
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="flex items-center gap-1.5 text-xs font-bold text-white border border-white/40 px-3 py-2.5 rounded-xl cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                Masuk
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
