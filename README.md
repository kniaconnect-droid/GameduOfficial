# GamEdu — Vercel Serverless + Firebase (Member VIP via Lynk.id Webhook)

Hasil migrasi dari `server.ts` (Express, satu proses Node) ke folder `/api`
(format serverless function yang dikenali otomatis oleh Vercel).

## Cara kerja langganan (OTOMATIS, lewat webhook Lynk.id)

Pendaftaran member GRATIS **sudah dihapus**. Satu-satunya cara punya akun
GamEdu sekarang adalah checkout paket **Member VIP** di Lynk.id:

1. User klik tombol **"Daftar Member VIP"** di app → pilih **6 Bulan** atau
   **1 Tahun** → dibawa ke halaman checkout Lynk.id
   (`src/lib/constants.ts` — `LYNK_VIP_6M_URL` / `LYNK_VIP_1Y_URL`).
2. User bayar & **wajib isi Email dan No. HP yang benar** di form checkout
   Lynk — dua data ini yang dipakai buat bikin akun GamEdu-nya.
3. Begitu pembayaran **sukses**, Lynk.id mengirim notifikasi (webhook) ke
   `POST /api/lynk-webhook`. Endpoint ini otomatis:
   - Verifikasi keasliannya lewat `X-Lynk-Signature` (pakai `LYNK_MERCHANT_KEY`).
   - Menentukan paket yang dibeli (6 Bulan / 1 Tahun) dari **judul produk**
     di payload.
   - Membuat akun GamEdu (kalau emailnya belum terdaftar) dengan password
     **`"vip"` + 4 digit terakhir No. HP** yang ditulis user di Lynk (misal
     HP berakhiran `4321` → password `vip4321`).
   - Menambahkan `premiumUntil` di Firestore sesuai durasi paket (180 hari
     untuk 6 Bulan, 365 hari untuk 1 Tahun), dihitung dari tanggal expired
     lama kalau user masih premium (jadi aman untuk perpanjangan).
4. User tinggal buka app → **Masuk** → login pakai email & password di atas.
   Status premium & sisa waktu (dengan countdown hari/jam/menit/detik)
   ditampilkan otomatis di `PremiumStatusBanner`.

**Kenapa ini aman meskipun otomatis**: status premium yang dipercaya sistem
SELALU dihitung ulang dari Firestore tiap kali user buka game (lihat
`api/_lib/verifyAuth.ts`), bukan dari sesuatu yang dikirim dari HP/browser
user. Field itu cuma bisa diubah lewat Admin SDK di server
(`api/lynk-webhook.ts` atau `api/admin-upgrade.ts`), dan `firestore.rules`
memblokir total penulisan field premium dari client.

## ⚠️ PENTING — hal yang WAJIB dicek sebelum production

Dokumentasi resmi webhook Lynk.id
(https://documenter.getpostman.com/view/43601478/2sBXc8o3kn) cuma
menjelaskan cara verifikasi signature (field `refId`, `amount`/`grandTotal`,
`message_id`), **TIDAK menjelaskan lengkap** nama field untuk email pembeli,
No. HP, dan judul produk di body webhook. Field-field itu di
`api/lynk-webhook.ts` (fungsi `extractLynkFields`) ditebak dari nama-nama
umum yang dipakai payment gateway Indonesia lain, dengan beberapa alternatif
sekaligus.

Judul produk yang dipakai buat deteksi paket (sudah dikonfirmasi & jadi
default di kode, gak perlu di-set manual kecuali mau diganti):
- 6 Bulan: `"GamEdu Langganan Premium 6 Bulan"`
- 1 Tahun: `"GamEdu Langganan Premium 1 Tahun"`

**Langkah wajib setelah deploy**:
1. Simpan Webhook URL (`https://domainkamu.vercel.app/api/lynk-webhook`) di
   Lynk.id Dashboard → Settings → Integrations, lalu salin **Merchant Key**
   yang muncul ke env var `LYNK_MERCHANT_KEY`.
2. Lakukan **1 transaksi uji coba** (boleh nominal kecil) untuk tiap paket.
3. Buka `/admin.html` → tombol **"Lihat Log Webhook Lynk Terakhir"** →
   cek status transaksinya:
   - **success** → semua beres, lanjut.
   - **failed** / **invalid_signature** / **error** → buka detail JSON di
     log tsb, lihat struktur `rawBody` asli dari Lynk, lalu sesuaikan daftar
     field di `extractLynkFields()` (`api/lynk-webhook.ts`) supaya cocok.
     Transaksi yang gagal tetap bisa diaktifkan manual lewat form di atasnya
     (isi Email + Password kalau akunnya belum ada).

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
   contoh cara generate cepat: `openssl rand -hex 16`.
8. **Set `LYNK_MERCHANT_KEY`**: didapat dari Lynk.id Dashboard setelah kamu
   simpan Webhook URL (lihat bagian "PENTING" di atas).
9. *(Opsional)* **`LYNK_PRODUCT_TITLE_6M`** / **`LYNK_PRODUCT_TITLE_1Y`**:
   override judul produk yang dipakai buat deteksi paket, kalau judul asli
   di Lynk beda dari default.
10. Set SEMUA variabel di atas juga di **Vercel Project Settings >
    Environment Variables** sebelum deploy production.

## Jalanin lokal

```bash
npm install
npm run vercel-dev   # jalanin frontend + /api sekaligus
```

`npm run dev` (vite biasa) cuma jalanin frontend — endpoint `/api/*` gak akan
kebaca kalau dites lewat ini. Untuk nge-tes `/api/lynk-webhook` secara lokal
tanpa transaksi asli, bisa pakai `curl` dan hitung signature-nya manual
sesuai contoh Python/Node di dokumentasi Lynk.

## Deploy ke Vercel

```bash
vercel        # deploy preview
vercel --prod # deploy production
```

## Yang masih PR

- **Konfirmasi struktur payload webhook Lynk** lewat log di `/admin.html`
  setelah transaksi uji coba pertama (lihat bagian "PENTING").
- **48 game sisanya.** Baru 2 entry di `api/_lib/gamesCatalog.ts`, tinggal
  tambah entry baru per game + taruh file HTML-nya di `server/games/`.
- **Backup ADMIN_SECRET.** Kalau lupa, tinggal ganti value di Vercel Env
  Variables kapan aja (gak perlu approval siapa-siapa), tapi otomatis semua
  sesi admin.html yang lama bakal ke-logout (harus masuk ulang pakai secret
  baru).
- Kalau nanti mau lebih dari 1 admin, sebaiknya upgrade dari "1 password
  bersama" ke sistem akun admin masing-masing.
