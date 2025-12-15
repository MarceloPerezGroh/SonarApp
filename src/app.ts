import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

// ... aquí irían las rutas

// Middleware global de errores (último en la cadena)
app.use(errorHandler);

export default app;
