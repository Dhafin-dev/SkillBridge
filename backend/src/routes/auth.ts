import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema } from '../schemas/authSchemas';
import { createRateLimiter } from '../middleware/rateLimit';

const router = Router();

const authLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many authentication attempts. Please try again later.' });

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.get('/me', authenticate, getMe);

export default router;
