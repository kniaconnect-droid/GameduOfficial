// api/_lib/worksheetsCatalog.ts
//
// Daftar worksheet (LKPD) & status premium-nya, dibaca di SERVER SAJA
// (api/worksheets/[worksheetId].ts). Sama seperti gamesCatalog.ts -- sengaja
// dipisah dari data yang dipakai buat tampilan katalog di src/lib/worksheets.ts,
// supaya status premium yang menentukan boleh-tidaknya download selalu dicek
// dari sini, bukan dari data yang datang dari client.
//
// File PDF asli ada di server/worksheets/{fileName}, ikut ke-deploy sebagai
// bagian dari source (sama pola-nya kayak server/games/).

export interface WorksheetCatalogEntry {
  id: string;
  title: string;
  category: "alat-indera" | "matematika";
  premium: boolean;
  fileName: string; // nama file PDF di server/worksheets/
}

export const WORKSHEETS_CATALOG: WorksheetCatalogEntry[] = [
  // Kategori: Alat Indera (Tema Diriku)
  {
    id: "alatindera_aku_istimewa",
    title: "Aku Istimewa - Kenali Dirimu",
    category: "alat-indera",
    premium: true,
    fileName: "alatindera_aku_istimewa.pdf",
  },
  {
    id: "alatindera_wajah_perempuan",
    title: "Mengenal Wajahku (Versi Perempuan)",
    category: "alat-indera",
    premium: true,
    fileName: "alatindera_wajah_perempuan.pdf",
  },
  {
    id: "alatindera_wajah_lakilaki",
    title: "Mengenal Wajahku (Versi Laki-laki)",
    category: "alat-indera",
    premium: true,
    fileName: "alatindera_wajah_lakilaki.pdf",
  },
  {
    id: "alatindera_aku_istimewa_dan_wajah",
    title: "Aku Istimewa & Mengenal Wajahku (Lengkap 2 Halaman)",
    category: "alat-indera",
    premium: true,
    fileName: "alatindera_aku_istimewa_dan_wajah.pdf",
  },
  // Kategori: Matematika (Mengenal Angka)
  {
    id: "matematika_bab1_mengenal_angka",
    title: "BAB 1 - Mengenal Angka 1-5 (Tebalkan Angka)",
    category: "matematika",
    premium: true,
    fileName: "matematika_bab1_mengenal_angka.pdf",
  },
  {
    id: "matematika_bab1_mencocokkan_angka",
    title: "BAB 1 - Mencocokkan Angka dan Jumlah Benda",
    category: "matematika",
    premium: true,
    fileName: "matematika_bab1_mencocokkan_angka.pdf",
  },
  {
    id: "matematika_bab1_menghitung_benda",
    title: "BAB 1 - Menghitung Benda 1-5",
    category: "matematika",
    premium: true,
    fileName: "matematika_bab1_menghitung_benda.pdf",
  },
  // TODO: tambahkan worksheet baru di sini tiap kali ada LKPD baru.
];

export function findWorksheet(worksheetId: string): WorksheetCatalogEntry | undefined {
  return WORKSHEETS_CATALOG.find((w) => w.id === worksheetId);
}
