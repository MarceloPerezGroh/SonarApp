// server.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Montar las rutas de autenticación bajo /auth
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
