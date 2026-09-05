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

// Menu utama disusun per kategori (Game, Worksheet, Edukasi Ortu), dan
// masing-masing kategori punya dropdown usia (3, 4, 5 tahun) ke halaman yang
// sesuai.
const CATEGORY_MENU = [
  {
    key: "game",
    label: "Game",
    pathSuffix: "katalog-game"
  },
  {
    key: "worksheet",
    label: "Worksheet",
    pathSuffix: "worksheet"
  },
  {
    key: "edukasi-ortu",
    label: "Edukasi Ortu",
    pathSuffix: "materi"
  }
].map((cat) => ({
  ...cat,
  items: [3, 4, 5].map((age) => ({
    label: `Usia ${age} Tahun`,
    path: `/kategoriusia/${age}/${cat.pathSuffix}`
  }))
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
  const [openCategoryMenu, setOpenCategoryMenu] = useState<string | null>(null);
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
    setOpenCategoryMenu(null);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/60 backdrop-blur-xl border-b border-blue-100/70 shadow-[0_4px_24px_-4px_rgba(37,99,235,0.15)] px-4 sm:px-6 py-3 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Kiri: tombol kembali (kontekstual, cuma muncul kalau bukan di Beranda) + Logo */}
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={onBack}
              aria-label="Kembali"
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl border border-blue-100 text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
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
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-contain shadow-sm border border-blue-100/70 bg-white group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="hidden sm:block">
              <span className="text-2xl font-extrabold tracking-tight text-blue-600">
                Gam<span className="text-slate-900">Edu</span>
              </span>
              <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">E-Learning & Atensi Anak</p>
            </div>
          </div>
        </div>

        {/* Tengah: menu navigasi utama (desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => goTo("/")}
            className="px-3 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            Beranda
          </button>
          {CATEGORY_MENU.map(({ key, label, items }) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => setOpenCategoryMenu(key)}
              onMouseLeave={() => setOpenCategoryMenu((cur) => (cur === key ? null : cur))}
            >
              <button
                onClick={() => setOpenCategoryMenu((cur) => (cur === key ? null : key))}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                {label}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openCategoryMenu === key && (
                <div className="absolute top-full left-0 pt-2 min-w-[160px]">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-blue-100 overflow-hidden py-1">
                    {items.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => goTo(item.path)}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => goToSection("manfaat-gamedu")}
            className="px-3 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            Why Gamedu
          </button>
          <button
            onClick={() => goToSection("tentang-kami")}
            className="px-3 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            Tentang Kami
          </button>
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
              className="hidden sm:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
              Join VIP
            </button>
          )}
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="hidden sm:block text-[11px] font-bold text-slate-400 hover:text-slate-700 px-2 py-2 transition-colors cursor-pointer"
            >
              Keluar
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-xl border border-blue-200 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              Masuk
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-blue-100 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto mt-3 pb-1 flex flex-col gap-1 bg-white/70 backdrop-blur-xl rounded-2xl border border-blue-100/70 p-2">
          <button onClick={() => goTo("/")} className="text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer">
            Beranda
          </button>

          {CATEGORY_MENU.map(({ key, label, items }) => (
            <div key={key} className="border-t border-blue-100/70 pt-1">
              <p className="px-3 py-1.5 text-xs font-black text-slate-400 uppercase tracking-wider">{label}</p>
              {items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  className="w-full text-left pl-6 pr-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}

          <button onClick={() => goToSection("manfaat-gamedu")} className="text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer border-t border-blue-100/70 mt-1">
            Why Gamedu
          </button>
          <button onClick={() => goToSection("tentang-kami")} className="text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer">
            Tentang Kami
          </button>

          <div className="border-t border-blue-100/70 mt-1 pt-2 flex items-center gap-2">
            {!user.isPremium && (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenPayment(); }}
                className="flex-1 flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
                Join VIP
              </button>
            )}
            {isLoggedIn ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-2.5 cursor-pointer"
              >
                Keluar
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-700 border border-blue-200 px-3 py-2.5 rounded-xl cursor-pointer"
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
