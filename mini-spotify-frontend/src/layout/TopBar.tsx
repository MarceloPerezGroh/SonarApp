import React from "react";
import Search from "../pages/Search"; // 👈 tu buscador actual
import "../styles/layout/top-bar.css";

const TopBar: React.FC = () => {
  return (
    <header className="top-bar">
      <div className="logo">
        <h1>Mini Spotify</h1>
      </div>
      <div className="search-container">
        <Search />
      </div>
    </header>
  );
};

export default TopBar;
