import React, { useState } from "react";
import { Download, Lock, Crown, Loader2, CheckCircle2, Clock } from "lucide-react";
import { WORKSHEETS, WORKSHEET_CATEGORIES, WorksheetItem } from "../lib/worksheets";

interface WorksheetCatalogProps {
  age: number;
  isPremiumUser: boolean;
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>;
  onOpenPayment: () => void;
  onNeedAuth: () => void;
  isLoggedIn: boolean;
  onGoToGameCatalog: () => void;
}

export default function WorksheetCatalog({
  age,
  isPremiumUser,
  getIdToken,
  onOpenPayment,
  onNeedAuth,
  isLoggedIn,
  onGoToGameCatalog
}: WorksheetCatalogProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [doneId, setDoneId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const worksheetsForAge = WORKSHEETS.filter((w) => w.ageRange.includes(String(age)));
  const categories = Object.keys(WORKSHEET_CATEGORIES) as Array<keyof typeof WORKSHEET_CATEGORIES>;

  async function handleDownload(item: WorksheetItem) {
    setErrorMsg(null);

    // Lapis pertahanan client: worksheet gratis (item.premium === false) boleh
    // didownload siapa saja yang sudah login, tanpa perlu VIP. Worksheet
    // premium yang belum VIP diarahkan ke alur upgrade dulu (sama pola kayak
    // game VIP). Proteksi utama tetap di server (api/worksheets/[worksheetId].ts).
    if (item.premium && !isPremiumUser) {
      if (!isLoggedIn) {
        onNeedAuth();
      }
      onOpenPayment();
      return;
    }
    if (!isLoggedIn) {
      onNeedAuth();
      return;
    }

    setDownloadingId(item.id);
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/worksheets/${item.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: "no-store"
      });

      if (res.status === 403) {
        onOpenPayment();
        return;
      }
      if (!res.ok) {
        setErrorMsg("Gagal mengunduh worksheet. Coba lagi beberapa saat.");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${item.id}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setDoneId(item.id);
      setTimeout(() => setDoneId((prev) => (prev === item.id ? null : prev)), 2500);
    } catch (err) {
      console.error(err);
      setErrorMsg("Gagal mengunduh worksheet. Periksa koneksi internet lalu coba lagi.");
    } finally {
      setDownloadingId(null);
    }
  }

  return (
    <section className="py-8 sm:py-12 px-6 bg-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-navy/10">
          <div className="space-y-1">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy tracking-tight">
              Katalog <span className="text-emerald-600">Worksheet (LKPD)</span>
            </h2>
            <p className="text-navy/50 text-sm">
              Lembar kerja siap cetak untuk melengkapi aktivitas bermain anak di rumah.
            </p>
          </div>

          {!isPremiumUser && (
            <button
              onClick={onOpenPayment}
              className="flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm hover:scale-105 transition-all cursor-pointer self-start sm:self-center"
            >
              <Crown className="w-4 h-4" />
              Join VIP untuk Download
            </button>
          )}
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-2xl p-4">{errorMsg}</div>
        )}

        {worksheetsForAge.length === 0 ? (
          <div className="bg-white border border-navy/10 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
            <Clock className="w-10 h-10 mx-auto text-navy/30" />
            <h3 className="text-lg font-bold text-navy">Coming Soon</h3>
            <p className="text-navy/50 text-sm leading-relaxed">
              Worksheet untuk kategori Usia {age} Tahun sedang disiapkan tim kurikulum kami. Nantikan update
              selanjutnya, ya!
            </p>
          </div>
        ) : (
          categories.map((cat) => {
            const items = worksheetsForAge.filter((w) => w.category === cat);
            if (items.length === 0) return null;
            const meta = WORKSHEET_CATEGORIES[cat];

            return (
              <div key={cat} className="space-y-5">
                <h3 className="text-lg font-bold text-navy">{meta.label}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {items.map((item) => {
                  const isDownloading = downloadingId === item.id;
                  const isDone = doneId === item.id;
                  const isLocked = item.premium && !isPremiumUser;

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl overflow-hidden border border-navy/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group transform-gpu"
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className={`w-full h-full object-cover transition-transform duration-500 sm:group-hover:scale-105 ${
                            isLocked ? "opacity-50 blur-[2px]" : ""
                          }`}
                        />
                        {isLocked ? (
                          <span className="absolute top-3 left-3 flex items-center gap-1 text-[9px] font-black uppercase tracking-wider bg-sunny text-navy px-2.5 py-1 rounded-full shadow-sm">
                            <Lock className="w-3 h-3" /> VIP
                          </span>
                        ) : (
                          <span className="absolute top-3 left-3 flex items-center gap-1 text-[9px] font-black uppercase tracking-wider bg-emerald-500/90 text-white px-2.5 py-1 rounded-full shadow-sm">
                            Gratis
                          </span>
                        )}
                      </div>

                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h4 className="text-sm font-bold text-navy leading-snug line-clamp-2">{item.title}</h4>
                          <p className="text-navy/50 text-[11px] leading-relaxed line-clamp-2">{item.description}</p>
                        </div>

                        {isLocked ? (
                          <button
                            onClick={onOpenPayment}
                            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer bg-sunny/20 border border-sunny/60 text-navy hover:bg-sunny/30"
                          >
                            <Crown className="w-3.5 h-3.5" /> Buka dengan VIP
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDownload(item)}
                            disabled={isDownloading}
                            className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer disabled:opacity-70 disabled:cursor-wait ${
                              isDone
                                ? "bg-emerald-500 text-white"
                                : "bg-gamedu-blue hover:bg-gamedu-blue/90 text-white shadow-sm"
                            }`}
                          >
                            {isDownloading ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Mengunduh...
                              </>
                            ) : isDone ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" /> Terunduh
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" /> Download Gambar
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                );
              })}
              </div>
            </div>
            );
          })
        )}

        {!isPremiumUser && (
          <div className="bg-white border-2 border-navy/5 rounded-[28px] p-6 sm:p-8 text-center space-y-4">
            <p className="text-navy/60 text-sm">
              Member gratis bisa akses 2 worksheet pilihan tiap kategori usia. Upgrade ke VIP untuk buka semua
              worksheet tanpa batas.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-lg mx-auto">
              <button
                onClick={onGoToGameCatalog}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-sm border-2 border-mint/60 text-navy hover:bg-mint/10 transition-colors cursor-pointer"
              >
                Lihat Game Gratis Juga
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
