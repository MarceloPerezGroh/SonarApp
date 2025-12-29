import { useState, useEffect } from "react";
import api from "../api/client";
import { useAuth } from "./useAuth";

// 🔹 Tipo Playlist extendido
export interface Playlist {
  id: string;
  name: string;
  description?: string; // opcional, evita errores si el backend la devuelve
}

export function usePlaylists() {
  const { token } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 GET /playlists
  const fetchPlaylists = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<Playlist[]>("/playlists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaylists(res.data);
    } catch (err) {
      setError("Error al cargar playlists");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 POST /playlists
  const createPlaylist = async (name: string) => {
    if (!token) return;
    setError(null);
    try {
      const res = await api.post<Playlist>(
        "/playlists",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Actualizamos lista local
      setPlaylists((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError("Error al crear playlist");
      throw err;
    }
  };

  // Cargar playlists al montar
  useEffect(() => {
    fetchPlaylists();
  }, [token]);

  return { playlists, loading, error, fetchPlaylists, createPlaylist };
}
