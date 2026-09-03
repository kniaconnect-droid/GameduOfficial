import React from "react";
import belajarSambilMainImg from "../assets/images/belajar sambil main.jpeg";
import fokusImg from "../assets/images/fokus.jpeg";
import logikaImg from "../assets/images/logika.jpeg";
import kreativitasImg from "../assets/images/kreatiitas.jpeg";
import sesuaiTahapanUsiaImg from "../assets/images/sesuaitahapanusia.jpeg";
import worksheetImg from "../assets/images/worksheet.jpeg";

export default function Benefits() {
  const benefits = [
    {
      title: "Belajar sambil bermain",
      desc: "Metode gamifikasi modern untuk menumbuhkan minat belajar intrinsik anak tanpa paksaan.",
      image: belajarSambilMainImg,
    },
    {
      title: "Melatih konsentrasi",
      desc: "Latihan visual adaptif yang secara bertahap memperpanjang rentang atensi dan fokus anak.",
      image: fokusImg,
    },
    {
      title: "Mengembangkan logika",
      desc: "Game asah otak, angka, dan kata yang merangsang problem solving, penalaran, dan analisis dasar.",
      image: logikaImg,
    },
    {
      title: "Meningkatkan kreativitas",
      desc: "Aktivitas interaktif penuh warna yang memicu imajinasi kognitif dan eksplorasi sensori-motorik.",
      image: kreativitasImg,
    },
    {
      title: "Belajar sesuai usia",
      desc: "Materi terkurasi rapi dalam kategori usia 3, 4, hingga 5 tahun sesuai tahap perkembangan.",
      image: sesuaiTahapanUsiaImg,
    },
    {
      title: "Worksheet siap cetak",
      desc: "Dukungan penuh dengan lembar kerja fisik gratis yang bisa diunduh untuk melatih motorik halus.",
      image: worksheetImg,
    },
  ];

  return (
    <section id="manfaat-gamedu" className="py-10 sm:py-16 px-6 bg-slate-50/40 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-100/60 px-3 py-1.5 rounded-full inline-block">
            Fitur Unggulan
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Manfaat Istimewa GamEdu
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Disusun oleh guru, terapis okupasi, dan terapis behavior dengan mempertimbangkan kebutuhan belajar dan perkembangan anak.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 group"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {b.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
