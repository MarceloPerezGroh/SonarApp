import { Router } from "express";
import playlistRoutes from "./playlist.routes";

const router = Router();

// Monta todas las rutas
router.use("/", playlistRoutes);

export default router;
