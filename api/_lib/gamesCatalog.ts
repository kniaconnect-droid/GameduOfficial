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
    ageRange: "4-5 Tahun",
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
    ageRange: "3 Tahun",
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
    id: "susun_huruf_8_anggota_tubuh",
    name: "Susun Huruf 8 Anggota Tubuh",
    ageRange: "4 Tahun",
    premium: false,
  },
  {
    id: "mencocokkan_nama_alat_indera",
    name: "Mencocokkan Nama Alat Indera",
    ageRange: "4 Tahun",
    premium: true,
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
    id: "fungsi_alat_indera",
    name: "Fungsi Alat Indera",
    ageRange: "5 Tahun",
    premium: true,
  },
  {
    id: "aku_istimewa_advance",
    name: "Aku Istimewa - Ayo Kenali Alat Indera di Wajahmu!",
    ageRange: "5 Tahun",
    premium: true,
  },
  // TODO: tambahkan 48 game lainnya di sini, format sama seperti di atas.
];

export function findGame(gameId: string): GameCatalogEntry | undefined {
  return GAMES_CATALOG.find((g) => g.id === gameId);
}
