import prisma from '../db.js';

/**
 * Get all FAQ list and current cache version.
 * GET /faq/all
 */
export const getAllFaq = async (req, res) => {
  try {
    // Get the latest FAQ version record
    const latestVersionRecord = await prisma.faqVersion.findFirst({
      orderBy: {
        id: 'desc'
      }
    });

    const version = latestVersionRecord ? latestVersionRecord.version : '1.0.0';

    // Fetch all FAQ records
    const faqs = await prisma.faq.findMany({
      orderBy: {
        id: 'asc'
      }
    });

    // Format fields to match OpenAPI spec response
    const formattedFaqs = faqs.map(faq => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category
    }));

    return res.status(200).json({
      version,
      total: formattedFaqs.length,
      data: formattedFaqs
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
};

/**
 * Get the latest FAQ cache version.
 * GET /faq/version
 */
export const getFaqVersion = async (req, res) => {
  try {
    const latestVersionRecord = await prisma.faqVersion.findFirst({
      orderBy: {
        id: 'desc'
      }
    });

    if (!latestVersionRecord) {
      return res.status(404).json({
        error: "Not Found",
        message: "No version configuration found."
      });
    }

    return res.status(200).json({
      version: latestVersionRecord.version,
      updated_at: latestVersionRecord.updatedAt.toISOString()
    });
  } catch (error) {
    console.error("Error fetching FAQ version:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
};

/**
 * Record a question that was not found in the FAQ cache.
 * POST /faq/unknown
 */
export const reportUnknownQuestion = async (req, res) => {
  try {
    const { question, session_id, user_id } = req.body;

    if (!question || typeof question !== 'string' || question.trim() === '') {
      return res.status(400).json({
        error: "Bad Request",
        message: "Field 'question' is required and must be a non-empty string."
      });
    }

    // Insert the unknown question to the database
    await prisma.unknownQuestion.create({
      data: {
        question: question.trim(),
        sessionId: session_id ? String(session_id) : null,
        userId: user_id ? String(user_id) : null
      }
    });

    return res.status(200).json({
      success: true,
      message: "Pertanyaan telah dicatat.",
      fallback_response: "Maaf, saya belum menemukan jawaban yang sesuai. Tim kami akan memperbarui FAQ secepatnya."
    });
  } catch (error) {
    console.error("Error recording unknown question:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
};
