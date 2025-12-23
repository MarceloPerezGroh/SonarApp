import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import playlistRoutes from "./routes/playlist.routes";
import { env } from "./config/env";

const app = express();

// 🔧 Middlewares globales
app.use(cors({ origin: env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json());

// 🩺 Endpoint de salud
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", env: env.NODE_ENV || "development" });
});

// 🔐 Rutas de autenticación
app.use("/auth", authRoutes);

// 🎵 Rutas de playlists
app.use("/playlists", playlistRoutes);

// 🔧 Endpoint de prueba para frontend
app.get("/test-backend", (_req: Request, res: Response) => {
  res.json({ message: "Backend conectado correctamente 🎉" });
});

// ⚠️ Manejo de rutas inexistentes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// 🛑 Manejo global de errores
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("❌ Error inesperado:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

export default app;
