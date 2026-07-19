import React, { useState } from "react";
import { UserProfile, CustomNote } from "../types";
import { X, Calendar, Activity, BookOpen, PenTool, CheckCircle, FileDown, PlusCircle } from "lucide-react";

interface ParentTherapistDashboardProps {
  user: UserProfile;
  customNotes: CustomNote[];
  onAddNote: (note: { text: string; author: string }) => void;
  onClose: () => void;
  onUpgrade: () => void;
}

export default function ParentTherapistDashboard({
  user,
  customNotes,
  onAddNote,
  onClose,
  onUpgrade
}: ParentTherapistDashboardProps) {
  const [newNoteText, setNewNoteText] = useState("");
  const [downloadingWorksheetId, setDownloadingWorksheetId] = useState<number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const worksheets = [
    { id: 1, name: "Menulis & Berhitung Angka 1-5 (PAUD)", pages: 6, size: "3.4 MB" },
    { id: 2, name: "Mengenal Anggota Tubuh & Mewarnai", pages: 8, size: "4.1 MB" },
    { id: 3, name: "Mengeja Huruf Vokal & Kosakata Dasar", pages: 5, size: "2.8 MB" }
  ];

  const handleDownloadWorksheet = (id: number) => {
    setDownloadingWorksheetId(id);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadingWorksheetId(null), 800);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    let authorName = "Orang Tua";
    if (user.role === "therapist") authorName = "Terapis Wicara Siska, S.Tr.T.W.";
    if (user.role === "teacher") authorName = "Guru Kelas TK Al-Azhar";

    onAddNote({
      text: newNoteText,
      author: authorName
    });
    setNewNoteText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in select-none">
      <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-slate-200/80">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 flex items-center justify-between text-white border-b border-slate-200/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Dashboard {user.role === "parent" ? "Orang Tua" : user.role === "teacher" ? "Sekolah & Guru" : "Klinik Terapis"}
              </h2>
              <p className="text-xs text-slate-400">Memantau aktivitas kognitif & rekam medis Dafa</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50/50">
          
          {/* STATS OVERVIEW CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-bold">
                🎯
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Skor Dafa</span>
                <p className="text-2xl font-black text-slate-900">{user.history.reduce((a, b) => a + b.score, 0)} Poin</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl font-bold">
                📈
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Aktivitas Bermain</span>
                <p className="text-2xl font-black text-slate-900">{user.history.length} Sesi Aktif</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 text-xl font-bold">
                💡
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Skor Kesalahan Rata-rata</span>
                <p className="text-2xl font-black text-slate-900">
                  {user.history.length > 0 
                    ? (user.history.reduce((a, b) => a + b.mistakes, 0) / user.history.length).toFixed(1) 
                    : 0} Kali
                </p>
              </div>
            </div>
          </div>

          {/* DYNAMIC VISUAL SCORE REPORT BAR CHART */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Grafik Kemajuan Skor Belajar
                </h3>
                <p className="text-xs text-slate-500">Mencatat riwayat aktivitas bermain untuk mendeteksi kelelahan atensi</p>
              </div>
              <span className="text-xs bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold">
                Kondisi Kognitif: Stabil & Fokus
              </span>
            </div>

            {user.history.length > 0 ? (
              <div className="space-y-4">
                {/* Visual Chart Bars */}
                <div className="h-48 flex items-end justify-around gap-2 px-4 border-b border-slate-200/60 pb-1 pt-6">
                  {user.history.slice(0, 7).reverse().map((h, idx) => {
                    const percent = Math.min(100, Math.max(10, (h.score / 100) * 100));
                    return (
                      <div key={idx} className="flex flex-col items-center group w-full max-w-[40px] relative">
                        {/* Tooltip on hover */}
                        <div className="absolute mb-24 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-md">
                          Skor: {h.score} | Salah: {h.mistakes}
                        </div>
                        <div
                          style={{ height: `${percent}%` }}
                          className={`w-full rounded-t-xl transition-all duration-500 hover:scale-105 shadow-inner ${
                            h.gameId === "berburu_angka" ? "bg-blue-600" : "bg-purple-600"
                          }`}
                        />
                        <span className="text-[10px] font-bold text-slate-400 mt-2 text-center truncate w-full">
                          {h.date.split("-")[2]}/{h.date.split("-")[1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-6 text-xs font-bold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
                    <span>Berburu Angka</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-purple-600 rounded-full inline-block"></span>
                    <span>Susun Kata Anggota Tubuh</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs font-bold">
                Belum ada data game yang terekam. Mainkan game terlebih dahulu untuk melihat analisis visual!
              </div>
            )}
          </div>

          {/* TWO COLUMN GRID: Clinical Notes & Printable Worksheets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Column 1 (7 cols): Clinical therapist logs */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  Catatan Terapis & Guru Kelas
                </h3>
                <p className="text-xs text-slate-500">Rekomendasi taktis untuk membantu perkembangan bahasa anak di rumah</p>
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleNoteSubmit} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <label className="text-xs font-bold text-slate-700 block">
                  Tambah Catatan Baru ({user.role === "parent" ? "Orang Tua" : user.role === "teacher" ? "Guru" : "Terapis"})
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Masukkan diagnosis kemajuan belajar atau anjuran klinis..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md shadow-purple-100 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Simpan Catatan
                  </button>
                </div>
              </form>

              {/* Notes chronological list */}
              <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-2">
                {customNotes.map((note) => (
                  <div key={note.id} className="border-l-4 border-purple-400 pl-4 py-1 space-y-1">
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">"{note.text}"</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                      <span className="text-purple-600">{note.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {note.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 (5 cols): Worksheet Downloads */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-orange-600" />
                  Worksheet Siap Cetak
                </h3>
                <p className="text-xs text-slate-500">Materi fisik untuk melatih menulis, mewarnai & motorik halus anak</p>
              </div>

              <div className="space-y-4">
                {worksheets.map((ws) => {
                  const isDownloading = downloadingWorksheetId === ws.id;

                  return (
                    <div key={ws.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 leading-tight">{ws.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold mt-1">
                          <span>📄 {ws.pages} Halaman</span>
                          <span>•</span>
                          <span>📦 {ws.size}</span>
                        </div>
                      </div>

                      {isDownloading ? (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[9px] font-bold text-orange-600">
                            <span>Mengunduh Berkas...</span>
                            <span>{downloadProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div style={{ width: `${downloadProgress}%` }} className="h-full bg-orange-500 transition-all"></div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDownloadWorksheet(ws.id)}
                          className="w-full flex items-center justify-center gap-2 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-100 hover:shadow-orange-200 transition-all cursor-pointer"
                        >
                          <FileDown className="w-4 h-4" />
                          Unduh Worksheet PDF
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* PREMIUM CALLOUT ON DEMAND */}
          {!user.isPremium && (
            <div className="bg-slate-900 border border-slate-800 text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center md:text-left">
                <h4 className="text-lg font-bold flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500 fill-slate-900" />
                  Aktifkan Akses Kurikulum Sekolah & Terapis
                </h4>
                <p className="text-xs text-slate-400 max-w-xl">
                  Dapatkan laporan takterbatas, diagnosis PDF komprehensif, akses ratusan worksheet premium, serta hilangkan iklan lock game dengan paket Premium.
                </p>
              </div>
              <button
                onClick={onUpgrade}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl text-xs transition-all hover:scale-105 shadow-lg shadow-orange-500/20 cursor-pointer whitespace-nowrap"
              >
                Aktivasi Premium Sekarang
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
