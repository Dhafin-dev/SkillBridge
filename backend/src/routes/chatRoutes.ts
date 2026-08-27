import { Router } from 'express';
import { getChatHistory, getChatContext, getConversations, sendMessage } from '../controllers/chatController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { sendMessageSchema, getChatQuerySchema } from '../schemas/chatSchemas';

const router = Router();

router.get('/conversations', authenticate, getConversations);
router.get('/context/:id', authenticate, getChatContext);
router.get('/:id', authenticate, getChatContext);
router.get('/', authenticate, validate(getChatQuerySchema), getChatHistory);
router.post('/:id/messages', authenticate, validate(sendMessageSchema), sendMessage);
router.post('/', authenticate, validate(sendMessageSchema), sendMessage);

export default router;


