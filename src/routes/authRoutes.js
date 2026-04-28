import express from 'express';
import { signUpHandler, loginHandler } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUpHandler);
router.post('/login', loginHandler);

export default router;