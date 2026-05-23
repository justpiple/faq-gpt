import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import faqRoutes from './routes/faqRoutes.js';
import prisma from './db.js';

const faqData = [
  {
    question: "Apa saja atribut pakaian wajib bagi mahasiswa baru selama kegiatan?",
    answer: "Mahasiswa baru wajib mengenakan kemeja lengan panjang berwarna putih, celana panjang hitam (putra) atau rok panjang full rempel hitam (putri), dasi hitam, ikat pinggang hitam, kaos kaki putih polos di atas mata kaki, serta sepatu bebas berwarna full hitam.",
    category: "Atribut"
  },
  {
    question: "Bagaimana ketentuan penggunaan jilbab bagi mahasiswi yang berhijab?",
    answer: "Mahasiswi yang berhijab wajib menggunakan jilbab berjenis segi empat dengan warna putih polos.",
    category: "Atribut"
  },
  {
    question: "Bagaimana aturan kerapian rambut bagi mahasiswa baru laki-laki dan perempuan?",
    answer: "Putra harus berambut pendek rapi tidak melebihi alis, tidak diwarnai, dan tidak diikat. Putri yang tidak berhijab wajib menguncir rambutnya dengan model ekor kuda menggunakan karet berwarna hitam dan rambut tidak diwarnai.",
    category: "Atribut"
  },
  {
    question: "Kapan jas almamater dan topi Universitas Brawijaya harus dibawa?",
    answer: "Jas almamater dan topi UB hanya perlu dibawa (bukan dipakai) khusus pada Day 1 pelaksanaan kegiatan.",
    category: "Atribut"
  },
  {
    question: "Bagaimana cara mencetak dan menyiapkan Name Tag?",
    answer: "File name tag diunduh menggunakan email UB, dicetak dengan ukuran A5, digunting mengikuti kontur logo, ditempel sisi depan dan belakangnya, dilaminating, dipasang foto formal berjas almamater ukuran 3x4, ditulis identitas menggunakan bolpoin hitam, dan menggunakan lanyard putih.",
    category: "Ketentuan Teknis"
  },
  {
    question: "Apa arti dari setiap warna pita sakit yang diikatkan di lengan kiri?",
    answer: "Pita Pink berarti Menstruasi, Kuning berarti Sakit Ringan, Hitam berarti Sakit Berat, Merah berarti Asma, dan Hijau berarti Disabilitas.",
    category: "Atribut"
  },
  {
    question: "Apa saja barang bawaan wajib yang harus ada di dalam tas setiap harinya?",
    answer: "Barang wajib meliputi KTP & BPJS (jika ada), obat pribadi, buku catatan & alat tulis, alat ibadah (mukenah, sajadah, sandal jepit, & air wudhu 1,5L bagi muslim), tumblr minum minimal 600ml, roti/bekal sarapan, snack, trashbag, jas hujan, koran/alas duduk, hand sanitizer, dan tisu.",
    category: "Barang Bawaan"
  },
  {
    question: "Apakah mahasiswa baru diperbolehkan membawa kendaraan pribadi ke kampus?",
    answer: "Tidak diperbolehkan. Mahasiswa baru dilarang mengendarai kendaraan pribadi ke dalam area kampus dan proses antar-jemput hanya boleh dilakukan di titik masuk yang telah ditentukan panitia.",
    category: "Larangan"
  },
  {
    question: "Aksesoris apa saja yang boleh dan tidak boleh digunakan?",
    answer: "Mahasiswa baru dilarang menggunakan aksesoris atau perhiasan selama kegiatan, kecuali kacamata dan kawat gigi.",
    category: "Larangan"
  },
  {
    question: "Bagaimana pembagian kategori pelanggaran di RAJA Brawijaya 2025?",
    answer: "Pelanggaran dibagi menjadi tiga tingkatan: Kategori I (Ringan) berbobot sanksi 10 poin, Kategori II (Sedang) berbobot 20 poin, dan Kategori III (Berat) berbobot 30 poin.",
    category: "Pelanggaran & Sanksi"
  },
  {
    question: "Apa sanksi hukuman yang diberikan jika melakukan pelanggaran berat (Kategori III)?",
    answer: "Sanksinya berupa pengurangan 30 poin, pemberian nasihat dan teguran, membuat surat permohonan maaf yang ditandatangani oleh ketiga supervisor cluster, diberikan pertanyaan seputar nasionalisme, menyanyikan lagu nasional, serta hal tambahan dari koordinator lapangan.",
    category: "Pelanggaran & Sanksi"
  },
  {
    question: "Apakah mahasiswa baru boleh melakukan pembelaan jika diduga melakukan pelanggaran?",
    answer: "Ya, mahasiswa baru memiliki hak menyampaikan pembelaan berdasarkan asas praduga tak bersalah selama alasan yang diberikan logis diterima dan tidak dijadikan pembenaran atas kesalahan.",
    category: "Pelanggaran & Sanksi"
  }
];

// Load environment variables
dotenv.config();

const app = express();
let PORT = process.env.PORT || 3001;
if (String(PORT) === '3000') {
  PORT = 3001;
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Raja Brawijaya GPT FAQ API is running.' });
});

app.use('/api/gpt/faq', faqRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong.'
  });
});

async function autoSeedDatabase() {
  try {
    const faqCount = await prisma.faq.count();
    const versionCount = await prisma.faqVersion.count();

    if (faqCount === 0) {
      console.log('🌱 No FAQ records found. Starting automatic database seeding...');
      for (const faq of faqData) {
        await prisma.faq.create({ data: faq });
      }
      console.log(`✅ Successfully seeded ${faqData.length} FAQ records.`);
    }

    if (versionCount === 0) {
      const initialVersion = '1.0.5';
      console.log(`🌱 No FAQ version found. Seeding initial version: ${initialVersion}`);
      await prisma.faqVersion.create({
        data: {
          version: initialVersion,
          updatedAt: new Date()
        }
      });
      console.log('✅ Successfully seeded version configuration.');
    }
  } catch (error) {
    console.error('❌ Failed to run automatic seeding:', error);
  }
}

app.listen(PORT, async () => {
  console.log(`==================================================`);
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📌 Health check: http://localhost:${PORT}/health`);
  console.log(`📌 API FAQ endpoints prefix: http://localhost:${PORT}/api/gpt/faq`);
  console.log(`==================================================`);
});

