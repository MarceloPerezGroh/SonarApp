// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Authorization header missing or malformed' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET must be defined in environment variables');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & { sub?: string; email?: string };

    if (!decoded || !decoded.sub) {
      res.status(401).json({ error: 'Invalid token payload' });
      return;
    }

    req.user = {
      id: decoded.sub,
      email: decoded.email,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: ' + (error as Error).message });
  }
};
