import express from "express";
import authRoutes from "./routes/auth.routes";
import playlistRoutes from "./routes/playlist.routes"; // 👈 nuevo import

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/", playlistRoutes); // 👈 monta las rutas de playlists

export default app;
