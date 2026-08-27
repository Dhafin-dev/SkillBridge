import { Request, Response, NextFunction } from 'express';
import { workspaceService } from '../services/workspaceService';
import { ApiResponse } from '../utils/ApiResponse';

export const getWorkspaceByProjectId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params;
    const result = await workspaceService.getWorkspaceByProjectId(projectId as string, userId);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const addTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { workspaceId } = req.params;
    const result = await workspaceService.addTask(workspaceId as string, userId, req.body);
    res.status(201).json(ApiResponse.success(result, 'Task added successfully', 201));
  } catch (error) {
    next(error);
  }
};

export const toggleTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { workspaceId, taskId } = req.params;
    const { completed } = req.body;
    const result = await workspaceService.toggleTask(workspaceId as string, taskId as string, userId, completed);
    res.json(ApiResponse.success(result, 'Task status updated'));
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { workspaceId, taskId } = req.params;
    const result = await workspaceService.deleteTask(workspaceId as string, taskId as string, userId);
    res.json(ApiResponse.success(result, 'Task deleted successfully'));
  } catch (error) {
    next(error);
  }
};

export const updatePhaseProgress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { workspaceId } = req.params;
    const { progressPercent } = req.body;
    const result = await workspaceService.updatePhaseProgress(workspaceId as string, userId, progressPercent);
    res.json(ApiResponse.success(result, 'Timeline progress updated'));
  } catch (error) {
    next(error);
  }
};
