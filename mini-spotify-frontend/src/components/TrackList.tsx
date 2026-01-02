import React from "react";
import { Track } from "../services/deezer";
import TrackCard from "./TrackCard";

interface TrackListProps {
  tracks: Track[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  if (tracks.length === 0) {
    return <p>No hay resultados</p>;
  }

  return (
    <div className="track-list">
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  );
};

export default TrackList;
