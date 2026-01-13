import { useState } from "react";

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
  const [songId, setSongId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const newSong: Song = {
        id: songId,
        title: `Canción ${songId}`,
        artist: "Artista desconocido",
      };

      onSongAdded(newSong); // actualiza estado local en PlaylistDetail
      setSongId("");
    } catch {
      setError("Error al agregar canción");
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
