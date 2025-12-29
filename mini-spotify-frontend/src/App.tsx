// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useTestApi } from "./hooks/useTestApi";

import LoginForm from "./components/LoginForm";
import PlaylistForm from "./components/playlistForm";
import PlaylistList from "./components/playlistList";

function LoginPage() {
  return (
    <div className="login-page">
      <h1>Mini Spotify 🎵</h1>
      <LoginForm />
    </div>
  );
}

function DashboardPage() {
  const { logout } = useAuth();
  const backendStatus = useTestApi();

  return (
    <div className="dashboard-page">
      <header className="app-header">
        <h1 className="app-title">Mini Spotify 🎵</h1>
        <div className="header-right">
          <p className="backend-status">Backend: {backendStatus}</p>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="main-section">
        <PlaylistForm
           onCreated={(playlist) => {
             console.log("Nueva playlist creada:", playlist);
        }}
      />
      <PlaylistList />

      </main>
    </div>
  );
}

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Página raíz */}
      <Route
        path="/"
        element={<Navigate to={token ? "/app" : "/login"} />}
      />

      {/* Página de login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Página protegida */}
      <Route
        path="/app"
        element={token ? <DashboardPage /> : <Navigate to="/login" />}
      />

      {/* Redirección por defecto */}
      <Route
        path="*"
        element={<Navigate to={token ? "/app" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
