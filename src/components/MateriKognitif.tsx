import React, { useState } from "react";
import { Lock, Crown, ChevronDown, Target, Eye, Home as HomeIcon, Gamepad2, FileText, Clock } from "lucide-react";
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
  const hasData = age in MATERI_BY_AGE;
  const data = MATERI_BY_AGE[age] ?? MATERI_KOGNITIF_3_TAHUN;
  const [openId, setOpenId] = useState<string | null>(data.kemampuan[0].id);

  // Kalau pindah kategori usia, buka kartu pertama dari data yang baru lagi.
  React.useEffect(() => {
    setOpenId(data.kemampuan[0]?.id ?? null);
  }, [age]);

  if (!hasData) {
    return (
      <section className="py-4">
        <div className="bg-white rounded-[32px] border border-navy/10 shadow-sm overflow-hidden">
          <div className="bg-lavender/10 p-6 sm:p-8 border-b border-navy/10">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#6B5CA5] mb-2">
              <FileText className="w-3.5 h-3.5" />
              Materi Edukasi Orang Tua
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy tracking-tight">Usia {age}-{age + 1} Tahun</h2>
          </div>
          <div className="p-12 text-center space-y-4 max-w-xl mx-auto">
            <Clock className="w-10 h-10 mx-auto text-navy/30" />
            <h3 className="text-lg font-bold text-navy">Coming Soon</h3>
            <p className="text-navy/50 text-sm leading-relaxed">
              Materi edukasi orang tua untuk kategori ini sedang disiapkan tim kurikulum kami. Nantikan update
              selanjutnya, ya!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <div className="bg-white rounded-[32px] border border-navy/10 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-lavender/10 p-6 sm:p-8 border-b border-navy/10">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#6B5CA5] mb-2">
            <FileText className="w-3.5 h-3.5" />
            Materi Edukasi Orang Tua
            <span className="ml-2 flex items-center gap-1 bg-sunny/30 text-navy px-2 py-0.5 rounded-full">
              <Crown className="w-3 h-3" /> VIP
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-navy tracking-tight">{data.title}</h2>
          <p className="text-navy/50 text-sm mt-1">{data.subtitle}</p>
          <p className="text-navy/70 text-sm leading-relaxed mt-4 max-w-3xl">{data.intro}</p>
        </div>

        {/* Locked state for non-premium users */}
        {!isPremiumUser ? (
          <div className="relative">
            {/* Blurred teaser of first item — clipped short so it doesn't push the CTA far down */}
            <div className="relative max-h-[130px] sm:max-h-[160px] overflow-hidden">
              <div className="p-6 sm:p-8 blur-sm select-none pointer-events-none opacity-70">
                <KemampuanCard item={data.kemampuan[0]} isOpen={false} onToggle={() => {}} />
              </div>
              {/* Fade the clipped teaser into the CTA below */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
            <div className="px-6 pb-6 sm:px-8 sm:pb-8 -mt-2">
              <div className="bg-white border border-navy/10 shadow-lg rounded-3xl p-6 sm:p-8 max-w-md w-full mx-auto text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-sunny/20 border border-sunny/60 flex items-center justify-center mx-auto text-navy">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-navy">Materi Lengkap untuk Member VIP</h3>
                <p className="text-navy/50 text-sm leading-relaxed">
                  Buka {data.kemampuan.length} panduan lengkap perkembangan kognitif usia {age} tahun, lengkap dengan ide
                  stimulasi di rumah dan aktivitas GamEdu yang sesuai.
                </p>
                <button
                  onClick={onOpenPayment}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full font-bold text-sm bg-coral hover:bg-coral/90 text-white shadow-sm hover:scale-105 transition-all cursor-pointer"
                >
                  <Crown className="w-4 h-4" />
                  Buka dengan VIP
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-navy/5">
            {data.kemampuan.map((item) => (
              <div key={item.id} className="p-6 sm:p-8">
                <KemampuanCard
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                />
              </div>
            ))}
            <div className="p-6 sm:p-8 bg-lavender/10">
              <p className="text-sm text-navy/70 leading-relaxed">{data.penutup}</p>
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
        <h3 className="text-lg font-bold text-navy group-hover:text-gamedu-blue transition-colors">{item.judul}</h3>
        <ChevronDown
          className={`w-5 h-5 text-navy/30 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <p className="text-navy/50 text-sm leading-relaxed">{item.deskripsi}</p>

      {isOpen && (
        <div className="grid sm:grid-cols-2 gap-4 pt-2 animate-fade-in">
          <InfoBlock icon={<Target className="w-4 h-4" />} color="blue" title="Kenapa Penting?" list={item.kenapaPenting} />
          <InfoBlock icon={<Eye className="w-4 h-4" />} color="emerald" title="Tanda Anak Mulai Berkembang" list={item.tandaBerkembang} />
          <InfoBlock icon={<HomeIcon className="w-4 h-4" />} color="amber" title="Yuk Stimulasi di Rumah" list={item.stimulasiRumah} />
          <div className="rounded-2xl border border-lavender/40 bg-lavender/10 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#6B5CA5]">
              <Gamepad2 className="w-4 h-4" /> Aktivitas di GamEdu
            </div>
            <p className="text-xs text-navy/60 leading-relaxed flex items-start gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#6B5CA5]" /> {item.aktivitasGame}
            </p>
            <p className="text-xs text-navy/60 leading-relaxed flex items-start gap-1.5">
              <FileText className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#6B5CA5]" /> {item.aktivitasWorksheet}
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
    blue: "border-gamedu-blue/20 bg-gamedu-blue/5 text-gamedu-blue",
    emerald: "border-emerald-100 bg-emerald-50/40 text-emerald-600",
    amber: "border-sunny/40 bg-sunny/10 text-navy"
  } as const;

  return (
    <div className={`rounded-2xl border p-4 space-y-2 ${colorMap[color]}`}>
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
        {icon} {title}
      </div>
      <ul className="text-xs text-navy/60 space-y-1.5 leading-relaxed">
        {list.map((line, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-navy/25">•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
