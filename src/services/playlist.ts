// Responsable de la lógica de negocio relacionada a playlists
// - crear playlist
// - agregar canciones
// - ordenar canciones

import { Router, Request, Response } from "express";
import { z } from "zod";
import prisma from "../prisma/client"; // instancia centralizada de Prisma
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// --- Validación con Zod ---
const playlistSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
});

// --- POST /playlists ---
router.post("/playlists", authMiddleware, async (req: Request, res: Response) => {
  try {
    const parsed = playlistSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        details: parsed.error.flatten(),
      });
    }

    const { name, description } = parsed.data;

    // req.user viene del middleware
    const ownerId = req.user?.userId;
    if (!ownerId) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId, // ✅ relación con el usuario autenticado
      },
    });

    return res.status(201).json({
      message: "Playlist creada exitosamente",
      playlist,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
