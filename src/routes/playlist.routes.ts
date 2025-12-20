import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { prisma } from "../lib/prisma";
import * as playlistController from "../controllers/playlist.controller"; // 👈 IMPORTAR AQUÍ

const router = Router();


router.post("/playlists", authMiddleware, playlistController.createPlaylist);
router.get("/playlists", authMiddleware, playlistController.getPlaylists);
router.get("/playlists/:id/songs", authMiddleware, playlistController.getPlaylistSongs);
router.post("/playlists/:id/songs", authMiddleware, playlistController.addSongToPlaylist);
router.delete("/playlists/:playlistId/songs/:songId", authMiddleware, playlistController.deleteSongFromPlaylist);



router.patch("/playlists/:id/songs/reorder", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user!.id;          // string (uuid)
    const playlistId = req.params.id;     // string (uuid)
    const { songIds } = req.body as { songIds: string[] }; // 👈 tipado como string[]

    if (!Array.isArray(songIds) || songIds.length === 0) {
      return res.status(400).json({ error: "songIds debe ser un array no vacío" });
    }

    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
      include: {
        tracks: { include: { song: true } },
      },
    });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist no encontrada" });
    }

    if (playlist.ownerId !== userId) {
      return res.status(403).json({ error: "No tienes acceso a esta playlist" });
    }

    const existingSongIds = playlist.tracks.map(t => t.songId); // string[]

    const sameSet =
      songIds.length === existingSongIds.length &&
      songIds.every((id: string) => existingSongIds.includes(id)); // 👈 ahora todo string

    if (!sameSet) {
      return res.status(400).json({ error: "songIds no coincide con las canciones de la playlist" });
    }

    await prisma.$transaction(
      songIds.map((songId: string, index: number) =>
        prisma.playlistTrack.update({
          where: { playlistId_songId: { playlistId, songId } },
          data: { position: index },
        })
      )
    );

    const updated = await prisma.playlist.findUnique({
      where: { id: playlistId },
      include: {
        tracks: {
          include: { song: true },
          orderBy: { position: "asc" },
        },
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

//para eliminar routes
router.delete(
  "/playlists/:id",
  authMiddleware,
  playlistController.deletePlaylist
);


export default router;
