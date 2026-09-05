import React from "react";
import { Play, Star, PenLine, Puzzle, BookOpen } from "lucide-react";
import heroIllustration from "../assets/images/NewHero.jpeg";

interface HeroProps {
  onStartLearning: () => void;
}

export default function Hero({ onStartLearning }: HeroProps) {
  return (
    <section className="relative bg-cream py-12 sm:py-20 px-6 overflow-hidden">
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
            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-sunny flex items-center justify-center rotate-6 shadow-sm">
              <Puzzle className="w-5 h-5 text-navy" />
            </div>
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
          {/* Doodle accents — intentional, orbiting the single focal image */}
          <div className="absolute -top-6 left-10 w-12 h-12 rounded-2xl bg-sunny flex items-center justify-center rotate-[-8deg] shadow-sm z-20">
            <Puzzle className="w-6 h-6 text-navy" />
          </div>
          <div className="absolute -bottom-5 -left-6 w-14 h-14 rounded-full bg-mint flex items-center justify-center rotate-6 shadow-sm z-20">
            <PenLine className="w-6 h-6 text-navy" />
          </div>
          <div className="absolute top-1/2 -right-5 w-11 h-11 rounded-2xl bg-lavender flex items-center justify-center rotate-12 shadow-sm z-20">
            <BookOpen className="w-5 h-5 text-navy" />
          </div>

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
