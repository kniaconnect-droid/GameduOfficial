import React from "react";
import { Game } from "../types";
import { Lock, Play, Crown, Baby, ArrowLeft, Gamepad2, BookOpen } from "lucide-react";

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
  const games_ = games.filter((g) => g.ageRange.includes(String(age)));

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
              Semua {games_.length} game edukasi GamEdu untuk usia {age} tahun, terkurasi sesuai kebutuhan kognitifnya.
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

        {!isPremiumUser ? (
          <FreeAccessGate
            kind="game"
            onOpenPayment={onOpenPayment}
            onGoToWorksheets={onGoToWorksheets}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-14 lg:gap-x-10 lg:gap-y-16 place-items-center">
            {games_.map((game) => (
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Ditampilin ke member gratis di halaman katalog (Game atau Worksheet) --
// TIDAK menampilkan daftar konten sama sekali, cuma 2 pintasan ("pengen
// lebih banyak game/worksheet?") + 1 tombol utama buat gabung VIP.
export function FreeAccessGate({
  kind,
  onOpenPayment,
  onGoToWorksheets,
  onGoToGames
}: {
  kind: "game" | "worksheet";
  onOpenPayment: () => void;
  onGoToWorksheets?: () => void;
  onGoToGames?: () => void;
}) {
  return (
    <div className="bg-white border-2 border-navy/5 rounded-[32px] p-8 sm:p-12 text-center space-y-8">
      <div className="w-16 h-16 rounded-2xl bg-sunny/20 border border-sunny/60 flex items-center justify-center mx-auto text-navy">
        <Crown className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-navy">
          {kind === "game" ? "Pengen Game yang Lebih Banyak?" : "Pengen Worksheet yang Lebih Banyak?"}
        </h3>
        <p className="text-navy/50 text-sm leading-relaxed">
          Member VIP GamEdu bisa akses semua game dan worksheet di setiap kategori usia, tanpa batas.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-lg mx-auto">
        {kind === "game" && onGoToWorksheets && (
          <button
            onClick={onGoToWorksheets}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-sm border-2 border-mint/60 text-navy hover:bg-mint/10 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            Pengen Worksheet Lebih Banyak?
          </button>
        )}
        {kind === "worksheet" && onGoToGames && (
          <button
            onClick={onGoToGames}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-sm border-2 border-mint/60 text-navy hover:bg-mint/10 transition-colors cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            Pengen Game Lebih Banyak?
          </button>
        )}
        <button
          onClick={onOpenPayment}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-sm bg-coral hover:bg-coral/90 text-white shadow-sm hover:scale-105 transition-all cursor-pointer"
        >
          <Crown className="w-4 h-4" />
          Join VIP Member
        </button>
      </div>
    </div>
  );
}
