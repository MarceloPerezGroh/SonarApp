// src/types/Track.ts
export interface Track {
  id: number;
  title: string;
  artist?: string | { name: string };
  url: string;
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  genre?: string;
  year?: number;
  coverUrl?: string;
  preview?: string;
}
