import express from 'express';
import {
  getAllFaq,
  getFaqVersion,
  reportUnknownQuestion
} from '../controllers/faqController.js';

const router = express.Router();

// Get all FAQs
router.get('/all', getAllFaq);

// Get the latest FAQ version
router.get('/version', getFaqVersion);

// Log an unknown question
router.post('/unknown', reportUnknownQuestion);

export default router;
