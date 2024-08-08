import express from 'express';
import { createCategory } from '../controllers/categoryController.js';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();
router.post('/createCategories', verifyToken, createCategory)
export default router;