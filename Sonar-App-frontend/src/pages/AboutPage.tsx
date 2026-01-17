import React from "react";
import "../styles/page.css"; 
const AboutPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>About</h1>

      <p>
        <strong>SONAR</strong> es una aplicación de reproducción y exploración
        musical diseñada para ofrecer una experiencia simple, moderna e
        intuitiva. Su enfoque principal es facilitar la búsqueda de contenido,
        la reproducción de audio y la gestión de listas desde una interfaz clara
        y fluida.
      </p>

      <p>
        La aplicación prioriza la usabilidad, el rendimiento y un diseño
        minimalista en modo oscuro, inspirándose en plataformas de streaming
        modernas. Su arquitectura está pensada para ser escalable y mantenible,
        permitiendo la incorporación progresiva de nuevas funcionalidades.
      </p>

      <p>
        <strong>SONAR</strong> fue desarrollada por{" "}
        <strong>Marcelo Pérez Groh</strong>, aplicando buenas prácticas de
        desarrollo frontend, organización de componentes y diseño de interfaces,
        con foco en la calidad del código y la experiencia de usuario.
      </p>
    </div>
  );
};

export default AboutPage;
