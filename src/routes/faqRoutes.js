import express from 'express';
import {
  getAllFaq,
  getFaqVersion,
  reportUnknownQuestion
} from '../controllers/faqController.js';

const router = express.Router();

router.get('/all', getAllFaq);
router.get('/version', getFaqVersion);
router.post('/unknown', reportUnknownQuestion);

export default router;
