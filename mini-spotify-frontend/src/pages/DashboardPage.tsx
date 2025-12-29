import React from "react";
import { useAuth } from "../hooks/useAuth";
import PlaylistsForm from "../components/playlistForm";
import PlaylistsList from "../components/playlistList";

function DashboardPage() {
  const { logout } = useAuth();

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
      </main>
    </div>
  );
}

export default DashboardPage;
