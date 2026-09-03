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
    const { userService } = await import('../services/userService');
    const result = await userService.getMe(userId);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await authService.requestPasswordReset(req.body.email);
    res.json(ApiResponse.success(result, 'Password reset request processed'));
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);
    res.json(ApiResponse.success(result, 'Password reset successful'));
  } catch (error) {
    next(error);
  }
};

