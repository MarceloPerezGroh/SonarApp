import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useTestApi } from "./hooks/useTestApi";
import { useAuth } from "./hooks/useAuth";
import LoginForm from "./components/LoginForm";
import PlaylistsForm from "./components/playlistForm"; // 👈 nombre corregido

function App() {
  const [count, setCount] = useState(0);
  const backendStatus = useTestApi();
  const { token } = useAuth();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Mini Spotify 🎵</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* 👇 Test de conexión al backend */}
      <p>Backend test: {backendStatus}</p>

      {/* 👇 Lógica funcional del Día 7 */}
      <div className="main-section">
        {!token ? (
          <LoginForm />
        ) : (
          <PlaylistsForm
            onCreated={(playlist) => {
              console.log("Nueva playlist creada:", playlist);
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;
