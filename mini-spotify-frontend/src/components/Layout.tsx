import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

function Layout({ children, onLogout }: LayoutProps) {
  return (
    <div className="layout">
      <header className="header">
        <h1 className="app-title">Mini Spotify 🎵</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
