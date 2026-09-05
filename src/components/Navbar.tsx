import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, ArrowLeft, ChevronDown, Menu, X, Crown } from "lucide-react";
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
    <nav className="sticky top-0 z-40 bg-white border-b border-navy/10 px-4 sm:px-6 py-2.5 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Kiri: tombol kembali (kontekstual, cuma muncul kalau bukan di Beranda) + Logo */}
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={onBack}
              aria-label="Kembali"
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-navy/10 text-navy/60 hover:text-gamedu-blue hover:bg-cream transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div
            onClick={onGoHome}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img
              src={gameduLogo}
              alt="GamEdu Logo"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl object-contain border border-navy/10 bg-white group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="hidden sm:block">
              <span className="font-display text-2xl font-semibold tracking-tight text-navy">
                Gam<span className="text-gamedu-blue">Edu</span>
              </span>
              <p className="text-[9px] text-navy/40 font-bold tracking-widest uppercase -mt-1">E-Learning & Atensi Anak</p>
            </div>
          </div>
        </div>

        {/* Tengah: menu navigasi utama (desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => goTo("/")}
            className="px-3 py-2 rounded-lg text-sm font-bold text-navy/60 hover:text-gamedu-blue hover:bg-cream transition-colors cursor-pointer"
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
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold text-navy/60 hover:text-gamedu-blue hover:bg-cream transition-colors cursor-pointer"
              >
                {label}
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openCategoryMenu === key && (
                <div className="absolute top-full left-0 pt-2 min-w-[160px]">
                  <div className="bg-white rounded-xl shadow-lg border border-navy/10 overflow-hidden py-1">
                    {items.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => goTo(item.path)}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-navy/70 hover:bg-cream hover:text-gamedu-blue transition-colors cursor-pointer"
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
            className="px-3 py-2 rounded-lg text-sm font-bold text-navy/60 hover:text-gamedu-blue hover:bg-cream transition-colors cursor-pointer"
          >
            Why Gamedu
          </button>
          <button
            onClick={() => goToSection("tentang-kami")}
            className="px-3 py-2 rounded-lg text-sm font-bold text-navy/60 hover:text-gamedu-blue hover:bg-cream transition-colors cursor-pointer"
          >
            Tentang Kami
          </button>
        </div>

        {/* Kanan: Status VIP / Upgrade + Login + Hamburger (mobile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user.isPremium ? (
            <div className="hidden sm:flex items-center gap-1.5 bg-sunny/20 border border-sunny/60 text-navy px-3.5 py-2 rounded-full text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-navy" />
              <span className="hidden xs:inline">GAMEDU </span>VIP
            </div>
          ) : (
            <button
              onClick={onOpenPayment}
              className="hidden sm:flex items-center gap-1.5 bg-coral hover:bg-coral/90 text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              Join VIP
            </button>
          )}
          {isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-2">
              {user.name && (
                <span className="text-[11px] font-bold text-navy/50 max-w-[140px] truncate">
                  Ayah/Bunda {user.name}
                </span>
              )}
              <button
                onClick={onLogout}
                className="text-[11px] font-bold text-navy/40 hover:text-navy px-2 py-2 transition-colors cursor-pointer"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-gamedu-blue hover:bg-cream px-3 py-2 rounded-full border border-gamedu-blue/30 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              Masuk
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-navy/10 text-gamedu-blue hover:bg-cream transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto mt-3 pb-1 flex flex-col gap-1 bg-white rounded-2xl border border-navy/10 shadow-lg p-2">
          <button onClick={() => goTo("/")} className="text-left px-3 py-2.5 rounded-lg text-sm font-bold text-navy/60 hover:text-gamedu-blue hover:bg-cream cursor-pointer">
            Beranda
          </button>

          {CATEGORY_MENU.map(({ key, label, items }) => (
            <div key={key} className="border-t border-navy/10 pt-1">
              <p className="px-3 py-1.5 text-xs font-black text-navy/30 uppercase tracking-wider">{label}</p>
              {items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => goTo(item.path)}
                  className="w-full text-left pl-6 pr-3 py-2 rounded-lg text-sm font-semibold text-navy/60 hover:text-gamedu-blue hover:bg-cream cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}

          <button onClick={() => goToSection("manfaat-gamedu")} className="text-left px-3 py-2.5 rounded-lg text-sm font-bold text-navy/60 hover:text-gamedu-blue hover:bg-cream cursor-pointer border-t border-navy/10 mt-1">
            Why Gamedu
          </button>
          <button onClick={() => goToSection("tentang-kami")} className="text-left px-3 py-2.5 rounded-lg text-sm font-bold text-navy/60 hover:text-gamedu-blue hover:bg-cream cursor-pointer">
            Tentang Kami
          </button>

          <div className="border-t border-navy/10 mt-1 pt-2 flex flex-col gap-2">
            {isLoggedIn && user.name && (
              <p className="px-1 text-xs font-bold text-navy/50">Ayah/Bunda {user.name}</p>
            )}
            <div className="flex items-center gap-2">
              {!user.isPremium && (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenPayment(); }}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-coral hover:bg-coral/90 text-white px-4 py-2.5 rounded-full text-xs font-bold cursor-pointer"
                >
                  Join VIP
                </button>
              )}
              {isLoggedIn ? (
                <button
                  onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                  className="text-xs font-bold text-navy/40 hover:text-navy px-3 py-2.5 cursor-pointer"
                >
                  Keluar
                </button>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-gamedu-blue hover:bg-cream px-3 py-2.5 rounded-full border border-gamedu-blue/30 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Masuk
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
