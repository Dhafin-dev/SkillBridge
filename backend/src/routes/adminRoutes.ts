import { Router } from 'express';
import {
  getOverviewStats,
  getAllUsers,
  getAllProjects,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteUser,
  toggleUserStatus,
  getMatchRecommendations,
  getVerifications,
  approveVerification,
  rejectVerification,
  deleteAdminProject
} from '../controllers/adminController';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

// Apply auth and admin role requirements to all admin routes
router.use(authenticate, requireRole(['ADMIN']));

router.get('/stats', getOverviewStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/status', toggleUserStatus);
router.get('/projects', getAllProjects);
router.delete('/projects/:id', deleteAdminProject);
router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);
router.get('/match-recommendations', getMatchRecommendations);
router.get('/verifications', getVerifications);
router.post('/verifications/:id/approve', approveVerification);
router.post('/verifications/:id/reject', rejectVerification);

export default router;


