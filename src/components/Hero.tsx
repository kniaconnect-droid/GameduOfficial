import React from "react";
import { Play, Star } from "lucide-react";
import heroIllustration from "../assets/images/NewHero.jpeg";

interface HeroProps {
  onStartLearning: () => void;
}

export default function Hero({ onStartLearning }: HeroProps) {
  return (
    <section className="relative bg-white py-12 sm:py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        {/* Left column: Text CTA */}
        <div className="lg:col-span-6 space-y-7 text-center lg:text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-gamedu-blue/20 rounded-full px-4 py-1.5 text-xs font-bold text-gamedu-blue shadow-sm uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-sunny text-sunny" />
            Platform Belajar & Bermain untuk Anak
          </div>

          {/* Ilustrasi utama - khusus tampilan mobile/tablet, diletakkan tepat di bawah badge */}
          <div className="lg:hidden relative mt-4 max-w-xs mx-auto">
            <div className="relative border-[6px] border-white bg-white rounded-[28px] shadow-xl overflow-hidden aspect-square">
              <img
                src={heroIllustration}
                alt="Anak Belajar Sambil Bermain GamEdu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="font-display text-2xl sm:text-3xl font-semibold leading-snug max-w-xl mx-auto lg:mx-0 text-navy">
            <span className="text-gamedu-blue">GamEdu</span> menghadirkan game edukatif, worksheet interaktif, dan panduan untuk orang tua agar proses belajar anak jadi lebih seru, terarah, dan sesuai tahap perkembangannya.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
            <button
              onClick={onStartLearning}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-coral hover:bg-coral/90 text-white font-bold rounded-2xl shadow-md hover:scale-105 transition-all text-base cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              Mulai Sekarang
            </button>
          </div>
        </div>

        {/* Right column: Hero illustration framed as an editorial "game card" (khusus tampilan laptop/desktop) */}
        <div className="hidden lg:block lg:col-span-6 relative mt-2 sm:mt-0">
          <div className="relative border-[10px] border-white bg-white rounded-[36px] shadow-xl overflow-hidden aspect-square transform hover:rotate-1 transition-transform duration-300">
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
