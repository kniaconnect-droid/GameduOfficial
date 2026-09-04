// src/lib/constants.ts
// Konstanta yang dipakai di beberapa komponen sekaligus, biar kalau ganti
// nomor WA admin cukup di satu tempat aja.

// Format: 62xxxxxxxxxx, tanpa +/spasi/strip.
export const ADMIN_WHATSAPP_NUMBER = "6281911284050";

// Link checkout Lynk.id buat paket Member VIP. User klik salah satu, bayar
// di Lynk, lalu akun GamEdu-nya otomatis dibuatkan & diaktifkan Premium oleh
// webhook (lihat api/lynk-webhook.ts) begitu Lynk kasih notif pembayaran
// sukses -- gak perlu chat admin / aktivasi manual lagi.
export const LYNK_VIP_6M_URL = "https://lynk.id/mhrofficialid/wmxzz3dge3mx/checkout";
export const LYNK_VIP_1Y_URL = "https://lynk.id/mhrofficialid/5zodd5nrnj6g/checkout";

// Firebase mewajibkan password minimal 6 karakter, sedangkan yang diminta
// dipakai sebagai password cuma "4 digit terakhir no HP". Makanya password
// akun yang dibuat otomatis dari webhook = PREFIX ini + 4 digit terakhir
// no HP (contoh: kalau prefix "vip" dan HP berakhiran 4321 -> password
// "vip4321"). Ini BUKAN rahasia keamanan (bukan pengganti signature
// verification), cuma trik supaya lolos syarat minimal panjang password
// Firebase. Nilai ini WAJIB SAMA PERSIS dengan LYNK_PASSWORD_PREFIX di
// api/lynk-webhook.ts -- kalau mau ganti, ganti di dua tempat sekaligus.
export const LYNK_PASSWORD_PREFIX = "vip";
