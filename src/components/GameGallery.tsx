import React from "react";
import { Game } from "../types";
import { ArrowLeft, ShieldCheck, Crown, Play, FileText, LayoutGrid, BookOpen, Lock } from "lucide-react";
import { MATERI_KOGNITIF_3_TAHUN } from "../lib/materiKognitif3Tahun";
import { MATERI_KOGNITIF_4_TAHUN } from "../lib/materiKognitif4Tahun";
import { MATERI_KOGNITIF_5_TAHUN } from "../lib/materiKognitif5Tahun";
import { WORKSHEETS } from "../lib/worksheets";

import hubMateriCover from "../assets/images/CoverEdukasiOrangtua.jpeg";
import hubGameCover from "../assets/images/CoverKataloggame.jpeg";
import hubWorksheetCover from "../assets/images/CoverKatalogworksheet.jpeg";

interface GameGalleryProps {
  age: number;
  games: Game[];
  onPlayGame: (gameId: string) => void;
  onBack: () => void;
  isPremiumUser: boolean;
  onOpenPayment: () => void;
  onGoToGameCatalog: () => void;
  onGoToWorksheets: () => void;
  onGoToMateri: () => void;
}

// 1 game gratis per kategori usia yang bisa langsung dicoba dari kartu "Game"
// di halaman ini, tanpa perlu daftar/login dulu.
const TRIAL_GAME_BY_AGE: Record<number, string> = {
  3: "berburu_angka",
  4: "mencocokkan_nama_alat_indera",
  5: "fungsi_alat_indera"
};

const MATERI_BY_AGE: Record<number, typeof MATERI_KOGNITIF_3_TAHUN> = {
  3: MATERI_KOGNITIF_3_TAHUN,
  4: MATERI_KOGNITIF_4_TAHUN,
  5: MATERI_KOGNITIF_5_TAHUN
};

export default function GameGallery({
  age,
  games,
  onPlayGame,
  onBack,
  isPremiumUser,
  onOpenPayment,
  onGoToGameCatalog,
  onGoToWorksheets,
  onGoToMateri
}: GameGalleryProps) {
  const gamesForAge = games.filter((g) => g.ageRange.includes(String(age)));
  const worksheetsForAge = WORKSHEETS.filter((w) => w.ageRange.includes(String(age)));
  const materi = MATERI_BY_AGE[age];
  const trialGameId = TRIAL_GAME_BY_AGE[age];

  return (
    <section className="py-8 sm:py-12 px-6 bg-cream scroll-mt-20" id="gallery-container">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-navy/10">
          <div className="space-y-1">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-2 text-xs font-bold text-navy/50 hover:text-gamedu-blue transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Kembali ke Kategori
            </button>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy tracking-tight">
              Kategori: <span className="text-gamedu-blue">Usia {age} Tahun</span>
            </h2>
            <p className="text-navy/50 text-sm">
              Jelajahi materi edukasi, game interaktif, dan worksheet cetak yang dikurasi khusus untuk usia {age} tahun.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-mint/15 border border-mint/40 rounded-xl px-4 py-2 text-[11px] font-bold text-navy self-start sm:self-center">
            <ShieldCheck className="w-3.5 h-3.5" /> Data Game Aman & Terenkripsi Server
          </div>
        </div>

        {/* 3 KARTU NAVIGASI: Game, Worksheet, Materi */}
        {/* sm:grid-cols-2 dulu (bukan langsung md:grid-cols-3) supaya di lebar
            tablet (768-1024px) kartu masih cukup lega buat 2 badge pojok atas
            tanpa jadi mepet/potensi tabrakan. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 lg:gap-x-12 lg:gap-y-14">
          {/* Kartu Game — playful & colorful */}
          <div className="bg-white rounded-[28px] overflow-hidden border-2 border-coral/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group transform-gpu">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-coral/10">
              <img
                src={hubGameCover}
                alt="Katalog Game"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-white px-2.5 sm:px-3 py-1.5 rounded-full text-coral shadow-sm whitespace-nowrap">
                  <LayoutGrid className="w-3 h-3 flex-shrink-0" /> Game
                </span>
                <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-emerald-500/90 text-white px-2.5 sm:px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap flex-shrink-0">
                  Trial Gratis
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-navy leading-tight">Katalog Game</h3>
                <p className="text-navy/50 text-xs sm:text-sm leading-relaxed">
                  {gamesForAge.length} game edukasi interaktif untuk usia {age} tahun, lengkap dengan suara & animasi ceria.
                  1 game bisa dicoba gratis penuh tanpa perlu daftar dulu.
                </p>
              </div>
              <div className="space-y-2">
                {trialGameId && (
                  <button
                    onClick={() => onPlayGame(trialGameId)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-bold text-xs sm:text-sm bg-coral hover:bg-coral/90 text-white shadow-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Main Trial Gratis
                  </button>
                )}
                <button
                  onClick={onGoToGameCatalog}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    trialGameId
                      ? "bg-cream hover:bg-navy/10 text-navy"
                      : "bg-coral hover:bg-coral/90 text-white shadow-sm hover:scale-105"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Buka Halaman Game
                </button>
              </div>
            </div>
          </div>


          {/* Kartu Worksheet — clean & educational */}
          <div className="bg-white rounded-2xl overflow-hidden border border-navy/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group transform-gpu">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-mint/10">
              <img
                src={hubWorksheetCover}
                alt="Worksheet Cetak"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-white px-2.5 sm:px-3 py-1.5 rounded-full text-emerald-700 shadow-sm whitespace-nowrap">
                  <BookOpen className="w-3 h-3 flex-shrink-0" /> Worksheet
                </span>
                {!isPremiumUser && (
                  <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-sunny text-navy px-2.5 sm:px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap flex-shrink-0">
                    <Lock className="w-3 h-3 flex-shrink-0" /> VIP
                  </span>
                )}
              </div>
            </div>
            <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-navy leading-tight">Worksheet Cetak</h3>
                <p className="text-navy/50 text-xs sm:text-sm leading-relaxed">
                  {worksheetsForAge.length > 0
                    ? `${worksheetsForAge.length} lembar kerja siap cetak untuk melatih motorik halus & konsentrasi. Tinggal unduh, cetak di rumah, dan kerjakan bersama anak.`
                    : "Coming Soon: worksheet cetak untuk kategori usia ini sedang disiapkan tim kurikulum kami."}
                </p>
              </div>
              <button
                onClick={onGoToWorksheets}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:scale-105 transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Buka Halaman Worksheet
              </button>
            </div>
          </div>
          {/* Kartu Materi — editorial & trustworthy */}
          <div className="bg-white rounded-2xl overflow-hidden border border-navy/15 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group transform-gpu">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-lavender/10">
              <img
                src={hubMateriCover}
                alt="Materi Edukasi Orang Tua"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-white px-2.5 sm:px-3 py-1.5 rounded-full text-[#6B5CA5] shadow-sm whitespace-nowrap">
                  <FileText className="w-3 h-3 flex-shrink-0" /> Untuk Orang Tua
                </span>
                {!isPremiumUser && (
                  <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-sunny text-navy px-2.5 sm:px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap flex-shrink-0">
                    <Lock className="w-3 h-3 flex-shrink-0" /> VIP
                  </span>
                )}
              </div>
            </div>
            <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-navy leading-tight">Materi Edukasi Orang Tua</h3>
                <p className="text-navy/50 text-xs sm:text-sm leading-relaxed">
                  {materi
                    ? `Panduan lengkap ${materi.kemampuan.length} kemampuan kognitif penting untuk anak usia ${age} tahun. Pahami tanda perkembangan anak, ide stimulasi sederhana di rumah, dan aktivitas GamEdu yang paling sesuai.`
                    : "Coming Soon: materi edukasi orang tua untuk kategori usia ini sedang disiapkan tim kurikulum kami."}
                </p>
              </div>
              <button
                onClick={onGoToMateri}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-navy hover:bg-navy/90 text-white shadow-sm hover:scale-105 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                Buka Halaman Materi
              </button>
            </div>
          </div>

        </div>

        {!isPremiumUser && (
          <div className="flex items-center justify-between gap-3 bg-sunny/15 border border-sunny/50 rounded-2xl px-6 py-5 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sunny/40 flex items-center justify-center text-navy flex-shrink-0">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-navy">Buka Semua Materi, Game & Worksheet</p>
                <p className="text-[11px] text-navy/50">Akses penuh ke seluruh kategori usia dengan satu langganan VIP.</p>
              </div>
            </div>
            <button
              onClick={onOpenPayment}
              className="flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              <Crown className="w-4 h-4" />
              Aktivasi VIP
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
