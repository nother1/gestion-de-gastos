import express from 'express';
import { login } from '../controllers/loginController.js';
const router = express.Router();
router.post('/login', login);
// router.get('/forgot', mainController);
// router.get('/register', mainController);
export default router;