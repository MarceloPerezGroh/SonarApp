// src/types/Track.ts
export interface Track {
  id: number;
  title: string;
  artist?: string;
  url: string;
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  genre?: string;
  year?: number;
}
