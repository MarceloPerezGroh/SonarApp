import React, { useState } from "react";
import { searchTracks, Track } from "../services/deezer";
import { usePlaylist } from "../context/PlaylistContext";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addTrack } = usePlaylist();

  const handleSearch = async () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const tracks = await searchTracks(query, 20);
      setResults(tracks);
      if (tracks.length === 0) {
        setError("No se encontraron canciones.");
      }
    } catch {
      setError("Error al buscar canciones en Deezer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h2>Buscar canciones en Deezer</h2>
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
            <img src={track.album.cover} alt={track.title} width={50} />
            <span>{track.title} — {track.artist.name}</span>
            <button onClick={() => addTrack(track)}>➕ Agregar a Playlist</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
