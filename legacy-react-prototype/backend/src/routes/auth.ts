import { Router } from 'express';
import { register, login, getMe, forgotPassword, resetPassword } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from '../schemas/authSchemas';
import { createRateLimiter } from '../middleware/rateLimit';

const router = Router();

const authLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 100, message: 'Too many authentication attempts. Please try again later.' });
const resetLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 30, message: 'Too many password reset requests. Please try again later.' });


router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.get('/me', authenticate, getMe);
router.post('/forgot-password', resetLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', resetLimiter, validate(resetPasswordSchema), resetPassword);

export default router;
