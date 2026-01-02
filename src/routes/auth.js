// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Ruta de login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // ⚠️ Aquí deberías validar contra tu base de datos
  if (email === "test@test.com" && password === "1234") {
    const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
});

// Ruta de validación de token
router.get("/validate", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, "SECRET_KEY");
    res.sendStatus(200); // token válido
  } catch {
    res.status(401).json({ message: "Token inválido" });
  }
});

module.exports = router;
