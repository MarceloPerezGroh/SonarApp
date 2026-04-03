import { useState } from "react";
import tracksData from "../data/tracks.json"; 
import { Track } from "../types/Track";
import TrackList from "../components/TrackList";
import Player from "../components/Player";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  // Tipamos y transformamos los datos del JSON
  const tracks: Track[] = (tracksData as { tracks: { id: number; title: string; artist?: string; src: string }[] }).tracks.map(
    (t) => ({
      id: t.id,
      title: t.title,
      artist: t.artist,
      url: t.src // usamos src del JSON como url para el reproductor
    })
  );

  return (
    <div className="dashboard">
      <div className="dashboard__list">
        <h2>Lista de Demos</h2>
        <TrackList tracks={tracks} onSelect={setCurrentTrack} />
      </div>

      <div className="dashboard__player">
        <Player track={currentTrack} />
      </div>
    </div>
  );
};

export default Dashboard;
