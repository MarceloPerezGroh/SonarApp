import React from "react";
import { usePlaylists } from "../hooks/usePlaylists";

function PlaylistsList() {
  const { playlists, loading, error } = usePlaylists();

  if (loading) return <p className="playlist-status">Cargando playlists...</p>;
  if (error) return <p className="playlist-error">Error: {error}</p>;
  if (!playlists || playlists.length === 0) {
    return (
      <div className="playlist-empty">
        <p>No tenés playlists todavía 🎶</p>
        <p>Creá tu primera playlist para empezar a escuchar música.</p>
      </div>
    );
  }

  return (
    <div className="playlist-list">
      <h2>Mis Playlists</h2>
      <ul>
        {playlists.map((pl) => (
          <li key={pl.id} className="playlist-item">
            <strong>{pl.name}</strong>
            {pl.description && <p className="playlist-desc">{pl.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaylistsList;
