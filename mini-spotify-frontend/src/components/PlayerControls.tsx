import React from "react";
import { usePlayer } from "../context/PlayerContext";

const PlayerControls: React.FC = () => {
  const { current, queue, next, clearQueue } = usePlayer();

  return (
    <div className="player-controls">
      {current ? (
        <p>🎶 Reproduciendo: {current.title} — {current.artist}</p>
      ) : (
        <p>No hay canción en reproducción</p>
      )}

      <div className="buttons">
        <button onClick={next}>⏭ Siguiente</button>
        <button onClick={clearQueue}>🗑 Limpiar cola</button>
      </div>

      {queue.length > 0 && (
        <div className="queue">
          <h4>Cola de reproducción:</h4>
          <ul>
            {queue.map((t, i) => (
              <li key={i}>{t.title} — {t.artist}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlayerControls;
