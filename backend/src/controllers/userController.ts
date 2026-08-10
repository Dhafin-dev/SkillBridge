import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { ApiResponse } from '../utils/ApiResponse';

export const getRecommendedStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await userService.getRecommendedStudents();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
