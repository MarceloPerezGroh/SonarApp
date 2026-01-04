// src/types/Track.ts
export interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;       // ruta del mp3
  cover?: string;    // opcional: portada del tema
}
