import { Router } from 'express';
import { changePassword, getRecommendedStudents, updateMe } from '../controllers/userController';
import { getMe } from '../controllers/authController';
import { authenticate, requireRole } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { z } from 'zod';

const router = Router();

router.get('/students/recommended', authenticate, requireRole(['UMKM']), getRecommendedStudents);
router.get('/me', authenticate, getMe);
router.patch('/me', authenticate, updateMe);
router.patch('/me/password', authenticate, validate(z.object({ body: z.object({ currentPassword: z.string().min(1), newPassword: z.string().min(8).max(128) }) })), changePassword);

export default router;
