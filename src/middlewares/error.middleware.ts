import { Request, Response, NextFunction } from "express";

// Definición de un tipo de error conocido
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 400, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Mantener el stack trace correcto en TypeScript
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Middleware global de manejo de errores
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Errores conocidos (AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
    return;
  }

  // Errores desconocidos
  console.error("❌ Error inesperado:", err);

  res.status(500).json({
    success: false,
    error: {
      message: "Internal Server Error",
      statusCode: 500,
    },
  });
}
