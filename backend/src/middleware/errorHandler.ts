import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import { AppError } from '../utils/AppError';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  // 1. AppError (explicit application domain errors)
  if (err instanceof AppError) {
    res.status(err.statusCode).json(ApiResponse.error(err.message, err.statusCode));
    return;
  }

  // 2. Prisma Database Errors
  if (err?.code === 'P2002') {
    const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : 'field';
    res.status(409).json(ApiResponse.error(`A resource with this ${target} already exists`, 409));
    return;
  }

  if (err?.code === 'P2025') {
    res.status(404).json(ApiResponse.error('The requested resource was not found', 404));
    return;
  }

  if (err?.code === 'P2003') {
    res.status(400).json(ApiResponse.error('Invalid reference: related entity does not exist', 400));
    return;
  }

  // 3. JWT and Auth Errors
  if (err?.name === 'JsonWebTokenError' || err?.name === 'TokenExpiredError') {
    res.status(401).json(ApiResponse.error('Invalid or expired authentication token', 401));
    return;
  }

  // 4. Default / Fallback Error
  const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;
  const message = statusCode === 500 && process.env.NODE_ENV === 'production'
    ? 'Internal Server Error'
    : (err.message || 'Internal Server Error');

  res.status(statusCode).json(ApiResponse.error(message, statusCode));
};

