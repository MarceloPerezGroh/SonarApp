import axios from "axios";

export interface Track {
  id: number;
  title: string;
  artist: { name: string };
  album: { cover: string };
  preview: string; // URL de 30 segundos de audio
}

export const searchTracks = async (query: string, limit = 10): Promise<Track[]> => {
  try {
    const response = await axios.get<{ data: Track[] }>("https://api.deezer.com/search", {
      params: { q: query, limit },
    });
    return response.data.data;
  } catch (error) {
    console.error("❌ Error al buscar canciones en Deezer:", error);
    return [];
  }
};

