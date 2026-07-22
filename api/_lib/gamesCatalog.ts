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
    name: "Susun Kata Anggota Tubuh",
    ageRange: "4-5 Tahun",
    premium: true,
  },
  {
    id: "berhitung_ceria",
    name: "Berhitung Ceria",
    ageRange: "3 Tahun",
    premium: true,
  },
  // TODO: tambahkan 48 game lainnya di sini, format sama seperti di atas.
];

export function findGame(gameId: string): GameCatalogEntry | undefined {
  return GAMES_CATALOG.find((g) => g.id === gameId);
}
