import React, { createContext, useContext, useState } from "react";
import { Track } from "../types/Track"; // ✅ usamos tu tipo Track centralizado

// Cada playlist tiene id, nombre y lista de tracks
export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

interface PlaylistContextType {
  playlists: Playlist[];
  addPlaylist: (playlist: Playlist) => void;
  addTrack: (playlistId: string, track: Track) => void;
  removeTrack: (playlistId: string, trackId: number) => void;
  deletePlaylist: (playlistId: string) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // Crear playlist nueva
  const addPlaylist = (playlist: Playlist) => {
    setPlaylists((prev) => [...prev, { ...playlist, tracks: [] }]);
  };

  // Agregar track a una playlist
  const addTrack = (playlistId: string, track: Track) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, tracks: [...pl.tracks, track] }
          : pl
      )
    );
  };

  // Eliminar track de una playlist
  const removeTrack = (playlistId: string, trackId: number) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, tracks: pl.tracks.filter((t) => t.id !== trackId) }
          : pl
      )
    );
  };

  // Borrar playlist completa
  const deletePlaylist = (playlistId: string) => {
    setPlaylists((prev) => prev.filter((pl) => pl.id !== playlistId));
  };

  return (
    <PlaylistContext.Provider
      value={{ playlists, addPlaylist, addTrack, removeTrack, deletePlaylist }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

// Hook para usar el contexto
export const usePlaylist = () => {
  const ctx = useContext(PlaylistContext);
  if (!ctx) {
    throw new Error("usePlaylist debe usarse dentro de PlaylistProvider");
  }
  return ctx;
};
