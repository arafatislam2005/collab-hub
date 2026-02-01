import express from 'express';
import {
  getAllDesigns,
  getDesignById,
  createDesign,
  updateDesign,
  deleteDesign,
  likeDesign
} from '../controllers/designController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllDesigns);
router.get('/:id', getDesignById);
router.post('/', protect, upload.fields([{ name: 'previewImage', maxCount: 5 }, { name: 'modelFile', maxCount: 1 }]), createDesign);
router.put('/:id', protect, updateDesign);
router.delete('/:id', protect, deleteDesign);
router.post('/:id/like', protect, likeDesign);

export default router;
