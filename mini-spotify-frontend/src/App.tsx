import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PlayerProvider, usePlayer } from "./context/PlayerContext";
import TopBar from "./layout/TopBar";
import PlayerControls from "./components/PlayerControls";
import QueueView from "./components/QueueView";
import MediaDisplay from "./components/MediaDisplay";
import { VolumeIcon } from "./icons";

import AboutPage from "./pages/AboutPage";
import LicenciaPage from "./pages/LicenciaPage";
import VersionPage from "./pages/VersionPage";

import "./styles/_variables.css";
import "./styles/_base.css";
import "./App.css";

// 👇 Slider de volumen conectado al contexto
const VolumeSlider: React.FC = () => {
  const { volume, setVolume } = usePlayer();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="volume">
      <VolumeIcon />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleChange}
        aria-label="Volumen"
      />
    </div>
  );
};

const App: React.FC = () => {
  // 👇 estado para abrir/cerrar el footer (por defecto abierto)
  const [isFooterOpen, setIsFooterOpen] = useState(true);

  const toggleFooter = () => setIsFooterOpen(!isFooterOpen);

  return (
    <PlayerProvider>
      <div className="app">
        {/* Header fijo */}
        <TopBar />

        {/* Contenido central según ruta */}
        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="media-section">
                    <MediaDisplay />
                  </section>
                  <aside className="queue-section">
                    <QueueView />
                  </aside>
                </>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/licencia" element={<LicenciaPage />} />
            <Route path="/version" element={<VersionPage />} />
          </Routes>
        </main>

        {/* Footer fijo */}
        <footer className="app-footer">
          {/* Botón cerrar/abrir en esquina superior derecha */}
          <button
            className="player-toggle-btn"
            onClick={toggleFooter}
            aria-label={isFooterOpen ? "Cerrar reproductor" : "Abrir reproductor"}
          >
            {isFooterOpen ? "✕" : "▾"}
          </button>

          {/* Contenido del footer (solo UI, no afecta reproducción) */}
          {isFooterOpen && (
            <>
              <div className="player-controls-wrapper">
                <PlayerControls />
              </div>
              <VolumeSlider />
            </>
          )}
        </footer>
      </div>
    </PlayerProvider>
  );
};

export default App;
