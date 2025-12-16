// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  /**
   * Maneja el registro de usuarios.
   * Valida inputs básicos y responde en formato JSON.
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || typeof email !== 'string') {
        res.status(400).json({ error: 'Email is required and must be a string' });
        return;
      }

      if (!password || typeof password !== 'string') {
        res.status(400).json({ error: 'Password is required and must be a string' });
        return;
      }

      const user = await authService.register(email.trim().toLowerCase(), password);
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  /**
   * Maneja el login de usuarios.
   * Valida inputs básicos y responde en formato JSON.
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || typeof email !== 'string') {
        res.status(400).json({ error: 'Email is required and must be a string' });
        return;
      }

      if (!password || typeof password !== 'string') {
        res.status(400).json({ error: 'Password is required and must be a string' });
        return;
      }

      const result = await authService.login(email.trim().toLowerCase(), password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }
}
