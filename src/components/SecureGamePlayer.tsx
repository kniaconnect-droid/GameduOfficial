import React, { useEffect, useState } from "react";
import { X, Play, RefreshCw, Star, Trophy, Sparkles } from "lucide-react";
import Watermark from "./Watermark";
import { useAuth } from "../lib/useAuth";

interface SecureGamePlayerProps {
  gameId: string;
  gameName: string;
  isPremiumUser: boolean;
  onClose: () => void;
  onGameCompleted: (data: { score: number; mistakes: number; durationSec: number; cognitiveGain: string }) => void;
  onTriggerPayment: () => void;
}

export default function SecureGamePlayer({
  gameId,
  gameName,
  isPremiumUser,
  onClose,
  onGameCompleted,
  onTriggerPayment
}: SecureGamePlayerProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const { getIdToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [gameHtml, setGameHtml] = useState<string>("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [completedStats, setCompletedStats] = useState<{
    score: number;
    mistakes: number;
    cognitiveGain: string;
  } | null>(null);

  // Ambil HTML game lewat fetch (bukan iframe src langsung), supaya bisa
  // lampirin header Authorization -> server verifikasi status premium dari
  // token asli, bukan dari query string yang dulu bisa diketik manual di URL.
  const loadGame = React.useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/games/${gameId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: "no-store",
      });

      // Kalau server error (mis. 500 karena env var Firebase belum diset di
      // Vercel), jangan tampilkan HTML error mentahnya di dalam iframe --
      // itu bisa kelihatan seperti game "aneh"/rusak. Tampilkan pesan yang
      // jelas supaya gampang di-debug dan gak disalahartikan sebagai bug lock premium.
      if (!res.ok) {
        console.error(`[SecureGamePlayer] /api/games/${gameId} -> ${res.status}`);
        setLoadError(
          res.status === 500
            ? "Server sedang bermasalah (500). Kemungkinan konfigurasi server belum lengkap. Coba lagi nanti atau hubungi admin."
            : "Game gagal dimuat. Coba periksa koneksi internet lalu ulangi."
        );
        return;
      }

      const html = await res.text();
      setGameHtml(html);
    } catch (err) {
      console.error(err);
      setLoadError("Game gagal dimuat. Coba periksa koneksi internet lalu ulangi.");
    } finally {
      setLoading(false);
    }
  }, [gameId, getIdToken]);

  // Restart CEPAT: kirim pesan "reset" ke iframe yang sudah ke-load, tanpa
  // fetch ulang ke /api/games (tanpa cek token & Firestore lagi). Dipakai
  // buat tombol "Reset Game" dan "Main Lagi" supaya nggak nunggu network
  // round-trip lagi -- game reset instan di sisi client.
  // Fallback ke loadGame() penuh kalau iframe-nya belum ada (mis. error state).
  const restartGame = React.useCallback(() => {
    const frame = iframeRef.current;
    if (frame && frame.contentWindow && gameHtml) {
      frame.contentWindow.postMessage({ type: "GAMEDU_RESET" }, "*");
    } else {
      loadGame();
    }
  }, [gameHtml, loadGame]);

  useEffect(() => {
    loadGame();
  }, [loadGame]);


  useEffect(() => {
    // Listen to iframe postMessage events for score tracking and premium gate events
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data) return;

      if (data.type === "GAME_OVER" && data.gameId === gameId) {
        setCompletedStats({
          score: data.score,
          mistakes: data.mistakes,
          cognitiveGain: data.cognitiveGain
        });
        // Trigger parent state update
        onGameCompleted({
          score: data.score,
          mistakes: data.mistakes,
          durationSec: data.durationSec,
          cognitiveGain: data.cognitiveGain
        });
      }

      if (data.type === "TRIGGER_PAYMENT") {
        onTriggerPayment();
        onClose();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [gameId, onGameCompleted, onTriggerPayment, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-0 md:p-6 animate-fade-in">
      <div className="relative w-full h-full md:max-w-5xl md:h-[90vh] bg-black md:rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-800">
        
        {/* Iframe Top Header bar */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800 text-white select-none">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎮</span>
            <div>
              <h3 className="font-bold text-sm tracking-tight">{gameName}</h3>
              <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                Koneksi Keamanan Server Aktif
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCompletedStats(null);
                restartGame();
              }}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
              title="Reset Game"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/90 hover:bg-red-600 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>

        {/* Secure Game Loader Frame */}
        <div className="flex-1 relative bg-slate-950">
          {loading && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950 text-white space-y-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin"></div>
                <span className="text-2xl animate-pulse">🎮</span>
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-bold">Memuat Game Edukasi Aman...</p>
                <p className="text-[11px] text-slate-500">Mempersiapkan media audio-visual kognitif</p>
              </div>
            </div>
          )}

          {loadError && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950 text-white space-y-3 text-center px-6">
              <p className="text-sm font-bold text-red-400">{loadError}</p>
              <button
                onClick={loadGame}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-bold"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {!loadError && gameHtml && (
            <iframe
              id="game-frame"
              ref={iframeRef}
              srcDoc={gameHtml}
              className="absolute inset-0 w-full h-full border-none"
              style={{ WebkitOverflowScrolling: "touch" }}
              title={gameName}
              allow="autoplay; geolocation; microphone; camera"
            />
          )}

          {/* Reusable GamEdu Logo Watermark overlay for copyright protection */}
          <Watermark />

          {/* Congratulations overlay when message is received from iframe */}
          {completedStats && (
            <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-6 text-center select-none animate-fade-in">
              <div className="max-w-md w-full bg-white rounded-[32px] p-8 space-y-6 shadow-2xl border border-slate-200/80 text-slate-900">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-500 text-3xl mx-auto animate-bounce shadow-md">
                  🏆
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">Bagus Sekali, Hebat!</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Aktivitas bermain telah diselesaikan dengan hasil sangat mengesankan!
                  </p>
                </div>

                {/* Score panel */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                  <div className="text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Skor Diperoleh</span>
                    <p className="text-2xl font-bold text-blue-600">{completedStats.score} Poin</p>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Target Belajar</span>
                    <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center justify-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {completedStats.cognitiveGain}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCompletedStats(null);
                      restartGame();
                    }}
                    className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs transition-colors cursor-pointer"
                  >
                    Main Lagi 🔄
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-blue-500/20 transition-all hover:scale-105 cursor-pointer"
                  >
                    Tutup & Simpan 📊
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
