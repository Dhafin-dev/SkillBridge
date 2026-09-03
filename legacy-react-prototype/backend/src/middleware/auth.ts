import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import prisma from '../utils/prisma';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    tokenVersion: number;
  };
}

const extractUser = async (req: AuthRequest): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return;

  const decoded = jwt.verify(authHeader.slice(7), env.JWT_SECRET) as {
    id: string;
    role: string;
    tokenVersion?: number;
  };
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { id: true, role: true, tokenVersion: true },
  });
  if (!user || decoded.tokenVersion !== user.tokenVersion || decoded.role.toUpperCase() !== user.role) {
    throw new Error('Invalid token');
  }
  req.user = { id: user.id, role: user.role, tokenVersion: user.tokenVersion };
};

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    await extractUser(req);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const optionalAuthenticate = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  if (!req.headers.authorization) {
    next();
    return;
  }
  try {
    await extractUser(req);
  } catch {
    // Public project pages stay available; invalid credentials receive no private data.
  }
  next();
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    
    if (!roles.includes(req.user.role.toUpperCase())) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }
    
    next();
  };
};
