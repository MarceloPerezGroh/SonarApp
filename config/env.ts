import { z } from "zod";

// Definición del esquema de variables de entorno
const envSchema = z.object({
  PORT: z.string().transform(Number).default("3000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  DATABASE_URL: z.string().min(1, "DATABASE_URL es requerido"),

  JWT_SECRET: z.string().min(1, "JWT_SECRET es requerido"),
  JWT_EXPIRATION: z.string().default("15m"),
  JWT_REFRESH_EXPIRATION: z.string().default("7d"),

  CORS_ORIGIN: z.string().default("*"),
  LOG_LEVEL: z.enum(["info", "warn", "error", "debug"]).default("info"),
});

// Parseo y validación de process.env
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Error en variables de entorno:", parsedEnv.error.format());
  throw new Error("Variables de entorno inválidas. Revisar archivo .env");
}

// Exportar objeto tipado
export const env = parsedEnv.data;
