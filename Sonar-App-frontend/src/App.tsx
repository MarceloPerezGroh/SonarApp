import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PlayerProvider, usePlayer } from "./context/PlayerContext";
import TopBar from "./layout/TopBar";
import PlayerControls from "./components/PlayerControls";
import QueueSection from "./components/QueueSection";
import MediaDisplay from "./components/MediaDisplay";
import { VolumeIcon } from "./icons";

import AboutPage from "./pages/AboutPage";
import LicenciaPage from "./pages/LicenciaPage";
import VersionPage from "./pages/VersionPage";
import ComoFunciona from "./pages/ComoFunciona";

import "./styles/_variables.css";
import "./styles/_base.css";
import "./App.css";

// Slider de volumen conectado al contexto
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

// Wrapper para rutas con acceso al contexto
const HomeLayout: React.FC = () => {
  const { queue } = usePlayer();

  return (
    <>
      <section className="media-section">
        <MediaDisplay />
      </section>

      {/* Solo renderiza el aside si hay temas en cola */}
      {queue.length > 0 && (
        <aside className="queue-section">
          <QueueSection />
        </aside>
      )}
    </>
  );
};

const App: React.FC = () => {
  const [isFooterOpen, setIsFooterOpen] = useState(true);
  const toggleFooter = () => setIsFooterOpen(!isFooterOpen);

  return (
    <PlayerProvider>
      <div className="app">
        <TopBar />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/licencia" element={<LicenciaPage />} />
            <Route path="/version" element={<VersionPage />} />
            <Route path="/comoFunciona" element={<ComoFunciona />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <button
            className="player-toggle-btn"
            onClick={toggleFooter}
            aria-label={isFooterOpen ? "Cerrar reproductor" : "Abrir reproductor"}
          >
            {isFooterOpen ? "✕" : "▾"}
          </button>

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
