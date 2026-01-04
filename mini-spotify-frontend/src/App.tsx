import React from "react";
import { PlayerProvider } from "./context/PlayerContext";     // provider del reproductor
import { PlaylistProvider } from "./context/PlaylistContext"; // provider de playlists
import TopBar from "./layout/TopBar";                         // header minimalista con logo y buscador
import PlaylistView from "./components/PlaylistView";         // lista de playlists
import PlayerControls from "./components/PlayerControls";     // controles del reproductor
import QueueView from "./components/QueueView";               // cola de reproducción
import MediaDisplay from "./components/MediaDisplay";         // 👈 portada del track actual

import "./styles/_variables.css";
import "./styles/_base.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <PlaylistProvider>
        <div className="app">
          {/* Header con logo a la izquierda y buscador centrado */}
          <TopBar />

          <main className="app-main">
            {/* Lista de playlists al costado izquierdo */}
            <aside className="playlist-section">
              <PlaylistView />
            </aside>

            {/* Portada del track actual en el centro */}
            <section className="media-section">
              <MediaDisplay />
            </section>

            {/* Cola de reproducción al costado derecho */}
            <aside className="queue-section">
              <QueueView />
            </aside>
          </main>

          {/* Controles del reproductor con línea de tiempo */}
          <footer className="app-footer">
            <PlayerControls />
          </footer>
        </div>
      </PlaylistProvider>
    </PlayerProvider>
  );
};

export default App; // 👈 export default obligatorio
