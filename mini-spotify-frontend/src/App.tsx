// App.tsx
import React from "react";
import { PlayerProvider } from "./context/PlayerContext";     // 👈 único provider
import TopBar from "./layout/TopBar";                         // header con logo y buscador
import PlayerControls from "./components/PlayerControls";     // controles del reproductor
import QueueView from "./components/QueueView";               // cola de reproducción
import MediaDisplay from "./components/MediaDisplay";         // portada del track actual
import { VolumeIcon } from "./icons";                         // ícono de volumen

import "./styles/_variables.css";
import "./styles/_base.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <div className="app">
        {/* Header con logo a la izquierda y buscador centrado */}
        <TopBar />

        <main className="app-main">
          {/* Portada del track actual en el centro */}
          <section className="media-section">
            <MediaDisplay />
          </section>

          {/* Cola de reproducción al costado derecho */}
          <aside className="queue-section">
            <QueueView />
          </aside>
        </main>

        {/* Footer / Player bar */}
        <footer className="app-footer">
          {/* Controles + timeline */}
          <div className="player-controls-wrapper">
            <PlayerControls />
          </div>

          {/* Volumen separado al costado derecho */}
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
