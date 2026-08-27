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
    const requester = (req as any).user;
    const result = await projectService.getProjectById(id as string, requester);
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

export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const result = await projectService.createProject(userId, req.body);
    res.status(201).json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const acceptApplicant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const umkmId = (req as any).user.id;
    const { id: projectId, studentId } = req.params;
    const result = await projectService.acceptApplication(umkmId, projectId as string, studentId as string);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const rejectApplicant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const umkmId = (req as any).user.id;
    const { id: projectId, studentId } = req.params;
    const result = await projectService.rejectApplication(umkmId, projectId as string, studentId as string);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const applyProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const studentId = (req as any).user.id;
    const { id: projectId } = req.params;
    const result = await projectService.applyProject(projectId as string, studentId);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const completeProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const umkmId = (req as any).user.id;
    const { id: projectId } = req.params;
    const result = await projectService.completeProject(umkmId, projectId as string, req.body);
    res.json(ApiResponse.success(result, 'Project marked as completed with review successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { id: projectId } = req.params;
    const result = await projectService.updateProject(userId, projectId as string, req.body);
    res.json(ApiResponse.success(result, 'Project updated successfully'));
  } catch (error) {
    next(error);
  }
};


