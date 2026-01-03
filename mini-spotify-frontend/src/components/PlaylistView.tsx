import React from "react";
import { usePlaylist } from "../context/PlaylistContext";

const PlaylistView: React.FC = () => {
  const { playlists } = usePlaylist();

  if (!playlists) {
    return <p>No hay playlists disponibles.</p>;
  }

  return (
    <div>
      <h2>Playlists ({playlists.length})</h2>
      <ul>
        {playlists.map((pl) => (
          <li key={pl.id}>
            <strong>{pl.name}</strong>
            <ul>
              {pl.tracks.length === 0 ? (
                <li>Sin canciones</li>
              ) : (
                pl.tracks.map((t) => (
                  <li key={t.id}>
                    {t.title} — {t.artist}
                  </li>
                ))
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistView;
