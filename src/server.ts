import app from "./app";             // 👈 importa la configuración de app.ts
import { env } from "./config/env";  // 👈 importa las variables de entorno

// Levanta el servidor en el puerto definido en .env
app.listen(env.PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${env.PORT}`);
});
