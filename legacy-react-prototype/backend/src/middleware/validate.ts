import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiResponse } from '../utils/ApiResponse';

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const issues = (error as any).issues || (error as any).errors || [];
        const errorMessages = issues.map((e: any) => {
          const path = e.path && e.path.length > 0 ? e.path.filter((p: any) => p !== 'body').join('.') : '';
          return path ? `${path}: ${e.message}` : e.message;
        }).join(', ');
        res.status(400).json(ApiResponse.error(errorMessages || 'Validation failed', 400));
        return;
      }
      res.status(400).json(ApiResponse.error('Invalid request data', 400));
    }

  };
};
