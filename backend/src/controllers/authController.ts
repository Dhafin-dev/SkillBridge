import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { ApiResponse } from '../utils/ApiResponse';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(ApiResponse.success(result, 'User registered successfully', 201));
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await authService.loginUser(req.body);
    res.json(ApiResponse.success(result, 'Login successful'));
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    // We should get this from userService technically, but I'll let authController call userService.
    // Wait, the logic is in userService.getMe
    const { userService } = await import('../services/userService');
    const result = await userService.getMe(userId);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
