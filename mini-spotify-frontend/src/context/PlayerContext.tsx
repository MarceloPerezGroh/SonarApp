import React, { createContext, useContext, useRef, useState } from "react";
import tracksData from "../data/tracks.json";

// Tipo de cada track
export interface Track {
  id: number;
  title: string;
  artist?: string;
  url: string;
}

// Tipo del contexto: todas las funciones y estados disponibles
export interface PlayerContextType {
  isPlaying: boolean;
  currentTrack: Track | null;
  queue: Track[];
  repeat: boolean;

  play: (track: Track) => void;
  playPause: () => void;
  prev: () => void;
  next: () => void;
  shuffle: () => void;
  repeatToggle: () => void;
  addToQueue: (track: Track) => void;
}

// Crear el contexto
const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [repeat, setRepeat] = useState(false);

  // Transformar JSON a Track[]
  const allTracks: Track[] = (tracksData as {
    tracks: { id: number; title: string; artist?: string; src: string }[];
  }).tracks.map((t) => ({
    id: t.id,
    title: t.title,
    artist: t.artist,
    url: t.src,
  }));

  // Reproducir un track específico
  const play = (track: Track) => {
    audioRef.current.src = track.url;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
    setCurrentTrack(track);
  };

  // Alternar play/pause
  const playPause = () => {
    if (!audioRef.current.src) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Ir al track anterior
  const prev = () => {
    if (!currentTrack) return;
    const idx = allTracks.findIndex((t) => t.id === currentTrack.id);
    const prevTrack = allTracks[(idx - 1 + allTracks.length) % allTracks.length];
    play(prevTrack);
  };

  // Ir al siguiente track (si hay cola, la usa primero)
  const next = () => {
    if (queue.length > 0) {
      const [first, ...rest] = queue;
      setQueue(rest);
      play(first);
    } else if (currentTrack) {
      const idx = allTracks.findIndex((t) => t.id === currentTrack.id);
      const nextTrack = allTracks[(idx + 1) % allTracks.length];
      play(nextTrack);
    }
  };

  // Reproducir un track aleatorio
  const shuffle = () => {
    const randomTrack = allTracks[Math.floor(Math.random() * allTracks.length)];
    play(randomTrack);
  };

  // Alternar repetición
  const repeatToggle = () => {
    setRepeat((r) => {
      const newRepeat = !r;
      audioRef.current.loop = newRepeat;
      return newRepeat;
    });
  };

  // Agregar un track a la cola
  const addToQueue = (track: Track) => {
    setQueue((q) => [...q, track]);
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        queue,
        repeat,
        play,
        playPause,
        prev,
        next,
        shuffle,
        repeatToggle,
        addToQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

// Hook para consumir el contexto
export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};
