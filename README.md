# GamEdu — Vercel Serverless + Firebase (Login Email/Password + Admin Manual)

Hasil migrasi dari `server.ts` (Express, satu proses Node) ke folder `/api`
(format serverless function yang dikenali otomatis oleh Vercel).

## Cara kerja langganan (SIMPEL, tanpa payment gateway otomatis)

1. User daftar/login pakai **email + password** di app (`AuthGate.tsx`).
2. User bayar manual ke Nia (transfer/QRIS) lewat chat WhatsApp — tombol
   "Coba Premium" di app langsung buka WA dengan pesan siap-kirim berisi
   email akun mereka.
3. Nia buka halaman **`/admin.html`** (setelah deploy, alamatnya jadi
   `https://domainkamu.vercel.app/admin.html`), masukin password admin,
   masukin email user + pilih durasi (1/2/3/6/12 bulan), klik "Aktifkan".
4. Status premium user otomatis nyala sampai tanggal yang dihitung, dan
   otomatis "expired" sendiri kalau tanggalnya lewat — gak perlu ada yang
   nurunin status manual.

**Kenapa ini aman meskipun simpel**: status premium yang dipercaya sistem
SELALU dihitung ulang dari Firestore tiap kali user buka game (lihat
`api/_lib/verifyAuth.ts`), bukan dari sesuatu yang dikirim dari HP/browser
user. Satu-satunya yang bisa mengubah status itu adalah endpoint
`api/admin-upgrade.ts`, dan itu dikunci pakai `ADMIN_SECRET` yang cuma
kamu yang tau.

## Setup sebelum deploy

1. **Buat Firebase project** (kalau belum) di https://console.firebase.google.com
2. **Aktifkan Authentication > Sign-in method > Email/Password.**
3. **Aktifkan Firestore Database** (mode production).
4. **Deploy `firestore.rules`** (lihat file di root project ini) lewat Firebase Console
   > Firestore Database > Rules, tempel isinya, klik Publish.
5. **Ambil kredensial client**: Project Settings > General > Your apps > isi ke
   `.env` (awalan `VITE_`).
6. **Ambil kredensial admin**: Project Settings > Service Accounts > Generate
   new private key → unduh JSON → salin `project_id`, `client_email`,
   `private_key` ke `.env`.
7. **Bikin `ADMIN_SECRET`**: password acak buat masuk ke `/admin.html`,
   contoh cara generate cepat: `openssl rand -hex 16`. Simpen baik-baik
   (misal di catatan pribadi), karena inilah satu-satunya kunci masuk
   admin panel.
8. Set SEMUA variabel di atas juga di **Vercel Project Settings >
   Environment Variables** sebelum deploy production.

## Jalanin lokal

```bash
npm install
npm run vercel-dev   # jalanin frontend + /api sekaligus
```

`npm run dev` (vite biasa) cuma jalanin frontend — endpoint `/api/*` gak akan
kebaca kalau dites lewat ini.

## Deploy ke Vercel

```bash
vercel        # deploy preview
vercel --prod # deploy production
```

## Sebelum ngasih tau user "Coba Premium" beneran jalan

Ganti nomor WhatsApp placeholder di `src/components/PaymentModal.tsx`
(cari `ADMIN_WHATSAPP_NUMBER`) ke nomor WA asli kamu.

## Yang masih PR

- **48 game sisanya.** Baru 2 entry di `api/_lib/gamesCatalog.ts`, tinggal
  tambah entry baru per game + taruh file HTML-nya di `server/games/`.
- **Backup ADMIN_SECRET.** Kalau lupa, tinggal ganti value di Vercel Env
  Variables kapan aja (gak perlu approval siapa-siapa), tapi otomatis semua
  sesi admin.html yang lama bakal ke-logout (harus masuk ulang pakai secret
  baru).
- Kalau nanti mau lebih dari 1 admin, sebaiknya upgrade dari "1 password
  bersama" ke sistem akun admin masing-masing.
