import React, { useState } from "react";
import { Lock, Sparkles, ChevronDown, Target, Eye, Home as HomeIcon, Gamepad2, FileText } from "lucide-react";
import { MATERI_KOGNITIF_3_TAHUN } from "../lib/materiKognitif3Tahun";
import { MATERI_KOGNITIF_4_TAHUN } from "../lib/materiKognitif4Tahun";
import { MATERI_KOGNITIF_5_TAHUN } from "../lib/materiKognitif5Tahun";

interface MateriKognitifProps {
  age: number;
  isPremiumUser: boolean;
  onOpenPayment: () => void;
}

const MATERI_BY_AGE: Record<number, typeof MATERI_KOGNITIF_3_TAHUN> = {
  3: MATERI_KOGNITIF_3_TAHUN,
  4: MATERI_KOGNITIF_4_TAHUN,
  5: MATERI_KOGNITIF_5_TAHUN
};

export default function MateriKognitif({ age, isPremiumUser, onOpenPayment }: MateriKognitifProps) {
  const data = MATERI_BY_AGE[age] ?? MATERI_KOGNITIF_3_TAHUN;
  const [openId, setOpenId] = useState<string | null>(data.kemampuan[0].id);

  // Kalau pindah kategori usia, buka kartu pertama dari data yang baru lagi.
  React.useEffect(() => {
    setOpenId(data.kemampuan[0]?.id ?? null);
  }, [age]);

  return (
    <section className="py-4">
      <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 sm:p-8 border-b border-slate-200/60">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-indigo-600 mb-2">
            <FileText className="w-3.5 h-3.5" />
            Materi Edukasi Orang Tua
            <span className="ml-2 flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 fill-amber-500 text-amber-500" /> Premium
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{data.title}</h2>
          <p className="text-slate-500 text-sm mt-1">{data.subtitle}</p>
          <p className="text-slate-600 text-sm leading-relaxed mt-4 max-w-3xl">{data.intro}</p>
        </div>

        {/* Locked state for non-premium users */}
        {!isPremiumUser ? (
          <div className="relative">
            {/* Blurred teaser of first item */}
            <div className="p-6 sm:p-8 blur-sm select-none pointer-events-none opacity-70">
              <KemampuanCard item={data.kemampuan[0]} isOpen onToggle={() => {}} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-white/85 p-6">
              <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-8 max-w-md w-full text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto text-amber-500">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Materi Lengkap untuk Member Premium</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Buka {data.kemampuan.length} panduan lengkap perkembangan kognitif usia {age} tahun, lengkap dengan ide
                  stimulasi di rumah dan aktivitas GamEdu yang sesuai.
                </p>
                <button
                  onClick={onOpenPayment}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-100 hover:scale-105 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  Buka dengan Premium
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.kemampuan.map((item) => (
              <div key={item.id} className="p-6 sm:p-8">
                <KemampuanCard
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                />
              </div>
            ))}
            <div className="p-6 sm:p-8 bg-amber-50/50">
              <p className="text-sm text-slate-600 leading-relaxed">{data.penutup}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function KemampuanCard({
  item,
  isOpen,
  onToggle
}: {
  item: (typeof MATERI_KOGNITIF_3_TAHUN)["kemampuan"][number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="space-y-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
      >
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.judul}</h3>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <p className="text-slate-500 text-sm leading-relaxed">{item.deskripsi}</p>

      {isOpen && (
        <div className="grid sm:grid-cols-2 gap-4 pt-2 animate-fade-in">
          <InfoBlock icon={<Target className="w-4 h-4" />} color="blue" title="Kenapa Penting?" list={item.kenapaPenting} />
          <InfoBlock icon={<Eye className="w-4 h-4" />} color="emerald" title="Tanda Anak Mulai Berkembang" list={item.tandaBerkembang} />
          <InfoBlock icon={<HomeIcon className="w-4 h-4" />} color="amber" title="Yuk Stimulasi di Rumah" list={item.stimulasiRumah} />
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-600">
              <Gamepad2 className="w-4 h-4" /> Aktivitas di GamEdu
            </div>
            <p className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-indigo-400" /> {item.aktivitasGame}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5">
              <FileText className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-indigo-400" /> {item.aktivitasWorksheet}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoBlock({
  icon,
  color,
  title,
  list
}: {
  icon: React.ReactNode;
  color: "blue" | "emerald" | "amber";
  title: string;
  list: string[];
}) {
  const colorMap = {
    blue: "border-blue-100 bg-blue-50/40 text-blue-600",
    emerald: "border-emerald-100 bg-emerald-50/40 text-emerald-600",
    amber: "border-amber-100 bg-amber-50/40 text-amber-600"
  } as const;

  return (
    <div className={`rounded-2xl border p-4 space-y-2 ${colorMap[color]}`}>
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
        {icon} {title}
      </div>
      <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
        {list.map((line, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-slate-300">•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
