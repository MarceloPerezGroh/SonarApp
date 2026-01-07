import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import tracksData from "../data/tracks.json";
import { Track as GlobalTrack } from "../types/Track"; // 👈 renombramos la importación

// Tipo de cada track (local extendido)
export interface Track extends GlobalTrack {
  url: string;        // puede ser audio o video
  audioUrl?: string;
  videoUrl?: string;
  genre?: string;     // 👈 agregado
  year?: number;      // 👈 agregado
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

  audioRef: React.RefObject<HTMLAudioElement>;
  videoRef: React.RefObject<HTMLVideoElement>;

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
  addTrack: (track: Track, persist?: boolean) => void; // 👈 ahora acepta persist opcional
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolumeState] = useState(0.6);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 👇 ahora allTracks es estado, inicializado desde JSON o localStorage
  const [allTracks, setAllTracks] = useState<Track[]>(() => {
    const saved = localStorage.getItem("tracks");
    if (saved) {
      try {
        return JSON.parse(saved) as Track[];
      } catch {
        // fallback al JSON si falla el parse
      }
    }
    return (tracksData as {
      tracks: {
        id: number;
        title: string;
        artist?: string;
        src: string;
        imageUrl?: string;
        audioUrl?: string;
        videoUrl?: string;
        genre?: string;
        year?: number;
      }[];
    }).tracks.map((t) => ({
      id: t.id,
      title: t.title,
      artist: t.artist,
      url: t.src,
      imageUrl: t.imageUrl,
      audioUrl: t.audioUrl,
      videoUrl: t.videoUrl,
      genre: t.genre,
      year: t.year
    }));
  });

  const addTrack = (track: Track, persist: boolean = false) => {
    setAllTracks((prev) => {
      const updated = [...prev, track];
      if (persist) {
        localStorage.setItem("tracks", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const play = (track: Track) => {
    setCurrentTrack(track);

    if (track.videoUrl && videoRef.current) {
      videoRef.current.src = track.videoUrl;
      videoRef.current.volume = volume;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audioRef.current.src = track.audioUrl || track.url;
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const playPause = () => {
    const element = currentTrack?.videoUrl ? videoRef.current : audioRef.current;
    if (!element?.src) return;

    if (isPlaying) {
      element.pause();
      setIsPlaying(false);
    } else {
      element
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
      if (videoRef.current) videoRef.current.loop = newRepeat;
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
    if (videoRef.current) videoRef.current.volume = v;
  };

  const seek = (percent: number) => {
    const element = currentTrack?.videoUrl ? videoRef.current : audioRef.current;
    if (!element?.duration) return;
    element.currentTime = (percent / 100) * element.duration;
  };

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;

    const updateTime = () => {
      const element = currentTrack?.videoUrl ? video : audio;
      if (!element) return;
      setCurrentTime(element.currentTime);
      setDuration(element.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      // opcional: next();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("ended", handleEnded);

    if (video) {
      video.addEventListener("timeupdate", updateTime);
      video.addEventListener("loadedmetadata", updateTime);
      video.addEventListener("ended", handleEnded);
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("ended", handleEnded);

      if (video) {
        video.removeEventListener("timeupdate", updateTime);
        video.removeEventListener("loadedmetadata", updateTime);
        video.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentTrack]);

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
        audioRef,
        videoRef,
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
        addTrack, // 👈 ahora soporta persistencia opcional
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
