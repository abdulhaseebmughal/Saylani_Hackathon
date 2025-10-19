import express from 'express';
import {
  generatePitch,
  getAllPitches,
  getPitchById,
  updatePitch,
  deletePitch,
  improvePitch,
  exportPitch,
} from '../controllers/pitch.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes are protected (require authentication)
router.use(protect);

// Generate new pitch with AI
router.post('/generate', generatePitch);

// Get all pitches for logged in user
router.get('/', getAllPitches);

// Get, update, delete single pitch
router
  .route('/:id')
  .get(getPitchById)
  .put(updatePitch)
  .delete(deletePitch);

// Improve pitch with AI
router.post('/:id/improve', improvePitch);

// Export pitch
router.post('/:id/export', exportPitch);

export default router;
