// api/_lib/worksheetsCatalog.ts
//
// Daftar worksheet (LKPD) & status premium-nya, dibaca di SERVER SAJA
// (api/worksheets/[worksheetId].ts). Sama seperti gamesCatalog.ts -- sengaja
// dipisah dari data yang dipakai buat tampilan katalog di src/lib/worksheets.ts,
// supaya status premium yang menentukan boleh-tidaknya download selalu dicek
// dari sini, bukan dari data yang datang dari client.
//
// CATATAN: worksheet-nya berupa gambar (PNG), BUKAN PDF. File asli ada di
// server/worksheets/{fileName}, ikut ke-deploy sebagai bagian dari source (sama
// pola-nya kayak server/games/). id di sini HARUS sinkron dengan id di
// src/lib/worksheets.ts supaya tombol download di katalog nyambung ke file yang
// benar.

export interface WorksheetCatalogEntry {
  id: string;
  title: string;
  category: "alat-indera" | "matematika" | "kognitif" | "warna" | "kemandirian" | "pengetahuan-umum";
  premium: boolean;
  fileName: string; // nama file gambar (PNG) di server/worksheets/
}

export const WORKSHEETS_CATALOG: WorksheetCatalogEntry[] = [
  // Usia 3 thn
  {
    id: "usia3_cocokkan_potongan_gambar",
    title: "Cocokkan Potongan Gambar",
    category: "kognitif",
    premium: true,
    fileName: "usia3_cocokkan_potongan_gambar.png",
  },
  {
    id: "usia3_kenali_kendaraan",
    title: "Kenali Kendaraan",
    category: "pengetahuan-umum",
    premium: true,
    fileName: "usia3_kenali_kendaraan.png",
  },
  {
    id: "usia3_susun_roket",
    title: "Susun Roket",
    category: "kognitif",
    premium: true,
    fileName: "usia3_susun_roket.png",
  },
  {
    id: "usia3_urutan_sebelum_makan_anak_laki_laki",
    title: "Urutan Sebelum Makan Anak Laki-laki",
    category: "kemandirian",
    premium: true,
    fileName: "usia3_urutan_sebelum_makan_anak_laki_laki.png",
  },
  {
    id: "usia3_urutan_sebelum_makan_anak_perempuan",
    title: "Urutan Sebelum Makan Anak Perempuan",
    category: "kemandirian",
    premium: true,
    fileName: "usia3_urutan_sebelum_makan_anak_perempuan.png",
  },
  {
    id: "usia3_urutan_sebelum_tidur_anak_laki_laki",
    title: "Urutan Sebelum Tidur Anak Laki-laki",
    category: "kemandirian",
    premium: true,
    fileName: "usia3_urutan_sebelum_tidur_anak_laki_laki.png",
  },
  {
    id: "usia3_urutan_sebelum_tidur_anak_perempuan",
    title: "Urutan Sebelum Tidur Anak Perempuan",
    category: "kemandirian",
    premium: true,
    fileName: "usia3_urutan_sebelum_tidur_anak_perempuan.png",
  },
  {
    id: "usia3_cari_bentuk_yang_sama",
    title: "Cari Bentuk yang Sama",
    category: "kognitif",
    premium: true,
    fileName: "usia3_cari_bentuk_yang_sama.png",
  },
  {
    id: "usia3_latihan_fokus",
    title: "Latihan Fokus",
    category: "kognitif",
    premium: true,
    fileName: "usia3_latihan_fokus.png",
  },
  {
    id: "usia3_mana_yang_berbeda",
    title: "Mana yang Berbeda",
    category: "kognitif",
    premium: true,
    fileName: "usia3_mana_yang_berbeda.png",
  },
  {
    id: "usia3_mengenal_diriku",
    title: "Mengenal Diriku",
    category: "alat-indera",
    premium: true,
    fileName: "usia3_mengenal_diriku.png",
  },
  {
    id: "usia3_mengenal_wajahku",
    title: "Mengenal Wajahku",
    category: "alat-indera",
    premium: true,
    fileName: "usia3_mengenal_wajahku.png",
  },
  {
    id: "usia3_pasangan_gambar_yang_sama",
    title: "Pasangan Gambar yang Sama",
    category: "kognitif",
    premium: true,
    fileName: "usia3_pasangan_gambar_yang_sama.png",
  },
  {
    id: "usia3_persepsi_visual",
    title: "Persepsi Visual",
    category: "kognitif",
    premium: true,
    fileName: "usia3_persepsi_visual.png",
  },
  {
    id: "usia3_puzzle_gambar",
    title: "Puzzle Gambar",
    category: "kognitif",
    premium: true,
    fileName: "usia3_puzzle_gambar.png",
  },
  // Usia 4-5 thn
  {
    id: "usia4_5_aktivitas_gunting_tempel_urutan_sebelum_makan_anak_laki_laki",
    title: "Aktivitas Gunting Tempel Urutan Sebelum Makan Anak Laki-laki",
    category: "kemandirian",
    premium: true,
    fileName: "usia4_5_aktivitas_gunting_tempel_urutan_sebelum_makan_anak_laki_laki.png",
  },
  {
    id: "usia4_5_aktivitas_gunting_tempel_urutan_sebelum_makan_anak_perempuan",
    title: "Aktivitas Gunting Tempel Urutan Sebelum Makan Anak Perempuan",
    category: "kemandirian",
    premium: true,
    fileName: "usia4_5_aktivitas_gunting_tempel_urutan_sebelum_makan_anak_perempuan.png",
  },
  {
    id: "usia4_5_urutan_sebelum_makan_anak_laki_laki",
    title: "Urutan Sebelum Makan Anak Laki-laki",
    category: "kemandirian",
    premium: true,
    fileName: "usia4_5_urutan_sebelum_makan_anak_laki_laki.png",
  },
  {
    id: "usia4_5_urutan_sebelum_makan_anak_perempuan",
    title: "Urutan Sebelum Makan Anak Perempuan",
    category: "kemandirian",
    premium: true,
    fileName: "usia4_5_urutan_sebelum_makan_anak_perempuan.png",
  },
  {
    id: "usia4_5_urutan_sebelum_tidur_anak_laki_laki",
    title: "Urutan Sebelum Tidur Anak Laki-laki",
    category: "kemandirian",
    premium: true,
    fileName: "usia4_5_urutan_sebelum_tidur_anak_laki_laki.png",
  },
  {
    id: "usia4_5_urutan_sebelum_tidur_anak_perempuan",
    title: "Urutan Sebelum Tidur Anak Perempuan",
    category: "kemandirian",
    premium: true,
    fileName: "usia4_5_urutan_sebelum_tidur_anak_perempuan.png",
  },
  {
    id: "usia4_5_berhitung",
    title: "Berhitung",
    category: "matematika",
    premium: true,
    fileName: "usia4_5_berhitung.png",
  },
  {
    id: "usia4_5_mengenal_angka_1_5_menebalkan_angka",
    title: "Mengenal Angka 1-5 Menebalkan Angka",
    category: "matematika",
    premium: true,
    fileName: "usia4_5_mengenal_angka_1_5_menebalkan_angka.png",
  },
  {
    id: "usia4_5_mengenal_angka_1_5",
    title: "Mengenal Angka 1-5",
    category: "matematika",
    premium: true,
    fileName: "usia4_5_mengenal_angka_1_5.png",
  },
  {
    id: "usia4_5_yang_beda_yang_mana",
    title: "Yang Beda yang Mana",
    category: "kognitif",
    premium: true,
    fileName: "usia4_5_yang_beda_yang_mana.png",
  },
  {
    id: "usia4_5_yang_berbeda_yang_mana",
    title: "Yang Berbeda yang Mana",
    category: "kognitif",
    premium: true,
    fileName: "usia4_5_yang_berbeda_yang_mana.png",
  },
  // Usia 4-6 thn
  {
    id: "usia4_6_cocok_kan_bentuknya",
    title: "Cocokkan Bentuknya",
    category: "kognitif",
    premium: true,
    fileName: "usia4_6_cocok_kan_bentuknya.png",
  },
  {
    id: "usia4_6_cari_pasangannya",
    title: "Cari Pasangannya",
    category: "kognitif",
    premium: true,
    fileName: "usia4_6_cari_pasangannya.png",
  },
  {
    id: "usia4_6_cari_perbedaannya",
    title: "Cari Perbedaannya",
    category: "kognitif",
    premium: true,
    fileName: "usia4_6_cari_perbedaannya.png",
  },
  // Usia 4 thn
  {
    id: "usia4_cocokkan_bayangannya",
    title: "Cocokkan Bayangannya",
    category: "kognitif",
    premium: true,
    fileName: "usia4_cocokkan_bayangannya.png",
  },
  {
    id: "usia4_cocokkan_gambar_kendaraan",
    title: "Cocokkan Gambar Kendaraan",
    category: "pengetahuan-umum",
    premium: true,
    fileName: "usia4_cocokkan_gambar_kendaraan.png",
  },
  {
    id: "usia4_hewan_tinggal_dimana",
    title: "Hewan Tinggal Dimana",
    category: "pengetahuan-umum",
    premium: true,
    fileName: "usia4_hewan_tinggal_dimana.png",
  },
  {
    id: "usia4_mengenal_angka_1_5_dan_menarik_garis",
    title: "Mengenal Angka 1-5 dan Menarik Garis",
    category: "matematika",
    premium: true,
    fileName: "usia4_mengenal_angka_1_5_dan_menarik_garis.png",
  },
  {
    id: "usia4_cari_perbedaan",
    title: "Cari Perbedaan",
    category: "kognitif",
    premium: true,
    fileName: "usia4_cari_perbedaan.png",
  },
  {
    id: "usia4_latihan_fokus",
    title: "Latihan Fokus",
    category: "kognitif",
    premium: true,
    fileName: "usia4_latihan_fokus.png",
  },
  {
    id: "usia4_persepsi_visual",
    title: "Persepsi Visual",
    category: "kognitif",
    premium: true,
    fileName: "usia4_persepsi_visual.png",
  },
  {
    id: "usia4_puzzle_gambar",
    title: "Puzzle Gambar",
    category: "kognitif",
    premium: true,
    fileName: "usia4_puzzle_gambar.png",
  },
  {
    id: "usia4_susun_buaya",
    title: "Susun Buaya",
    category: "kognitif",
    premium: true,
    fileName: "usia4_susun_buaya.png",
  },
  {
    id: "usia4_temukan_pola_yang_sama",
    title: "Temukan Pola yang Sama",
    category: "kognitif",
    premium: true,
    fileName: "usia4_temukan_pola_yang_sama.png",
  },
  // Usia 5-6 thn
  {
    id: "usia5_6_cocok_kan_gambar_yang_sama",
    title: "Cocokkan Gambar yang Sama",
    category: "kognitif",
    premium: true,
    fileName: "usia5_6_cocok_kan_gambar_yang_sama.png",
  },
  {
    id: "usia5_6_cari_pasangan_yang_sama",
    title: "Cari Pasangan yang Sama",
    category: "kognitif",
    premium: true,
    fileName: "usia5_6_cari_pasangan_yang_sama.png",
  },
  // Usia 5 thn
  {
    id: "usia5_cari_perbedaannya",
    title: "Cari Perbedaannya",
    category: "kognitif",
    premium: true,
    fileName: "usia5_cari_perbedaannya.png",
  },
  {
    id: "usia5_cocokkan_bayangannya",
    title: "Cocokkan Bayangannya",
    category: "kognitif",
    premium: true,
    fileName: "usia5_cocokkan_bayangannya.png",
  },
  {
    id: "usia5_cocokkan_gambar",
    title: "Cocokkan Gambar",
    category: "kognitif",
    premium: true,
    fileName: "usia5_cocokkan_gambar.png",
  },
  {
    id: "usia5_cocokkan_polanya",
    title: "Cocokkan Polanya",
    category: "kognitif",
    premium: true,
    fileName: "usia5_cocokkan_polanya.png",
  },
  {
    id: "usia5_latihan_fokus",
    title: "Latihan Fokus",
    category: "kognitif",
    premium: true,
    fileName: "usia5_latihan_fokus.png",
  },
  {
    id: "usia5_mengenal_warna_dengan_mewarnai_gambar",
    title: "Mengenal Warna Dengan Mewarnai Gambar",
    category: "warna",
    premium: true,
    fileName: "usia5_mengenal_warna_dengan_mewarnai_gambar.png",
  },
  {
    id: "usia5_mengenal_warna_tarik_garis",
    title: "Mengenal Warna Tarik Garis",
    category: "warna",
    premium: true,
    fileName: "usia5_mengenal_warna_tarik_garis.png",
  },
  {
    id: "usia5_persepsi_visual",
    title: "Persepsi Visual",
    category: "kognitif",
    premium: true,
    fileName: "usia5_persepsi_visual.png",
  },
  {
    id: "usia5_puzzle_gambar",
    title: "Puzzle Gambar",
    category: "kognitif",
    premium: true,
    fileName: "usia5_puzzle_gambar.png",
  },
  {
    id: "usia5_susun_buaya",
    title: "Susun Buaya",
    category: "kognitif",
    premium: true,
    fileName: "usia5_susun_buaya.png",
  },
  {
    id: "usia5_urutan_1_10",
    title: "Urutan 1-10",
    category: "matematika",
    premium: true,
    fileName: "usia5_urutan_1_10.png",
  },
  // TODO: tambahkan worksheet baru di sini tiap kali ada LKPD baru.
];

export function findWorksheet(worksheetId: string): WorksheetCatalogEntry | undefined {
  return WORKSHEETS_CATALOG.find((w) => w.id === worksheetId);
}
