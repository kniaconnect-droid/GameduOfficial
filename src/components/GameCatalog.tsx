import React from "react";
import { Game } from "../types";
import { Play, Crown, Baby, ArrowLeft } from "lucide-react";

interface GameCatalogProps {
  games: Game[];
  age: number;
  onPlayGame: (gameId: string) => void;
  isPremiumUser: boolean;
  onOpenPayment: () => void;
  onBack: () => void;
  onGoToWorksheets: () => void;
}

export default function GameCatalog({ games, age, onPlayGame, isPremiumUser, onOpenPayment, onBack, onGoToWorksheets }: GameCatalogProps) {
  // Cuma tampilin game yang sesuai kategori usia yang lagi dipilih user --
  // sebelumnya katalog ini nampilin SEMUA game dari semua usia tercampur,
  // padahal user masuk ke sini dari alur "pilih usia" jadi harusnya cuma
  // lihat game yang relevan buat anaknya.
  // Member gratis cuma bisa lihat game yang memang gratis -- game premium
  // di-filter habis dari daftar (bukan cuma diblur/dikunci) supaya member
  // gratis benar-benar terpisah dan gak tahu game premium apa saja yang ada.
  const games_ = games.filter(
    (g) => g.ageRange.includes(String(age)) && (isPremiumUser || !g.premium)
  );
  const totalGamesForAge = games.filter((g) => g.ageRange.includes(String(age))).length;
  const hiddenPremiumCount = totalGamesForAge - games_.length;

  return (
    <section className="py-8 sm:py-12 px-6 bg-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-navy/10">
          <div className="space-y-1">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-2 text-xs font-bold text-navy/50 hover:text-gamedu-blue transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Kembali ke Materi
            </button>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy tracking-tight">
              Katalog <span className="text-coral">Game Usia {age} Tahun</span>
            </h2>
            <p className="text-navy/50 text-sm">
              {isPremiumUser
                ? `Semua ${games_.length} game edukasi GamEdu untuk usia ${age} tahun, terkurasi sesuai kebutuhan kognitifnya.`
                : `${games_.length} game gratis untuk usia ${age} tahun. Upgrade ke VIP untuk buka ${hiddenPremiumCount} game premium lainnya.`}
            </p>
          </div>

          {isPremiumUser ? (
            <div className="flex items-center gap-1.5 bg-sunny/20 border border-sunny/60 text-navy px-3.5 py-2 rounded-full text-xs font-bold self-start sm:self-center">
              <Crown className="w-3.5 h-3.5" /> Akses Penuh Aktif
            </div>
          ) : (
            <button
              onClick={onOpenPayment}
              className="flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm hover:scale-105 transition-all cursor-pointer self-start sm:self-center"
            >
              <Crown className="w-4 h-4" />
              Buka Semua Game dengan VIP
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-14 lg:gap-x-10 lg:gap-y-16 place-items-center">
          {games_.map((game) => {
            return (
              <div
                key={game.id}
                className="bg-white rounded-[24px] overflow-hidden border-2 border-navy/5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group transform-gpu w-full max-w-[280px] sm:max-w-[300px] mx-auto"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
                  <img
                    src={game.coverImage}
                    alt={game.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 sm:group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-navy shadow-sm">
                    <Baby className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {game.ageRange}
                  </span>
                  {game.premium ? (
                    <span className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-sunny text-navy px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
                      <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> VIP
                    </span>
                  ) : (
                    <span className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-emerald-500/90 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
                      Gratis
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-navy leading-tight line-clamp-2">{game.name}</h3>
                    <p className="text-navy/50 text-xs sm:text-sm leading-relaxed line-clamp-2">{game.description}</p>
                  </div>

                  <button
                    onClick={() => onPlayGame(game.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-sm hover:scale-105 transition-all cursor-pointer bg-coral hover:bg-coral/90 text-white"
                  >
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    Main
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!isPremiumUser && (
          <div className="bg-white border-2 border-navy/5 rounded-[28px] p-6 sm:p-8 text-center space-y-4">
            <p className="text-navy/60 text-sm">
              Member gratis bisa main {games_.length} game pilihan di kategori usia ini. Upgrade ke VIP untuk buka
              {hiddenPremiumCount > 0 ? ` ${hiddenPremiumCount} game premium lainnya` : " semua game premium"} tanpa batas.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-lg mx-auto">
              <button
                onClick={onGoToWorksheets}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-sm border-2 border-mint/60 text-navy hover:bg-mint/10 transition-colors cursor-pointer"
              >
                Lihat Worksheet Gratis Juga
              </button>
              <button
                onClick={onOpenPayment}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-sm bg-coral hover:bg-coral/90 text-white shadow-sm hover:scale-105 transition-all cursor-pointer"
              >
                <Crown className="w-4 h-4" />
                Join VIP Member
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

