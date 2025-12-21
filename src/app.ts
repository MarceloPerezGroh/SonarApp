import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import playlistRoutes from "./routes/playlist.routes";
import { env } from "./config/env";

const app = express();

// 🔧 Middlewares globales
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

// 🩺 Endpoint de salud
app.get("/health", (_req, res) => {
  res.json({ status: "ok", env: env.NODE_ENV });
});

// 🔐 Rutas de autenticación
app.use("/auth", authRoutes);

// 🎵 Rutas de playlists
app.use("/playlists", playlistRoutes);

// 🔧 Endpoint de prueba para frontend
app.get("/test-backend", (_req, res) => {
  res.json({ message: "Backend conectado correctamente 🎉" });
});

// ⚠️ Manejo de rutas inexistentes (siempre al final)
app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;

