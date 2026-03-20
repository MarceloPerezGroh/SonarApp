import React from "react";
import "../styles/page.css";
const LicenciaPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Licencia y Aviso Legal</h1>

      <p>
        © 2026 <strong>SONAR</strong>. Desarrollado por{" "}
        <strong>Marcelo Pérez Groh</strong>.
      </p>

      <h2>Licencia MIT</h2>
      <p>
        El código fuente de <strong>SONAR</strong> se distribuye bajo la{" "}
        <strong>Licencia MIT</strong>, una licencia de software libre y de código
        abierto. Esto significa que cualquier persona puede usar, copiar,
        modificar, fusionar, publicar, distribuir o sublicenciar el código,
        siempre que se conserve el aviso de copyright original y se otorgue
        el crédito correspondiente al autor.
      </p>
      <p>
        Esta licencia aplica exclusivamente al código fuente de la aplicación y
        no otorga derechos sobre el contenido multimedia accesible desde la
        misma.
      </p>

      <h2>Contenido multimedia</h2>
      <p>
        Las canciones, audios, imágenes, portadas y demás recursos multimedia
        disponibles en <strong>SONAR</strong> pueden provenir de fuentes
        externas, APIs públicas o servicios de terceros. Dichos contenidos son
        propiedad exclusiva de sus respectivos autores y titulares de derechos.{" "}
        <strong>SONAR</strong> no reclama titularidad alguna sobre el contenido
        de terceros y su uso se limita a fines demostrativos y experimentales.
      </p>

      <h2>Uso de la aplicación</h2>
      <p>
        <strong>SONAR</strong> es un proyecto experimental de uso demostrativo.
        No reproduce, almacena ni distribuye contenido protegido por derechos de
        autor. Los streams de audio utilizados son temporales, generados por
        plataformas externas, y expiran automáticamente sin intervención de la
        aplicación.
      </p>

      <h2>Limitación de responsabilidad</h2>
      <p>
        La aplicación se proporciona <em>"tal cual"</em>, sin garantías de
        ningún tipo, ya sean explícitas o implícitas. El desarrollador no asume
        responsabilidad alguna por daños directos, indirectos, incidentales o
        consecuentes derivados del uso, la imposibilidad de uso o el rendimiento
        de la aplicación.
      </p>

      <h2>Modificaciones</h2>
      <p>
        El desarrollador se reserva el derecho de actualizar, modificar o
        discontinuar la aplicación, sus funcionalidades o estos términos en
        cualquier momento, sin necesidad de previo aviso.
      </p>

      <h2>Aceptación</h2>
      <p>
        El acceso o uso de <strong>SONAR</strong> implica la aceptación plena
        de los términos establecidos en este aviso legal.
      </p>
    </div>
  );
};
export default LicenciaPage;
