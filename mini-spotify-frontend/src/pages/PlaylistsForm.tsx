import { useState } from "react";
import { usePlaylist, Playlist } from "../context/PlaylistContext";

interface Props {
  onCreated: (playlist: Playlist) => void;
}

const PlaylistForm: React.FC<Props> = ({ onCreated }) => {
  const { addPlaylist } = usePlaylist();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim() === "") {
      setError("El nombre de la playlist no puede estar vacío.");
      return;
    }

    try {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name,
        tracks: [], // ✅ obligatorio según el contexto
      };
      addPlaylist(newPlaylist);
      onCreated(newPlaylist);
      setName("");
    } catch {
      setError("Error al crear playlist local.");
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
};

export default PlaylistForm;
