// src/types/express.d.ts
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface User {
      id: string;
      email?: string;
    }
    interface Request {
      user?: User;
    }
  }
}
