import React from "react";
import "../styles/page.css";

const LicenciaPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Licencia y Aviso Legal</h1>

      <p>
        © 2026 <strong>SONAR</strong>. Todos los derechos reservados.
        <br />
        Desarrollado por <strong>Marcelo Pérez Groh</strong>.
      </p>

      <p>
        Esta aplicación, denominada <strong>SONAR</strong>, es una plataforma de
        reproducción y gestión de contenido musical. El diseño, la interfaz
        gráfica, el código fuente, la arquitectura de software y las
        funcionalidades implementadas están protegidos por las leyes de
        propiedad intelectual vigentes.
      </p>

      <h2>Uso de la aplicación</h2>
      <p>
        El uso de <strong>SONAR</strong> está permitido únicamente para fines
        personales y no comerciales, salvo autorización expresa del
        desarrollador. Queda prohibida la reproducción, distribución,
        modificación, ingeniería inversa o explotación total o parcial de la
        aplicación sin consentimiento previo y por escrito.
      </p>

      <h2>Contenido multimedia</h2>
      <p>
        Las canciones, audios, imágenes, portadas y otros recursos multimedia
        accesibles desde la aplicación pueden provenir de fuentes externas, APIs
        públicas o servicios de terceros. Los derechos de dicho contenido
        pertenecen exclusivamente a sus respectivos autores y titulares.
        <strong> SONAR</strong> no reclama la propiedad de contenido de terceros.
      </p>

      <h2>Limitación de responsabilidad</h2>
      <p>
        El desarrollador no garantiza que la aplicación funcione de manera
        ininterrumpida, segura o libre de errores. En ningún caso será
        responsable por daños directos, indirectos, incidentales o consecuentes
        derivados del uso o la imposibilidad de uso de la aplicación.
      </p>

      <h2>Modificaciones</h2>
      <p>
        El desarrollador se reserva el derecho de actualizar, modificar o
        discontinuar total o parcialmente la aplicación, sus funcionalidades o
        estos términos, en cualquier momento y sin previo aviso.
      </p>

      <h2>Aceptación de los términos</h2>
      <p>
        El uso de <strong>SONAR</strong> implica la aceptación plena de los
        términos y condiciones establecidos en este aviso legal.
      </p>
    </div>
  );
};

export default LicenciaPage;
