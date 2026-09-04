import React from "react";
import { X, CheckCircle, ShieldCheck, Crown, LogIn } from "lucide-react";
import { LYNK_VIP_6M_URL, LYNK_VIP_1Y_URL, LYNK_PASSWORD_PREFIX } from "../lib/constants";

interface PaymentModalProps {
  onClose: () => void;
  // Dipanggil kalau user udah checkout & mau login pakai akun VIP-nya.
  onOpenLogin: () => void;
}

// Alur baru (otomatis, tanpa chat admin):
// 1. User klik salah satu paket -> dibawa ke halaman checkout Lynk.id.
// 2. User bayar & isi data di Lynk (WAJIB isi email & No. HP yang bener,
//    karena itu yang dipakai buat bikin akun GamEdu-nya).
// 3. Begitu Lynk konfirmasi pembayaran sukses, Lynk kirim notifikasi ke
//    api/lynk-webhook.ts, yang otomatis:
//      - Bikin akun GamEdu pakai email tsb (kalau belum ada), dengan
//        password "vip" + 4 digit terakhir No. HP yang ditulis di Lynk.
//      - Aktifin Premium 6 Bulan / 1 Tahun sesuai paket yang dibeli.
// 4. User tinggal login di GamEdu pakai email + password di atas.
export default function PaymentModal({ onClose, onOpenLogin }: PaymentModalProps) {
  const plans = [
    {
      key: "6m",
      name: "Member VIP 6 Bulan",
      period: "Akses penuh 6 bulan",
      url: LYNK_VIP_6M_URL,
      highlight: false
    },
    {
      key: "1y",
      name: "Member VIP 1 Tahun",
      period: "Akses penuh 1 tahun · paling hemat",
      url: LYNK_VIP_1Y_URL,
      highlight: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-slate-200/80">

        <div className="bg-slate-900 p-6 flex items-center justify-between text-white border-b border-slate-200/10">
          <div className="flex items-center gap-3">
            <span className="text-xl">💎</span>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Daftar Member VIP GamEdu</h2>
              <p className="text-[11px] text-slate-400">Bayar sekali, akun langsung aktif otomatis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-5 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`relative p-5 rounded-2xl border-2 bg-white ${
                  plan.highlight ? "border-orange-400 bg-orange-50/40" : "border-slate-200/60"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 right-4 bg-orange-500 text-white text-[9px] font-bold uppercase px-2 py-1 rounded-full shadow-sm">
                    Hemat
                  </span>
                )}
                <h4 className="text-xs font-bold text-slate-700">{plan.name}</h4>
                <p className="text-xs text-slate-500 mt-2">{plan.period}</p>
                <a
                  href={plan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  <Crown className="w-4 h-4" /> Daftar Member VIP
                </a>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-xs">
            <span className="font-bold text-slate-700 block mb-1">Akses Member VIP Termasuk:</span>
            <div className="flex items-center gap-2 text-slate-600 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-100" />
              <span>Akses penuh semua game asah otak & motorik</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-100" />
              <span>Unduh tak terbatas materi worksheet siap cetak</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 bg-blue-50 border border-blue-100 rounded-xl p-3 leading-relaxed space-y-1">
            <p>
              <strong>Cara aktivasi:</strong> pilih paket di atas, selesaikan pembayaran di Lynk, lalu isi{" "}
              <strong>email</strong> dan <strong>No. HP aktif</strong> dengan benar saat checkout.
            </p>
            <p>
              Akun GamEdu-mu akan otomatis aktif beberapa saat setelah pembayaran dikonfirmasi. Login pakai email
              yang sama, dengan password: <strong>"{LYNK_PASSWORD_PREFIX}"</strong> + 4 digit terakhir No. HP kamu
              (contoh: <strong>{LYNK_PASSWORD_PREFIX}4321</strong>).
            </p>
          </div>

          <button
            onClick={onOpenLogin}
            className="w-full flex items-center justify-center gap-1.5 py-3 text-blue-700 hover:bg-blue-50 text-xs font-bold rounded-xl border border-blue-200 transition-colors cursor-pointer"
          >
            <LogIn className="w-4 h-4" /> Sudah bayar? Masuk ke akun VIP
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Pembayaran aman lewat Lynk.id, aktivasi otomatis oleh sistem GamEdu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
