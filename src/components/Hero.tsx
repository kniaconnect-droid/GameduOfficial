import React from "react";
import { Play, Eye, Award, Sparkles, BookOpen } from "lucide-react";
import heroIllustration from "../assets/images/gamedu_hero_illustration_1783908408781.jpg";
import gameduLogo from "../assets/images/gamedu_logo_1783910706826.jpg";

interface HeroProps {
  onStartLearning: () => void;
  onExploreGames: () => void;
}

export default function Hero({ onStartLearning, onExploreGames }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-white py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        {/* Left column: Text CTA */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          
          {/* Logo GamEdu */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={gameduLogo}
              alt="GamEdu Logo"
              className="h-28 sm:h-32 object-contain rounded-[24px] shadow-lg border border-slate-200/50 hover:scale-105 transition-transform bg-white p-2"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold text-blue-700 shadow-sm uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 fill-blue-700 animate-pulse" />
            Platform Edukasi Anak #1 Terpercaya
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Belajar Sambil <span className="text-blue-600">Bermain</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
            GamEdu menghadirkan ratusan permainan edukatif interaktif yang membantu anak belajar sesuai tahap perkembangan usia emas mereka. Teruji oleh ahli terapi, guru, dan dicintai anak-anak!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onStartLearning}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-100 hover:scale-105 transition-all text-base cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              Mulai Sekarang
            </button>
            <button
              onClick={onExploreGames}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl border-2 border-slate-200 transition-all hover:scale-105 text-base cursor-pointer"
            >
              <Eye className="w-5 h-5 text-slate-500" />
              Lihat Katalog
            </button>
          </div>

          {/* Benefits Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100/30">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold text-emerald-900">Melatih Logika</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100/30">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-500"></div>
              <span className="text-xs font-bold text-violet-900">Kreativitas</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-rose-50 rounded-xl border border-rose-100/30">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <span className="text-xs font-bold text-rose-900">Konsentrasi</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100/30">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <span className="text-xs font-bold text-amber-900">Siap Cetak</span>
            </div>
          </div>
        </div>

        {/* Right column: Generated Hero Illustration */}
        <div className="lg:col-span-6 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-2xl opacity-75"></div>
          <div className="relative border-4 border-white bg-white rounded-[36px] shadow-2xl overflow-hidden aspect-[4/3] transform hover:rotate-1 transition-transform duration-300">
            <img
              src={heroIllustration}
              alt="Anak Belajar Sambil Bermain GamEdu"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
