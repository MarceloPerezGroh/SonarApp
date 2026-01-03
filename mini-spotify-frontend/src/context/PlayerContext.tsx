import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { Track } from "../types/Track";

interface PlayerContextType {
  current: Track | null;
  queue: Track[];
  play: (track: Track) => void;
  addToQueue: (track: Track) => void;
  next: () => void;
  clearQueue: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [current, setCurrent] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = (track: Track) => {
    setCurrent(track);
    setIsPlaying(true);
  };

  const addToQueue = (track: Track) => {
    setQueue((prev) => [...prev, track]);
    if (!current) {
      setCurrent(track);
      setIsPlaying(true);
    }
  };

  const next = () => {
    setQueue((prev) => {
      const [, ...rest] = prev;
      setCurrent(rest[0] ?? null);
      return rest;
    });
  };

  const clearQueue = () => {
    setQueue([]);
    setCurrent(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // reproducir automáticamente cuando cambia current
  useEffect(() => {
    if (current && audioRef.current) {
      audioRef.current.src = current.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [current]);

  return (
    <PlayerContext.Provider
      value={{ current, queue, play, addToQueue, next, clearQueue, isPlaying, togglePlay }}
    >
      {children}
      <audio ref={audioRef} onEnded={next} />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer debe usarse dentro de PlayerProvider");
  return ctx;
};
