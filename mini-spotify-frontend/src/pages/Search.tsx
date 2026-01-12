import React, { useState } from "react";
import { Track } from "../types/Track";
import { usePlayer } from "../context/PlayerContext";
import tracksData from "../data/tracks.json";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { playTrack, addToQueue } = usePlayer();

  const handleSearch = () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const allTracks: Track[] = tracksData.tracks.map((t) => ({
        id: t.id,
        title: t.title,
        artist: t.artist,
        url: t.src, // 👈 transformamos src → url
      }));

      const filtered = allTracks.filter((t) =>
        (t.title ?? "").toLowerCase().includes(query.toLowerCase())
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
              <button onClick={() => playTrack(track)}>▶ Reproducir ahora</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
