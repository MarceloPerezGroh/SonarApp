import React, { useState } from "react";
import { Track } from "../types/Track";
import { usePlayer } from "../context/PlayerContext";
import tracksData from "../data/tracks.json"; // 🔑 ajusta la ruta según tu estructura

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Usamos el reproductor: reproducir y agregar a cola
  const { play, addToQueue } = usePlayer();

  const handleSearch = () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // 🔑 Transformamos el JSON a la interfaz Track
      const allTracks: Track[] = (tracksData as { tracks: { id: number; title: string; artist?: string; src: string }[] }).tracks.map(
        (t) => ({
          id: t.id,
          title: t.title,
          artist: t.artist,
          url: t.src // usamos src del JSON como url
        })
      );

      const filtered = allTracks.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);

      if (filtered.length === 0) {
        setError("No se encontraron canciones.");
      }
    } catch {
      setError("Error al buscar canciones en la lista.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Buscar canciones en la lista de demos</h2>

      <div className="search-bar">
        <input
          type="text"
          value={query}
          placeholder="Escribe el nombre de una canción..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>🔍 Buscar</button>
      </div>

      {loading && <p>Cargando resultados...</p>}
      {error && <p>{error}</p>}

      <ul>
        {results.map((track) => (
          <li key={track.id}>
            <span>{track.title} — {track.artist}</span>
            <div className="actions">
              <button onClick={() => addToQueue(track)}>➕ Agregar a reproducción</button>
              <button onClick={() => play(track)}>▶ Reproducir ahora</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
