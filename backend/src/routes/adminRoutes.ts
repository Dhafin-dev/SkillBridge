import { Router } from 'express';
import { getOverviewStats, getAllUsers, getAllProjects, getAllCategories, getMatchRecommendations, getVerifications, approveVerification } from '../controllers/adminController';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

// Apply auth and admin role requirements to all admin routes
router.use(authenticate, requireRole(['ADMIN']));

router.get('/stats', getOverviewStats);
router.get('/users', getAllUsers);
router.get('/projects', getAllProjects);
router.get('/categories', getAllCategories);
router.get('/match-recommendations', getMatchRecommendations);
router.get('/verifications', getVerifications);
router.post('/verifications/:id/approve', approveVerification);

export default router;
