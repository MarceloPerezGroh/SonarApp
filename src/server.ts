import app from "./app";              // ✅ importa la configuración
import { env } from "./config/env";   // ✅ variables de entorno

app.listen(env.PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${env.PORT}`);
});
