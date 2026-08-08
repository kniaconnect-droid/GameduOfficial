// src/lib/materiKognitif5Tahun.ts
//
// Konten "Perkembangan Kognitif Usia 5 Tahun (60 Bulan)" -- materi edukasi
// premium yang tampil di halaman Game Usia 5 Tahun. Data statis (bukan dari
// Firestore) karena isinya artikel edukasi, bukan data user. Sumber: dokumen
// GAMEDU_Perkembangan_Kognitif_5Tahun_Ringkas, diringkas (2 poin per list,
// bukan 3) supaya konsisten dengan gaya materiKognitif3Tahun.ts &
// materiKognitif4Tahun.ts tapi lebih padat dibaca di HP.

import type { KemampuanItem } from "./materiKognitif3Tahun";

export const MATERI_KOGNITIF_5_TAHUN = {
  title: "Perkembangan Kognitif Usia 5 Tahun (60 Bulan)",
  subtitle: "Indikator Perkembangan · Panduan Singkat untuk Orang Tua",
  intro:
    "Setiap anak berkembang dengan kecepatan berbeda-beda, dan itu wajar. Daftar di bawah ini bukan untuk menilai atau memberi label anak, melainkan panduan untuk mengetahui kemampuan apa yang sedang tumbuh, sekaligus ide bermain untuk menstimulasinya di rumah.",
  penutup:
    "Catatan: setiap anak punya kecepatannya sendiri. Kalau salah satu kemampuan di atas belum terlihat, tidak apa-apa — cukup ajak main lagi secara rutin dan penuh keceriaan. 💛",
  kemampuan: [
    {
      id: "warna-8-10",
      judul: "Mengenal 8–10 Warna",
      deskripsi:
        "Anak mulai bisa mengenali dan menyebutkan lebih banyak warna — dari merah, biru, hijau, sampai cokelat, hitam, dan putih — lalu memakainya untuk mendeskripsikan benda.",
      kenapaPenting: [
        "Melatih kemampuan mengamati dan membedakan detail benda.",
        "Memperkaya kosakata dan mendukung kemampuan seni, membaca, serta matematika.",
      ],
      tandaBerkembang: [
        "Mengenali dan menyebutkan 8–10 warna secara mandiri.",
        "Mencocokkan dan mengelompokkan benda berdasarkan warna.",
      ],
      stimulasiRumah: [
        "Ajak cari benda dengan warna tertentu di rumah atau sekolah.",
        "Main kartu warna atau mencocokkan warna.",
      ],
      aktivitasGame: "Mengenali, memilih, mencocokkan, dan mengelompokkan warna lewat permainan interaktif.",
      aktivitasWorksheet: "Latihan mengenali, mencocokkan, dan menggunakan warna dalam berbagai kegiatan.",
    },
    {
      id: "menghitung-1-20",
      judul: "Menghitung 1–20",
      deskripsi:
        "Anak mulai bisa menghitung lebih lancar sampai 20 dan memahami hubungan antara angka dengan jumlah benda, bukan sekadar hafalan urutan.",
      kenapaPenting: [
        "Bekal penting menuju jenjang pendidikan berikutnya.",
        "Dasar pembelajaran matematika sederhana, seperti tambah-kurang.",
      ],
      tandaBerkembang: [
        "Menyebutkan urutan angka 1–20 dengan benar.",
        "Mencocokkan angka dengan jumlah benda yang sesuai.",
      ],
      stimulasiRumah: [
        "Ajak hitung benda di sekitar, seperti mainan atau buah.",
        "Hitung langkah, tepukan, atau anak tangga saat beraktivitas.",
      ],
      aktivitasGame: "Mengenal angka, menghitung jumlah benda, dan mencocokkan angka dengan kuantitasnya.",
      aktivitasWorksheet: "Melatih menghitung, mengenali lambang angka, dan mencocokkan angka dengan jumlah benda.",
    },
    {
      id: "kelompok-bentuk-ukuran",
      judul: "Mengelompokkan Berdasarkan Bentuk & Ukuran",
      deskripsi:
        "Anak mulai bisa mengelompokkan benda berdasarkan lebih dari satu ciri sekaligus, misalnya bentuk (lingkaran, segitiga) sekaligus ukuran (besar, sedang, kecil).",
      kenapaPenting: [
        "Dasar berpikir logis dan pemecahan masalah.",
        "Memahami klasifikasi berdasarkan lebih dari satu ciri sekaligus.",
      ],
      tandaBerkembang: [
        "Mengelompokkan benda berdasarkan bentuk atau ukuran.",
        "Membedakan benda besar, sedang, dan kecil.",
      ],
      stimulasiRumah: [
        "Kelompokkan balok berdasarkan bentuk atau ukuran.",
        "Main mencocokkan kartu bentuk geometri.",
      ],
      aktivitasGame: "Mengelompokkan benda berdasarkan bentuk dan ukuran lewat permainan seret dan taruh.",
      aktivitasWorksheet: "Melatih mengelompokkan gambar dan mengurutkan benda dari kecil ke besar.",
    },
    {
      id: "puzzle-9-12",
      judul: "Menyelesaikan Puzzle 9–12 Keping",
      deskripsi:
        "Anak mulai bisa memakai strategi sederhana — cari bagian tepi, cocokkan gambar, perhatikan pola — untuk menyusun puzzle secara lebih mandiri.",
      kenapaPenting: [
        "Melatih berpikir logis dan strategi pemecahan masalah.",
        "Meningkatkan fokus, koordinasi mata-tangan, dan rasa percaya diri.",
      ],
      tandaBerkembang: [
        "Mencocokkan potongan berdasarkan bentuk dan gambar.",
        "Menyusun puzzle 9–12 keping hingga selesai.",
      ],
      stimulasiRumah: [
        "Pilih puzzle bergambar sesuai minat anak.",
        "Naikkan tingkat kesulitan puzzle secara bertahap.",
      ],
      aktivitasGame: "Menyusun puzzle digital 9–12 keping dengan berbagai tema menarik.",
      aktivitasWorksheet: "Melatih melengkapi gambar dan menyusun potongan menjadi urutan yang sesuai.",
    },
    {
      id: "besar-kecil-panjang-pendek",
      judul: "Memahami Konsep Besar–Kecil, Panjang–Pendek",
      deskripsi:
        "Anak mulai bisa membandingkan dan mengurutkan benda berdasarkan ukurannya, serta memakai istilah \"besar\", \"kecil\", \"panjang\", \"pendek\" dengan tepat.",
      kenapaPenting: [
        "Dasar berpikir logis, observasi, dan konsep pengukuran sederhana.",
        "Bekal pembelajaran matematika dan sains berikutnya.",
      ],
      tandaBerkembang: [
        "Membedakan benda besar-kecil dan panjang-pendek.",
        "Mengurutkan benda dari yang terkecil ke terbesar (atau sebaliknya).",
      ],
      stimulasiRumah: [
        "Bandingkan ukuran mainan atau benda di sekitar rumah.",
        "Urutkan pensil atau sedotan dari terpendek ke terpanjang.",
      ],
      aktivitasGame: "Memilih, membandingkan, dan mengurutkan benda berdasarkan ukurannya.",
      aktivitasWorksheet: "Melatih membandingkan dan mengurutkan benda sesuai konsep besar-kecil, panjang-pendek.",
    },
  ] satisfies KemampuanItem[],
};
