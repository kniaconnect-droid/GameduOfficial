// src/lib/materiKognitif3Tahun.ts
//
// Konten "Perkembangan Kognitif Usia 3 Tahun (36 Bulan)" -- materi edukasi
// premium yang tampil di halaman Game Usia 3 Tahun. Data statis (bukan dari
// Firestore) karena isinya artikel edukasi, bukan data user.

export interface KemampuanItem {
  id: string;
  judul: string;
  deskripsi: string;
  kenapaPenting: string[];
  tandaBerkembang: string[];
  stimulasiRumah: string[];
  aktivitasGame: string;
  aktivitasWorksheet: string;
}

export const MATERI_KOGNITIF_3_TAHUN = {
  title: "Perkembangan Kognitif Usia 3 Tahun (36 Bulan)",
  subtitle: "Indikator Perkembangan · Panduan Singkat untuk Orang Tua",
  intro:
    "Setiap anak berkembang dengan kecepatan berbeda-beda, dan itu wajar. Daftar di bawah ini bukan untuk menilai atau memberi label anak, melainkan panduan untuk mengetahui kemampuan apa yang sedang tumbuh, sekaligus ide bermain untuk menstimulasinya di rumah.",
  penutup:
    "Catatan: setiap anak punya kecepatannya sendiri. Kalau salah satu kemampuan di atas belum terlihat, tidak apa-apa, cukup ajak main lagi secara rutin dan penuh keceriaan.",
  kemampuan: [
    {
      id: "warna-dasar",
      judul: "Mengenal Warna Dasar (Merah, Kuning, Biru)",
      deskripsi:
        "Anak mulai bisa mengenali, menyebutkan, dan membedakan tiga warna dasar lewat benda-benda di sekitarnya.",
      kenapaPenting: [
        "Dasar berpikir logis: langkah awal anak belajar mengelompokkan dan membandingkan benda.",
        "Memperkaya kosakata lewat nama-nama warna.",
        "Melatih daya ingat dan konsentrasi.",
      ],
      tandaBerkembang: [
        "Menunjuk benda sesuai warna yang diminta.",
        "Menyebutkan nama warna sederhana.",
        "Mengelompokkan benda berdasarkan warna.",
      ],
      stimulasiRumah: [
        "Ajak cari benda dengan warna tertentu di rumah.",
        "Susun balok warna-warni bersama.",
        "Mewarnai gambar sederhana.",
      ],
      aktivitasGame: "Anak menebak dan mencocokkan warna lewat permainan interaktif yang seru.",
      aktivitasWorksheet: "Latihan mengenal warna lewat mencocokkan dan mewarnai.",
    },
    {
      id: "puzzle",
      judul: "Menyusun Puzzle 4–6 Keping",
      deskripsi:
        "Anak mulai bisa menyusun beberapa potongan gambar menjadi satu gambar utuh, melatih logika sekaligus koordinasi mata-tangan.",
      kenapaPenting: [
        "Melatih berpikir logis dan memecahkan masalah.",
        "Mengembangkan koordinasi mata dan tangan.",
        "Membangun kesabaran dan rasa percaya diri.",
      ],
      tandaBerkembang: [
        "Mencoba memasangkan potongan yang sesuai.",
        "Menyusun puzzle 4–6 keping dengan sedikit bantuan.",
        "Senang saat berhasil menyelesaikan puzzle.",
      ],
      stimulasiRumah: [
        "Mulai dari puzzle dengan keping sedikit dan gambar besar.",
        "Ajak anak amati gambar utuh dulu sebelum menyusun.",
        "Beri pujian pada usaha, bukan cuma hasil.",
      ],
      aktivitasGame: "Menyusun puzzle digital 4–6 keping dengan gambar yang menarik dan sesuai usia.",
      aktivitasWorksheet: "Melatih mencocokkan dan menyusun potongan menjadi gambar utuh.",
    },
    {
      id: "mengelompokkan",
      judul: "Mengelompokkan Benda Berdasarkan Warna atau Bentuk",
      deskripsi:
        "Anak mulai bisa mengenali persamaan dan perbedaan benda, lalu mengelompokkannya, dasar penting untuk belajar matematika dan sains sederhana nanti.",
      kenapaPenting: [
        "Melatih kemampuan mengamati dan membandingkan.",
        "Membangun cara berpikir logis dan sistematis.",
        "Menjadi bekal awal untuk konsep matematika sederhana.",
      ],
      tandaBerkembang: [
        "Mengelompokkan benda dengan warna atau bentuk yang sama.",
        "Memilih benda sesuai instruksi yang diberikan.",
        "Menjelaskan alasan pengelompokannya secara sederhana.",
      ],
      stimulasiRumah: [
        "Kelompokkan balok atau mainan berdasarkan warna, lalu bentuk.",
        "Cari benda dengan warna sama di sekitar rumah.",
        "Gunakan kartu gambar untuk main cocok-cocokan.",
      ],
      aktivitasGame: "Menyeret (drag & drop) benda ke kelompok warna atau bentuk yang tepat.",
      aktivitasWorksheet: "Menghubungkan dan menandai gambar sesuai warna atau bentuknya.",
    },
    {
      id: "dua-instruksi",
      judul: "Mengikuti Dua Instruksi Sederhana",
      deskripsi:
        'Anak mulai bisa memahami dan menjalankan dua perintah berurutan, seperti "ambil bola, lalu taruh di keranjang."',
      kenapaPenting: [
        "Melatih daya ingat jangka pendek (working memory).",
        "Mengembangkan kemampuan memahami bahasa.",
        "Membangun kemandirian dalam aktivitas sehari-hari.",
      ],
      tandaBerkembang: [
        "Mendengarkan instruksi dengan penuh perhatian.",
        "Menjalankan dua perintah berurutan dengan benar.",
        "Menyelesaikan tugas sederhana secara mandiri.",
      ],
      stimulasiRumah: [
        'Main tebak-tebakan "ikuti perintah" di rumah.',
        "Beri instruksi singkat lewat kegiatan sehari-hari, misalnya beres-beres mainan.",
        "Gunakan kalimat pendek dan jelas.",
      ],
      aktivitasGame: "Mengikuti dua instruksi berurutan lewat memilih gambar atau menyeret benda.",
      aktivitasWorksheet: "Melatih memahami dan mengikuti instruksi lewat dua langkah sederhana.",
    },
    {
      id: "bermain-pura-pura",
      judul: "Bermain Pura-pura (Masak, Telepon)",
      deskripsi:
        "Anak mulai suka meniru aktivitas sehari-hari lewat imajinasi, seperti berpura-pura memasak, menelepon, atau merawat boneka.",
      kenapaPenting: [
        "Mengembangkan imajinasi dan kreativitas.",
        "Memperkaya kosakata dan kemampuan berkomunikasi.",
        "Mengenalkan berbagai peran dalam kehidupan sehari-hari.",
      ],
      tandaBerkembang: [
        "Meniru aktivitas orang dewasa, seperti memasak atau menelepon.",
        'Menggunakan benda sebagai simbol, misalnya balok jadi "telepon".',
        "Bermain peran sederhana dengan antusias.",
      ],
      stimulasiRumah: [
        "Sediakan mainan peran seperti alat masak atau telepon-teleponan.",
        "Ajak main peran bareng, misalnya jadi penjual dan pembeli.",
        "Beri ruang anak berimajinasi tanpa banyak aturan.",
      ],
      aktivitasGame: "Memilih dan menggunakan benda sesuai perannya lewat permainan seru.",
      aktivitasWorksheet: "Mencocokkan gambar aktivitas dan mengurutkan langkah bermain peran.",
    },
  ] as KemampuanItem[],
};
