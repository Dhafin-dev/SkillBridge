import { Router } from 'express';
import { getRecommendedStudents } from '../controllers/userController';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.get('/students/recommended', authenticate, requireRole(['UMKM']), getRecommendedStudents);

export default router;
