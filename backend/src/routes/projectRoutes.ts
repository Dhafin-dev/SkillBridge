import { Router } from 'express';
import { getProjects, getProjectById, getMyProjectsStudent, getMyRequestsUMKM } from '../controllers/projectController';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.get('/', getProjects);
router.get('/student/me', authenticate, requireRole(['STUDENT']), getMyProjectsStudent);
router.get('/umkm/me', authenticate, requireRole(['UMKM']), getMyRequestsUMKM);
router.get('/:id', getProjectById);

export default router;
