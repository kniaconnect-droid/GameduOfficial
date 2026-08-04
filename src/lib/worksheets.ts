// src/lib/worksheets.ts
//
// Data TAMPILAN katalog worksheet di client (judul, deskripsi, thumbnail).
// Ini terpisah dari api/_lib/worksheetsCatalog.ts (yang jadi sumber kebenaran
// premium-gating di server) -- sengaja dipisah dengan pola yang sama seperti
// games: data tampilan boleh dari client, tapi keputusan "boleh download atau
// tidak" WAJIB selalu dicek ulang di server tiap request.

import alatInderaAkuIstimewa from "../assets/images/worksheets/alatindera_aku_istimewa.jpg";
import alatInderaWajahPerempuan from "../assets/images/worksheets/alatindera_wajah_perempuan.jpg";
import alatInderaWajahLakilaki from "../assets/images/worksheets/alatindera_wajah_lakilaki.jpg";
import alatInderaLengkap from "../assets/images/worksheets/alatindera_aku_istimewa_dan_wajah.jpg";
import matematikaMengenalAngka from "../assets/images/worksheets/matematika_bab1_mengenal_angka.jpg";
import matematikaMencocokkan from "../assets/images/worksheets/matematika_bab1_mencocokkan_angka.jpg";
import matematikaMenghitung from "../assets/images/worksheets/matematika_bab1_menghitung_benda.jpg";

export interface WorksheetItem {
  id: string;
  title: string;
  description: string;
  category: "alat-indera" | "matematika";
  thumbnail: string;
  ageRange: string;
}

export const WORKSHEET_CATEGORIES: Record<string, { label: string; emoji: string }> = {
  "alat-indera": { label: "Alat Indera (Tema Diriku)", emoji: "🙂" },
  matematika: { label: "Matematika (Mengenal Angka)", emoji: "🔢" },
};

export const WORKSHEETS: WorksheetItem[] = [
  {
    id: "alatindera_aku_istimewa",
    title: "Aku Istimewa - Kenali Dirimu",
    description: "Anak mengenal nama, wajah, dan perasaannya sendiri lewat aktivitas tempel foto & tulis nama.",
    category: "alat-indera",
    thumbnail: alatInderaAkuIstimewa,
    ageRange: "3-4",
  },
  {
    id: "alatindera_wajah_perempuan",
    title: "Mengenal Wajahku (Versi Perempuan)",
    description: "Menarik garis ke bagian wajah (mata, hidung, mulut, telinga) dan mewarnai gambar wajah.",
    category: "alat-indera",
    thumbnail: alatInderaWajahPerempuan,
    ageRange: "3-4",
  },
  {
    id: "alatindera_wajah_lakilaki",
    title: "Mengenal Wajahku (Versi Laki-laki)",
    description: "Menarik garis ke bagian wajah (mata, hidung, mulut, telinga) dan mewarnai gambar wajah.",
    category: "alat-indera",
    thumbnail: alatInderaWajahLakilaki,
    ageRange: "3-4",
  },
  {
    id: "alatindera_aku_istimewa_dan_wajah",
    title: "Aku Istimewa & Mengenal Wajahku (Lengkap 2 Halaman)",
    description: "Gabungan lengkap 2 lembar kerja: mengenal diri sendiri sekaligus bagian-bagian wajah.",
    category: "alat-indera",
    thumbnail: alatInderaLengkap,
    ageRange: "3-4",
  },
  {
    id: "matematika_bab1_mengenal_angka",
    title: "BAB 1 - Mengenal Angka 1-5 (Tebalkan Angka)",
    description: "Menebalkan angka 1-5 sambil mencocokkan dengan jumlah benda pada gambar.",
    category: "matematika",
    thumbnail: matematikaMengenalAngka,
    ageRange: "4-5",
  },
  {
    id: "matematika_bab1_mencocokkan_angka",
    title: "BAB 1 - Mencocokkan Angka dan Jumlah Benda",
    description: "Menarik garis dari angka ke gambar benda dengan jumlah yang sesuai.",
    category: "matematika",
    thumbnail: matematikaMencocokkan,
    ageRange: "4-5",
  },
  {
    id: "matematika_bab1_menghitung_benda",
    title: "BAB 1 - Menghitung Benda 1-5",
    description: "Menghitung jumlah benda pada gambar lalu mewarnai kotak angka yang benar.",
    category: "matematika",
    thumbnail: matematikaMenghitung,
    ageRange: "4-5",
  },
];
