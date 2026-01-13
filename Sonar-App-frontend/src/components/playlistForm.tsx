import { useState } from "react";
import { useAuth } from "../auth/authContext";
import "../styles/components/playlist-form.css";


interface Playlist {
  id: string;
  name: string;
}

interface Props {
  onCreated: (playlist: Playlist) => void;
}

function PlaylistForm({ onCreated }: Props) {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
      onCreated(data);
      setName("");
    } catch (err: any) {
      setError(err.message || "Error al crear playlist");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="playlist-form">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la playlist"
        required
      />
      <button type="submit">Crear</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default PlaylistForm;
