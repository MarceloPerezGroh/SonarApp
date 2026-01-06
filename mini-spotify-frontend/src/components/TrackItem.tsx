import React from "react";
import { Track } from "../types/Track";
import "./TrackItem.css";

interface Props {
  track: Track;
  onSelect: (track: Track) => void;
}

const TrackItem: React.FC<Props> = ({ track, onSelect }) => {
  return (
    <div className="track-item" onClick={() => onSelect(track)}>
      <img
        src={track.coverUrl}
        alt={track.title}
        className="track-cover"
      />
      <div className="track-info">
        <div className="track-title">{track.title}</div>
        <div className="track-artist">{track.artist}</div>
      </div>
    </div>
  );
};

export default TrackItem;

