import React from "react";
import gameduLogo from "../assets/images/logogamedu.jpeg";

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8 px-6 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
        
        {/* Brand column */}
        <div className="md:col-span-6 space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={gameduLogo} 
              alt="GamEdu Logo" 
              className="w-10 h-10 rounded-xl object-contain shadow-md border border-white/10"
              referrerPolicy="no-referrer"
            />
            <span className="font-display text-xl font-semibold tracking-tight text-white">
              Gam<span className="text-coral">Edu</span>
            </span>
          </div>
          <p className="text-white/50 text-xs leading-relaxed max-w-sm">
            GamEdu adalah platform e-learning & game edukasi interaktif terkemuka untuk menunjang perkembangan kognitif, motorik halus, asah bahasa, dan penalaran logika anak semenjak usia emas (Golden Age).
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="md:col-span-3 space-y-3 text-xs">
          <span className="font-bold text-white/50 uppercase tracking-wider block">Kelompok Usia</span>
          <ul className="space-y-2 text-white/70 font-bold">
            <li><a href="#age-categories" className="hover:text-coral transition-colors">Usia 3 Tahun (Sensori & Angka)</a></li>
            <li><a href="#age-categories" className="hover:text-coral transition-colors">Usia 4 Tahun (Kata & Logika)</a></li>
            <li><a href="#age-categories" className="hover:text-coral transition-colors">Usia 5 Tahun (Pra-Sekolah Dasar)</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="md:col-span-3 space-y-3 text-xs">
          <span className="font-bold text-white/50 uppercase tracking-wider block">Kurikulum & Dukungan</span>
          <ul className="space-y-2 text-white/70 font-bold">
            <li><a href="#gallery-container" className="hover:text-coral transition-colors">Kurikulum Teruji Klinis</a></li>
            <li><a href="#gallery-container" className="hover:text-coral transition-colors">Metode Belajar Atensi</a></li>
            <li><a href="#gallery-container" className="hover:text-coral transition-colors">Lisensi Sekolah & TK</a></li>
          </ul>
        </div>

      </div>

      {/* Copy */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/40 font-bold">
        <span>© 2026 GamEdu. Hak Cipta Dilindungi Undang-Undang.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white/70 transition-colors">Syarat & Ketentuan</a>
          <span>•</span>
          <a href="#" className="hover:text-white/70 transition-colors">Kebijakan Privasi</a>
        </div>
      </div>
    </footer>
  );
}
