import React from "react";
import { Game } from "../types";
import { Lock, Play, Sparkles, Baby, ArrowLeft } from "lucide-react";

interface GameCatalogProps {
  games: Game[];
  age: number;
  onPlayGame: (gameId: string) => void;
  isPremiumUser: boolean;
  onOpenPayment: () => void;
  onBack: () => void;
}

export default function GameCatalog({ games, age, onPlayGame, isPremiumUser, onOpenPayment, onBack }: GameCatalogProps) {
  // Cuma tampilin game yang sesuai kategori usia yang lagi dipilih user --
  // sebelumnya katalog ini nampilin SEMUA game dari semua usia tercampur,
  // padahal user masuk ke sini dari alur "pilih usia" jadi harusnya cuma
  // lihat game yang relevan buat anaknya.
  const games_ = games.filter((g) => g.ageRange.includes(String(age)));

  return (
    <section className="py-8 sm:py-12 px-6 bg-gradient-to-b from-white to-blue-50/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/60">
          <div className="space-y-1">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Kembali ke Materi
            </button>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Katalog <span className="text-blue-600">Game Usia {age} Tahun</span>
            </h2>
            <p className="text-slate-500 text-sm">
              Semua {games_.length} game edukasi GamEdu untuk usia {age} tahun, terkurasi sesuai kebutuhan kognitifnya.
            </p>
          </div>

          {isPremiumUser ? (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3.5 py-2 rounded-xl text-xs font-bold self-start sm:self-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Akses Penuh Aktif
            </div>
          ) : (
            <button
              onClick={onOpenPayment}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-orange-100 hover:scale-105 transition-all cursor-pointer self-start sm:self-center"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              Buka Semua Game dengan VIP
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-14 lg:gap-x-10 lg:gap-y-16 place-items-center">
          {games_.map((game) => {
            // Cuma game dengan flag premium yang dikunci kalau user belum
            // upgrade -- 2 game pertama tiap kategori usia sengaja ditandai
            // premium: false di data (App.tsx & api/_lib/gamesCatalog.ts)
            // supaya bisa dicoba gratis sebelum upgrade.
            const isLocked = game.premium && !isPremiumUser;

            return (
              <div
                key={game.id}
                className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-300 flex flex-col justify-between group transform-gpu w-full max-w-[280px] sm:max-w-[300px] mx-auto ${
                  isLocked ? "opacity-90" : "hover:shadow-lg"
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                  <img
                    src={game.coverImage}
                    alt={game.name}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isLocked ? "blur-[2px] scale-105" : "sm:group-hover:scale-105"
                    }`}
                  />
                  {isLocked && (
                    <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                      <span className="bg-white/95 backdrop-blur-sm w-11 h-11 rounded-full flex items-center justify-center text-amber-500 shadow-md">
                        <Lock className="w-5 h-5" />
                      </span>
                    </div>
                  )}
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-slate-800 shadow-sm">
                    <Baby className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {game.ageRange}
                  </span>
                  {!isLocked && !isPremiumUser && (
                    <span className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-emerald-500 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-white shadow-sm">
                      Gratis
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight line-clamp-2">{game.name}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2">{game.description}</p>
                  </div>

                  <button
                    onClick={() => (isLocked ? onOpenPayment() : onPlayGame(game.id))}
                    className={`w-full flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all cursor-pointer ${
                      isLocked
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-none"
                        : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-100"
                    }`}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Buka VIP
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                        Main
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
