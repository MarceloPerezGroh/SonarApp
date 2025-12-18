import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extender la interfaz Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token ausente o inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & {
      userId: string;
    };

    if (!decoded.userId) {
      return res.status(401).json({ error: "Token inválido: falta userId" });
    }

    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}
