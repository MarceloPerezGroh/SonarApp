# Mini-Spotify
Es una aplicación de musica.
✅ Requerimientos del Mini Spotify (versión jefe exigente pero justo)
1. Autenticación y usuarios

Quiero:

Registro e inicio de sesión (email + contraseña).

Sesiones seguras (JWT o similar).

Perfil básico del usuario (nombre, foto opcional).

2. Catálogo de música

Tenés que cargar tracks a una base de datos.
Cada track debe tener:

Título

Artista

Duración

URL del archivo de audio (local o host externo)

Imagen del álbum

Género

No necesito miles de canciones, pero sí 10–20 para mostrar funcionalidad.

3. Reproductor funcional

Esto es lo más importante visualmente.
El reproductor debe permitir:

Play / Pause

Barra de progreso

Volumen

Siguiente / Anterior

Modo repetición o shuffle (opcional pero suma)

Tiene que verse moderno y responsivo.

4. Listas de reproducción

Necesito que el usuario pueda:

Crear playlists

Agregar y quitar canciones

Ver la lista y reproducirla

No te pido colaboración entre usuarios, solo funcionalidad básica.

5. Buscador

Buscador por:

Título

Artista

Género

Que filtre en vivo si es posible.

6. Interfaz limpia y profesional

Nada de UI improvisada. Quiero algo:

Minimalista

Consistente

Intuitivo

Responsivo

Podés usar:

React

Tailwind

O cualquier otro si lo dominás bien

7. API Backend ordenada

Quiero endpoints REST claros:

/auth

/tracks

/playlists

/users

Tecnologías recomendadas:

Node.js + Express

PostgreSQL o MongoDB

8. Manejo del audio

Tenés dos opciones:

Opción A — Archivos locales (lo más simple)

Subís 10–20 tracks reales a tu proyecto o a un bucket S3.
Legalmente podés usar:

Música libre de derechos

Música propia

Música con licencia Creative Commons
(no uses canciones famosas sin permiso)

Opción B — Usar YouTube como fuente

Podés traer audio desde APIs como YouTube Music no se puede legalmente, así que descartalo.
Mejor: usa archivos libres de derechos.

9. Panel de administración (simple)

Para cargar canciones sin tocar la base de datos:

Subir track

Subir imagen

Registrar info del track

No hace falta autenticación avanzada para admin, pero sí un login.

10. Bonus (si querés sobresalir)

Si llegás con tiempo:

Modo oscuro

Canciones favoritas

Historial de reproducción

Animación de ondas tipo visualizer

Integración con IA para recomendaciones (simple: “otras canciones del mismo artista”)

🧱 Arquitectura mínima que quiero

Front: React + Tailwind

Back: Node.js + Express

DB: PostgreSQL (preferible)

Storage: Archivos locales o S3

Deploy:

Front en Vercel

Back en Render

DB en Railway o Supabase

👨‍💼 Expectativa final como tu jefe

Quiero que entregues un mini Spotify que:

Funcione bien

Sea estable

Tenga un diseño limpio

Muestre tu capacidad de construir un producto completo

Se pueda enseñar en entrevistas como proyecto sólido

Si hacés esto, realmente demuestra que no sos un programador que solo “escribe código”, sino alguien que puede diseñar, construir y lanzar.

Si querés, te armo:

un roadmap por semanas,

la arquitectura detallada,

o un listado de tareas en orden,
como un sprint real de trabajo. ¿Querés eso?
