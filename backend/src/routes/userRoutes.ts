import { Router } from 'express';
import { getRecommendedStudents, updateMe } from '../controllers/userController';
import { getMe } from '../controllers/authController';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.get('/students/recommended', authenticate, requireRole(['UMKM']), getRecommendedStudents);
router.get('/me', authenticate, getMe);
router.patch('/me', authenticate, updateMe);

export default router;
