import prisma from '../src/db.js';

const faqData = [
  // ==========================================
  // KATEGORI: ATRIBUT PAKAIAN & SEPATU
  // ==========================================
  {
    question: "Apa pakaian yang wajib digunakan mahasiswa baru (putra dan putri) selama rangkaian ospek?",
    answer: "Mahasiswa baru wajib mengenakan kemeja putih lengan panjang, dasi hitam polos (tanpa motif salur), dan ikat pinggang hitam polos (sabuk SMA boleh dipakai asalkan logo sekolah dilepas).",
    category: "Atribut Pakaian & Sepatu"
  },
  {
    question: "Bagaimana ketentuan bawahan (celana/rok) untuk mahasiswa baru?",
    answer: "Putra wajib memakai celana panjang hitam. Putri wajib memakai rok panjang full rempel/wiru berwarna hitam dari atas ke bawah. Rok 3/4 rempel atau rok berbahan plisket TIDAK diperbolehkan.",
    category: "Atribut Pakaian & Sepatu"
  },
  {
    question: "Bagaimana ketentuan sepatu yang diperbolehkan?",
    answer: "Sepatu harus berwarna full hitam seluruhnya (termasuk sol dan pengait). Model sepatu dibebaskan (boleh pantofel, flatshoes, atau sneakers) dan tidak wajib bertali. Aksen warna lain (seperti putih atau gold) dilarang.",
    category: "Atribut Pakaian & Sepatu"
  },
  {
    question: "Apakah boleh memakai kaos kaki sekolah yang telapaknya berwarna hitam?",
    answer: "Boleh, asalkan bagian kaos kaki yang menutupi bagian atas mata kaki tetap berwarna putih polos dan bagian hitamnya tidak terlihat saat sepatu digunakan.",
    category: "Atribut Pakaian & Sepatu"
  },
  {
    question: "Kapan Jas Almamater dan Topi UB harus dipakai?",
    answer: "Jas almamater dan topi UB HANYA perlu dibawa (bukan dipakai) khusus pada pelaksanaan Day 1.",
    category: "Atribut Pakaian & Sepatu"
  },

  // ==========================================
  // KATEGORI: RAMBUT, HIJAB, & KOSMETIK
  // ==========================================
  {
    question: "Bagaimana aturan kerapian rambut bagi laki-laki dan perempuan?",
    answer: "Putra wajib berambut pendek rapi tidak melebihi alis, tidak diwarnai, dan tidak diikat. Putri non-hijab rambutnya tidak boleh diwarnai dan wajib dikuncir ekor kuda menggunakan karet hitam.",
    category: "Rambut, Hijab, & Kosmetik"
  },
  {
    question: "Bagaimana ketentuan pemakaian jilbab bagi mahasiswi muslimah?",
    answer: "Wajib menggunakan jilbab segi empat berwarna putih polos. Khusus bagi yang menggunakan hijab syar'i, diperbolehkan menggunakan pashmina syar'i (menutup dada/seperut) asalkan warnanya tetap putih polos.",
    category: "Rambut, Hijab, & Kosmetik"
  },
  {
    question: "Bolehkah memakai make up, bedak tabur, lip balm, atau sunscreen?",
    answer: "Dilarang keras memakai riasan wajah (termasuk bedak tabur tipis) dan kutek. Anda hanya diperbolehkan memakai sunscreen (tanpa warna/clear) dan lip balm tanpa warna (seperti Vaseline Petroleum Jelly).",
    category: "Rambut, Hijab, & Kosmetik"
  },
  {
    question: "Bolehkah memakai softlens, perhiasan, atau aksesoris?",
    answer: "Softlens berwarna DILARANG, softlens bening diperbolehkan khusus untuk mata minus. Semua jenis perhiasan dan aksesoris dilarang kecuali kacamata, kawat gigi, dan anting bawaan sejak bayi (tidak perlu dilepas).",
    category: "Rambut, Hijab, & Kosmetik"
  },

  // ==========================================
  // KATEGORI: TAS & BARANG BAWAAN
  // ==========================================
  {
    question: "Bagaimana ketentuan tas (backpack) yang dibawa?",
    answer: "Ransel harus didominasi warna gelap. Jika ada sedikit corak (misal navy, abu tua), masih diperbolehkan asalkan warna keseluruhan tas tetap dominan gelap. Dilarang membawa tas warna mencolok.",
    category: "Tas & Barang Bawaan"
  },
  {
    question: "Apa saja barang bawaan wajib setiap harinya?",
    answer: "KTP & BPJS, obat pribadi, buku catatan, alat tulis, tumblr minum WAJIB minimal 600ml, roti/bekal sarapan, snack, trashbag (ukuran bebas), jas hujan, koran/alas duduk, hand sanitizer, dan tisu.",
    category: "Tas & Barang Bawaan"
  },
  {
    question: "Apa perlengkapan ibadah yang wajib dibawa oleh mahasiswa muslim?",
    answer: "Mukenah, sajadah, sandal jepit (warna bebas) khusus wudhu, dan air untuk wudhu di dalam botol 1,5 liter.",
    category: "Tas & Barang Bawaan"
  },
  {
    question: "Apakah diperbolehkan membawa HP, Powerbank, Charger, atau Kipas Mini (Portable Fan)?",
    answer: "HP diperbolehkan dibawa namun DILARANG dimainkan selama kegiatan berlangsung. Sementara itu, Powerbank, Charger, Kipas Mini, dan Kamera Digital DILARANG KERAS untuk dibawa masuk.",
    category: "Tas & Barang Bawaan"
  },
  {
    question: "Bagaimana ketentuan untuk Buku Catatan?",
    answer: "Ukuran, bentuk, dan sampul dibebaskan (atau ikuti jika ada instruksi khusus kluster). Wajib menyalin dengan tulisan tangan atau mem-print dan menempelkan halaman 13-17 dari Buku Panduan (Larangan, Pelanggaran, Sanksi) di dalamnya.",
    category: "Tas & Barang Bawaan"
  },

  // ==========================================
  // KATEGORI: NAME TAG, BAG TAG, & ATRIBUT PENANDA
  // ==========================================
  {
    question: "Apa pakaian yang dikenakan untuk pas foto Name Tag dan akun SIAM?",
    answer: "Pas foto wajib berjas hitam formal (bukan jas almamater), sesuai dengan standar foto di SIAM UB. Penggunaan dasi pada foto dibebaskan (opsional). Untuk yang berhijab, warna kerudung dibebaskan asalkan formal.",
    category: "Name Tag & Atribut Penanda"
  },
  {
    question: "Bagaimana cara membuat dan ukuran Name Tag beserta Pin Cluster?",
    answer: "Diunduh menggunakan email UB. Name tag diprint ukuran A5, digunting ikuti pola, ditempel foto 3x4 (berjas hitam), dilaminating, dan digantung pakai lanyard putih. Pin cluster (update ukuran: 12x8 cm) dilaminating dan dipasang di dada kanan pakai peniti.",
    category: "Name Tag & Atribut Penanda"
  },
  {
    question: "Apa makna dari setiap warna Pita Sakit yang dipakai di lengan kiri?",
    answer: "Pita Pink (Menstruasi), Kuning (Sakit Ringan), Hitam (Sakit Berat), Merah (Asma), dan Hijau (Disabilitas).",
    category: "Name Tag & Atribut Penanda"
  },
  {
    question: "Bagaimana aturan pemasangan Pita Gerbang dan Pita Merah Putih?",
    answer: "Pita merah putih (lebar 1,5 cm) disimpul dan dipeniti di lengan kanan. Pita Gerbang (lebar 1 cm) diikatkan dua tempat: di lengan kanan dan di resleting depan tas. Warna pita gerbang (Jingga/Biru Tua/Ungu) menyesuaikan cluster dan harinya.",
    category: "Name Tag & Atribut Penanda"
  },

  // ==========================================
  // KATEGORI: RAJA APPS & PENUGASAN
  // ==========================================
  {
    question: "Mengapa biodata di profil Raja Apps gagal disimpan?",
    answer: "Pastikan pengisian kolom 'Cluster' HANYA menggunakan angka tanpa angka nol di depan (contoh: isi '2', bukan '02'). Jika data sudah benar namun tetap gagal/salah nama, segera hubungi kontak panitia yang ada di footer website.",
    category: "Raja Apps & Penugasan"
  },
  {
    question: "Bagaimana cara upload tugas (seperti Jingle/Inklusif) yang link/videonya lebih dari satu?",
    answer: "Jadikan satu di dalam folder Google Drive, ubah setelan akses folder menjadi 'Siapa saja yang memiliki link (Viewer/Public)', lalu salin dan kumpulkan link Google Drive tersebut.",
    category: "Raja Apps & Penugasan"
  },
  {
    question: "Bagaimana teknis pengumpulan tugas Twibbon di Instagram?",
    answer: "Langsung kumpulkan/paste link postingan Instagram kamu di sistem. Pastikan akun Instagram TIDAK DI-PRIVATE dan postingan tidak boleh dihapus sampai pengumuman kelulusan Raja Brawijaya.",
    category: "Raja Apps & Penugasan"
  },
  {
    question: "Apa ketentuan pembagian anggota untuk tugas Video Jingle berkelompok?",
    answer: "Anggota dibebaskan (tidak wajib satu cluster) asalkan seluruhnya Mahasiswa Baru UB. Identitas (Nama & Cluster) tidak perlu ditempel di badan, cukup ditulis sebagai teks keterangan di dalam editan videonya.",
    category: "Raja Apps & Penugasan"
  },

  // ==========================================
  // KATEGORI: PELAKSANAAN, UKM, & SANKSI
  // ==========================================
  {
    question: "Kapan PKKMB dilaksanakan dan apakah semua hari wajib datang offline ke kampus?",
    answer: "PKKMB dilaksanakan pada 11-13 Agustus 2025 dengan sistem Hybrid. Tidak seluruh maba akan datang fisik (offline) di day 2 atau 3 secara bersamaan; ikuti arahan dari panitia untuk pembagian jadwal daring/luring.",
    category: "Pelaksanaan, UKM, & Sanksi"
  },
  {
    question: "Bolehkah mengambil Jas Almamater mendahului jadwal atau diwakilkan?",
    answer: "Pengambilan almamater harus sesuai dengan jadwal dan hari yang telah ditentukan di akun SIAM untuk meminimalisir penumpukan.",
    category: "Pelaksanaan, UKM, & Sanksi"
  },
  {
    question: "Apakah mahasiswa baru wajib mengisi dan mengikuti UKM (Unit Kegiatan Mahasiswa)?",
    answer: "Pemilihan minat UKM di Raja Apps wajib diisi. Maba diperbolehkan mengikuti lebih dari 1 UKM untuk eksplorasi minat. Harap dicatat, EM UB (Eksekutif Mahasiswa) adalah lembaga tingkat universitas, bukan UKM.",
    category: "Pelaksanaan, UKM, & Sanksi"
  },
  {
    question: "Bagaimana sistem Sanksi jika melanggar ketentuan Raja Brawijaya?",
    answer: "Pelanggaran diakumulasikan dalam poin: Ringan (-10 poin), Sedang (-20 poin), dan Berat (-30 poin). Hukuman bervariasi mulai dari teguran, membuat surat permohonan maaf bermaterai/ttd supervisor, menyanyikan lagu nasional, hingga pertanyaan tes nasionalisme.",
    category: "Pelaksanaan, UKM, & Sanksi"
  },
  {
    question: "Bolehkah mahasiswa melakukan pembelaan jika dituduh melanggar tata tertib?",
    answer: "Setiap dugaan pelanggaran memegang asas praduga tak bersalah. Mahasiswa baru berhak melakukan pembelaan asalkan alasannya logis, namun tidak boleh digunakan sebagai tameng pembenaran atas kesalahan.",
    category: "Pelaksanaan, UKM, & Sanksi"
  }
];

async function main() {
  console.log("Starting database seeding...");

  // Clean the database
  console.log("Cleaning existing database records...");
  await prisma.faq.deleteMany();
  await prisma.faqVersion.deleteMany();

  // Seed FAQs
  console.log("Seeding FAQs...");
  for (const faq of faqData) {
    await prisma.faq.create({
      data: faq
    });
  }
  console.log(`Successfully seeded ${faqData.length} FAQ records.`);

  // Seed initial version
  const initialVersion = "1.0.5";
  console.log(`Seeding initial FAQ version: ${initialVersion}`);
  await prisma.faqVersion.create({
    data: {
      version: initialVersion,
      updatedAt: new Date()
    }
  });

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
