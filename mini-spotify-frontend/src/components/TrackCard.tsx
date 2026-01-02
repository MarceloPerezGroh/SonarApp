import React from "react";
import { Track } from "../services/deezer";
import { usePlayer } from "../context/PlayerContext";
import "./TrackCard.css"; // ✅ estilos externos

interface TrackCardProps {
  track: Track;
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const { playTrack } = usePlayer();

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // evitar que se dispare doble click
    playTrack(track);
  };

  return (
    <div className="track-card clickable" onClick={() => playTrack(track)}>
      {track.album?.cover ? (
        <img src={track.album.cover} alt={track.title} className="track-image" />
      ) : (
        <div className="track-placeholder">Sin imagen</div>
      )}
      <div className="track-info">
        <h3>{track.title}</h3>
        <p>{track.artist.name}</p>
        <button className="play-button" onClick={handlePlay}>▶️ Reproducir</button>
        <a
          href={`https://www.deezer.com/track/${track.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="deezer-link"
        >
          Escuchar en Deezer
        </a>
      </div>
    </div>
  );
};

export default TrackCard;


