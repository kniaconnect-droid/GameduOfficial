// src/lib/worksheets.ts
//
// Data TAMPILAN katalog worksheet di client (judul, deskripsi, thumbnail).
// Ini terpisah dari api/_lib/worksheetsCatalog.ts (yang jadi sumber kebenaran
// premium-gating di server) -- sengaja dipisah dengan pola yang sama seperti
// games: data tampilan boleh dari client, tapi keputusan "boleh download atau
// tidak" WAJIB selalu dicek ulang di server tiap request.
//
// CATATAN: Semua worksheet sementara dikosongkan (tampil "Coming Soon" di
// katalog) sampai konten worksheet siap dipublikasikan kembali.

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

export const WORKSHEETS: WorksheetItem[] = [];
