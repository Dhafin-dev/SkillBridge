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
        res.status(400).json(ApiResponse.error((error as any).errors.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', '), 400));
        return;
      }
      res.status(400).json(ApiResponse.error('Invalid request data', 400));
    }
  };
};
