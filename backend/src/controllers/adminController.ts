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

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description } = req.body;
    const result = await adminService.createCategory(name, description);
    res.status(201).json(ApiResponse.success(result, 'Category created successfully', 201));
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { name, description } = req.body;
    const result = await adminService.updateCategory(id, name, description);
    res.json(ApiResponse.success(result, 'Category updated successfully'));
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    await adminService.deleteCategory(id);
    res.json(ApiResponse.success({ message: 'Category deleted successfully' }));
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    await adminService.deleteUser(id);
    res.json(ApiResponse.success({ message: 'User deleted successfully' }));
  } catch (error) {
    next(error);
  }
};

export const toggleUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { isVerified } = req.body;
    const result = await adminService.toggleUserStatus(id, !!isVerified);
    res.json(ApiResponse.success(result, 'User status updated'));
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
    await prisma.user.update({
      where: { id },
      data: { isVerified: true }
    });
    await prisma.notification.create({
      data: {
        userId: id,
        type: 'SYSTEM',
        title: 'Account Verified!',
        message: 'Congratulations! Your verification request has been approved by SkillBridge Administration.',
        actionRoute: 'profile'
      }
    });
    res.json(ApiResponse.success({ message: 'User verified successfully' }));
  } catch (error) {
    next(error);
  }
};

export const rejectVerification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { reason } = req.body || {};
    const result = await adminService.rejectVerification(id, reason);
    res.json(ApiResponse.success(result, 'Verification rejected successfully'));
  } catch (error) {
    next(error);
  }
};

export const deleteAdminProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;
    await prisma.project.delete({
      where: { id }
    });
    res.json(ApiResponse.success({ message: 'Project removed by administrator' }));
  } catch (error) {
    next(error);
  }
};
