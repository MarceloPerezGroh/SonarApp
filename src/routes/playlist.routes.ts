import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import * as playlistController from "../controllers/playlist.controller";

const router = Router();

// Crear y listar playlists
router.post("/", authMiddleware, playlistController.createPlaylist);
router.get("/", authMiddleware, playlistController.getPlaylists);

// Canciones dentro de playlists
router.get("/:id/songs", authMiddleware, playlistController.getPlaylistSongs);
router.post("/:id/songs", authMiddleware, playlistController.addSongToPlaylist);
router.delete("/:playlistId/songs/:songId", authMiddleware, playlistController.deleteSongFromPlaylist);

// Reordenar canciones
router.patch("/:id/songs/reorder", authMiddleware, playlistController.reorderSongs);

// Eliminar playlist
router.delete("/:id", authMiddleware, playlistController.deletePlaylist);

export default router;
