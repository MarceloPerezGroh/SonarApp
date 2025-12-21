import { useState } from "react";
import api from "../api/client";
import { useAuth } from "../auth/authContext";

interface Song {
  id: string;
  title: string;
  artist: string;
}

interface Props {
  playlistId: string;
  onSongAdded: (song: Song) => void;
}

function AddSongForm({ playlistId, onSongAdded }: Props) {
  const { token } = useAuth();
  const [songId, setSongId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post<Song>(
        `/playlists/${playlistId}/songs`,
        { songId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSongAdded(res.data); // actualiza estado local en PlaylistDetail
      setSongId("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al agregar canción");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={songId}
        onChange={(e) => setSongId(e.target.value)}
        placeholder="ID de la canción"
        required
      />
      <button type="submit">Agregar canción</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default AddSongForm;
