import { Request, Response, NextFunction } from 'express';
import { chatService } from '../services/chatService';
import { ApiResponse } from '../utils/ApiResponse';

export const getChatHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { projectId } = req.params;
    const userId = (req as any).user.id;
    const result = await chatService.getChatHistory(projectId as string, userId);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
