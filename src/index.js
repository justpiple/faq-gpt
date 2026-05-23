import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import faqRoutes from './routes/faqRoutes.js';
import prisma from './db.js';
import { faqData } from './mockFaqs.js';

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

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Raja Brawijaya GPT FAQ API is running.' });
});

// FAQ API Routes
app.use('/api/gpt/faq', faqRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong.'
  });
});

// Self-Seeding Function
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

// Start Server
app.listen(PORT, async () => {
  console.log(`==================================================`);
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📌 Health check: http://localhost:${PORT}/health`);
  console.log(`📌 API FAQ endpoints prefix: http://localhost:${PORT}/api/gpt/faq`);
  console.log(`==================================================`);
  
  // Run auto-seeding
  await autoSeedDatabase();
});

