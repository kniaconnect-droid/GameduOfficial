// src/lib/worksheets.ts
//
// Data TAMPILAN katalog worksheet di client (judul, deskripsi, thumbnail).
// Ini terpisah dari api/_lib/worksheetsCatalog.ts (yang jadi sumber kebenaran
// premium-gating di server) -- sengaja dipisah dengan pola yang sama seperti
// games: data tampilan boleh dari client, tapi keputusan "boleh download atau
// tidak" WAJIB selalu dicek ulang di server tiap request.
//
// CATATAN: worksheet-nya berupa gambar (PNG), BUKAN PDF. id di sini HARUS
// sinkron dengan id di api/_lib/worksheetsCatalog.ts (plus file PNG asli di
// server/worksheets/) supaya tombol download bisa jalan.

// Thumbnail worksheet, dikelompokkan per usia sesuai penamaan file aslinya.
import wsImg3thnCocokkanPotonganGambar from "../assets/images/worksheets/3thn Cocokkan potongan gambar.webp";
import wsImg3thnKenaliKendaraan from "../assets/images/worksheets/3thn Kenali kendaraan.webp";
import wsImg3thnSusunRoket from "../assets/images/worksheets/3thn Susun roket.webp";
import wsImg3thnUrutanSebelumMakanAnakLakiLaki from "../assets/images/worksheets/3thn Urutan sebelum makan anak laki-laki.webp";
import wsImg3thnUrutanSebelumMakanAnakPerempuan from "../assets/images/worksheets/3thn Urutan sebelum makan anak perempuan.webp";
import wsImg3thnUrutanSebelumTidurAnakLakiLaki from "../assets/images/worksheets/3thn Urutan sebelum tidur anak laki-laki.webp";
import wsImg3thnUrutanSebelumTidurAnakPerempuan from "../assets/images/worksheets/3thn Urutan sebelum tidur anak perempuan.webp";
import wsImg3thnCariBentukYangSama from "../assets/images/worksheets/3thn cari bentuk yang sama.webp";
import wsImg3thnLatihanFokus from "../assets/images/worksheets/3thn latihan fokus.webp";
import wsImg3thnManaYangBerbeda from "../assets/images/worksheets/3thn mana yang berbeda.webp";
import wsImg3thnMengenalDiriku from "../assets/images/worksheets/3thn mengenal diriku.webp";
import wsImg3thnMengenalWajahku from "../assets/images/worksheets/3thn mengenal wajahku.webp";
import wsImg3thnPasanganGambarYangSama from "../assets/images/worksheets/3thn pasangan gambar yang sama.webp";
import wsImg3thnPersepsiVisual from "../assets/images/worksheets/3thn persepsi visual.webp";
import wsImg3thnPuzzleGambar from "../assets/images/worksheets/3thn puzzle gambar.webp";
import wsImg45thnAktivitasGuntingTempelUrutanSebelumMakanAnakLakiLaki from "../assets/images/worksheets/4-5thn Aktivitas gunting tempel Urutan sebelum makan anak laki-laki.webp";
import wsImg45thnAktivitasGuntingTempelUrutanSebelumMakanAnakPerempuan from "../assets/images/worksheets/4-5thn Aktivitas gunting tempel Urutan sebelum makan anak perempuan.webp";
import wsImg45thnUrutanSebelumMakanAnakLakiLaki from "../assets/images/worksheets/4-5thn Urutan sebelum makan anak laki-laki.webp";
import wsImg45thnUrutanSebelumMakanAnakPerempuan from "../assets/images/worksheets/4-5thn Urutan sebelum makan anak perempuan.webp";
import wsImg45thnUrutanSebelumTidurAnakLakiLaki from "../assets/images/worksheets/4-5thn Urutan sebelum tidur anak laki-laki.webp";
import wsImg45thnUrutanSebelumTidurAnakPerempuan from "../assets/images/worksheets/4-5thn Urutan sebelum tidur anak perempuan.webp";
import wsImg45thnBerhitung from "../assets/images/worksheets/4-5thn berhitung.webp";
import wsImg45thnMengenalAngka15MenebalkanAngka from "../assets/images/worksheets/4-5thn mengenal angka 1-5 menebalkan angka.webp";
import wsImg45thnMengenalAngka15 from "../assets/images/worksheets/4-5thn mengenal angka 1-5.webp";
import wsImg45thnYangBedaYangMana from "../assets/images/worksheets/4-5thn yang beda yang mana.webp";
import wsImg45thnYangBerbedaYangMana from "../assets/images/worksheets/4-5thn yang berbeda yang mana.webp";
import wsImg46thnCocokKanBentuknya from "../assets/images/worksheets/4-6thn Cocok kan bentuknya.webp";
import wsImg46thnCariPasangannya from "../assets/images/worksheets/4-6thn cari pasangannya.webp";
import wsImg46thnCariPerbedaannya from "../assets/images/worksheets/4-6thn cari perbedaannya.webp";
import wsImg4thnCocokkanBayangannya from "../assets/images/worksheets/4thn Cocokkan Bayangannya.webp";
import wsImg4thnCocokkanGambarKendaraan from "../assets/images/worksheets/4thn Cocokkan gambar kendaraan.webp";
import wsImg4thnHewanTinggalDimana from "../assets/images/worksheets/4thn Hewan tinggal dimana.webp";
import wsImg4thnMengenalAngka15DanMenarikGaris from "../assets/images/worksheets/4thn Mengenal angka 1-5 dan menarik garis.webp";
import wsImg4thnCariPerbedaan from "../assets/images/worksheets/4thn cari perbedaan.webp";
import wsImg4thnLatihanFokus from "../assets/images/worksheets/4thn latihan fokus.webp";
import wsImg4thnPersepsiVisual from "../assets/images/worksheets/4thn persepsi visual.webp";
import wsImg4thnPuzzleGambar from "../assets/images/worksheets/4thn puzzle gambar.webp";
import wsImg4thnSusunBuaya from "../assets/images/worksheets/4thn susun buaya.webp";
import wsImg4thnTemukanPolaYangSama from "../assets/images/worksheets/4thn temukan pola yang sama.webp";
import wsImg56thnCocokKanGambarYangSama from "../assets/images/worksheets/5-6thn Cocok kan gambar yang sama.webp";
import wsImg56thnCariPasanganYangSama from "../assets/images/worksheets/5-6thn cari pasangan yang sama.webp";
import wsImg5thnCariPerbedaannya from "../assets/images/worksheets/5thn Cari Perbedaannya.webp";
import wsImg5thnCocokkanBayangannya from "../assets/images/worksheets/5thn Cocokkan Bayangannya.webp";
import wsImg5thnCocokkanGambar from "../assets/images/worksheets/5thn Cocokkan gambar.webp";
import wsImg5thnCocokkanPolanya from "../assets/images/worksheets/5thn Cocokkan polanya.webp";
import wsImg5thnLatihanFokus from "../assets/images/worksheets/5thn latihan fokus.webp";
import wsImg5thnMengenalWarnaDenganMewarnaiGambar from "../assets/images/worksheets/5thn mengenal warna dengan mewarnai gambar.webp";
import wsImg5thnMengenalWarnaTarikGaris from "../assets/images/worksheets/5thn mengenal warna tarik garis.webp";
import wsImg5thnPersepsiVisual from "../assets/images/worksheets/5thn persepsi visual.webp";
import wsImg5thnPuzzleGambar from "../assets/images/worksheets/5thn puzzle gambar.webp";
import wsImg5thnSusunBuaya from "../assets/images/worksheets/5thn susun buaya.webp";
import wsImg5thnUrutan110 from "../assets/images/worksheets/5thn urutan 1-10.webp";

export interface WorksheetItem {
  id: string;
  title: string;
  description: string;
  category: "alat-indera" | "matematika" | "kognitif" | "warna" | "kemandirian" | "pengetahuan-umum";
  thumbnail: string;
  ageRange: string;
}

export const WORKSHEET_CATEGORIES: Record<string, { label: string }> = {
  "alat-indera": { label: "Alat Indera (Tema Diriku)" },
  matematika: { label: "Matematika (Mengenal Angka)" },
  kognitif: { label: "Kognitif (Fokus & Persepsi Visual)" },
  warna: { label: "Mengenal Warna" },
  kemandirian: { label: "Kemandirian (Urutan Aktivitas Harian)" },
  "pengetahuan-umum": { label: "Pengetahuan Umum" },
};

export const WORKSHEETS: WorksheetItem[] = [
  {
    id: "usia3_cocokkan_potongan_gambar",
    title: "Cocokkan Potongan Gambar",
    description: "Lembar aktivitas \"Cocokkan Potongan Gambar\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kognitif",
    thumbnail: wsImg3thnCocokkanPotonganGambar,
    ageRange: "3",
  },
  {
    id: "usia3_kenali_kendaraan",
    title: "Kenali Kendaraan",
    description: "Lembar aktivitas \"Kenali Kendaraan\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "pengetahuan-umum",
    thumbnail: wsImg3thnKenaliKendaraan,
    ageRange: "3",
  },
  {
    id: "usia3_susun_roket",
    title: "Susun Roket",
    description: "Lembar aktivitas \"Susun Roket\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kognitif",
    thumbnail: wsImg3thnSusunRoket,
    ageRange: "3",
  },
  {
    id: "usia3_urutan_sebelum_makan_anak_laki_laki",
    title: "Urutan Sebelum Makan Anak Laki-laki",
    description: "Lembar aktivitas \"Urutan Sebelum Makan Anak Laki-laki\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kemandirian",
    thumbnail: wsImg3thnUrutanSebelumMakanAnakLakiLaki,
    ageRange: "3",
  },
  {
    id: "usia3_urutan_sebelum_makan_anak_perempuan",
    title: "Urutan Sebelum Makan Anak Perempuan",
    description: "Lembar aktivitas \"Urutan Sebelum Makan Anak Perempuan\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kemandirian",
    thumbnail: wsImg3thnUrutanSebelumMakanAnakPerempuan,
    ageRange: "3",
  },
  {
    id: "usia3_urutan_sebelum_tidur_anak_laki_laki",
    title: "Urutan Sebelum Tidur Anak Laki-laki",
    description: "Lembar aktivitas \"Urutan Sebelum Tidur Anak Laki-laki\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kemandirian",
    thumbnail: wsImg3thnUrutanSebelumTidurAnakLakiLaki,
    ageRange: "3",
  },
  {
    id: "usia3_urutan_sebelum_tidur_anak_perempuan",
    title: "Urutan Sebelum Tidur Anak Perempuan",
    description: "Lembar aktivitas \"Urutan Sebelum Tidur Anak Perempuan\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kemandirian",
    thumbnail: wsImg3thnUrutanSebelumTidurAnakPerempuan,
    ageRange: "3",
  },
  {
    id: "usia3_cari_bentuk_yang_sama",
    title: "Cari Bentuk yang Sama",
    description: "Lembar aktivitas \"Cari Bentuk yang Sama\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kognitif",
    thumbnail: wsImg3thnCariBentukYangSama,
    ageRange: "3",
  },
  {
    id: "usia3_latihan_fokus",
    title: "Latihan Fokus",
    description: "Lembar aktivitas \"Latihan Fokus\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kognitif",
    thumbnail: wsImg3thnLatihanFokus,
    ageRange: "3",
  },
  {
    id: "usia3_mana_yang_berbeda",
    title: "Mana yang Berbeda",
    description: "Lembar aktivitas \"Mana yang Berbeda\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kognitif",
    thumbnail: wsImg3thnManaYangBerbeda,
    ageRange: "3",
  },
  {
    id: "usia3_mengenal_diriku",
    title: "Mengenal Diriku",
    description: "Lembar aktivitas \"Mengenal Diriku\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "alat-indera",
    thumbnail: wsImg3thnMengenalDiriku,
    ageRange: "3",
  },
  {
    id: "usia3_mengenal_wajahku",
    title: "Mengenal Wajahku",
    description: "Lembar aktivitas \"Mengenal Wajahku\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "alat-indera",
    thumbnail: wsImg3thnMengenalWajahku,
    ageRange: "3",
  },
  {
    id: "usia3_pasangan_gambar_yang_sama",
    title: "Pasangan Gambar yang Sama",
    description: "Lembar aktivitas \"Pasangan Gambar yang Sama\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kognitif",
    thumbnail: wsImg3thnPasanganGambarYangSama,
    ageRange: "3",
  },
  {
    id: "usia3_persepsi_visual",
    title: "Persepsi Visual",
    description: "Lembar aktivitas \"Persepsi Visual\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kognitif",
    thumbnail: wsImg3thnPersepsiVisual,
    ageRange: "3",
  },
  {
    id: "usia3_puzzle_gambar",
    title: "Puzzle Gambar",
    description: "Lembar aktivitas \"Puzzle Gambar\" untuk melatih kemampuan anak usia 3 tahun.",
    category: "kognitif",
    thumbnail: wsImg3thnPuzzleGambar,
    ageRange: "3",
  },
  {
    id: "usia4_5_aktivitas_gunting_tempel_urutan_sebelum_makan_anak_laki_laki",
    title: "Aktivitas Gunting Tempel Urutan Sebelum Makan Anak Laki-laki",
    description: "Lembar aktivitas \"Aktivitas Gunting Tempel Urutan Sebelum Makan Anak Laki-laki\" untuk melatih kemampuan anak usia 4-5 tahun.",
    category: "kemandirian",
    thumbnail: wsImg45thnAktivitasGuntingTempelUrutanSebelumMakanAnakLakiLaki,
    ageRange: "4,5",
  },
  {
    id: "usia4_5_aktivitas_gunting_tempel_urutan_sebelum_makan_anak_perempuan",
    title: "Aktivitas Gunting Tempel Urutan Sebelum Makan Anak Perempuan",
    description: "Lembar aktivitas \"Aktivitas Gunting Tempel Urutan Sebelum Makan Anak Perempuan\" untuk melatih kemampuan anak usia 4-5 tahun.",
    category: "kemandirian",
    thumbnail: wsImg45thnAktivitasGuntingTempelUrutanSebelumMakanAnakPerempuan,
    ageRange: "4,5",
  },
  {
    id: "usia4_5_urutan_sebelum_makan_anak_laki_laki",
    title: "Urutan Sebelum Makan Anak Laki-laki",
    description: "Lembar aktivitas \"Urutan Sebelum Makan Anak Laki-laki\" untuk melatih kemampuan anak usia 4-5 tahun.",
    category: "kemandirian",
    thumbnail: wsImg45thnUrutanSebelumMakanAnakLakiLaki,
    ageRange: "4,5",
  },
  {
    id: "usia4_5_urutan_sebelum_makan_anak_perempuan",
    title: "Urutan Sebelum Makan Anak Perempuan",
    description: "Lembar aktivitas \"Urutan Sebelum Makan Anak Perempuan\" untuk melatih kemampuan anak usia 4-5 tahun.",
    category: "kemandirian",
    thumbnail: wsImg45thnUrutanSebelumMakanAnakPerempuan,
    ageRange: "4,5",
  },
  {
    id: "usia4_5_urutan_sebelum_tidur_anak_laki_laki",
    title: "Urutan Sebelum Tidur Anak Laki-laki",
    description: "Lembar aktivitas \"Urutan Sebelum Tidur Anak Laki-laki\" untuk melatih kemampuan anak usia 4-5 tahun.",
    category: "kemandirian",
    thumbnail: wsImg45thnUrutanSebelumTidurAnakLakiLaki,
    ageRange: "4,5",
  },
  {
    id: "usia4_5_urutan_sebelum_tidur_anak_perempuan",
    title: "Urutan Sebelum Tidur Anak Perempuan",
    description: "Lembar aktivitas \"Urutan Sebelum Tidur Anak Perempuan\" untuk melatih kemampuan anak usia 4-5 tahun.",
    category: "kemandirian",
    thumbnail: wsImg45thnUrutanSebelumTidurAnakPerempuan,
    ageRange: "4,5",
  },
  {
    id: "usia4_5_berhitung",
    title: "Berhitung",
    description: "Lembar aktivitas \"Berhitung\" untuk melatih kemampuan anak usia 4-5 tahun.",
    category: "matematika",
    thumbnail: wsImg45thnBerhitung,
    ageRange: "4,5",
  },
  {
    id: "usia4_5_mengenal_angka_1_5_menebalkan_angka",
    title: "Mengenal Angka 1-5 Menebalkan Angka",
    description: "Lembar aktivitas \"Mengenal Angka 1-5 Menebalkan Angka\" untuk melatih kemampuan anak usia 4-5 tahun.",
    category: "matematika",
    thumbnail: wsImg45thnMengenalAngka15MenebalkanAngka,
    ageRange: "4,5",
  },
  {
    id: "usia4_5_mengenal_angka_1_5",
    title: "Mengenal Angka 1-5",
    description: "Lembar aktivitas \"Mengenal Angka 1-5\" untuk melatih kemampuan anak usia 4-5 tahun.",
    category: "matematika",
    thumbnail: wsImg45thnMengenalAngka15,
    ageRange: "4,5",
  },
  {
    id: "usia4_5_yang_beda_yang_mana",
    title: "Yang Beda yang Mana",
    description: "Lembar aktivitas \"Yang Beda yang Mana\" untuk melatih kemampuan anak usia 4-5 tahun.",
    category: "kognitif",
    thumbnail: wsImg45thnYangBedaYangMana,
    ageRange: "4,5",
  },
  {
    id: "usia4_5_yang_berbeda_yang_mana",
    title: "Yang Berbeda yang Mana",
    description: "Lembar aktivitas \"Yang Berbeda yang Mana\" untuk melatih kemampuan anak usia 4-5 tahun.",
    category: "kognitif",
    thumbnail: wsImg45thnYangBerbedaYangMana,
    ageRange: "4,5",
  },
  {
    id: "usia4_6_cocok_kan_bentuknya",
    title: "Cocokkan Bentuknya",
    description: "Lembar aktivitas \"Cocokkan Bentuknya\" untuk melatih kemampuan anak usia 4-6 tahun.",
    category: "kognitif",
    thumbnail: wsImg46thnCocokKanBentuknya,
    ageRange: "4,5,6",
  },
  {
    id: "usia4_6_cari_pasangannya",
    title: "Cari Pasangannya",
    description: "Lembar aktivitas \"Cari Pasangannya\" untuk melatih kemampuan anak usia 4-6 tahun.",
    category: "kognitif",
    thumbnail: wsImg46thnCariPasangannya,
    ageRange: "4,5,6",
  },
  {
    id: "usia4_6_cari_perbedaannya",
    title: "Cari Perbedaannya",
    description: "Lembar aktivitas \"Cari Perbedaannya\" untuk melatih kemampuan anak usia 4-6 tahun.",
    category: "kognitif",
    thumbnail: wsImg46thnCariPerbedaannya,
    ageRange: "4,5,6",
  },
  {
    id: "usia4_cocokkan_bayangannya",
    title: "Cocokkan Bayangannya",
    description: "Lembar aktivitas \"Cocokkan Bayangannya\" untuk melatih kemampuan anak usia 4 tahun.",
    category: "kognitif",
    thumbnail: wsImg4thnCocokkanBayangannya,
    ageRange: "4",
  },
  {
    id: "usia4_cocokkan_gambar_kendaraan",
    title: "Cocokkan Gambar Kendaraan",
    description: "Lembar aktivitas \"Cocokkan Gambar Kendaraan\" untuk melatih kemampuan anak usia 4 tahun.",
    category: "pengetahuan-umum",
    thumbnail: wsImg4thnCocokkanGambarKendaraan,
    ageRange: "4",
  },
  {
    id: "usia4_hewan_tinggal_dimana",
    title: "Hewan Tinggal Dimana",
    description: "Lembar aktivitas \"Hewan Tinggal Dimana\" untuk melatih kemampuan anak usia 4 tahun.",
    category: "pengetahuan-umum",
    thumbnail: wsImg4thnHewanTinggalDimana,
    ageRange: "4",
  },
  {
    id: "usia4_mengenal_angka_1_5_dan_menarik_garis",
    title: "Mengenal Angka 1-5 dan Menarik Garis",
    description: "Lembar aktivitas \"Mengenal Angka 1-5 dan Menarik Garis\" untuk melatih kemampuan anak usia 4 tahun.",
    category: "matematika",
    thumbnail: wsImg4thnMengenalAngka15DanMenarikGaris,
    ageRange: "4",
  },
  {
    id: "usia4_cari_perbedaan",
    title: "Cari Perbedaan",
    description: "Lembar aktivitas \"Cari Perbedaan\" untuk melatih kemampuan anak usia 4 tahun.",
    category: "kognitif",
    thumbnail: wsImg4thnCariPerbedaan,
    ageRange: "4",
  },
  {
    id: "usia4_latihan_fokus",
    title: "Latihan Fokus",
    description: "Lembar aktivitas \"Latihan Fokus\" untuk melatih kemampuan anak usia 4 tahun.",
    category: "kognitif",
    thumbnail: wsImg4thnLatihanFokus,
    ageRange: "4",
  },
  {
    id: "usia4_persepsi_visual",
    title: "Persepsi Visual",
    description: "Lembar aktivitas \"Persepsi Visual\" untuk melatih kemampuan anak usia 4 tahun.",
    category: "kognitif",
    thumbnail: wsImg4thnPersepsiVisual,
    ageRange: "4",
  },
  {
    id: "usia4_puzzle_gambar",
    title: "Puzzle Gambar",
    description: "Lembar aktivitas \"Puzzle Gambar\" untuk melatih kemampuan anak usia 4 tahun.",
    category: "kognitif",
    thumbnail: wsImg4thnPuzzleGambar,
    ageRange: "4",
  },
  {
    id: "usia4_susun_buaya",
    title: "Susun Buaya",
    description: "Lembar aktivitas \"Susun Buaya\" untuk melatih kemampuan anak usia 4 tahun.",
    category: "kognitif",
    thumbnail: wsImg4thnSusunBuaya,
    ageRange: "4",
  },
  {
    id: "usia4_temukan_pola_yang_sama",
    title: "Temukan Pola yang Sama",
    description: "Lembar aktivitas \"Temukan Pola yang Sama\" untuk melatih kemampuan anak usia 4 tahun.",
    category: "kognitif",
    thumbnail: wsImg4thnTemukanPolaYangSama,
    ageRange: "4",
  },
  {
    id: "usia5_6_cocok_kan_gambar_yang_sama",
    title: "Cocokkan Gambar yang Sama",
    description: "Lembar aktivitas \"Cocokkan Gambar yang Sama\" untuk melatih kemampuan anak usia 5-6 tahun.",
    category: "kognitif",
    thumbnail: wsImg56thnCocokKanGambarYangSama,
    ageRange: "5,6",
  },
  {
    id: "usia5_6_cari_pasangan_yang_sama",
    title: "Cari Pasangan yang Sama",
    description: "Lembar aktivitas \"Cari Pasangan yang Sama\" untuk melatih kemampuan anak usia 5-6 tahun.",
    category: "kognitif",
    thumbnail: wsImg56thnCariPasanganYangSama,
    ageRange: "5,6",
  },
  {
    id: "usia5_cari_perbedaannya",
    title: "Cari Perbedaannya",
    description: "Lembar aktivitas \"Cari Perbedaannya\" untuk melatih kemampuan anak usia 5 tahun.",
    category: "kognitif",
    thumbnail: wsImg5thnCariPerbedaannya,
    ageRange: "5",
  },
  {
    id: "usia5_cocokkan_bayangannya",
    title: "Cocokkan Bayangannya",
    description: "Lembar aktivitas \"Cocokkan Bayangannya\" untuk melatih kemampuan anak usia 5 tahun.",
    category: "kognitif",
    thumbnail: wsImg5thnCocokkanBayangannya,
    ageRange: "5",
  },
  {
    id: "usia5_cocokkan_gambar",
    title: "Cocokkan Gambar",
    description: "Lembar aktivitas \"Cocokkan Gambar\" untuk melatih kemampuan anak usia 5 tahun.",
    category: "kognitif",
    thumbnail: wsImg5thnCocokkanGambar,
    ageRange: "5",
  },
  {
    id: "usia5_cocokkan_polanya",
    title: "Cocokkan Polanya",
    description: "Lembar aktivitas \"Cocokkan Polanya\" untuk melatih kemampuan anak usia 5 tahun.",
    category: "kognitif",
    thumbnail: wsImg5thnCocokkanPolanya,
    ageRange: "5",
  },
  {
    id: "usia5_latihan_fokus",
    title: "Latihan Fokus",
    description: "Lembar aktivitas \"Latihan Fokus\" untuk melatih kemampuan anak usia 5 tahun.",
    category: "kognitif",
    thumbnail: wsImg5thnLatihanFokus,
    ageRange: "5",
  },
  {
    id: "usia5_mengenal_warna_dengan_mewarnai_gambar",
    title: "Mengenal Warna Dengan Mewarnai Gambar",
    description: "Lembar aktivitas \"Mengenal Warna Dengan Mewarnai Gambar\" untuk melatih kemampuan anak usia 5 tahun.",
    category: "warna",
    thumbnail: wsImg5thnMengenalWarnaDenganMewarnaiGambar,
    ageRange: "5",
  },
  {
    id: "usia5_mengenal_warna_tarik_garis",
    title: "Mengenal Warna Tarik Garis",
    description: "Lembar aktivitas \"Mengenal Warna Tarik Garis\" untuk melatih kemampuan anak usia 5 tahun.",
    category: "warna",
    thumbnail: wsImg5thnMengenalWarnaTarikGaris,
    ageRange: "5",
  },
  {
    id: "usia5_persepsi_visual",
    title: "Persepsi Visual",
    description: "Lembar aktivitas \"Persepsi Visual\" untuk melatih kemampuan anak usia 5 tahun.",
    category: "kognitif",
    thumbnail: wsImg5thnPersepsiVisual,
    ageRange: "5",
  },
  {
    id: "usia5_puzzle_gambar",
    title: "Puzzle Gambar",
    description: "Lembar aktivitas \"Puzzle Gambar\" untuk melatih kemampuan anak usia 5 tahun.",
    category: "kognitif",
    thumbnail: wsImg5thnPuzzleGambar,
    ageRange: "5",
  },
  {
    id: "usia5_susun_buaya",
    title: "Susun Buaya",
    description: "Lembar aktivitas \"Susun Buaya\" untuk melatih kemampuan anak usia 5 tahun.",
    category: "kognitif",
    thumbnail: wsImg5thnSusunBuaya,
    ageRange: "5",
  },
  {
    id: "usia5_urutan_1_10",
    title: "Urutan 1-10",
    description: "Lembar aktivitas \"Urutan 1-10\" untuk melatih kemampuan anak usia 5 tahun.",
    category: "matematika",
    thumbnail: wsImg5thnUrutan110,
    ageRange: "5",
  },
];
