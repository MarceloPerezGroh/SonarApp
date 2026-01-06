import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import tracksData from "../data/tracks.json";

// Tipo de cada track
export interface Track {
  id: number;
  title: string;
  artist?: string;
  url: string;
  imageUrl?: string;
  audioUrl?: string;
}

// Tipo del contexto
export interface PlayerContextType {
  isPlaying: boolean;
  currentTrack: Track | null;
  queue: Track[];
  repeat: boolean;
  volume: number;
  currentTime: number;
  duration: number;

  audioRef: React.RefObject<HTMLAudioElement>; // 👈 agregado

  play: (track: Track) => void;
  playPause: () => void;
  prev: () => void;
  next: () => void;
  shuffle: () => void;
  repeatToggle: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (id: number) => void;
  setCurrentTrack: (track: Track) => void;
  setVolume: (v: number) => void;
  seek: (percent: number) => void;
  allTracks: Track[];
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolumeState] = useState(0.6);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const allTracks: Track[] = (tracksData as {
    tracks: { id: number; title: string; artist?: string; src: string; imageUrl?: string }[];
  }).tracks.map((t) => ({
    id: t.id,
    title: t.title,
    artist: t.artist,
    url: t.src,
    imageUrl: t.imageUrl,
  }));

  const play = (track: Track) => {
    audioRef.current.src = track.url;
    audioRef.current.volume = volume;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
    setCurrentTrack(track);
  };

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

  const prev = () => {
    if (!currentTrack) return;
    const idx = allTracks.findIndex((t) => t.id === currentTrack.id);
    const prevTrack = allTracks[(idx - 1 + allTracks.length) % allTracks.length];
    play(prevTrack);
  };

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

  const shuffle = () => {
    const randomTrack = allTracks[Math.floor(Math.random() * allTracks.length)];
    play(randomTrack);
  };

  const repeatToggle = () => {
    setRepeat((r) => {
      const newRepeat = !r;
      audioRef.current.loop = newRepeat;
      return newRepeat;
    });
  };

  const addToQueue = (track: Track) => {
    setQueue((q) => [...q, track]);
  };

  const removeFromQueue = (id: number) => {
    setQueue((q) => q.filter((t) => t.id !== id));
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    audioRef.current.volume = v;
  };

  const seek = (percent: number) => {
    if (!audioRef.current.duration) return;
    audioRef.current.currentTime = (percent / 100) * audioRef.current.duration;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false); // 👈 vuelve al estado pausado
      // opcional: next(); // si querés que pase al siguiente automáticamente
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        queue,
        repeat,
        volume,
        currentTime,
        duration,
        audioRef, // 👈 ahora expuesto en el contexto
        play,
        playPause,
        prev,
        next,
        shuffle,
        repeatToggle,
        addToQueue,
        removeFromQueue,
        setCurrentTrack,
        setVolume,
        seek,
        allTracks,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
};
