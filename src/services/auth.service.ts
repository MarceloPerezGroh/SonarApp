// src/services/auth.service.ts

import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

const prisma = new PrismaClient();

export class AuthService {
  private readonly jwtSecret: jwt.Secret;
  private readonly jwtExpiration: SignOptions['expiresIn'];

  constructor() {
    this.jwtSecret = env.JWT_SECRET;

    // 👇 casteo seguro y explícito (string validado por Zod)
    this.jwtExpiration = env.JWT_EXPIRATION as SignOptions['expiresIn'];
  }

  async register(
    email: string,
    password: string
  ): Promise<Omit<User, 'passwordHash'>> {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error('Email already registered');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, passwordHash },
    });

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: Omit<User, 'passwordHash'>; token: string }> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    const { passwordHash: _, ...safeUser } = user;

    return { user: safeUser, token };
  }

  private generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const options: SignOptions = {
      expiresIn: this.jwtExpiration,
      algorithm: 'HS256',
    };

    return jwt.sign(payload, this.jwtSecret, options);
  }
}
