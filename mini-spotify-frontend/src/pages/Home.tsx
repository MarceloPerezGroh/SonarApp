// src/pages/Home.tsx
import React from "react";
import "./Home.css"; // Importa el archivo de estilos

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a Mini-Spotify 🎵</h1>
      <p className="home-subtitle">Tu música favorita, sin necesidad de login.</p>
      {/* Aquí puedes integrar tu MusicPlayer o dashboard */}
    </div>
  );
};

export default Home;
