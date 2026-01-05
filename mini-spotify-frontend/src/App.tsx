// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
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

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <div className="app">
        {/* Header fijo */}
        <TopBar />

        {/* 👇 El contenido central cambia según la ruta */}
        <main className="app-main">
          <Routes>
            {/* Página principal con reproductor */}
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

            {/* Páginas informativas */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/licencia" element={<LicenciaPage />} />
            <Route path="/version" element={<VersionPage />} />
          </Routes>
        </main>

        {/* Footer fijo */}
        <footer className="app-footer">
          <div className="player-controls-wrapper">
            <PlayerControls />
          </div>
          <div className="volume">
            <VolumeIcon />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              aria-label="Volumen"
            />
          </div>
        </footer>
      </div>
    </PlayerProvider>
  );
};

export default App;
