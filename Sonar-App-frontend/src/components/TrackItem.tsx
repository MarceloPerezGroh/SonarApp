import React from "react";
import { Track } from "../types/Track";
import "../styles/components/track-item.css";

interface Props {
  track: Track;
  onSelect: (track: Track) => void;
}

const TrackItem: React.FC<Props> = ({ track, onSelect }) => {
  // resolvemos artista de forma segura
  const artistName: string =
    typeof track.artist === "string"
      ? track.artist
      : track.artist?.name ?? "Artista desconocido";

  return (
    <div className="track-item" onClick={() => onSelect(track)}>
      <img
        src={track.coverUrl}
        alt={track.title}
        className="track-cover"
      />
      <div className="track-info">
        <div className="track-title">{track.title}</div>
        <div className="track-artist">{artistName}</div>
      </div>
    </div>
  );
};

export default TrackItem;

