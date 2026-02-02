import React from "react";
import "../styles/page.css"; 

const VersionPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Version</h1>

      <p>
        <strong>SONAR</strong> se encuentra actualmente en su versión{" "}
        <strong>1.9.0</strong>, considerada una versión estable que incluye las
        funcionalidades principales de la aplicación.
      </p>

      <p>
        Esta versión incorpora reproducción de audio, búsqueda de contenido
        musical y gestión básica de listas de reproducción, junto con una
        interfaz minimalista en modo oscuro optimizada para una experiencia
        fluida y consistente.
      </p>

      <p>
        El desarrollo de <strong>SONAR</strong> sigue un enfoque de mejora
        continua. Las futuras versiones podrán incluir optimizaciones de
        rendimiento, mejoras visuales y la incorporación de nuevas
        funcionalidades, manteniendo la estabilidad y calidad del sistema.
      </p>

      <p>
        Versión actual: <strong>v1.9.0</strong>
        <br />
        Última actualización: <strong> - 2026 -</strong>
      </p>
    </div>
  );
};

export default VersionPage;
