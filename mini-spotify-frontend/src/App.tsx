import React from "react";
import { PlayerProvider } from "./context/PlayerContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import Search from "./pages/Search";
import PlaylistView from "./components/PlaylistView";
import PlayerControls from "./components/PlayerControls";
import "./App.css";
import "./styles/_variables.css";
import "./styles/_base.css";


const App: React.FC = () => {
  return (
    <PlayerProvider>
      <PlaylistProvider>
        <div className="app">
          <header className="app-header">
            <h1>🎵 Mini Spotify (Local Demos)</h1>
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
          </footer>
        </div>
      </PlaylistProvider>
    </PlayerProvider>
  );
};

export default App;
