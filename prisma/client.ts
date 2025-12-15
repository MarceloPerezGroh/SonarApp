import { PrismaClient } from "@prisma/client";

// Crear una única instancia de PrismaClient
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // Opcional: útil en desarrollo
});

// Exportar la instancia para usarla en services
export default prisma;
