import { Request, Response, NextFunction } from 'express';
import { projectService } from '../services/projectService';
import { ApiResponse } from '../utils/ApiResponse';

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await projectService.getPublishedProjects();
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await projectService.getProjectById(id as string);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getMyProjectsStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const result = await projectService.getStudentActiveProjects(userId);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getMyRequestsUMKM = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const result = await projectService.getUmkmRequests(userId);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};
