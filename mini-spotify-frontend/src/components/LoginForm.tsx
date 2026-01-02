import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password); // ✅ ahora usa el hook
      // redirección automática la maneja App.tsx
    } catch (err: any) {
      setError("Credenciales inválidas o error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </label>

      <label>
        Contraseña
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
      </label>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;

