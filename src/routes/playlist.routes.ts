import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createPlaylist } from "../controllers/playlist.controller";

const router = Router();

router.post("/playlists", authMiddleware, createPlaylist);

export default router;

