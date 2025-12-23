import { prisma } from "../lib/prisma";
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

// Agregar canción al final de la playlist
export const addSongToPlaylist = async (
  playlistId: string,
  ownerId: string,
  songId: string
) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
    select: { ownerId: true },
  });

  if (!playlist || playlist.ownerId !== ownerId) {
    throw new Error("No autorizado: la playlist no pertenece al usuario");
  }

  const existingTrack = await prisma.playlistTrack.findUnique({
    where: { playlistId_songId: { playlistId, songId } },
  });

  if (existingTrack) {
    throw new Error("La canción ya está en la playlist");
  }

  const lastTrack = await prisma.playlistTrack.findFirst({
    where: { playlistId },
    orderBy: { position: "desc" },
  });

  const nextPosition = lastTrack ? lastTrack.position + 1 : 0;

  return prisma.playlistTrack.create({
    data: {
      playlistId,
      songId,
      position: nextPosition,
    },
    include: { song: true },
  });
};

// Reordenar canciones dentro de una playlist
export const reorderSongs = async (
  playlistId: string,
  ownerId: string,
  orderedSongIds: string[]
) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
    include: { tracks: true },
  });

  if (!playlist) throw new Error("Playlist no encontrada");
  if (playlist.ownerId !== ownerId) throw new Error("No autorizado");

  const existingSongIds = playlist.tracks.map(t => t.songId);
  const sameSet =
    orderedSongIds.length === existingSongIds.length &&
    orderedSongIds.every(id => existingSongIds.includes(id));

  if (!sameSet) {
    throw new Error("songIds no coincide con las canciones de la playlist");
  }

  await prisma.$transaction(
    orderedSongIds.map((songId, index) =>
      prisma.playlistTrack.update({
        where: { playlistId_songId: { playlistId, songId } },
        data: { position: index },
      })
    )
  );

  return prisma.playlist.findUnique({
    where: { id: playlistId },
    include: {
      tracks: { include: { song: true }, orderBy: { position: "asc" } },
    },
  });
};

// Obtener playlists del usuario autenticado con paginación
export const getUserPlaylists = async (
  ownerId: string,
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;

  const total = await prisma.playlist.count({
    where: { ownerId },
  });

  const playlists = await prisma.playlist.findMany({
    where: { ownerId },
    skip,
    take: limit,
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

  return { total, page, limit, playlists };
};

// Obtener canciones de una playlist del usuario autenticado
export const getPlaylistSongs = async (playlistId: string, ownerId: string) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
    select: { ownerId: true },
  });

  if (!playlist || playlist.ownerId !== ownerId) {
    throw new Error("No autorizado: la playlist no pertenece al usuario");
  }

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

// Eliminar canción de una playlist
export async function deleteSongFromPlaylist(
  playlistId: string,
  ownerId: string,
  songId: string
) {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
    include: { tracks: true },
  });

  if (!playlist) throw new Error("Playlist no encontrada");
  if (playlist.ownerId !== ownerId) throw new Error("No autorizado");

  await prisma.playlistTrack.delete({
    where: { playlistId_songId: { playlistId, songId } },
  });

  const remainingTracks = await prisma.playlistTrack.findMany({
    where: { playlistId },
    orderBy: { position: "asc" },
  });

  await prisma.$transaction(
    remainingTracks.map((track, index) =>
      prisma.playlistTrack.update({
        where: { playlistId_songId: { playlistId, songId: track.songId } },
        data: { position: index },
      })
    )
  );

  return prisma.playlist.findUnique({
    where: { id: playlistId },
    include: {
      tracks: { include: { song: true }, orderBy: { position: "asc" } },
    },
  });
}

// Eliminar playlist y sus relaciones
export async function deletePlaylist(playlistId: string, ownerId: string) {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
    select: { ownerId: true },
  });

  if (!playlist) throw new Error("Playlist no encontrada");
  if (playlist.ownerId !== ownerId) throw new Error("No autorizado");

  await prisma.playlistTrack.deleteMany({
    where: { playlistId },
  });

  await prisma.playlist.delete({
    where: { id: playlistId },
  });

  return true;
}
