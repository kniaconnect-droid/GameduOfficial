import React from "react";
import { X, CheckCircle, MessageCircle, ShieldCheck, UserPlus } from "lucide-react";

interface PaymentModalProps {
  onClose: () => void;
  userEmail?: string | null;
  // Kalau belum login, jangan langsung kasih link WA -- suruh daftar/masuk
  // dulu. Soalnya admin aktifin langganan berdasarkan EMAIL AKUN GamEdu
  // (lihat api/admin-upgrade.ts), jadi akun itu emang wajib ada duluan
  // sebelum admin bisa nyari & ngaktifin di admin.html.
  onNeedAuth: () => void;
}

// GANTI dari flow "bayar otomatis" jadi "hubungi admin". Aktivasi langganan
// sekarang dilakuin manual sama admin lewat admin.html setelah pembayaran
// dikonfirmasi (transfer/QRIS langsung ke Nia, dicek manual).
//
// TODO: ganti nomor WhatsApp di bawah ini ke nomor asli.
const ADMIN_WHATSAPP_NUMBER = "6281911204050"; // format: 62xxxxxxxxxx, tanpa +/spasi

export default function PaymentModal({ onClose, userEmail, onNeedAuth }: PaymentModalProps) {
  const plans = {
    monthly: { name: "Paket Bulanan", price: "Rp 49.000", period: "/bulan" },
    yearly: { name: "Paket Tahunan", price: "Rp 399.000", period: "/tahun", save: "Hemat 30%" }
  };

  const buildWaLink = (planLabel: string) => {
    const msg = `Halo Admin GamEdu, saya mau aktifin langganan ${planLabel}.\nEmail akun saya: ${userEmail || "(belum login)"}`;
    return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-slate-200/80">

        <div className="bg-slate-900 p-6 flex items-center justify-between text-white border-b border-slate-200/10">
          <div className="flex items-center gap-3">
            <span className="text-xl">💎</span>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Langganan GamEdu Premium</h2>
              <p className="text-[11px] text-slate-400">Aktivasi cepat, dikonfirmasi langsung oleh admin</p>
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
          {!userEmail && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center space-y-3">
              <UserPlus className="w-8 h-8 text-blue-500 mx-auto" />
              <p className="text-sm font-bold text-slate-800">Buat akun dulu, ya!</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Admin mengaktifkan Premium berdasarkan email akun GamEdu-mu. Daftar atau masuk dulu
                (gratis), baru lanjut chat admin untuk aktivasi.
              </p>
              <button
                onClick={onNeedAuth}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Daftar / Masuk Sekarang
              </button>
            </div>
          )}

          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${!userEmail ? "opacity-40 pointer-events-none select-none" : ""}`}>
            <div className="p-5 rounded-2xl border-2 border-slate-200/60 bg-white">
              <h4 className="text-xs font-bold text-slate-700">{plans.monthly.name}</h4>
              <p className="text-2xl font-black text-slate-900 mt-2">
                {plans.monthly.price}
                <span className="text-xs font-bold text-slate-400">{plans.monthly.period}</span>
              </p>
              <a
                href={buildWaLink(plans.monthly.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Chat Admin
              </a>
            </div>

            <div className="relative p-5 rounded-2xl border-2 border-orange-400 bg-orange-50/40">
              <span className="absolute -top-3 right-4 bg-orange-500 text-white text-[9px] font-bold uppercase px-2 py-1 rounded-full shadow-sm">
                {plans.yearly.save}
              </span>
              <h4 className="text-xs font-bold text-slate-700">{plans.yearly.name}</h4>
              <p className="text-2xl font-black text-slate-900 mt-2">
                {plans.yearly.price}
                <span className="text-xs font-bold text-slate-400">{plans.yearly.period}</span>
              </p>
              <a
                href={buildWaLink(plans.yearly.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Chat Admin
              </a>
            </div>
          </div>

          <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-xs">
            <span className="font-bold text-slate-700 block mb-1">Akses Premium Termasuk:</span>
            <div className="flex items-center gap-2 text-slate-600 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-100" />
              <span>Akses penuh semua game asah otak & motorik</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-100" />
              <span>Unduh tak terbatas materi worksheet siap cetak</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 bg-blue-50 border border-blue-100 rounded-xl p-3 leading-relaxed">
            <strong>Cara aktivasi:</strong> klik "Chat Admin", lakukan pembayaran sesuai instruksi, lalu akun
            akan diaktifkan Premium dalam waktu singkat setelah dikonfirmasi.
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Dikonfirmasi langsung oleh tim GamEdu, bukan sistem otomatis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
