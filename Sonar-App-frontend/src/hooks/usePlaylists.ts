import { useState, useEffect } from "react";
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
      const res = await fetch("/playlists", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Error al cargar playlists");
      }

      const data: Playlist[] = await res.json();
      setPlaylists(data);
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
      const res = await fetch("/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al crear playlist");
      }

      const data: Playlist = await res.json();
      // Actualizamos lista local
      setPlaylists((prev) => [...prev, data]);
      return data;
    } catch (err: any) {
      setError(err.message || "Error al crear playlist");
      throw err;
    }
  };

  // Cargar playlists al montar
  useEffect(() => {
    fetchPlaylists();
  }, [token]);

  return { playlists, loading, error, fetchPlaylists, createPlaylist };
}
