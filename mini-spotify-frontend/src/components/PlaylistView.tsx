import React from "react";
import { usePlaylist } from "../context/PlaylistContext";
import "./PlaylistView.css"; // ✅ estilos externos

const PlaylistView: React.FC = () => {
  const { playlist, removeTrack } = usePlaylist();

  if (playlist.length === 0) {
    return <p className="playlist-empty">Tu playlist está vacía</p>;
  }

  return (
    <div className="playlist-view">
      <h2>Mi Playlist</h2>
      <ul>
        {playlist.map((track) => (
          <li key={track.id} className="playlist-item">
            {track.album?.cover && (
              <img src={track.album.cover} alt={track.title} className="playlist-image" />
            )}
            <span className="playlist-title">
              {track.title} — {track.artist.name}
            </span>
            <button
              className="remove-button"
              onClick={() => removeTrack(track.id)}
            >
              ❌ Quitar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistView;

