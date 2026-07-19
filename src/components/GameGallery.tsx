import React from "react";
import { Game } from "../types";
import { Lock, Play, ArrowLeft, CheckCircle } from "lucide-react";

interface GameGalleryProps {
  age: number;
  games: Game[];
  onPlayGame: (gameId: string) => void;
  onBack: () => void;
  isPremiumUser: boolean;
}

export default function GameGallery({ age, games, onPlayGame, onBack, isPremiumUser }: GameGalleryProps) {
  const filteredGames = games.filter((g) => g.ageRange.includes(String(age)));

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white to-blue-50/10 scroll-mt-20" id="gallery-container">
      <div className="max-w-7xl mx-auto space-y-8">
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
              Galeri Permainan Edukasi: <span className="text-blue-600">Usia {age} Tahun</span>
            </h2>
            <p className="text-slate-500 text-sm">
              Menampilkan {filteredGames.length} game interaktif yang direkomendasikan untuk tumbuh kembang usia {age} tahun.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50/50 border border-blue-100/50 rounded-xl px-4 py-2 text-[11px] font-bold text-blue-800 self-start sm:self-center">
            <span>🛡️</span> Data Game Aman & Terenkripsi Server
          </div>
        </div>

        {/* Gallery Cards Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => {
              const isLocked = game.premium && !isPremiumUser;

              return (
                <div
                  key={game.id}
                  className="bg-white rounded-[32px] overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Card Cover */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                    <img
                      src={game.coverImage}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Floating Age Tag */}
                    <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-slate-800 shadow-sm">
                      👶 Usia {game.ageRange}
                    </span>

                    {/* Premium / Free Lock status */}
                    {game.premium && (
                      <span className={`absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 ${
                        isPremiumUser
                          ? "bg-emerald-500/90 text-white"
                          : "bg-orange-500/90 text-white"
                      }`}>
                        {isPremiumUser ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Premium Aktif
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" />
                            Premium Gated
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Content details */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">
                        {game.name}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                        {game.description}
                      </p>
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
            <span className="text-4xl">🚀</span>
            <h3 className="text-lg font-bold text-slate-800">Kurikulum Sedang Dipersiapkan</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tim kurator kurikulum kami sedang melakukan uji-atensi klinis bersama pakar anak untuk merilis game-game baru kategori usia ini. Silakan coba game Usia 3 Tahun yang sudah aktif sepenuhnya!
            </p>
            <button
              onClick={onBack}
              className="px-6 py-2.5 bg-white border border-amber-200 text-amber-800 font-bold rounded-xl text-xs hover:bg-amber-50/50 transition-colors cursor-pointer"
            >
              Lihat Game Aktif Usia 3 Tahun
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
