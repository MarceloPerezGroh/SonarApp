import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";   // 👈 Importamos Link
import "../styles/layout/top-bar.css";
import { SearchIcon, PlayIcon, PlusIcon } from "../icons"; 
import { usePlayer } from "../context/PlayerContext"; 
import { Track } from "../types/Track";
import UploadTrackForm from "../components/UploadTrackForm";

const TopBar: React.FC = () => {
  const { play, addToQueue, allTracks } = usePlayer();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUpload, setShowUpload] = useState(false); // 👈 estado para mostrar formulario

  // 👇 escuchamos el evento "close-upload-form" para cerrar el modal desde UploadTrackForm
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
      {/* Contenedor izquierdo: hamburguesa + logo */}
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

      {/* Buscador */}
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

      {/* Botón subir minimalista */}
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

      {/* Overlay para cerrar al hacer click fuera */}
      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
          title="Cerrar menú"
        />
      )}

      {/* Sidebar lateral */}
      <nav className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
          title="Cerrar menú"
        >
          ✕
        </button>

        {/* Bloque superior: home . About · Licencia · Versión */}
        <div className="sidebar-links">
          <Link to="http://localhost:5173/" onClick={() => setMenuOpen(false)} aria-label="About" title="About">Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} aria-label="About" title="About">About</Link>
          <Link to="/licencia" onClick={() => setMenuOpen(false)} aria-label="Licencia" title="Licencia">Licencia</Link>
          <Link to="/version" onClick={() => setMenuOpen(false)} aria-label="Versión" title="Versión">Versión</Link>
        </div>

        <hr className="sidebar-divider" />

        {/* Texto corrido estilo YouTube */}
        <div className="sidebar-text">
          Acerca de <span className="sonar-highlight">SONAR</span>  Comunicarte con MarceloPerezGroh
          Desarrollador · Condiciones · Privacidad · Políticas y seguridad · Cómo funciona SONAR ·
          Prueba funciones nuevas.
        </div>
        <p className="sidebar-footer">© 2026 Dev MarceloPerezGroh</p>
      </nav>

      {/* Formulario de subida (modal simple) */}
      {showUpload && <UploadTrackForm />}
    </header>
  );
};

export default TopBar;
