import React, { useState } from "react";
import { Download, Lock, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { WORKSHEETS, WORKSHEET_CATEGORIES, WorksheetItem } from "../lib/worksheets";

interface WorksheetCatalogProps {
  isPremiumUser: boolean;
  getIdToken: (forceRefresh?: boolean) => Promise<string | null>;
  onOpenPayment: () => void;
  onNeedAuth: () => void;
  isLoggedIn: boolean;
}

export default function WorksheetCatalog({
  isPremiumUser,
  getIdToken,
  onOpenPayment,
  onNeedAuth,
  isLoggedIn
}: WorksheetCatalogProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [doneId, setDoneId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = Object.keys(WORKSHEET_CATEGORIES) as Array<keyof typeof WORKSHEET_CATEGORIES>;

  async function handleDownload(item: WorksheetItem) {
    setErrorMsg(null);

    // Lapis pertahanan client: kalau belum premium, arahkan ke alur upgrade
    // dulu (sama pola kayak game premium). Proteksi utama tetap di server
    // (api/worksheets/[worksheetId].ts).
    if (!isPremiumUser) {
      if (!isLoggedIn) {
        onNeedAuth();
      }
      onOpenPayment();
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
      a.download = `${item.id}.pdf`;
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
    <section className="py-12 px-6 bg-gradient-to-b from-white to-blue-50/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/60">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Katalog <span className="text-blue-600">Worksheet (LKPD)</span>
            </h2>
            <p className="text-slate-500 text-sm">
              Lembar kerja siap cetak untuk melengkapi aktivitas bermain anak di rumah.
            </p>
          </div>

          {!isPremiumUser && (
            <button
              onClick={onOpenPayment}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-orange-100 hover:scale-105 transition-all cursor-pointer self-start sm:self-center"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              Coba Premium untuk Download
            </button>
          )}
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-2xl p-4">{errorMsg}</div>
        )}

        {categories.map((cat) => {
          const items = WORKSHEETS.filter((w) => w.category === cat);
          if (items.length === 0) return null;
          const meta = WORKSHEET_CATEGORIES[cat];

          return (
            <div key={cat} className="space-y-5">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>{meta.emoji}</span> {meta.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item) => {
                  const isLocked = !isPremiumUser;
                  const isDownloading = downloadingId === item.id;
                  const isDone = doneId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-[28px] overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-50">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className={`w-full h-full object-cover transition-transform duration-500 ${
                            isLocked ? "blur-[2px] scale-105" : "group-hover:scale-105"
                          }`}
                        />
                        {isLocked && (
                          <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                            <span className="bg-white/95 backdrop-blur-sm w-11 h-11 rounded-full flex items-center justify-center text-orange-500 shadow-md">
                              <Lock className="w-5 h-5" />
                            </span>
                          </div>
                        )}
                        <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-slate-800 shadow-sm">
                          PDF · A4
                        </span>
                      </div>

                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">{item.title}</h4>
                          <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">{item.description}</p>
                        </div>

                        <button
                          onClick={() => handleDownload(item)}
                          disabled={isDownloading}
                          className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer disabled:opacity-70 disabled:cursor-wait ${
                            isLocked
                              ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                              : isDone
                              ? "bg-emerald-500 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100"
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
                          ) : isLocked ? (
                            <>
                              <Lock className="w-3.5 h-3.5" /> Buka Premium
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" /> Download PDF
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
