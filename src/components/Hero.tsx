import React from "react";
import { Play, Eye, Award, Sparkles, BookOpen } from "lucide-react";
import heroIllustration from "../assets/images/NewHero.jpeg";
import gameduLogo from "../assets/images/logogamedu.jpeg";

interface HeroProps {
  onStartLearning: () => void;
  onExploreGames: () => void;
}

export default function Hero({ onStartLearning, onExploreGames }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-white py-10 sm:py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        {/* Left column: Text CTA */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-bold text-blue-700 shadow-sm uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 fill-blue-700 animate-pulse" />
            Platform Belajar & Bermain untuk Anak
          </div>

          {/* Logo GamEdu */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={gameduLogo}
              alt="GamEdu Logo"
              className="h-28 sm:h-32 object-contain rounded-[24px] shadow-lg border border-slate-200/50 hover:scale-105 transition-transform bg-white p-2"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Ilustrasi utama - khusus tampilan mobile/tablet, diletakkan tepat di bawah logo */}
          <div className="lg:hidden relative mt-2">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-2xl opacity-75"></div>
            <div className="relative border-4 border-white bg-white rounded-[36px] shadow-2xl overflow-hidden aspect-square">
              <img
                src={heroIllustration}
                alt="Anak Belajar Sambil Bermain GamEdu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
            GamEdu menghadirkan game edukatif, worksheet interaktif, dan panduan untuk orang tua agar proses belajar anak jadi lebih seru, terarah, dan sesuai tahap perkembangannya.
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
        </div>

        {/* Right column: Generated Hero Illustration (khusus tampilan laptop/desktop) */}
        <div className="hidden lg:block lg:col-span-6 relative mt-2 sm:mt-0">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-2xl opacity-75"></div>
          <div className="relative border-4 border-white bg-white rounded-[36px] shadow-2xl overflow-hidden aspect-square transform hover:rotate-1 transition-transform duration-300">
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
