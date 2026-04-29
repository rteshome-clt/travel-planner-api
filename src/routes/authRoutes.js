import express from 'express';
import { signUpHandler, loginHandler } from '../controllers/authController.js';
import { validateSignUp, validateLogIn } from '../middleware/userValidators.js';
const router = express.Router();

router.post('/signup', validateSignUp, signUpHandler);
router.post('/login', validateLogIn, loginHandler);

export default router;