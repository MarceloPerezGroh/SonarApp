import React from "react";
import { PlayerProvider } from "./context/PlayerContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import Search from "./pages/Search";
import PlaylistView from "./components/PlaylistView";   // ✅ actualizado
import PlayerBar from "./components/PlayerBar";
import PlayerControls from "./components/PlayerControls"; // ✅ controles separados
import "./App.css"; // ✅ estilos globales

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <PlaylistProvider>
        <div className="app">
          <header className="app-header">
            <h1>🎵 Mini Spotify (Deezer)</h1>
          </header>

          <main className="app-main">
            <section className="search-section">
              <Search />
            </section>

            <aside className="playlist-section">
              <PlaylistView />
            </aside>
          </main>

          <footer className="app-footer">
            <PlayerControls />
            <PlayerBar />
          </footer>
        </div>
      </PlaylistProvider>
    </PlayerProvider>
  );
};

export default App;
