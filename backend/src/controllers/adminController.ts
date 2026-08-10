import { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/adminService';
import { ApiResponse } from '../utils/ApiResponse';
import prisma from '../utils/prisma';

export const getOverviewStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await adminService.getOverviewStats();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await adminService.getAllUsers();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await adminService.getAllProjects();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await adminService.getAllCategories();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getMatchRecommendations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await adminService.getMatchRecommendations();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getVerifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await adminService.getVerifications();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const approveVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    // We update user isVerified to true
    await prisma.user.update({
      where: { id },
      data: { isVerified: true }
    });
    res.json(ApiResponse.success({ message: 'User verified successfully' }));
  } catch (error) {
    next(error);
  }
};
