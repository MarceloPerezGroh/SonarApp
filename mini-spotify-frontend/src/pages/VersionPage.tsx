import React from "react";
import "../styles/page.css";

const VersionPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Versión</h1>
      <p>
        Versión actual: <strong>1.0.0</strong>  
        Última actualización: Enero 2026
      </p>
    </div>
  );
};

export default VersionPage;
