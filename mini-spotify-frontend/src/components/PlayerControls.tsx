import React from "react";
import { usePlayer } from "../context/PlayerContext";
import "./PlayerControls.css"; // ✅ estilos externos

const PlayerControls: React.FC = () => {
  const { trackActual, isPlaying, pause, playTrack } = usePlayer();

  return (
    <div className="player-controls">
      {trackActual ? (
        <>
          <p>
            Reproduciendo: <strong>{trackActual.title}</strong> — {trackActual.artist.name}
          </p>
          {isPlaying ? (
            <button className="control-button" onClick={pause}>⏸️ Pausar</button>
          ) : (
            <button className="control-button" onClick={() => playTrack(trackActual)}>▶️ Reproducir</button>
          )}
        </>
      ) : (
        <p>No hay pista seleccionada</p>
      )}
    </div>
  );
};

export default PlayerControls;
