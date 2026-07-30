// src/lib/materiKognitif4Tahun.ts
//
// Konten "Perkembangan Kognitif Usia 4 Tahun (48 Bulan)" -- materi edukasi
// premium yang tampil di halaman Game Usia 4 Tahun. Data statis (bukan dari
// Firestore) karena isinya artikel edukasi, bukan data user. Strukturnya
// sengaja disamakan dengan materiKognitif3Tahun.ts.

import type { KemampuanItem } from "./materiKognitif3Tahun";

export const MATERI_KOGNITIF_4_TAHUN = {
  title: "Perkembangan Kognitif Usia 4 Tahun (48 Bulan)",
  subtitle: "Indikator Perkembangan · Panduan Singkat untuk Orang Tua",
  intro:
    "Setiap anak berkembang dengan kecepatan berbeda-beda, dan itu wajar. Daftar di bawah ini bukan untuk menilai atau memberi label anak, melainkan panduan untuk mengetahui kemampuan apa yang sedang tumbuh, sekaligus ide bermain untuk menstimulasinya di rumah.",
  penutup:
    "Catatan: setiap anak punya kecepatannya sendiri. Kalau salah satu kemampuan di atas belum terlihat, tidak apa-apa — cukup ajak main lagi secara rutin dan penuh keceriaan.",
  kemampuan: [
    {
      id: "warna-4-6",
      judul: "Mengenal 4–6 Warna",
      deskripsi:
        "Anak mulai bisa mengenali, membedakan, dan mencocokkan lebih banyak warna, dari merah dan biru sampai hijau, oranye, dan ungu.",
      kenapaPenting: [
        "Dasar berpikir logis: langkah lanjutan mengelompokkan dan mendeskripsikan benda.",
        "Memperkaya kosakata lewat nama-nama warna baru.",
        "Jadi bekal untuk belajar membaca, berhitung, seni, dan sains.",
      ],
      tandaBerkembang: [
        "Menyebutkan nama 4–6 warna dengan benar.",
        "Menunjuk benda sesuai warna yang diminta.",
        "Mencocokkan dan mengelompokkan benda berdasarkan warna.",
      ],
      stimulasiRumah: [
        "Ajak cari benda dengan warna tertentu di rumah.",
        "Kelompokkan balok atau mainan berdasarkan warna.",
        "Mewarnai gambar sesuai petunjuk.",
      ],
      aktivitasGame: "Mengenali, memilih, dan mencocokkan warna lewat permainan interaktif.",
      aktivitasWorksheet: "Latihan mengenali, mencocokkan, dan mewarnai benda sesuai warnanya.",
    },
    {
      id: "menghitung-1-10",
      judul: "Menghitung 1–10",
      deskripsi:
        "Anak mulai memahami hubungan angka dan jumlah benda (number sense) — bukan cuma hafal urutan 1–10, tapi juga bisa menghitung benda nyata.",
      kenapaPenting: [
        "Dasar kemampuan matematika untuk jenjang berikutnya.",
        "Melatih konsentrasi dan daya ingat.",
        "Membangun pemahaman hubungan angka dan benda.",
      ],
      tandaBerkembang: [
        "Menyebutkan urutan angka 1–10.",
        "Menghitung benda satu per satu dengan benar.",
        "Mengenali lambang angka 1–10.",
      ],
      stimulasiRumah: [
        "Ajak hitung mainan, buah, atau benda di sekitar.",
        "Main kartu angka, cocokkan dengan jumlah benda.",
        "Nyanyikan lagu berhitung bersama.",
      ],
      aktivitasGame: "Mengenal angka, menghitung jumlah benda, dan memilih jawaban yang sesuai.",
      aktivitasWorksheet: "Melatih menghitung, mencocokkan angka dengan jumlah benda, dan mengenali angka 1–10.",
    },
    {
      id: "mengelompokkan-benda",
      judul: "Mengelompokkan Benda",
      deskripsi:
        "Anak mulai bisa mengamati dan mengelompokkan benda berdasarkan warna, bentuk, ukuran, jenis, atau fungsinya — lebih variatif dari sebelumnya.",
      kenapaPenting: [
        "Dasar berpikir logis dan ilmiah.",
        "Melatih ketelitian dalam mengamati dan membandingkan.",
        "Bekal memahami konsep matematika dan sains sederhana.",
      ],
      tandaBerkembang: [
        "Mengelompokkan benda berdasarkan warna, bentuk, atau ukuran.",
        "Memilih benda sesuai kategori yang diminta.",
        "Menjelaskan alasan pengelompokannya secara sederhana.",
      ],
      stimulasiRumah: [
        "Kelompokkan balok berdasarkan warna atau bentuk.",
        "Pisahkan mainan berdasarkan ukuran atau jenisnya.",
        'Ajak diskusi kecil: "kenapa dua benda ini satu kelompok?"',
      ],
      aktivitasGame: "Menyeret (drag & drop) benda ke kelompok yang sesuai berdasarkan warna, bentuk, ukuran, atau jenis.",
      aktivitasWorksheet: "Melatih mengelompokkan, menandai, dan mencocokkan benda sesuai kategorinya.",
    },
    {
      id: "puzzle-6-9",
      judul: "Menyelesaikan Puzzle 6–9 Keping",
      deskripsi:
        "Anak mulai bisa menyusun puzzle dengan keping lebih banyak dan tingkat kesulitan lebih tinggi dari usia sebelumnya.",
      kenapaPenting: [
        "Melatih berpikir logis dan memecahkan masalah.",
        "Meningkatkan konsentrasi dan koordinasi mata-tangan.",
        "Membangun ketelitian, kesabaran, dan rasa percaya diri.",
      ],
      tandaBerkembang: [
        "Mencocokkan potongan berdasarkan bentuk atau gambar.",
        "Menyusun puzzle 6–9 keping dengan bantuan minimal.",
        "Menunjukkan ketekunan saat menyelesaikan puzzle.",
      ],
      stimulasiRumah: [
        "Mulai dari puzzle bergambar hewan, kendaraan, atau buah yang disukai anak.",
        "Ajak amati gambar utuh dulu sebelum menyusun.",
        "Naikkan jumlah keping secara bertahap sesuai kemampuan anak.",
      ],
      aktivitasGame: "Menyusun puzzle digital 6–9 keping dengan berbagai gambar menarik.",
      aktivitasWorksheet: "Melatih melengkapi gambar, mencocokkan potongan, dan menyusun urutan sederhana.",
    },
    {
      id: "meniru-pola",
      judul: "Meniru Pola Sederhana",
      deskripsi:
        "Anak mulai bisa mengenali pola warna, bentuk, atau gerakan (misalnya merah-kuning-merah-kuning) lalu menirukan dan melanjutkannya sendiri.",
      kenapaPenting: [
        "Dasar berpikir logis dan penalaran.",
        "Melatih kemampuan memprediksi urutan berikutnya.",
        "Bekal untuk belajar matematika dan membaca nanti.",
      ],
      tandaBerkembang: [
        "Meniru pola warna atau bentuk secara berurutan.",
        "Melanjutkan pola yang belum lengkap.",
        "Meniru pola gerakan atau tepukan dengan benar.",
      ],
      stimulasiRumah: [
        "Susun balok atau manik-manik dengan pola warna tertentu.",
        "Main tepuk tangan dengan urutan berulang.",
        "Mulai dari pola 2 unsur (misal merah-kuning) lalu naikkan bertahap.",
      ],
      aktivitasGame: "Mengamati, meniru, dan melanjutkan pola sederhana lewat warna, bentuk, gambar, atau gerakan.",
      aktivitasWorksheet: "Melatih meniru dan melengkapi pola lewat mencocokkan, menggambar, atau mewarnai.",
    },
  ] as KemampuanItem[],
};
