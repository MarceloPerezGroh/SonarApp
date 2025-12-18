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

    const ownerId = req.user?.userId;
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
export const getPlaylists = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?.userId;
    if (!ownerId) {
      return res.status(401).json({ error: "Token inválido" });
    }

    const playlists = await playlistService.getUserPlaylists(ownerId);

    return res.status(200).json({
      message: "Playlists del usuario autenticado",
      count: playlists.length,
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
    const ownerId = req.user?.userId;
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
    const ownerId = req.user?.userId;
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
