import { Router } from 'express';
import {
  getWorkspaceByProjectId,
  addTask,
  toggleTask,
  deleteTask,
  updatePhaseProgress
} from '../controllers/workspaceController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/project/:projectId', authenticate, getWorkspaceByProjectId);
router.post('/:workspaceId/tasks', authenticate, addTask);
router.patch('/:workspaceId/tasks/:taskId', authenticate, toggleTask);
router.delete('/:workspaceId/tasks/:taskId', authenticate, deleteTask);
router.patch('/:workspaceId/progress', authenticate, updatePhaseProgress);

export default router;
