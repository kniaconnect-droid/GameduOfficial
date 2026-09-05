import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import AgeCategory from "./components/AgeCategory";
import GameGallery from "./components/GameGallery";
import GameCatalog from "./components/GameCatalog";
import WorksheetCatalog from "./components/WorksheetCatalog";
import MateriKognitif from "./components/MateriKognitif";
import { ArrowLeft } from "lucide-react";
import Footer from "./components/Footer";
import SecureGamePlayer from "./components/SecureGamePlayer";
import PaymentModal from "./components/PaymentModal";
import AuthModal from "./components/AuthModal";
import PremiumStatusBanner from "./components/PremiumStatusBanner";

import { UserProfile, CustomNote, Game } from "./types";
import { useAuth } from "./lib/useAuth";

// Import generated imagery
import berburuAngkaCover from "./assets/images/game_berburu_angka_cover_1783908422344.jpg";
import susunKataCover from "./assets/images/game_susun_kata_cover_1783908434702.jpg";
import berhitungCeriaCover from "./assets/images/game_berhitung_ceria_cover.jpg";
import susunHurufTubuhCover from "./assets/images/game_susun_huruf_anggota_tubuh_cover.jpg";
import akuIstimewa2Cover from "./assets/images/game_aku_istimewa_2_gambar_cover.jpg";
import akuIstimewa3Cover from "./assets/images/game_aku_istimewa_3_gambar_cover.jpg";
import akuIstimewa4Cover from "./assets/images/game_aku_istimewa_4_gambar_cover.jpg";
import anakMenunjukApaCover from "./assets/images/game_anak_menunjuk_apa_cover.jpg";
import susunHuruf8TubuhCover from "./assets/images/game_susun_huruf_8_anggota_tubuh_cover.jpg";
import mencocokkanAlatInderaCover from "./assets/images/game_mencocokkan_nama_alat_indera_cover.jpg";
import fungsiAlatInderaCover from "./assets/images/game_fungsi_alat_indera_cover.jpg";
import akuIstimewaAdvanceCover from "./assets/images/game_aku_istimewa_advance_cover.jpg";
import berburuAngka1_10Cover from "./assets/images/game_berburu_angka_1_10_cover.jpg";
import berburuAngka6_10Cover from "./assets/images/game_berburu_angka_6_10_cover.jpg";
import sentuh3WarnaCover from "./assets/images/game_sentuh_3warna_benda_2gambar_cover.jpg";
import mengenal3WarnaCover from "./assets/images/game_mengenal_3warna_merah_kuning_biru_2gambar_cover.jpg";
import mengenal4WarnaCover from "./assets/images/game_mengenal_4warna_merah_kuning_biru_hijau_3gambar_cover.jpg";
import tunjukAngka1_5_3GambarCover from "./assets/images/game_tunjuk_angka_1_5_3gambar_cover.jpg";
import tunjukAngka1_5_4GambarCover from "./assets/images/game_tunjuk_angka_1_5_4gambar_cover.jpg";
import sentuh3Warna3GambarCover from "./assets/images/game_sentuh_3warna_benda_3gambar_cover.jpg";
import tarikGarisAngka1_5Cover from "./assets/images/game_tarik_garis_angka_1_5_cover.jpg";
import mengenal5WarnaCover from "./assets/images/game_mengenal_5warna_4gambar_cover.jpg";
import mengenal6WarnaCover from "./assets/images/game_mengenal_6warna_4gambar_cover.jpg";
import tunjukAngka1_5_2GambarCover from "./assets/images/game_tunjuk_angka_1_5_2gambar_cover.jpg";
import akuMengenalWarnaCover from "./assets/images/game_aku_mengenal_warna_cover.jpg";
import puzzleHewan2KepingCover from "./assets/images/game_puzzle_hewan_2keping_cover.jpg";
import sentuh3Warna4GambarCover from "./assets/images/game_sentuh_3warna_benda_4gambar_cover.jpg";
import sentuh4Warna4Gambar10SoalCover from "./assets/images/game_sentuh_4warna_benda_4gambar_10soal_cover.jpg";
import mengenal3Warna3GambarCover from "./assets/images/game_mengenal_3warna_merah_kuning_biru_3gambar_cover.jpg";
import puzzle3GambarBuah4KepingCover from "./assets/images/game_puzzle3gambarbuah4keping_cover.jpg";
import sentuh5Warna6Gambar10SoalCover from "./assets/images/game_sentuh5warnabenda6gambar10soal_cover.jpg";
import sentuh6Warna12SoalCover from "./assets/images/game_sentuh6warnabenda12soal_cover.jpg";
import puzzleAngka1_5_4KepingCover from "./assets/images/game_puzzle_angka_1_5_4keping_cover.jpg";
import tarikBendake3Warna6SoalCover from "./assets/images/game_tarikbendake3warna6soal_cover.jpg";
import tarikGambarke6Warna12SoalCover from "./assets/images/game_tarikgambarke6warna12soal_cover.jpg";
import lebihBesarDanKecil5Soal1Cover from "./assets/images/game_lebihbesardankecil5soal1_cover.jpg";
import puzzleHewanTernak9KepingCover from "./assets/images/game_puzzlehewanternak9keping_cover.jpg";

// Profil "tamu" dipakai selama user belum login, supaya Homepage, pilih usia,
// dan game trial tetap bisa diakses tanpa perlu daftar/login dulu. Login cuma
// diminta pas user beneran mau lanjut ke Premium (lihat handleOpenPayment).
const GUEST_PROFILE: UserProfile = {
  id: "guest",
  name: "Tamu",
  role: "parent",
  isPremium: false,
  studentName: "Ananda",
  studentAge: 4,
  history: []
};

// Alur baru GamEdu (bukan lagi "wajib login duluan buat semua orang"):
// 1) Homepage, pilih usia, dan 1 game trial (premium: false) -> bisa diakses
//    SIAPA SAJA tanpa akun sama sekali.
// 2) Klik "Premium" -> BARU diminta daftar/masuk (supaya admin punya email
//    akun yang valid buat diaktifin), lalu diarahkan ke WhatsApp admin.
// 3) Admin aktifin email + durasi lewat admin.html.
// 4) User login (atau sudah otomatis login dari saat daftar) -> status
//    premium otomatis kebaca dari server (lihat api/_lib/verifyAuth.ts),
//    tanpa perlu langkah tambahan apapun dari user.
// ---------------------------------------------------------------------------
// Route wrapper components
// ---------------------------------------------------------------------------
// Didefinisikan di luar App() (bukan nested function) supaya identity-nya
// stabil antar render App -- kalau didefinisikan di dalam App, komponen ini
// akan "remount" tiap kali App re-render (misal tiap kali ada state lain yang
// berubah), yang bikin state internal komponen anak (mis. WorksheetCatalog)
// ke-reset terus. Data & callback yang butuh state App dikirim lewat props.
//
// Catatan penting: game (SecureGamePlayer) SENGAJA tidak dikasih route/URL
// sendiri -- activeGameId cuma disimpan di state App dan dirender sebagai
// overlay di luar <Routes>. Jadi URL browser tidak pernah berubah pas lagi
// main game, dan member tidak bisa share link langsung ke satu game.

function AgeHubRoute({
  games,
  isPremiumUser,
  onPlayGame,
  onOpenPayment,
  setSelectedAge
}: {
  games: Game[];
  isPremiumUser: boolean;
  onPlayGame: (gameId: string) => void;
  onOpenPayment: () => void;
  setSelectedAge: (age: number) => void;
}) {
  const { age } = useParams();
  const navigate = useNavigate();
  const ageNum = Number(age) || 3;

  useEffect(() => {
    setSelectedAge(ageNum);
  }, [ageNum, setSelectedAge]);

  return (
    <div className="animate-fade-in">
      <GameGallery
        age={ageNum}
        games={games}
        onPlayGame={onPlayGame}
        onBack={() => navigate("/kategoriusia")}
        isPremiumUser={isPremiumUser}
        onOpenPayment={onOpenPayment}
        onGoToGameCatalog={() => navigate(`/kategoriusia/${ageNum}/katalog-game`)}
        onGoToWorksheets={() => navigate(`/kategoriusia/${ageNum}/worksheet`)}
        onGoToMateri={() => navigate(`/kategoriusia/${ageNum}/materi`)}
      />
    </div>
  );
}

function GameCatalogRoute({
  games,
  isPremiumUser,
  onOpenPayment,
  onPlayGame
}: {
  games: Game[];
  isPremiumUser: boolean;
  onOpenPayment: () => void;
  onPlayGame: (gameId: string) => void;
}) {
  const { age } = useParams();
  const navigate = useNavigate();
  const ageNum = Number(age) || 3;

  return (
    <div className="animate-fade-in">
      <GameCatalog
        games={games}
        age={ageNum}
        isPremiumUser={isPremiumUser}
        onOpenPayment={onOpenPayment}
        onBack={() => navigate(`/kategoriusia/${ageNum}`)}
        onPlayGame={onPlayGame}
        onGoToWorksheets={() => navigate(`/kategoriusia/${ageNum}/worksheet`)}
      />
    </div>
  );
}

function WorksheetRoute({
  isPremiumUser,
  getIdToken,
  onOpenPayment,
  onNeedAuth,
  isLoggedIn
}: {
  isPremiumUser: boolean;
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>;
  onOpenPayment: () => void;
  onNeedAuth: () => void;
  isLoggedIn: boolean;
}) {
  const { age } = useParams();
  const navigate = useNavigate();
  const ageNum = Number(age) || 3;

  return (
    <div className="animate-fade-in">
      <WorksheetCatalog
        age={ageNum}
        isPremiumUser={isPremiumUser}
        getIdToken={getIdToken}
        onOpenPayment={onOpenPayment}
        onNeedAuth={onNeedAuth}
        isLoggedIn={isLoggedIn}
        onGoToGameCatalog={() => navigate(`/kategoriusia/${ageNum}/katalog-game`)}
      />
    </div>
  );
}

function MateriRoute({
  isPremiumUser,
  onOpenPayment
}: {
  isPremiumUser: boolean;
  onOpenPayment: () => void;
}) {
  const { age } = useParams();
  const navigate = useNavigate();
  const ageNum = Number(age) || 3;

  return (
    <div className="animate-fade-in py-8 sm:py-12 px-6 bg-gradient-to-b from-white to-blue-50/10">
      <div className="max-w-7xl mx-auto space-y-4">
        <button
          onClick={() => navigate(`/kategoriusia/${ageNum}`)}
          className="group inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Kembali ke Kategori Usia
        </button>
        <MateriKognitif age={ageNum} isPremiumUser={isPremiumUser} onOpenPayment={onOpenPayment} />
      </div>
    </div>
  );
}

export default function App() {
  const { user: authUser, getIdToken, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<UserProfile>(GUEST_PROFILE);
  const [customNotes, setCustomNotes] = useState<CustomNote[]>([]);
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  // Banner welcoming + reminder expired buat member Premium, muncul otomatis
  // habis login / habis profil ke-load kalau statusnya masih Premium.
  const [showPremiumBanner, setShowPremiumBanner] = useState(false);

  // Habis checkout sukses di Lynk.id, redirect URL diarahkan ke
  // "https://gameduofficial.vercel.app/?masuk=1" -- begitu balik ke web,
  // form login langsung kebuka otomatis (gak perlu klik menu "Masuk" lagi).
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("masuk") === "1") {
      setShowAuthModal(true);
      navigate(location.pathname, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset posisi scroll ke paling atas tiap kali pindah halaman/URL. Tanpa
  // ini, posisi scroll-Y lama kebawa ke halaman baru -- jadi kalau user lagi
  // scroll ke bawah di satu halaman lalu klik tombol pindah halaman (mis.
  // "Lihat Katalog Game Lengkap"), halaman baru yang lebih pendek bisa
  // langsung kebuka nyangkut di area footer, bukan dari atas.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // List of all games available on the server (all moved to Age 3 as requested)
  const games: Game[] = [
    {
      id: "berburu_angka",
      name: "Berburu Angka",
      ageRange: "3 Tahun",
      premium: false,
      description: "Menangkap buah-buahan terbang dengan angka yang cocok. Sempurna untuk mengasah konsentrasi motorik kasar-halus dan pengenalan berhitung awal bagi balita.",
      coverImage: berburuAngkaCover
    },
    {
      id: "susun_kata",
      name: "Susun Kata 4 Alat Indera",
      ageRange: "6-7 Tahun",
      premium: true,
      description: "Asah kemampuan mengeja kosa kata anatomi tubuh dasar (mata, mulut, hidung, telinga) dengan menyusun huruf-huruf abjad interaktif yang ceria.",
      coverImage: susunKataCover
    },
    {
      id: "berhitung_ceria",
      name: "Berhitung Ceria",
      ageRange: "3 Tahun",
      premium: false,
      description: "Cocokkan angka 1–5 dengan jumlah benda pada gambar asli yang ceria. Melatih pengenalan angka awal dan konsentrasi anak lewat 5 soal interaktif.",
      coverImage: berhitungCeriaCover
    },
    {
      id: "susun_huruf_anggota_tubuh",
      name: "Susun huruf 4 anggota tubuh",
      ageRange: "6-7 Tahun",
      premium: true,
      description: "Asah kemampuan mengeja kosa kata anggota tubuh (kaki, tangan, perut, rambut) dengan menyusun huruf-huruf abjad interaktif yang ceria.",
      coverImage: susunHurufTubuhCover
    },
    {
      id: "aku_istimewa_2_gambar",
      name: "Tunjuk diantara 2 gambar",
      ageRange: "3 Tahun",
      premium: true,
      description: "Latih anak menunjuk alat indera (mata, hidung, mulut, telinga) yang benar di antara 2 pilihan gambar sambil mendengar instruksi suara.",
      coverImage: akuIstimewa2Cover
    },
    {
      id: "aku_istimewa_3_gambar",
      name: "Tunjuk diantara 3 gambar",
      ageRange: "3 Tahun",
      premium: true,
      description: "Latih anak menunjuk alat indera (mata, hidung, mulut, telinga) yang benar di antara 3 pilihan gambar sambil mendengar instruksi suara.",
      coverImage: akuIstimewa3Cover
    },
    {
      id: "aku_istimewa_4_gambar",
      name: "Tunjuk diantara 4 gambar",
      ageRange: "3 Tahun",
      premium: true,
      description: "Latih anak menunjuk alat indera (mata, hidung, mulut, telinga) yang benar di antara 4 pilihan gambar sambil mendengar instruksi suara.",
      coverImage: akuIstimewa4Cover
    },
    {
      id: "anak_menunjuk_apa",
      name: "Anak Menunjuk Apa?",
      ageRange: "3 Tahun",
      premium: true,
      description: "Lihat gambar anak yang sedang menunjuk salah satu alat indera, lalu tebak dan pilih nama alat indera yang benar dari pilihan yang tersedia.",
      coverImage: anakMenunjukApaCover
    },
    {
      id: "sentuh_3warna_benda_2gambar",
      name: "Sentuh 3 Warna - 2 Gambar",
      ageRange: "3 Tahun",
      premium: true,
      description: "Dengarkan perintah warna, lalu sentuh gambar benda dengan warna yang sesuai di antara 2 pilihan. Melatih pengenalan 3 warna dasar (merah, kuning, biru) dan konsentrasi mendengarkan.",
      coverImage: sentuh3WarnaCover
    },
    {
      id: "susun_huruf_8_anggota_tubuh",
      name: "Susun Huruf 8 Anggota Tubuh",
      ageRange: "6-7 Tahun",
      premium: true,
      description: "Susun huruf jadi kata sambil belajar 8 anggota tubuh (mata, kaki, perut, mulut, rambut, tangan, hidung, telinga) lewat petunjuk gambar dan clue yang ceria.",
      coverImage: susunHuruf8TubuhCover
    },
    {
      id: "mencocokkan_nama_alat_indera",
      name: "Mencocokkan Nama Alat Indera",
      ageRange: "4 Tahun",
      premium: false,
      description: "Seret label nama alat indera (mata, hidung, mulut, telinga) ke gambar yang sesuai untuk melatih pengenalan kosakata dan logika mencocokkan.",
      coverImage: mencocokkanAlatInderaCover
    },
    {
      id: "berburu_angka_1_10",
      name: "Berburu Angka 1-10",
      ageRange: "4 Tahun",
      premium: false,
      description: "Tangkap buah terbang sesuai angka target dari 1 sampai 10. Melatih pengenalan angka, urutan berhitung, dan konsentrasi motorik anak usia 4 tahun.",
      coverImage: berburuAngka1_10Cover
    },
    {
      id: "berburu_angka_6_10",
      name: "Berburu Angka 6-10",
      ageRange: "4 Tahun",
      premium: true,
      description: "Level lanjutan berburu buah dengan fokus angka 6 sampai 10, melatih anak mengenal bilangan yang lebih besar sambil mengasah ketangkasan dan konsentrasi.",
      coverImage: berburuAngka6_10Cover
    },
    {
      id: "mengenal_3warna_merah_kuning_biru_2gambar",
      name: "Mengenal 3 Warna (Merah, Kuning, Biru) - 2 Gambar",
      ageRange: "4 Tahun",
      premium: true,
      description: "Dengarkan suara lalu sentuh warna yang benar dari 2 pilihan gambar. Melatih pengenalan warna merah, kuning, dan biru lewat instruksi suara yang interaktif.",
      coverImage: mengenal3WarnaCover
    },
    {
      id: "mengenal_3warna_merah_kuning_biru_3gambar",
      name: "Mengenal 3 Warna (Merah, Kuning, Biru) - 3 Gambar",
      ageRange: "4 Tahun",
      premium: true,
      description: "Dengarkan suara lalu sentuh warna yang benar dari 3 pilihan gambar. Level lanjutan dengan lebih banyak pilihan untuk mengasah pengenalan warna merah, kuning, dan biru serta konsentrasi anak usia 4 tahun.",
      coverImage: mengenal3Warna3GambarCover
    },
    {
      id: "mengenal_4warna_merah_kuning_biru_hijau_3gambar",
      name: "Mengenal 4 Warna (Merah, Kuning, Biru, Hijau) - 3 Gambar",
      ageRange: "4 Tahun",
      premium: true,
      description: "Level lanjutan mengenal warna dengan tambahan warna hijau dan 3 pilihan gambar. Mengasah pengenalan 4 warna dasar sekaligus konsentrasi dan daya dengar anak.",
      coverImage: mengenal4WarnaCover
    },
    {
      id: "sentuh_3warna_benda_3gambar",
      name: "Sentuh 3warna benda 3gambar",
      ageRange: "4 Tahun",
      premium: true,
      description: "Dengarkan perintah warna, lalu sentuh gambar benda dengan warna yang sesuai di antara 3 pilihan. Melatih pengenalan warna merah, kuning, dan biru lewat instruksi suara yang interaktif.",
      coverImage: sentuh3Warna3GambarCover
    },
    {
      id: "sentuh_3warna_benda_4gambar",
      name: "Sentuh 3warna benda 4gambar",
      ageRange: "4 Tahun",
      premium: true,
      description: "Dengarkan perintah warna, lalu sentuh gambar benda dengan warna yang sesuai di antara 4 pilihan. Level lanjutan dengan lebih banyak pengecoh untuk mengasah pengenalan warna merah, kuning, dan biru serta konsentrasi anak usia 4 tahun.",
      coverImage: sentuh3Warna4GambarCover
    },
    {
      id: "sentuh_4warna_benda_4gambar_10soal",
      name: "Sentuh4warnabenda4gambar10soal",
      ageRange: "4 Tahun",
      premium: true,
      description: "Dengarkan perintah warna, lalu sentuh gambar benda dengan warna yang sesuai di antara 4 pilihan, dengan tambahan warna hijau dan 10 soal berturut-turut. Melatih pengenalan 4 warna dasar sekaligus konsentrasi dan daya tahan fokus anak usia 4 tahun.",
      coverImage: sentuh4Warna4Gambar10SoalCover
    },
    {
      id: "tarik_garis_angka_1_5",
      name: "Tarik Garis Angka 1-5",
      ageRange: "4 Tahun",
      premium: true,
      description: "Tarik garis dari angka ke gambar dengan jumlah benda yang sesuai. Melatih koordinasi motorik halus dan pengenalan angka 1 sampai 5 lewat 5 ronde interaktif.",
      coverImage: tarikGarisAngka1_5Cover
    },
    {
      id: "mengenal_5warna_4gambar",
      name: "Mengenal 5warna-merah-kuning-biru-hijau(4gambar)",
      ageRange: "4 Tahun",
      premium: true,
      description: "Dengarkan suara lalu sentuh warna yang benar dari 4 pilihan gambar. Melatih pengenalan 5 warna dasar (merah, kuning, biru, hijau, putih) lewat instruksi suara yang interaktif.",
      coverImage: mengenal5WarnaCover
    },
    {
      id: "mengenal_6warna_4gambar",
      name: "Mengenal 6warna (4gambar)",
      ageRange: "4 Tahun",
      premium: true,
      description: "Level lanjutan mengenal warna dengan tambahan warna ungu dan 4 pilihan gambar per soal. Mengasah pengenalan 6 warna dasar sekaligus konsentrasi dan daya dengar anak.",
      coverImage: mengenal6WarnaCover
    },
    {
      id: "puzzle3gambarbuah4keping",
      name: "Puzzle Buah Ceria",
      ageRange: "4 Tahun",
      premium: true,
      description: "Susun puzzle 4 keping untuk membentuk gambar apel, nanas, dan pisang. Melatih koordinasi tangan-mata, ketelitian, dan pengenalan buah pada anak usia 4 tahun.",
      coverImage: puzzle3GambarBuah4KepingCover
    },
    {
      id: "fungsi_alat_indera",
      name: "Fungsi Alat Indera",
      ageRange: "5 Tahun",
      premium: false,
      description: "Seret jawaban fungsi (melihat, mencium, makan, mendengar) ke gambar alat indera yang sesuai untuk melatih pemahaman fungsi tiap indera lewat tantangan level lanjutan.",
      coverImage: fungsiAlatInderaCover
    },
    {
      id: "aku_istimewa_advance",
      name: "Aku Istimewa - Ayo Kenali Alat Indera di Wajahmu!",
      ageRange: "5 Tahun",
      premium: false,
      description: "Latihan lengkap 4 level: sentuh anggota wajah, tebak yang ditunjuk, cocokkan nama alat indera, dan kenali fungsinya, persiapan matang sebelum masuk SD.",
      coverImage: akuIstimewaAdvanceCover
    },
    {
      id: "tunjuk_angka_1_5_3gambar",
      name: "Tunjuk sesuai angka (3 gambar)",
      ageRange: "5 Tahun",
      premium: true,
      description: "Dengarkan suara angka lalu sentuh gambar angka yang benar di antara 3 pilihan. Melatih pengenalan angka 1–5 dan konsentrasi mendengarkan anak.",
      coverImage: tunjukAngka1_5_3GambarCover
    },
    {
      id: "tunjuk_angka_1_5_4gambar",
      name: "Tunjuk Sesuai Angka (4 gambar)",
      ageRange: "5 Tahun",
      premium: true,
      description: "Level lanjutan dengan 4 pilihan gambar sekaligus. Dengarkan suara angka lalu sentuh gambar angka yang tepat untuk mengasah pengenalan angka 1–5 dan konsentrasi mendengarkan anak yang lebih matang.",
      coverImage: tunjukAngka1_5_4GambarCover
    },
    {
      id: "sentuh5warnabenda6gambar10soal",
      name: "Sentuh 5 Warna Benda (6 Gambar, 10 Soal)",
      ageRange: "5 Tahun",
      premium: true,
      description: "Dengarkan perintah warna, lalu sentuh gambar benda dengan warna yang sesuai di antara 6 pilihan gambar, mencakup 5 warna (merah, kuning, biru, hijau, putih) lewat 10 soal berturut-turut.",
      coverImage: sentuh5Warna6Gambar10SoalCover
    },
    {
      id: "sentuh6warnabenda12soal",
      name: "Sentuh 6 Warna Benda (12 Soal)",
      ageRange: "5 Tahun",
      premium: true,
      description: "Level lanjutan dengan tambahan warna ungu, mencakup 6 warna dan 12 soal berturut-turut. Mengasah pengenalan warna, konsentrasi, dan daya tahan fokus anak usia 5 tahun.",
      coverImage: sentuh6Warna12SoalCover
    },
    {
      id: "tarikbendake3warna6soal",
      name: "Tarik Benda ke 3 Warna (6 Soal)",
      ageRange: "5 Tahun",
      premium: true,
      description: "Tarik garis dari gambar benda ke warna yang sama di antara 3 pilihan warna. Melatih koordinasi tangan-mata dan pengenalan warna lewat 6 soal berturut-turut.",
      coverImage: tarikBendake3Warna6SoalCover
    },
    {
      id: "tarikgambarke6warna12soal",
      name: "Tarik Gambar ke 6 Warna (12 Soal)",
      ageRange: "5 Tahun",
      premium: true,
      description: "Level lanjutan menarik garis dari gambar ke warna yang sesuai, mencakup 6 pilihan warna dan 12 soal berturut-turut untuk mengasah ketelitian dan konsentrasi anak usia 5 tahun.",
      coverImage: tarikGambarke6Warna12SoalCover
    },
    {
      id: "puzzle_angka_1_5_4keping",
      name: "Game Puzzle Angka 1-5 4 Keping",
      ageRange: "5 Tahun",
      premium: true,
      description: "Susun puzzle 4 keping untuk membentuk angka 1 sampai 5 bersama maskot kelinci. Melatih koordinasi tangan-mata, ketelitian, dan pengenalan angka pada anak usia 5 tahun.",
      coverImage: puzzleAngka1_5_4KepingCover
    },
    {
      id: "lebihbesardankecil5soal1",
      name: "Kelompokkan Besar dan Kecil (5 Soal)",
      ageRange: "5 Tahun",
      premium: true,
      description: "Seret benda ke kotak BESAR atau KECIL sesuai ukurannya lewat 5 soal interaktif. Melatih kemampuan membandingkan ukuran dan koordinasi tangan-mata anak usia 5 tahun.",
      coverImage: lebihBesarDanKecil5Soal1Cover
    },
    {
      id: "puzzlehewanternak9keping",
      name: "Puzzle Hewan Ternak Ceria (9 Keping)",
      ageRange: "5 Tahun",
      premium: true,
      description: "Susun puzzle 9 keping untuk membentuk gambar sapi, ayam, dan kambing sambil belajar nama dan suara hewan ternak. Melatih ketelitian, kesabaran, dan koordinasi tangan-mata anak usia 5 tahun.",
      coverImage: puzzleHewanTernak9KepingCover
    },
    {
      id: "tunjuk_angka_1_5_2gambar",
      name: "Tunjuk sesuai angka (2 gambar)",
      ageRange: "3 Tahun",
      premium: true,
      description: "Dengarkan suara angka lalu sentuh gambar angka yang benar di antara 2 pilihan. Melatih pengenalan angka 1–5 dan konsentrasi mendengarkan anak usia 3 tahun.",
      coverImage: tunjukAngka1_5_2GambarCover
    },
    {
      id: "aku_mengenal_warna",
      name: "Aku Mengenal Warna",
      ageRange: "3 Tahun",
      premium: true,
      description: "Lihat contoh warna lalu sentuh gambar dengan warna yang sama dari beberapa pilihan. Melatih pengenalan warna dasar dan kemampuan mencocokkan visual anak usia 3 tahun.",
      coverImage: akuMengenalWarnaCover
    },
    {
      id: "puzzle_hewan_2keping",
      name: "Puzzle Hewan 2 Keping",
      ageRange: "3 Tahun",
      premium: true,
      description: "Susun 2 keping puzzle sederhana untuk membentuk gambar hewan ternak seperti sapi dan ayam. Melatih koordinasi tangan-mata dan pengenalan hewan pada anak usia 3 tahun.",
      coverImage: puzzleHewan2KepingCover
    }
  ];

  // Fetch initial profile & notes from server (cuma kalau sudah login;
  // sebelum login, homepage/pilih usia/game trial tetap pakai GUEST_PROFILE).
  useEffect(() => {
    (async () => {
      const token = await getIdToken();
      if (!token) {
        setUser(GUEST_PROFILE);
        setCustomNotes([]);
        return;
      }
      fetch("/api/user-profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (!res.ok) throw new Error("Offline or development mode");
          return res.json();
        })
      .then((data) => {
        setUser(data.user);
        setCustomNotes(data.customNotes);
        if (data.user?.isPremium && data.user?.premiumUntil) {
          setShowPremiumBanner(true);
        }
      })
      .catch((err) => {
        console.warn("[GamEdu] Menggunakan data lokal (Fallback):", err);
        // Fallback for static builds / first loads
        setUser({
          id: "user-123",
          name: "Bunda Rini",
          role: "parent",
          isPremium: false,
          studentName: "Dafa (4 Tahun)",
          studentAge: 4,
          history: [
            {
              gameId: "berburu_angka",
              gameName: "Berburu Angka",
              date: "2026-07-12",
              score: 100,
              mistakes: 1,
              durationSec: 120,
              cognitiveGain: "Akurasi Berhitung (+15%)"
            }
          ]
        });
        setCustomNotes([
          {
            id: "note-1",
            date: "2026-07-11",
            text: "Dafa menunjukkan konsentrasi sangat baik saat menyusun kata. Rekomendasi: teruskan ke latihan ejaan 4 suku kata.",
            author: "Terapis Wicara Siska, S.Tr.T.W."
          },
          {
            id: "note-2",
            date: "2026-07-10",
            text: "Fokus anak meningkat saat game diiringi musik ceria. Dapat diberikan latihan 10 menit per sesi.",
            author: "Guru Kelas TK Al-Azhar"
          }
        ]);
      });
    })();
  }, [authUser]);

  // Set up message listener for trigger payments from iframe lockscreen
  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "TRIGGER_PAYMENT") {
        setShowPaymentModal(true);
        setActiveGameId(null);
      }
    };
    window.addEventListener("message", handleIframeMessage);
    return () => window.removeEventListener("message", handleIframeMessage);
  }, []);

  // Change user role
  const handleChangeRole = async (role: "parent" | "teacher" | "therapist") => {
    const token = await getIdToken();
    fetch("/api/user-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ role })
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success) {
          setUser(data.user);
        } else {
          setUser((prev) => ({ ...prev, role }));
        }
      })
      .catch(() => {
        setUser((prev) => ({ ...prev, role }));
      });
  };

  // Add notes from dashboard
  const handleAddNote = async (newNote: { text: string; author: string }) => {
    const token = await getIdToken();
    fetch("/api/add-note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(newNote)
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success) {
          setCustomNotes(data.customNotes);
        } else {
          const fallbackNote = {
            id: "note-" + Date.now(),
            date: new Date().toISOString().split("T")[0],
            text: newNote.text,
            author: newNote.author
          };
          setCustomNotes((prev) => [fallbackNote, ...prev]);
        }
      })
      .catch(() => {
        const fallbackNote = {
          id: "note-" + Date.now(),
          date: new Date().toISOString().split("T")[0],
          text: newNote.text,
          author: newNote.author
        };
        setCustomNotes((prev) => [fallbackNote, ...prev]);
      });
  };

  // Record a finished gameplay to database
  const handleGameCompleted = async (stats: {
    score: number;
    mistakes: number;
    durationSec: number;
    cognitiveGain: string;
  }) => {
    const activeGame = games.find((g) => g.id === activeGameId);
    if (!activeGame) return;

    const payload = {
      gameId: activeGame.id,
      gameName: activeGame.name,
      score: stats.score,
      mistakes: stats.mistakes,
      durationSec: stats.durationSec,
      cognitiveGain: stats.cognitiveGain
    };

    const token = await getIdToken();
    fetch("/api/record-play", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload)
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success) {
          setUser((prev) => ({ ...prev, history: data.history }));
        } else {
          setUser((prev) => {
            const newRecord = {
              gameId: activeGame.id,
              gameName: activeGame.name,
              date: new Date().toISOString().split("T")[0],
              score: stats.score,
              mistakes: stats.mistakes,
              durationSec: stats.durationSec,
              cognitiveGain: stats.cognitiveGain
            };
            return { ...prev, history: [newRecord, ...prev.history] };
          });
        }
      })
      .catch(() => {
        setUser((prev) => {
          const newRecord = {
            gameId: activeGame.id,
            gameName: activeGame.name,
            date: new Date().toISOString().split("T")[0],
            score: stats.score,
            mistakes: stats.mistakes,
            durationSec: stats.durationSec,
            cognitiveGain: stats.cognitiveGain
          };
          return { ...prev, history: [newRecord, ...prev.history] };
        });
      });
  };

  const activeGame = games.find((g) => g.id === activeGameId);

  // Navigasi "Kembali" satu langkah, dipakai Navbar (menggantikan tab menu
  // lama yang sekarang dihapus supaya alur lebih simpel & linear):
  // Beranda -> /kategoriusia -> /kategoriusia/:age -> (/materi | /katalog-game | /worksheet)
  // Dihitung dari jumlah segmen URL supaya tetap benar walau halaman
  // di-refresh langsung (tidak bergantung ke riwayat browser).
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isHome = pathSegments.length === 0;
  const handleBack = () => {
    if (pathSegments.length <= 1) {
      navigate("/");
    } else {
      navigate(`/${pathSegments.slice(0, pathSegments.length - 1).join("/")}`);
    }
  };

  const handlePlayGame = (gameId: string) => {
    const game = games.find((g) => g.id === gameId);
    const isLocked = !!game?.premium && !user.isPremium;

    // Lapis pertahanan tambahan di client: kalau game premium dan
    // user belum premium, jangan buka SecureGamePlayer sama sekali.
    // Arahkan langsung ke alur upgrade (daftar/login dulu kalau
    // belum login, baru munculin PaymentModal). Proteksi utama
    // tetap di server (api/games/[gameId].ts via verifyRequest),
    // ini cuma bikin pengalaman usernya jelas & konsisten.
    if (isLocked) {
      if (!authUser) {
        setShowAuthModal(true);
      }
      setShowPaymentModal(true);
      return;
    }

    setActiveGameId(gameId);
  };

  return (
    <div className="min-h-screen bg-cream font-sans text-navy antialiased selection:bg-sunny/40 selection:text-navy flex flex-col justify-between">
      <div>
        {/* WELCOME + REMINDER EXPIRED BUAT MEMBER PREMIUM (muncul saat login) */}
        {showPremiumBanner && user.isPremium && user.premiumUntil && (
          <PremiumStatusBanner
            name={user.name}
            premiumUntil={user.premiumUntil}
            userEmail={authUser?.email}
            onClose={() => setShowPremiumBanner(false)}
          />
        )}

        <Navbar
          user={user}
          isLoggedIn={!!authUser}
          showBackButton={!isHome}
          onGoHome={() => navigate("/")}
          onBack={handleBack}
          onOpenPayment={() => setShowPaymentModal(true)}
          onOpenAuth={() => setShowAuthModal(true)}
          onLogout={logout}
        />

        <Routes>
          {/* Beranda */}
          <Route
            path="/"
            element={
              <div className="animate-fade-in">
                <Hero
                  onStartLearning={() => {
                    setSelectedAge(3);
                    navigate("/kategoriusia");
                  }}
                />
                <Benefits />
                <section id="tentang-kami" className="py-10 sm:py-16 px-6 bg-white scroll-mt-24">
                  <div className="max-w-4xl mx-auto text-center space-y-4">
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy tracking-tight">
                      Tentang <span className="text-coral">GamEdu</span>
                    </h2>
                    <p className="text-navy/50 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                      GamEdu adalah platform belajar sambil bermain untuk anak usia dini, menghadirkan game edukatif,
                      worksheet cetak, dan materi panduan orang tua yang dirancang khusus sesuai tahap perkembangan
                      anak usia 3, 4, dan 5 tahun. Kami percaya setiap anak bisa belajar dengan gembira, tanpa
                      paksaan, dan tetap terarah.
                    </p>
                  </div>
                </section>
              </div>
            }
          />

          {/* Pilih Kategori Usia */}
          <Route
            path="/kategoriusia"
            element={
              <div className="animate-fade-in">
                <AgeCategory
                  selectedAge={selectedAge}
                  onSelectAge={(age) => {
                    setSelectedAge(age);
                    navigate(`/kategoriusia/${age}`);
                  }}
                  games={games}
                />
              </div>
            }
          />

          {/* Hub Usia (game trial + jalan pintas ke Materi/Katalog Game/Worksheet) */}
          <Route
            path="/kategoriusia/:age"
            element={
              <AgeHubRoute
                games={games}
                isPremiumUser={user.isPremium}
                onPlayGame={handlePlayGame}
                onOpenPayment={() => setShowPaymentModal(true)}
                setSelectedAge={setSelectedAge}
              />
            }
          />

          {/* Katalog Game Lengkap (Premium) */}
          <Route
            path="/kategoriusia/:age/katalog-game"
            element={
              <GameCatalogRoute
                games={games}
                isPremiumUser={user.isPremium}
                onOpenPayment={() => setShowPaymentModal(true)}
                onPlayGame={handlePlayGame}
              />
            }
          />

          {/* Katalog Worksheet */}
          <Route
            path="/kategoriusia/:age/worksheet"
            element={
              <WorksheetRoute
                isPremiumUser={user.isPremium}
                getIdToken={getIdToken}
                onOpenPayment={() => setShowPaymentModal(true)}
                onNeedAuth={() => setShowAuthModal(true)}
                isLoggedIn={!!authUser}
              />
            }
          />

          {/* Materi Edukasi Orang Tua */}
          <Route
            path="/kategoriusia/:age/materi"
            element={<MateriRoute isPremiumUser={user.isPremium} onOpenPayment={() => setShowPaymentModal(true)} />}
          />

          {/* Fallback: URL tidak dikenal -> balik ke Beranda */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />

      {/* SECURED GAME PLAYER (IFRAME MODAL) */}
      {activeGameId && activeGame && (
        <SecureGamePlayer
          gameId={activeGame.id}
          gameName={activeGame.name}
          isPremiumUser={user.isPremium}
          getIdToken={getIdToken}
          onClose={() => setActiveGameId(null)}
          onGameCompleted={handleGameCompleted}
          onTriggerPayment={() => setShowPaymentModal(true)}
        />
      )}

      {/* DAFTAR MEMBER VIP (checkout Lynk.id, akun aktif otomatis lewat webhook) */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onOpenLogin={() => {
            setShowPaymentModal(false);
            setShowAuthModal(true);
          }}
        />
      )}

      {/* LOGIN (cuma muncul saat dibutuhkan: mau lanjut Premium, atau klik
          "Masuk" di navbar buat member VIP yang mau masuk lagi) */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onWantVip={() => {
            setShowAuthModal(false);
            setShowPaymentModal(true);
          }}
        />
      )}
    </div>
  );
}
