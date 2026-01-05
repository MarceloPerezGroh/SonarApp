// components/MediaDisplay.tsx
import React from "react";
import { usePlayer } from "../context/PlayerContext";
import "../styles/components/media-display.css";

const MediaDisplay: React.FC = () => {
  const { currentTrack } = usePlayer();

  // Imagen predeterminada servida desde public/images
  const defaultImage = "/images/predeterminada.jpg";
  const imageSrc = currentTrack?.imageUrl || defaultImage;

  return (
    <div className="media-display">
      <img
        src={imageSrc}
        alt={currentTrack ? currentTrack.title : "Imagen predeterminada"}
        className="media-image"
      />
    </div>
  );
};

export default MediaDisplay;
