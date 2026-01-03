import React from "react";
import { usePlaylist } from "../context/PlaylistContext";
import { usePlayer } from "../context/PlayerContext";
import { PlayIcon, PlusIcon } from "../icons"; // 👈 usa tus íconos SVG minimalistas

import "../styles/components/playlist-view.css";

const PlaylistView: React.FC = () => {
  const { playlists } = usePlaylist();
  const { play, addToQueue } = usePlayer();

  if (!playlists || playlists.length === 0) {
    return <p className="empty-msg">No hay playlists disponibles.</p>;
  }

  return (
    <div className="playlist-view">
      <h2 className="playlist-title">Playlists ({playlists.length})</h2>
      <ul className="playlist-list">
        {playlists.map((pl) => (
          <li key={pl.id} className="playlist-item">
            <strong className="playlist-name">{pl.name}</strong>
            <ul className="track-list">
              {pl.tracks.length === 0 ? (
                <li className="track-empty">Sin canciones</li>
              ) : (
                pl.tracks.map((t) => (
                  <li key={t.id} className="track-item">
                    <div className="track-info">
                      <span className="track-title">{t.title}</span>
                      <span className="track-artist">{t.artist}</span>
                    </div>
                    <div className="track-actions">
                      <button
                        className="action-btn"
                        onClick={() => play(t)}
                        aria-label="Reproducir"
                      >
                        <PlayIcon />
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => addToQueue(t)}
                        aria-label="Añadir a cola"
                      >
                        <PlusIcon />
                      </button>
                    </div>
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
