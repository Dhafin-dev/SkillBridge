import { Router } from 'express';
import { getProjects, getProjectById, getMyProjectsStudent, getMyRequestsUMKM, createProject, acceptApplicant, rejectApplicant, applyProject } from '../controllers/projectController';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.get('/', getProjects);
router.post('/', authenticate, requireRole(['UMKM']), createProject);
router.get('/student/me', authenticate, requireRole(['STUDENT']), getMyProjectsStudent);
router.get('/umkm/me', authenticate, requireRole(['UMKM']), getMyRequestsUMKM);
router.get('/:id', getProjectById);
router.post('/:id/applications', authenticate, requireRole(['STUDENT']), applyProject);
router.post('/:id/applications/:studentId/accept', authenticate, requireRole(['UMKM']), acceptApplicant);
router.post('/:id/applications/:studentId/reject', authenticate, requireRole(['UMKM']), rejectApplicant);

export default router;
