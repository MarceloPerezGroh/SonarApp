# Mini Spotify - Documentación del Proyecto

Este proyecto es una aplicación estilo **mini Spotify**, diseñada para demostrar habilidades de desarrollo fullstack, arquitectura organizada y buenas prácticas. El objetivo es entregar un producto funcional, con un diseño moderno y un backend sólido.

---

## 🚀 Objetivo
Construir una plataforma capaz de reproducir música, gestionar playlists y manejar usuarios reales, mostrando dominio en frontend, backend, bases de datos y manejo de archivos multimedia.

---

## ✔️ Requerimientos Funcionales

### **1. Autenticación y Usuarios**
- Registro e inicio de sesión.
- Sesiones seguras (JWT).
- Perfil básico del usuario: nombre, email y foto opcional.

### **2. Catálogo de Música**
Cada canción debe incluir:
- Título
- Artista
- Duración
- Imagen del álbum
- Género
- URL del archivo de audio

Se recomienda incluir entre 10 y 20 canciones.

### **3. Reproductor de Música**
El reproductor debe contar con:
- Play / Pause
- Barra de progreso
- Control de volumen
- Siguiente / Anterior
- Shuffle y/o repeat (opcional)

### **4. Playlists**
El usuario podrá:
- Crear playlists
- Agregar canciones
- Eliminar canciones
- Reproducir playlists completas

### **5. Buscador**
El sistema debe permitir búsquedas por:
- Título
- Artista
- Género

Con filtrado en vivo si es posible.

### **6. Panel de Administración (simple)**
Para facilitar la carga de contenido:
- Subir archivos de audio
- Guardar información del track
- Subir imagen del álbum

---

## 🎨 Requerimientos de Interfaz

El diseño debe ser:
- Minimalista
- Responsivo
- Intuitivo
- Visualmente profesional

Recomendado:
- React
- Tailwind CSS

---

## 🧱 Arquitectura Recomendada

### **Frontend**
- React
- Tailwind CSS

### **Backend**
- Node.js + Express
- Endpoints organizados:
  - `/auth`
  - `/users`
  - `/tracks`
  - `/playlists`

### **Base de Datos**
- PostgreSQL (recomendado)

### **Storage**
- Archivos locales o almacenamiento en la nube (S3)

---

## 📦 Fuente de los Audios
Los audios deben ser:
- Propios
- De librerías libres de derechos
- Bajo licencias Creative Commons

No se deben usar canciones protegidas por copyright.

---

## ✨ Funcionalidades Extra (Opcional)
- Modo oscuro
- Canciones favoritas
- Historial de reproducción
- Visualizador de audio
- Recomendaciones simples basadas en artista o género

---

## 🚀 Deploy Sugerido
- Frontend: Vercel
- Backend: Render
- Base de datos: Railway o Supabase

---

## 📌 Objetivo Final
Entregar un proyecto que funcione bien, con un diseño profesional y que represente un producto completo capaz de destacarse en un portfolio técnico.

---

## 📄 Licencia
Proyecto de uso educativo y demostrativo.

