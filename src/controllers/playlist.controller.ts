import { Request, Response } from "express";
import { playlistSchema } from "../schemas/playlist.schema";
import * as playlistService from "../services/playlist.service";

// Crear playlist
export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const parsed = playlistSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        details: parsed.error.flatten(),
      });
    }

    const ownerId = req.user?.id;

    if (!ownerId) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const playlist = await playlistService.createPlaylist(ownerId, parsed.data);

    return res.status(201).json({
      message: "Playlist creada exitosamente",
      playlist,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener playlists del usuario autenticado
// src/controllers/playlist.controller.ts

export const getPlaylists = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?.id;
    if (!ownerId) {
      return res.status(401).json({ error: "Token inválido" });
    }

    // Parámetros de paginación con defaults
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { total, playlists } = await playlistService.getUserPlaylists(
      ownerId,
      page,
      limit
    );

    return res.status(200).json({
      message: "Playlists del usuario autenticado",
      total,
      page,
      limit,
      results: playlists.length,
      playlists,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};


// Agregar canción a playlist
export const addSongToPlaylist = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?.id;

    if (!ownerId) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const { id: playlistId } = req.params;
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({ error: "songId es requerido" });
    }

    const track = await playlistService.addSongToPlaylist(playlistId, ownerId, songId);

    return res.status(201).json({
      message: "Canción agregada exitosamente",
      track,
    });
  } catch (err: any) {
    console.error(err);
    if (err.message.includes("No autorizado")) {
      return res.status(403).json({ error: err.message });
    }
    if (err.message.includes("ya está en la playlist")) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener canciones de una playlist


export const getPlaylistSongs = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?.id;
    if (!ownerId) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const { id: playlistId } = req.params;

    const songs = await playlistService.getPlaylistSongs(playlistId, ownerId);

    return res.status(200).json({
      message: "Canciones de la playlist",
      count: songs.length,
      songs,
    });
  } catch (err: any) {
    console.error(err);
    if (err.message.includes("No autorizado")) {
      return res.status(403).json({ error: err.message });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};


// Eliminar canción de una playlist
export const deleteSongFromPlaylist = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?.id; // 👈 usamos id, no userId
    if (!ownerId) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const { playlistId, songId } = req.params;

    const updatedPlaylist = await playlistService.deleteSongFromPlaylist(playlistId, ownerId, songId);

    return res.status(200).json({
      message: "Canción eliminada y posiciones reordenadas",
      playlist: updatedPlaylist,
    });
  } catch (err: any) {
    console.error(err);
    if (err.message.includes("No autorizado")) {
      return res.status(403).json({ error: err.message });
    }
    if (err.message.includes("no encontrada")) {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

//eliminar playlist

export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?.id; // uuid del usuario autenticado
    if (!ownerId) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const { id: playlistId } = req.params;

    await playlistService.deletePlaylist(playlistId, ownerId);

    return res.status(200).json({
      message: "Playlist eliminada exitosamente",
      playlistId,
    });
  } catch (err: any) {
    console.error(err);
    if (err.message.includes("No autorizado")) {
      return res.status(403).json({ error: err.message });
    }
    if (err.message.includes("no encontrada")) {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};


