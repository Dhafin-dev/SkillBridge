import { Router } from 'express';
import { getProjects, getProjectById, getMyProjectsStudent, getMyRequestsUMKM, createProject, acceptApplicant, rejectApplicant, applyProject, completeProject, updateProject, deleteProject } from '../controllers/projectController';
import { authenticate, optionalAuthenticate, requireRole } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createProjectSchema, projectParamsSchema } from '../schemas/projectSchemas';
import { completeProjectSchema } from '../schemas/reviewSchemas';

const router = Router();

router.get('/', getProjects);
router.post('/', authenticate, requireRole(['UMKM']), validate(createProjectSchema), createProject);
router.get('/student/me', authenticate, requireRole(['STUDENT']), getMyProjectsStudent);
router.get('/umkm/me', authenticate, requireRole(['UMKM']), getMyRequestsUMKM);
router.get('/:id', optionalAuthenticate, validate(projectParamsSchema), getProjectById);
router.patch('/:id', authenticate, requireRole(['UMKM', 'ADMIN']), validate(projectParamsSchema), updateProject);
router.delete('/:id', authenticate, requireRole(['UMKM', 'ADMIN']), validate(projectParamsSchema), deleteProject);
router.post('/:id/applications', authenticate, requireRole(['STUDENT']), validate(projectParamsSchema), applyProject);
router.post('/:id/applications/:studentId/accept', authenticate, requireRole(['UMKM']), validate(projectParamsSchema), acceptApplicant);
router.post('/:id/applications/:studentId/reject', authenticate, requireRole(['UMKM']), validate(projectParamsSchema), rejectApplicant);
router.post('/:id/complete', authenticate, requireRole(['UMKM']), validate(completeProjectSchema), completeProject);

export default router;


