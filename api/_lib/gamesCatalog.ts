// api/_lib/gamesCatalog.ts
//
// Daftar game & status premium-nya, dibaca di SERVER SAJA (api/games/[gameId].ts).
// Ini terpisah dari daftar game yang dipakai buat tampilan galeri di src/App.tsx —
// sengaja dipisah supaya status premium yang menentukan boleh-tidaknya akses
// selalu dicek dari sini, bukan dari data yang datang dari client.
//
// Tinggal tambah entry baru di sini tiap kali ada game baru (target: 50 game).
// "premium: true" -> butuh custom claim premium di token user buat bisa akses.

export interface GameCatalogEntry {
  id: string;
  name: string;
  ageRange: string;
  premium: boolean;
}

export const GAMES_CATALOG: GameCatalogEntry[] = [
  {
    id: "berburu_angka",
    name: "Berburu Angka",
    ageRange: "3-4 Tahun",
    premium: false,
  },
  {
    id: "susun_kata",
    name: "Susun Kata 4 Alat Indera",
    ageRange: "6-7 Tahun",
    premium: true,
  },
  {
    id: "berhitung_ceria",
    name: "Berhitung Ceria",
    ageRange: "3 Tahun",
    premium: true,
  },
  {
    id: "susun_huruf_anggota_tubuh",
    name: "Susun huruf 4 anggota tubuh",
    ageRange: "6-7 Tahun",
    premium: true,
  },
  {
    id: "aku_istimewa_2_gambar",
    name: "Tunjuk diantara 2 gambar",
    ageRange: "3 Tahun",
    premium: true,
  },
  {
    id: "aku_istimewa_3_gambar",
    name: "Tunjuk diantara 3 gambar",
    ageRange: "3 Tahun",
    premium: true,
  },
  {
    id: "aku_istimewa_4_gambar",
    name: "Tunjuk diantara 4 gambar",
    ageRange: "3 Tahun",
    premium: true,
  },
  {
    id: "anak_menunjuk_apa",
    name: "Anak Menunjuk Apa?",
    ageRange: "3 Tahun",
    premium: true,
  },
  {
    id: "sentuh_3warna_benda_2gambar",
    name: "Sentuh 3 Warna - 2 Gambar",
    ageRange: "3 Tahun",
    premium: true,
  },
  {
    id: "susun_huruf_8_anggota_tubuh",
    name: "Susun Huruf 8 Anggota Tubuh",
    ageRange: "6-7 Tahun",
    premium: true,
  },
  {
    id: "mencocokkan_nama_alat_indera",
    name: "Mencocokkan Nama Alat Indera",
    ageRange: "4 Tahun",
    premium: false,
  },
  {
    id: "berburu_angka_1_10",
    name: "Berburu Angka 1-10",
    ageRange: "4 Tahun",
    premium: true,
  },
  {
    id: "berburu_angka_6_10",
    name: "Berburu Angka 6-10",
    ageRange: "4 Tahun",
    premium: true,
  },
  {
    id: "mengenal_3warna_merah_kuning_biru_2gambar",
    name: "Mengenal 3 Warna (Merah, Kuning, Biru) - 2 Gambar",
    ageRange: "4 Tahun",
    premium: true,
  },
  {
    id: "mengenal_4warna_merah_kuning_biru_hijau_3gambar",
    name: "Mengenal 4 Warna (Merah, Kuning, Biru, Hijau) - 3 Gambar",
    ageRange: "4 Tahun",
    premium: true,
  },
  {
    id: "sentuh_3warna_benda_3gambar",
    name: "Sentuh 3warna benda 3gambar",
    ageRange: "4 Tahun",
    premium: true,
  },
  {
    id: "tarik_garis_angka_1_5",
    name: "Tarik Garis Angka 1-5",
    ageRange: "4 Tahun",
    premium: true,
  },
  {
    id: "mengenal_5warna_4gambar",
    name: "Mengenal 5warna-merah-kuning-biru-hijau(4gambar)",
    ageRange: "4 Tahun",
    premium: true,
  },
  {
    id: "mengenal_6warna_4gambar",
    name: "Mengenal 6warna (4gambar)",
    ageRange: "4 Tahun",
    premium: true,
  },
  {
    id: "fungsi_alat_indera",
    name: "Fungsi Alat Indera",
    ageRange: "5 Tahun",
    premium: false,
  },
  {
    id: "aku_istimewa_advance",
    name: "Aku Istimewa - Ayo Kenali Alat Indera di Wajahmu!",
    ageRange: "5 Tahun",
    premium: true,
  },
  {
    id: "tunjuk_angka_1_5_3gambar",
    name: "Tunjuk sesuai angka (3 gambar)",
    ageRange: "5 Tahun",
    premium: true,
  },
  {
    id: "tunjuk_angka_1_5_4gambar",
    name: "Tunjuk Sesuai Angka (4 gambar)",
    ageRange: "5 Tahun",
    premium: true,
  },
  {
    id: "tunjuk_angka_1_5_2gambar",
    name: "Tunjuk sesuai angka (2 gambar)",
    ageRange: "3 Tahun",
    premium: true,
  },
  {
    id: "aku_mengenal_warna",
    name: "Aku Mengenal Warna",
    ageRange: "3 Tahun",
    premium: true,
  },
  {
    id: "puzzle_hewan_2keping",
    name: "Puzzle Hewan Ternak Ceria",
    ageRange: "3 Tahun",
    premium: true,
  },
  // TODO: tambahkan 44 game lainnya di sini, format sama seperti di atas.
];

export function findGame(gameId: string): GameCatalogEntry | undefined {
  return GAMES_CATALOG.find((g) => g.id === gameId);
}
