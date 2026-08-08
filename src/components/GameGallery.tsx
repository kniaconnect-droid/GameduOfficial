import React from "react";
import { Game } from "../types";
import { Lock, Play, ArrowLeft, ArrowRight, BookOpen, LayoutGrid, ShieldCheck, Baby, Sparkles } from "lucide-react";
import MateriKognitif from "./MateriKognitif";

interface GameGalleryProps {
  age: number;
  games: Game[];
  onPlayGame: (gameId: string) => void;
  onBack: () => void;
  isPremiumUser: boolean;
  onOpenPayment: () => void;
  onGoToGameCatalog: () => void;
  onGoToWorksheets: () => void;
}

// Halaman ini SENGAJA cuma nampilin 2 game (1 trial gratis + 1 preview
// terkunci) per kategori usia -- bukan semua game. Katalog lengkap semua game
// premium ada di halaman terpisah "Katalog Game" (lihat GameCatalog.tsx),
// yang seluruhnya cuma bisa diakses member Premium.
const SHOWCASE_GAMES_BY_AGE: Record<number, { trial: string; preview: string }> = {
  3: { trial: "berburu_angka", preview: "berhitung_ceria" },
  4: { trial: "susun_huruf_8_anggota_tubuh", preview: "mencocokkan_nama_alat_indera" }
};

export default function GameGallery({
  age,
  games,
  onPlayGame,
  onBack,
  isPremiumUser,
  onOpenPayment,
  onGoToGameCatalog,
  onGoToWorksheets
}: GameGalleryProps) {
  const showcaseIds = SHOWCASE_GAMES_BY_AGE[age];
  const trialGame = showcaseIds ? games.find((g) => g.id === showcaseIds.trial) : undefined;
  const previewGame = showcaseIds ? games.find((g) => g.id === showcaseIds.preview) : undefined;
  const showcaseGames = [trialGame, previewGame].filter(Boolean) as Game[];
  const isTrialGame = (gameId: string) => showcaseIds?.trial === gameId;

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white to-blue-50/10 scroll-mt-20" id="gallery-container">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Gallery Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/60">
          <div className="space-y-1">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Kembali ke Kategori
            </button>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Coba Gratis: <span className="text-blue-600">Usia {age} Tahun</span>
            </h2>
            <p className="text-slate-500 text-sm">
              1 game bisa dimainkan gratis penuh, plus 1 preview game premium untuk usia {age} tahun.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50/50 border border-blue-100/50 rounded-xl px-4 py-2 text-[11px] font-bold text-blue-800 self-start sm:self-center">
            <ShieldCheck className="w-3.5 h-3.5" /> Data Game Aman & Terenkripsi Server
          </div>
        </div>

        {/* Materi Kognitif (premium-gated) - ditampilkan paling atas, sebelum katalog game & worksheet */}
        {(age === 3 || age === 4) && (
          <MateriKognitif age={age} isPremiumUser={isPremiumUser} onOpenPayment={onOpenPayment} />
        )}

        {/* Trial + Preview Cards */}
        {showcaseGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            {showcaseGames.map((game) => {
              const isTrial = isTrialGame(game.id);
              const isLocked = !isTrial && !isPremiumUser;

              return (
                <div
                  key={game.id}
                  className="bg-white rounded-[32px] overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group transform-gpu"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                    <img
                      src={game.coverImage}
                      alt={game.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isLocked ? "blur-[1px]" : "sm:group-hover:scale-105"
                      }`}
                    />
                    <span className="absolute top-4 left-4 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-slate-800 shadow-sm">
                      <Baby className="w-3 h-3" /> Usia {game.ageRange}
                    </span>
                    <span
                      className={`absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 ${
                        isTrial ? "bg-emerald-500/90 text-white" : "bg-orange-500/90 text-white"
                      }`}
                    >
                      {isTrial ? "Trial Gratis" : (
                        <>
                          <Lock className="w-3 h-3" /> Preview Premium
                        </>
                      )}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">{game.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{game.description}</p>
                    </div>

                    <button
                      onClick={() => onPlayGame(game.id)}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                        isLocked
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          : "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-100 hover:scale-105"
                      }`}
                    >
                      {isLocked ? (
                        <>
                          <Lock className="w-4 h-4 text-slate-500" />
                          Buka Game Premium
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          Main Sekarang
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-amber-50/50 border border-amber-100/60 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
            <Sparkles className="w-10 h-10 mx-auto text-amber-500" />
            <h3 className="text-lg font-bold text-slate-800">Kurikulum Sedang Dipersiapkan</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tim kurator kurikulum kami sedang menyiapkan game trial untuk kategori usia ini.
            </p>
          </div>
        )}

        {/* CTA to full catalogs */}
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={onGoToGameCatalog}
            className="flex items-center justify-between gap-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-6 py-5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Lihat Katalog Game Lengkap</p>
                <p className="text-[11px] text-slate-400">Semua game premium, khusus member Premium</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </button>

          <button
            onClick={onGoToWorksheets}
            className="flex items-center justify-between gap-3 bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-900 rounded-2xl px-6 py-5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">Katalog Worksheet Download</p>
                <p className="text-[11px] text-blue-700/70">Lembar kerja siap cetak, khusus member Premium</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}
