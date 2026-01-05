import React, { useState } from "react";
import "../styles/layout/top-bar.css";
import { SearchIcon, PlayIcon, PlusIcon } from "../icons"; // 👈 HomeIcon eliminado
import { usePlayer } from "../context/PlayerContext"; 
import { Track } from "../types/Track";

const TopBar: React.FC = () => {
  const { play, addToQueue, allTracks } = usePlayer();
  const [query, setQuery] = useState("");

  // Filtrar sobre allTracks expuesto en PlayerContext
  const results: Track[] = query
    ? allTracks.filter((t: Track) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <header className="top-bar">
      {/* Logo desde public/images */}
      <div className="logo">
        <img src="/images/logo1PNG.png" alt="App Logo" />
      </div>

      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar canciones..."
            aria-label="Buscar canciones"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchIcon />
        </div>

        {query && results.length > 0 && (
          <ul className="search-dropdown">
            {results.map((track: Track) => (
              <li key={track.id} className="search-item">
                <span className="track-title">{track.title}</span>
                <div className="track-actions">
                  <button
                    className="btn-play"
                    onClick={() => {
                      play(track);
                      setQuery("");
                    }}
                    aria-label={`Reproducir ${track.title}`}
                    title={`Reproducir ${track.title}`}
                  >
                    <PlayIcon />
                  </button>
                  <button
                    className="btn-add"
                    onClick={() => addToQueue(track)}
                    aria-label={`Agregar ${track.title} a la cola`}
                    title={`Agregar ${track.title} a la cola`}
                  >
                    <PlusIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default TopBar;
