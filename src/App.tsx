import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import AgeCategory from "./components/AgeCategory";
import GameGallery from "./components/GameGallery";
import WhyChooseUs from "./components/WhyChooseUs";
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
export default function App() {
  const { user: authUser, getIdToken, logout } = useAuth();
  const [user, setUser] = useState<UserProfile>(GUEST_PROFILE);
  const [customNotes, setCustomNotes] = useState<CustomNote[]>([]);
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  // Banner welcoming + reminder expired buat member Premium, muncul otomatis
  // habis login / habis profil ke-load kalau statusnya masih Premium.
  const [showPremiumBanner, setShowPremiumBanner] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // Page 1: Home, Page 2: Choose Age, Page 3: Game Gallery

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
      ageRange: "3 Tahun",
      premium: true,
      description: "Asah kemampuan mengeja kosa kata anatomi tubuh dasar (mata, mulut, hidung, telinga) dengan menyusun huruf-huruf abjad interaktif yang ceria.",
      coverImage: susunKataCover
    },
    {
      id: "berhitung_ceria",
      name: "Berhitung Ceria",
      ageRange: "3 Tahun",
      premium: true,
      description: "Cocokkan angka 1–5 dengan jumlah benda pada gambar asli yang ceria. Melatih pengenalan angka awal dan konsentrasi anak lewat 5 soal interaktif.",
      coverImage: berhitungCeriaCover
    },
    {
      id: "susun_huruf_anggota_tubuh",
      name: "Susun huruf 4 anggota tubuh",
      ageRange: "3 Tahun",
      premium: true,
      description: "Asah kemampuan mengeja kosa kata anggota tubuh (kaki, tangan, perut, rambut) dengan menyusun huruf-huruf abjad interaktif yang ceria.",
      coverImage: susunHurufTubuhCover
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

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 flex flex-col justify-between">
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
          currentPage={currentPage}
          onChangePage={(page) => {
            setCurrentPage(page);
            if (page === 3 && selectedAge === null) {
              setSelectedAge(3);
            }
          }}
          onOpenPayment={() => setShowPaymentModal(true)}
          onOpenAuth={() => setShowAuthModal(true)}
          onLogout={logout}
        />

        {/* Page 1: Home */}
        {currentPage === 1 && (
          <div className="animate-fade-in">
            <Hero
              onStartLearning={() => {
                setSelectedAge(3);
                setCurrentPage(2);
              }}
              onExploreGames={() => {
                setSelectedAge(3);
                setCurrentPage(3);
              }}
            />
            <Benefits />
            <WhyChooseUs />
          </div>
        )}

        {/* Page 2: Age Category selection */}
        {currentPage === 2 && (
          <div className="animate-fade-in">
            <AgeCategory
              selectedAge={selectedAge}
              onSelectAge={(age) => {
                setSelectedAge(age);
                setCurrentPage(3);
              }}
              games={games}
            />
          </div>
        )}

        {/* Page 3: Game Catalog Gallery */}
        {currentPage === 3 && (
          <div className="animate-fade-in">
            <GameGallery
              age={selectedAge !== null ? selectedAge : 3}
              games={games}
              onPlayGame={(gameId) => {
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
              }}
              onBack={() => {
                setCurrentPage(2);
              }}
              isPremiumUser={user.isPremium}
            />
          </div>
        )}
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

      {/* UPGRADE / PREMIUM CHECKOUT POPUP */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          userEmail={authUser?.email}
          onNeedAuth={() => setShowAuthModal(true)}
        />
      )}

      {/* LOGIN / DAFTAR (cuma muncul saat dibutuhkan: mau lanjut Premium, atau
          klik "Masuk" di navbar buat member lama yang mau masuk lagi) */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          contextMessage={
            showPaymentModal
              ? "Daftar/masuk dulu supaya admin bisa aktifin Premium ke email ini"
              : undefined
          }
          initialMode={showPaymentModal ? "register" : "login"}
        />
      )}
    </div>
  );
}
