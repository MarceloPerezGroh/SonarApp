import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000/api",
});

client.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default client;
