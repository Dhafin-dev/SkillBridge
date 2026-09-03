import { NextFunction, Request, Response } from 'express';

interface RateLimitOptions { windowMs: number; max: number; message: string; }
interface Entry { count: number; resetAt: number; }

export const createRateLimiter = ({ windowMs, max, message }: RateLimitOptions) => {
  const requests = new Map<string, Entry>();
  return (req: Request, res: Response, next: NextFunction): void => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    const entry = requests.get(key);
    if (!entry || entry.resetAt <= now) {
      requests.set(key, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }
    if (entry.count >= max) {
      res.status(429).json({ success: false, error: message, statusCode: 429 });
      return;
    }
    entry.count += 1;
    next();
  };
};
