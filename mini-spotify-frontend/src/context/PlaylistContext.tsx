import React, { createContext, useContext, useState } from "react";
import { Track } from "../services/deezer";

interface PlaylistContextType {
  playlist: Track[];
  addTrack: (track: Track) => void;
  removeTrack: (id: number) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlist, setPlaylist] = useState<Track[]>([]);

  const addTrack = (track: Track) => {
    // Evitar duplicados
    setPlaylist((prev) => {
      if (prev.find((t) => t.id === track.id)) return prev;
      return [...prev, track];
    });
  };

  const removeTrack = (id: number) => {
    setPlaylist((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <PlaylistContext.Provider value={{ playlist, addTrack, removeTrack }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = (): PlaylistContextType => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist debe usarse dentro de PlaylistProvider");
  }
  return context;
};
