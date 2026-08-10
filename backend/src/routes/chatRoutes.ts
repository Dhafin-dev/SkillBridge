import { Router } from 'express';
import { getChatHistory } from '../controllers/chatController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/:projectId', authenticate, getChatHistory);

export default router;
