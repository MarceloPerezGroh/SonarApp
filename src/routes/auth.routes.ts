import { Router, Request, Response } from "express";
import { z } from "zod";
import { AuthService } from "../services/auth";

const router = Router();
const authService = new AuthService();

// --- Validación con Zod ---
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

// --- POST /auth/register ---
router.post("/register", async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        details: parsed.error.flatten(),
      });
    }

    const { email, password } = parsed.data;
    const user = await authService.register(email, password);

    return res.status(201).json(user);
  } catch (err: any) {
    if (err.message === "Email already registered") {
      return res.status(409).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

// --- POST /auth/login ---
router.post("/login", async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        details: parsed.error.flatten(),
      });
    }

    const { email, password } = parsed.data;
    const { user, token } = await authService.login(email, password);

    return res.json({ user, token });
  } catch (err: any) {
    if (err.message === "Invalid credentials") {
      return res.status(401).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
