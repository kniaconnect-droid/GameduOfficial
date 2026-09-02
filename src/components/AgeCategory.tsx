import React from "react";
import { Game } from "../types";
import { ArrowRight } from "lucide-react";
import usia3Img from "../assets/images/usia3tahun.jpeg";
import usia4Img from "../assets/images/usia4tahun.jpeg";
import usia5Img from "../assets/images/usia5tahun.jpeg";
import usia6Img from "../assets/images/usia6tahun.jpeg";

interface AgeCategoryProps {
  selectedAge: number | null;
  onSelectAge: (age: number) => void;
  games: Game[];
}

export default function AgeCategory({ selectedAge, onSelectAge, games }: AgeCategoryProps) {
  const categories = [
    {
      age: 3,
      title: "Usia 3 Tahun",
      gameCount: games.filter((g) => g.ageRange.includes("3")).length,
      bgClass: "bg-blue-50/40 border-blue-100 hover:border-blue-300 hover:bg-blue-50/80",
      accentBg: "bg-blue-600 text-white shadow-md shadow-blue-100",
      image: usia3Img
    },
    {
      age: 4,
      title: "Usia 4 Tahun",
      gameCount: games.filter((g) => g.ageRange.includes("4")).length,
      bgClass: "bg-purple-50/40 border-purple-100 hover:border-purple-300 hover:bg-purple-50/80",
      accentBg: "bg-purple-600 text-white shadow-md shadow-purple-100",
      image: usia4Img
    },
    {
      age: 5,
      title: "Usia 5 Tahun",
      gameCount: games.filter((g) => g.ageRange.includes("5")).length,
      bgClass: "bg-amber-50/40 border-amber-100 hover:border-amber-300 hover:bg-amber-50/80",
      accentBg: "bg-amber-600 text-white shadow-md shadow-amber-100",
      image: usia5Img
    },
    {
      age: 6,
      title: "Usia 6-7 Tahun",
      gameCount: games.filter((g) => g.ageRange.includes("6")).length,
      bgClass: "bg-teal-50/40 border-teal-100 hover:border-teal-300 hover:bg-teal-50/80",
      accentBg: "bg-teal-600 text-white shadow-md shadow-teal-100",
      image: usia6Img
    }
  ];

  return (
    <section id="age-categories" className="py-10 sm:py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-100/60 px-3 py-1.5 rounded-full inline-block">
            Kurikulum Usia
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Kategori Berdasarkan Usia
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Pilihlah kelompok usia buah hati Anda untuk menemukan game interaktif yang dirancang khusus menyesuaikan tahap tumbuh kembangnya.
          </p>
        </div>

        {/* Categories Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.age}
              onClick={() => onSelectAge(cat.age)}
              className={`group flex flex-col justify-between border-2 rounded-[32px] overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                selectedAge === cat.age ? "ring-4 ring-offset-2 ring-blue-500/20 border-blue-500 bg-white" : cat.bgClass
              }`}
            >
              {/* Gambar kategori usia - rasio disesuaikan dengan gambar aslinya (1:1) supaya tidak terpotong */}
              <div className="w-full aspect-square overflow-hidden bg-white">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Game Counters & Arrow Button */}
              <div className="flex items-center justify-between px-6 py-5 mt-auto border-t border-slate-200/60">
                <span className="text-xs font-black text-slate-500">
                  {cat.gameCount > 0 ? `${cat.gameCount} Permainan Edukasi` : "Segera Hadir"}
                </span>
                <span className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${cat.accentBg} group-hover:scale-110 transition-all`}>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
