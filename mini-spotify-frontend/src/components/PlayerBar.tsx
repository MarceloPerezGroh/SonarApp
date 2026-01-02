import React, { useEffect, useRef } from "react";
import { usePlayer } from "../context/PlayerContext";
import { usePlaylist } from "../context/PlaylistContext";
import "./PlayerBar.css";

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

  return (
    <div className="player-bar">
      <p>{trackActual.title} — {trackActual.artist.name}</p>
      <audio
        ref={audioRef}
        src={trackActual.preview} // ✅ ahora usamos el preview de Deezer
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
