import React from "react";
import { Game } from "../types";
import { Lock, Play, Sparkles, Baby } from "lucide-react";

interface GameCatalogProps {
  games: Game[];
  onPlayGame: (gameId: string) => void;
  isPremiumUser: boolean;
  onOpenPayment: () => void;
}

export default function GameCatalog({ games, onPlayGame, isPremiumUser, onOpenPayment }: GameCatalogProps) {
  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white to-blue-50/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/60">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Katalog <span className="text-blue-600">Game Lengkap</span>
            </h2>
            <p className="text-slate-500 text-sm">
              Semua {games.length} game edukasi GamEdu, terkurasi berdasarkan kebutuhan kognitif tiap usia.
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
              Buka Semua Game dengan Premium
            </button>
          )}
        </div>

        <div className="relative">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
              !isPremiumUser ? "pointer-events-none select-none" : ""
            }`}
          >
            {games.map((game) => (
              <div
                key={game.id}
                className={`bg-white rounded-[32px] overflow-hidden border border-slate-200/60 shadow-sm transition-all duration-300 flex flex-col justify-between group ${
                  !isPremiumUser ? "blur-[2px] opacity-80" : "hover:shadow-lg"
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                  <img
                    src={game.coverImage}
                    alt={game.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-slate-800 shadow-sm">
                    <Baby className="w-3 h-3" /> Usia {game.ageRange}
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{game.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{game.description}</p>
                  </div>

                  <button
                    onClick={() => onPlayGame(game.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-100 hover:scale-105 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Main Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Paywall overlay for non-premium users. Pakai `sticky` (bukan absolute
              inset-0 + pt-16 statis) supaya kartu ini ikut "nempel" mengikuti
              scroll selama area katalog di-scroll, alih-alih diam di titik
              tetap lalu ditinggal saat list game panjang di-scroll ke bawah
              (paling kerasa di kategori usia 3 tahun yang jumlah game-nya
              paling banyak). */}
          {!isPremiumUser && (
            <div className="absolute inset-0 flex justify-center pointer-events-none">
              <div className="sticky top-24 self-start bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 max-w-md w-full text-center space-y-4 mx-4 pointer-events-auto">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto text-amber-500">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Katalog Game Khusus Member Premium</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Semua {games.length} game di katalog ini eksklusif untuk member Premium. Coba dulu 1 game gratis di
                  halaman "Coba Gratis", atau langsung upgrade untuk akses penuh.
                </p>
                <button
                  onClick={onOpenPayment}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-100 hover:scale-105 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  Aktivasi Premium Sekarang
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
