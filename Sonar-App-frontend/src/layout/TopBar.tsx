import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/layout/top-bar.css";
import { SearchIcon, PlayIcon, PlusIcon } from "../icons";
import { usePlayer } from "../context/PlayerContext";
import { Track } from "../types/Track";
import UploadTrackForm from "../components/UploadTrackForm";

const TopBar: React.FC = () => {
  const { play, addToQueue, allTracks } = usePlayer();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const handler = () => setShowUpload(false);
    document.addEventListener("close-upload-form", handler);
    return () => document.removeEventListener("close-upload-form", handler);
  }, []);

  const results: Track[] = query
    ? allTracks.filter((t: Track) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <header className="top-bar">
      <div className="topbar-left">
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          title={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className={menuOpen ? "line open" : "line"} />
          <span className={menuOpen ? "line open" : "line"} />
          <span className={menuOpen ? "line open" : "line"} />
        </button>

        <div className="logo">
          <img src="/images/logo1PNG.png" alt="App Logo" />
        </div>
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
          <div className="search-results">
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
          </div>
        )}
      </div>

      <div className="upload-btn-container">
        <button
          className="btn-upload"
          onClick={() => setShowUpload(!showUpload)}
          aria-label="Subir nuevo track"
          title="Subir nuevo track"
        >
          + Subir
        </button>
      </div>

      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
          title="Cerrar menú"
        />
      )}

      <nav className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
          title="Cerrar menú"
        >
          ✕
        </button>

        <div className="sidebar-links">
          <Link to="http://localhost:5173/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/licencia" onClick={() => setMenuOpen(false)}>Licencia</Link>
          <Link to="/version" onClick={() => setMenuOpen(false)}>Versión</Link>
          <Link to="/comofunciona" onClick={() => setMenuOpen(false)}>Cómo funciona</Link>
        </div>

        <div className="sidebar-text">
          <span className="sonar-highlight">SONAR</span>
          <br />
          <span className="sidebar-author">
            Desarrollado por{" "}
            <a
              href="https://github.com/MarceloPerezGroh"
              target="_blank"
              rel="noopener noreferrer"
            >
              @MarceloPerezGroh
            </a>
          </span>
          <br />
          <span className="sidebar-muted">
             Proyecto experimental
             <br />
             Uso demostrativo
          </span>
        </div>
      <p className="sidebar-footer">© 2026 SONAR · Demo</p>

      </nav>

      {showUpload && <UploadTrackForm />}
    </header>
  );
};

export default TopBar;
