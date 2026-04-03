// src/hooks/useAuth.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Validar token al montar
  useEffect(() => {
    const validateToken = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/auth/validate", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          // Token inválido → limpiar y forzar logout
          localStorage.removeItem("token");
          setToken(null);
        }
      } catch (err) {
        console.error("Error validando token", err);
        localStorage.removeItem("token");
        setToken(null);
      }
    };

    validateToken();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
