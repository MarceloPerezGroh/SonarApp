import React from "react";
import "../styles/page.css"; // 👈 estilo común para páginas

const AboutPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>About</h1>
      <p>
        Esta aplicación es un proyecto estilo Spotify, diseñado para mostrar
        arquitectura full-stack, UI minimalista en dark mode y tu firma personal.
      </p>
    </div>
  );
};

export default AboutPage;
