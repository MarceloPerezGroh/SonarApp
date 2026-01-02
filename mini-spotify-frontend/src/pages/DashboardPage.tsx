// src/pages/DashboardPage.tsx
import React from "react";
import { useAuth } from "../hooks/useAuth";
import PlaylistsForm from "../components/playlistForm";
import PlaylistsList from "../components/playlistList";
import MusicPlayer from "../components/MusicPlayer"; // 👈 importamos el reproductor

function DashboardPage() {
  const { logout } = useAuth();

  // ⚠️ Lo ideal es mover este clientId a .env → import.meta.env.VITE_SOUNDCLOUD_CLIENT_ID
  const clientId = "TU_CLIENT_ID_DE_SOUNDCLOUD";

  return (
    <div className="dashboard-page">
      <header className="app-header">
        <h1 className="app-title">Mini Spotify 🎵</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <main className="main-section">
        <PlaylistsForm
          onCreated={(playlist) => console.log("Nueva playlist:", playlist)}
        />
        <PlaylistsList />

        {/* 👇 Aquí va el reproductor de SoundCloud */}
        <MusicPlayer clientId={clientId} />
      </main>
    </div>
  );
}

export default DashboardPage;

