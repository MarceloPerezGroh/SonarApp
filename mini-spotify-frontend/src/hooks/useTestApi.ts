import { useEffect, useState } from "react";
import api from "../api/client"; // tu instancia de Axios

export function useTestApi() {
  const [status, setStatus] = useState<string>("checking...");

  useEffect(() => {
    api
      .get("/health") // 👈 usamos el endpoint que sí existe en el backend
      .then((res) => setStatus(res.data.status))
      .catch((err) => setStatus("Error: " + (err.response?.status || err.message)));
  }, []);

  return status;
}
