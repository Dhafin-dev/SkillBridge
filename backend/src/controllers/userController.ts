import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { ApiResponse } from '../utils/ApiResponse';

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await userService.getUserById(req.params.id as string);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};


export const getRecommendedStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const result = await userService.getRecommendedStudents();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const result = await userService.updateProfile(userId, req.body);
    res.json(ApiResponse.success(result, 'Profile updated successfully'));
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const result = await userService.changePassword(userId, req.body.currentPassword, req.body.newPassword);
    res.json(ApiResponse.success(result, 'Password changed. Please sign in again.'));
  } catch (error) {
    next(error);
  }
};

export const inviteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const studentId = req.params.id as string;
    const umkmUserId = (req as any).user.id;
    const { projectName, projectId } = req.body || {};
    const result = await userService.inviteStudent(studentId, umkmUserId, projectName, projectId);
    res.status(201).json(ApiResponse.success(result, 'Invitation sent successfully', 201));
  } catch (error) {
    next(error);
  }
};

