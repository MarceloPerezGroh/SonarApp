import prisma from "../prisma/client";
import { PlaylistInput } from "../schemas/playlist.schema";

// Crear playlist
export const createPlaylist = async (ownerId: string, data: PlaylistInput) => {
  return prisma.playlist.create({
    data: {
      name: data.name,
      description: data.description,
      ownerId,
    },
  });
};

// Agregar canción al final de la playlist (versión única y robusta)
export const addSongToPlaylist = async (playlistId: string, ownerId: string, songId: string) => {
  // 1. Verificar que la playlist pertenezca al usuario
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
    select: { ownerId: true },
  });

  if (!playlist || playlist.ownerId !== ownerId) {
    throw new Error("No autorizado: la playlist no pertenece al usuario");
  }

  // 2. Evitar duplicados
  const existingTrack = await prisma.playlistTrack.findUnique({
    where: {
      playlistId_songId: { playlistId, songId },
    },
  });

  if (existingTrack) {
    throw new Error("La canción ya está en la playlist");
  }

  // 3. Calcular posición incremental (última posición + 1)
  const lastTrack = await prisma.playlistTrack.findFirst({
    where: { playlistId },
    orderBy: { position: "desc" },
  });

  const nextPosition = lastTrack ? lastTrack.position + 1 : 0;

  // 4. Insertar canción
  return prisma.playlistTrack.create({
    data: {
      playlistId,
      songId,
      position: nextPosition,
    },
    include: {
      song: true,
    },
  });
};

// Reordenar canciones dentro de una playlist
export const reorderSongs = async (playlistId: string, orderedSongIds: string[]) => {
  const updates = orderedSongIds.map((songId, index) =>
    prisma.playlistTrack.update({
      where: { playlistId_songId: { playlistId, songId } },
      data: { position: index },
    })
  );
  return Promise.all(updates);
};

// Obtener playlists del usuario autenticado
export const getUserPlaylists = async (ownerId: string) => {
  return prisma.playlist.findMany({
    where: { ownerId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      tracks: {
        select: {
          song: {
            select: {
              id: true,
              title: true,
              artist: true,
              album: true,
              durationMs: true,
            },
          },
          position: true,
        },
        orderBy: { position: "asc" },
      },
    },
  });
};

// Obtener canciones de una playlist del usuario autenticado
export const getPlaylistSongs = async (playlistId: string, ownerId: string) => {
  // 1. Verificar que la playlist pertenezca al usuario
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
    select: { ownerId: true },
  });

  if (!playlist || playlist.ownerId !== ownerId) {
    throw new Error("No autorizado: la playlist no pertenece al usuario");
  }

  // 2. Obtener canciones ordenadas por position
  return prisma.playlistTrack.findMany({
    where: { playlistId },
    orderBy: { position: "asc" },
    select: {
      position: true,
      song: {
        select: {
          id: true,
          title: true,
          artist: true,
          album: true,
          durationMs: true,
        },
      },
    },
  });
};
