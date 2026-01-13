import React, { useEffect, useRef } from "react";
import { usePlayer } from "../context/PlayerContext";
import { usePlaylist } from "../context/PlaylistContext";
import "../styles/components/player-bar.css";

// 👇 extendemos el tipo Track para que tenga preview y artist flexible
interface Track {
  id: number | string;
  title: string;
  artist?: string | { name: string };
  url?: string;
  preview?: string;
}

const PlayerBar: React.FC = () => {
  const { trackActual, isPlaying, pause, playTrack } = usePlayer();
  const { playlist } = usePlaylist();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.error("Error al reproducir:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, trackActual]);

  const handleEnded = () => {
    if (!trackActual) return;
    const index = playlist.findIndex((t) => t.id === trackActual.id);
    const siguiente = playlist[index + 1];
    if (siguiente) {
      playTrack(siguiente);
    } else {
      pause();
    }
  };

  if (!trackActual) {
    return <div className="player-bar">No hay pista seleccionada</div>;
  }

  // 👇 resolvemos artista de forma segura
  const artistName: string =
    typeof trackActual.artist === "string"
      ? trackActual.artist
      : trackActual.artist?.name ?? "Artista desconocido";

  return (
    <div className="player-bar">
      <p>{trackActual.title} — {artistName}</p>
      <audio
        ref={audioRef}
        src={trackActual.preview || trackActual.url || ""} 
        onEnded={handleEnded}
      />
      {isPlaying ? (
        <button onClick={pause}>⏸️ Pausar</button>
      ) : (
        <button onClick={() => playTrack(trackActual)}>▶️ Reproducir</button>
      )}
    </div>
  );
};

export default PlayerBar;
