import React, { useState } from "react";
import "../styles/layout/top-bar.css";
import { HomeIcon, SearchIcon } from "../icons";
import { usePlaylist } from "../context/PlaylistContext";

const TopBar: React.FC = () => {
  const { searchTracks } = usePlaylist();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    searchTracks(value);
  };

  return (
    <header className="top-bar">
      <div className="logo">
        <HomeIcon />
      </div>
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar"
            aria-label="Buscar canciones"
            value={query}
            onChange={handleSearch}
          />
          <SearchIcon />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
