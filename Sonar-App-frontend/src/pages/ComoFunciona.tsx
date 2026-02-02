import React from "react";
import "../styles/page.css"; 

const ComoFunciona: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Cómo funciona</h1>

      <p>
        <strong>SONAR</strong> es un reproductor experimental de audio diseñado
        para explorar streams temporales y contenido de prueba sin descargar ni
        almacenar archivos. La aplicación actúa únicamente como un reproductor,
        manteniendo una experiencia simple, moderna e intuitiva.
      </p>

      <p>
        La aplicación incluye <strong>30 temas predeterminados</strong> llamados{" "}
        <strong>SoundHelix Song (1–30)</strong>, pensados para que el usuario
        pueda probar el funcionamiento del reproductor sin configuración
        previa.
      </p>

      <p>
        Mediante la función <strong>Subir</strong>, SONAR permite:
        <br />
        • Reproducir imágenes a partir de una URL
        <br />
        • Reproducir audio desde <strong>enlaces de streaming temporales</strong>{" "}
        generados por plataformas externas
        <br />
        • Asignar metadatos como <strong>nombre del tema, género y año</strong> para
        su organización y búsqueda posterior
      </p>


      <p>
        SONAR no descarga ni almacena contenido de audio, no genera enlaces
        permanentes y los streams utilizados expiran automáticamente. Este
        enfoque evita la redistribución de contenido protegido y permite la
        experimentación segura del proyecto sin infringir derechos de autor.
      </p>

      <p><strong>SONAR</strong></p>
        
    </div>
  );
};

export default ComoFunciona;
