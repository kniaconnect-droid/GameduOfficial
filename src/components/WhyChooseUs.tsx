import React from "react";
import { Award, Compass, ShieldAlert, TrendingUp } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Kurikulum Berbasis Klinis",
      desc: "Dirancang secara kolaboratif bersama Terapis Wicara (Speech Therapist) dan Psikolog Anak untuk asah wicara, motorik, dan nalar kognitif dasar.",
      icon: <Award className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "100% Aman Anak & Bebas Iklan",
      desc: "Keamanan total di internet untuk buah hati Anda. Tanpa iklan pihak ketiga, tanpa pelacakan data anak, dan tanpa konten tidak layak.",
      icon: <ShieldAlert className="w-5 h-5" />,
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      title: "Pembelajaran Terarah Adaptif",
      desc: "Tingkat kesulitan materi game menyesuaikan secara adaptif berdasarkan analisis akurasi dan rentang waktu penyelesaian respon anak.",
      icon: <Compass className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Laporan Kemajuan Real-time",
      desc: "Pantau kemajuan anak langsung melalui Parent Dashboard. Deteksi rentang atensi, area kognitif yang kuat, dan unduh saran praktis klinis.",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <section className="py-16 px-6 bg-slate-50/30">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-700 bg-orange-50 border border-orange-100/60 px-3 py-1.5 rounded-full inline-block">
            Komitmen Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Mengapa Memilih GamEdu?
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Kami menggabungkan elemen hiburan yang disukai anak-anak dengan metodologi pendidikan klinis teruji untuk menciptakan hasil belajar terbaik.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((r, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/60 rounded-3xl p-8 flex flex-col sm:flex-row items-start gap-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm ${r.color}`}>
                {r.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {r.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
