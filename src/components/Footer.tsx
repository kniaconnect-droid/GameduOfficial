import React from "react";
import gameduLogo from "../assets/images/gamedu_logo_1783910706826.jpg";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-6 border-t border-slate-800 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
        
        {/* Brand column */}
        <div className="md:col-span-6 space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={gameduLogo} 
              alt="GamEdu Logo" 
              className="w-10 h-10 rounded-xl object-contain shadow-md border border-slate-800"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-bold tracking-tight text-white">
              Gam<span className="text-blue-500">Edu</span>
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            GamEdu adalah platform e-learning & game edukasi interaktif terkemuka untuk menunjang perkembangan kognitif, motorik halus, asah bahasa, dan penalaran logika anak semenjak usia emas (Golden Age).
          </p>
          <div className="text-[10px] text-slate-500 font-bold flex items-center gap-2">
            <span>🛡️ Certified Kid-Safe & COPPA Compliant</span>
            <span>•</span>
            <span>🔒 SSL Sec-Encrypted Data</span>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="md:col-span-3 space-y-3 text-xs">
          <span className="font-bold text-slate-400 uppercase tracking-wider block">Kelompok Usia</span>
          <ul className="space-y-2 text-slate-300 font-bold">
            <li><a href="#age-categories" className="hover:text-blue-400 transition-colors">Usia 3 Tahun (Sensori & Angka)</a></li>
            <li><a href="#age-categories" className="hover:text-blue-400 transition-colors">Usia 4 Tahun (Kata & Logika)</a></li>
            <li><a href="#age-categories" className="hover:text-blue-400 transition-colors">Usia 5 Tahun (Pra-Sekolah Dasar)</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="md:col-span-3 space-y-3 text-xs">
          <span className="font-bold text-slate-400 uppercase tracking-wider block">Kurikulum & Dukungan</span>
          <ul className="space-y-2 text-slate-300 font-bold">
            <li><a href="#gallery-container" className="hover:text-blue-400 transition-colors">Kurikulum Teruji Klinis</a></li>
            <li><a href="#gallery-container" className="hover:text-blue-400 transition-colors">Metode Belajar Atensi</a></li>
            <li><a href="#gallery-container" className="hover:text-blue-400 transition-colors">Lisensi Sekolah & TK</a></li>
          </ul>
        </div>

      </div>

      {/* Copy */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-bold">
        <span>© 2026 GamEdu. Hak Cipta Dilindungi Undang-Undang.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300 transition-colors">Syarat & Ketentuan</a>
          <span>•</span>
          <a href="#" className="hover:text-slate-300 transition-colors">Kebijakan Privasi</a>
        </div>
      </div>
    </footer>
  );
}
