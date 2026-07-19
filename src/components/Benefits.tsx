import React from "react";
import { Sparkles, Brain, Award, Palette, Calendar, FileText } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Belajar sambil bermain",
      desc: "Metode gamifikasi modern untuk menumbuhkan minat belajar intrinsik anak tanpa paksaan.",
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-100 text-blue-600",
    },
    {
      title: "Melatih konsentrasi",
      desc: "Latihan visual adaptif yang secara bertahap memperpanjang rentang atensi dan fokus anak.",
      icon: <Brain className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-50 border-emerald-100 text-emerald-600",
    },
    {
      title: "Mengembangkan logika",
      desc: "Game asah otak, angka, dan kata yang merangsang problem solving, penalaran, dan analisis dasar.",
      icon: <Award className="w-6 h-6 text-amber-600" />,
      color: "bg-amber-50 border-amber-100 text-amber-600",
    },
    {
      title: "Meningkatkan kreativitas",
      desc: "Aktivitas interaktif penuh warna yang memicu imajinasi kognitif dan eksplorasi sensori-motorik.",
      icon: <Palette className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 border-purple-100 text-purple-600",
    },
    {
      title: "Belajar sesuai usia",
      desc: "Materi terkurasi rapi dalam kategori usia 3, 4, hingga 5 tahun sesuai tahap perkembangan.",
      icon: <Calendar className="w-6 h-6 text-red-600" />,
      color: "bg-red-50 border-red-100 text-red-600",
    },
    {
      title: "Worksheet siap cetak",
      desc: "Dukungan penuh dengan lembar kerja fisik gratis yang bisa diunduh untuk melatih motorik halus.",
      icon: <FileText className="w-6 h-6 text-teal-600" />,
      color: "bg-teal-50 border-teal-100 text-teal-600",
    },
  ];

  return (
    <section className="py-16 px-6 bg-slate-50/40">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-100/60 px-3 py-1.5 rounded-full inline-block">
            Fitur Unggulan
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Manfaat Istimewa GamEdu
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Dirancang secara ilmiah bersama ahli psikologi perkembangan dan terapis wicara untuk memastikan hasil belajar yang komprehensif.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/60 rounded-3xl p-7 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 shadow-sm ${b.color}`}>
                {b.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {b.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
