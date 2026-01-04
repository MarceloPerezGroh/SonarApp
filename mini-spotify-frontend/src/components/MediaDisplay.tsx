import React from "react";
import { usePlayer } from "../context/PlayerContext";
import "../styles/components/media-display.css";

const MediaDisplay: React.FC = () => {
  const { currentTrack } = usePlayer();

  const cover = "/assets/images/default-logo.jpg";

  return (
    <div className="media-display">
      <img
        src={cover}
        alt={currentTrack?.title || "Logo"}
        className="media-image"
      />
      <div className="media-info">
        <h2 className="media-title">{currentTrack?.title || "Sin tema"}</h2>
        {currentTrack?.artist && (
          <p className="media-artist">{currentTrack.artist}</p>
        )}
      </div>
    </div>
  );
};

export default MediaDisplay;
