# SONAR – Demo Music Streaming App 🎧

## Descripción

SONAR es una aplicación web Demo Music Streaming App 🎧, desarrollada como proyecto de portfolio técnico.  
El objetivo del proyecto es simular una aplicación de streaming musical realista, poniendo énfasis en la **arquitectura**, la **organización del código** y la **extensibilidad**, más allá de la interfaz visual.

La aplicación está pensada como una base escalable, preparada para crecer con nuevas funcionalidades sin necesidad de reestructurar el proyecto.

---

## Características principales

- Reproducción de audio con barra de progreso sincronizada
- Control de volumen global persistente
- Biblioteca de tracks con metadata (género y año)
- Filtros dinámicos por género y año
- Diferenciación visual entre tracks persistentes y temporales
- Upload de tracks mediante modal
- Integración de nuevos tracks al flujo global de la aplicación
- Layout persistente con:
  - Topbar
  - Sidebar
  - Área principal dinámica
  - Footer con reproductor global
- Footer / reproductor colapsable
- Accesibilidad básica corregida (botones con texto discernible)

---

## Tecnologías utilizadas

### Frontend

- **React** – Construcción de la interfaz de usuario
- **TypeScript** – Tipado estático para mayor seguridad y mantenibilidad
- **Context API** – Manejo de estado global (reproductor, tracks, UI)
- **CSS modularizado** – Estilos desacoplados por componente

### Backend

- **Node.js** – Entorno de ejecución del servidor
- **Express** – API REST para gestión de datos
- **Arquitectura por capas** – Separación en rutas, controladores y servicios
- **Datos mockeados / persistencia local** – Preparado para migrar a base de datos real

### Otras herramientas

- **Git** – Control de versiones
- **GitHub** – Repositorio y control de cambios

---

## Arquitectura general

El proyecto está dividido claramente en **frontend** y **backend**, con responsabilidades bien definidas.

- El **frontend** se encarga de la interfaz, la experiencia de usuario y la orquestación del estado global.
- El **backend** centraliza la lógica de dominio relacionada con los tracks y expone una API preparada para escalar.

---

## Estructura del proyecto

```
sonar/
├── frontend/
│   ├── components/     # Componentes reutilizables de la UI
│   ├── context/        # Contextos globales (player, tracks, UI)
│   ├── styles/         # Estilos desacoplados
│   └── pages/          # Vistas principales
│
└── backend/
    ├── routes/         # Definición de endpoints
    ├── controllers/    # Controladores de la API
    ├── services/       # Lógica de negocio
    └── data/           # Fuente de datos (mock / persistencia)
```

Esta organización permite:
- Escalar funcionalidades de forma ordenada
- Mantener el código legible y mantenible
- Separar claramente lógica de UI y lógica de negocio

---

## Backend

El backend no actúa únicamente como proveedor de datos, sino como **capa de lógica central**.

### Responsabilidades

- Gestión de la biblioteca de tracks
- Normalización de datos
- Diferenciación entre tracks persistentes y temporales
- Punto único de verdad para la lógica de dominio
- Base preparada para integrar base de datos, autenticación o streaming real

---

## Frontend

El frontend funciona como una **Single Page Application** con layout persistente.

- App Shell fijo (Topbar + Sidebar + Footer)
- Contenido central dinámico
- Reproductor global siempre disponible
- Componentes desacoplados y reutilizables
- Código preparado para agregar nuevas features sin romper el flujo existente

---

## Instalación y ejecución

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/sonar.git
cd sonar
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar el proyecto:
```bash
npm run dev
```

4. Abrir en el navegador:
```
http://localhost:3000
```

---

## Escalabilidad

SONAR está preparado para incorporar fácilmente:

- Autenticación de usuarios
- Playlists personalizadas
- Favoritos
- Historial de reproducción
- Base de datos real
- Streaming desde backend

---

## Autor

Proyecto desarrollado por [Marcelo Perez Groh](https://github.com/MarceloPerezGroh)
## Licencia

**Aviso importante:**  
Este proyecto está bajo la licencia MIT.

De acuerdo con los términos de la licencia, cualquier redistribución (incluidas las versiones compiladas o modificadas) requiere que se conserve el aviso de derechos de autor original y el texto completo de la licencia.

Copyright © 2026 Marcelo Perez Groh.  
Todos los derechos reservados.

Para más detalles, consulta el archivo [LICENSE](LICENSE).
