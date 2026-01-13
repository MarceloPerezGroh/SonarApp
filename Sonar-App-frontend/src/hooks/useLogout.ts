import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    // Eliminar token
    localStorage.removeItem("token");

    // Opcional: limpiar otros estados persistidos
    localStorage.removeItem("user");

    // Redirigir a login
    navigate("/login", { replace: true });
  }, [navigate]);

  return { logout };
}
