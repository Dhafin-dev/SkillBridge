import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services/notificationService';
import { ApiResponse } from '../utils/ApiResponse';

export const getNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const result = await notificationService.getUserNotifications(userId);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
