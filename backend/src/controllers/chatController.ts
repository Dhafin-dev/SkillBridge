import { Request, Response, NextFunction } from 'express';
import { chatService } from '../services/chatService';
import { ApiResponse } from '../utils/ApiResponse';

export const getChatContext = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const contextId = (req.params.id || req.params.projectId || req.query.projectId || '') as string;
    const user = (req as any).user;
    const result = await chatService.getChatContext(contextId, user.id);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).user;
    const result = await chatService.getConversations(user.id);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const getChatHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const projectId = (req.params.projectId || req.params.id || req.query.projectId || '') as string;
    const user = (req as any).user;
    const result = await chatService.getChatHistory(projectId, user.id);
    res.json(ApiResponse.success(result));
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).user;
    const { projectId, text, receiverId } = req.body;
    const targetProjectId = projectId || req.params.projectId || req.params.id;
    const result = await chatService.sendMessage({ projectId: targetProjectId, text, receiverId }, user.id);
    res.status(201).json(ApiResponse.success(result, 'Message sent successfully', 201));
  } catch (error) {
    next(error);
  }
};


