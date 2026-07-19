import React from "react";
import { Game } from "../types";

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
      desc: "Fokus pada pengenalan angka dasar, bentuk dasar, dan asah konsentrasi motorik halus.",
      gameCount: games.filter((g) => g.ageRange.includes("3")).length,
      bgClass: "bg-blue-50/40 border-blue-100 hover:border-blue-300 hover:bg-blue-50/80",
      accentBg: "bg-blue-600 text-white shadow-md shadow-blue-100",
      icon: "🍎",
      tag: "Sensori & Angka"
    },
    {
      age: 4,
      title: "Usia 4 Tahun",
      desc: "Melatih pengenalan ejaan huruf, anatomi tubuh dasar, serta mengasah logika pemecahan masalah.",
      gameCount: games.filter((g) => g.ageRange.includes("4")).length,
      bgClass: "bg-purple-50/40 border-purple-100 hover:border-purple-300 hover:bg-purple-50/80",
      accentBg: "bg-purple-600 text-white shadow-md shadow-purple-100",
      icon: "👀",
      tag: "Kata & Logika"
    },
    {
      age: 5,
      title: "Usia 5 Tahun",
      desc: "Persiapan pra-sekolah (SD) dengan ejaan tingkat lanjut, operasi matematika, dan kreativitas visual.",
      gameCount: games.filter((g) => g.ageRange.includes("5")).length,
      bgClass: "bg-amber-50/40 border-amber-100 hover:border-amber-300 hover:bg-amber-50/80",
      accentBg: "bg-amber-600 text-white shadow-md shadow-amber-100",
      icon: "🚀",
      tag: "Persiapan Masuk SD"
    }
  ];

  return (
    <section id="age-categories" className="py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.age}
              onClick={() => onSelectAge(cat.age)}
              className={`group flex flex-col justify-between border-2 rounded-[32px] p-8 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                selectedAge === cat.age ? "ring-4 ring-offset-2 ring-blue-500/20 border-blue-500 bg-white" : cat.bgClass
              }`}
            >
              <div className="space-y-4">
                {/* Badge & Icon */}
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{cat.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white px-3.5 py-1.5 rounded-full text-slate-500 border border-slate-200/60 shadow-sm">
                    {cat.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{cat.desc}</p>
                </div>
              </div>

              {/* Game Counters & Arrow Button */}
              <div className="flex items-center justify-between pt-8 mt-4 border-t border-slate-200/60">
                <span className="text-xs font-black text-slate-500">
                  {cat.gameCount > 0 ? `${cat.gameCount} Permainan Edukasi` : "Segera Hadir"}
                </span>
                <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${cat.accentBg} group-hover:scale-110 transition-all`}>
                  ➔
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
