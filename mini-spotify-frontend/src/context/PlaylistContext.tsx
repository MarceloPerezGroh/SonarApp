import React, { createContext, useContext, useRef, useState } from "react";
import tracksData from "../data/tracks.json";

export interface Track {
  id: number;
  title: string;
  artist?: string;
  url: string;
  imageUrl?: string;
}

export interface PlaylistContextType {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  repeat: boolean;

  play: (track: Track) => void;
  playPause: () => void;
  prev: () => void;
  next: () => void;
  shuffle: () => void;
  repeatToggle: () => void;
  addToQueue: (track: Track) => void;
  setCurrentTrack: (track: Track) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [repeat, setRepeat] = useState(false);

  const tracks: Track[] = (tracksData as {
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
    const idx = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevTrack = tracks[(idx - 1 + tracks.length) % tracks.length];
    play(prevTrack);
  };

  const next = () => {
    if (queue.length > 0) {
      const [first, ...rest] = queue;
      setQueue(rest);
      play(first);
    } else if (currentTrack) {
      const idx = tracks.findIndex((t) => t.id === currentTrack.id);
      const nextTrack = tracks[(idx + 1) % tracks.length];
      play(nextTrack);
    }
  };

  const shuffle = () => {
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
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

  const value: PlaylistContextType = {
    tracks,
    currentTrack,
    isPlaying,
    queue,
    repeat,
    play,
    playPause,
    prev,
    next,
    shuffle,
    repeatToggle,
    addToQueue,
    setCurrentTrack,
  };

  return <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>;
};

export const usePlaylist = () => {
  const ctx = useContext(PlaylistContext);
  if (!ctx) throw new Error("usePlaylist must be used within PlaylistProvider");
  return ctx;
};
