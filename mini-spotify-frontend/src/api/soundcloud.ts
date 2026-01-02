import axios from "axios";

// URL base de la API de SoundCloud
const BASE_URL = "https://api-v2.soundcloud.com/search/tracks";

// ⚠️ Guardá tu client_id en el archivo .env del frontend como VITE_SOUNDCLOUD_CLIENT_ID
const CLIENT_ID = import.meta.env.VITE_SOUNDCLOUD_CLIENT_ID;

// Interfaz para tipar cada track
export interface Track {
  id: number;
  title: string;
  user: {
    username: string;
  };
  artwork_url: string | null;
  permalink_url: string;
}

// Función que busca canciones en SoundCloud
export const searchTracks = async (query: string): Promise<Track[]> => {
  const response = await axios.get<{ collection: Track[] }>(BASE_URL, {
    params: {
      q: query,
      client_id: CLIENT_ID,
      limit: 10, // cantidad de resultados
    },
  });

  return response.data.collection;
};
