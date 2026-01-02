import React, { useState, useEffect } from "react";
import { searchTracks, Track } from "../services/deezer";

interface SearchBarProps {
  onResults: (tracks: Track[]) => void; // callback al padre
}

const SearchBar: React.FC<SearchBarProps> = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Actualiza debouncedQuery después de 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Ejecuta la búsqueda cuando cambia debouncedQuery
  useEffect(() => {
    const fetchTracks = async () => {
      if (debouncedQuery.trim() === "") {
        onResults([]); // limpia resultados si no hay query
        return;
      }
      const tracks = await searchTracks(debouncedQuery);
      onResults(tracks);
    };

    fetchTracks();
  }, [debouncedQuery, onResults]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="Buscar canciones en SoundCloud..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
