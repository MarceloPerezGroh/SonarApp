import React, { createContext, useContext, useState } from "react";
import { Track } from "../services/deezer";

interface PlayerContextType {
  trackActual: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  pause: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trackActual, setTrackActual] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track: Track) => {
    setTrackActual(track);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  return (
    <PlayerContext.Provider value={{ trackActual, isPlaying, playTrack, pause }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer debe usarse dentro de PlayerProvider");
  }
  return context;
};
