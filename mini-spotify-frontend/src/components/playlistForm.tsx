import { useState } from "react";
import api from "../api/client";
import { useAuth } from "../auth/authContext";
import "./PlaylistForm.css";   // 👈 importamos el CSS

interface Props {
  onCreated: (playlist: { id: string; name: string }) => void;
}

function PlaylistForm({ onCreated }: Props) {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post(
        "/playlists",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onCreated(res.data);
      setName("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear playlist");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la playlist"
        required
      />
      <button type="submit">Crear</button>
      {error && <p className="error">{error}</p>} {/* 👈 usamos la clase */}
    </form>
  );
}

export default PlaylistForm;
