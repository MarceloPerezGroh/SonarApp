import React from "react";
import { usePlayer } from "../context/PlayerContext";
import "../styles/components/queue-view.css";

const QueueView: React.FC = () => {
  const { queue, play, removeFromQueue } = usePlayer();

  return (
    <div className="queue-view">
      <h3 className="queue-title">Mi lista</h3>
      {queue.length === 0 ? (
        <p className="empty-msg">No hay temas en la cola.</p>
      ) : (
        <ul className="queue-list">
          {queue.map((track) => (
            <li key={track.id} className="queue-item">
              <span className="track-title">{track.title}</span>
              <div className="queue-actions">
                <button
                  className="btn-play"
                  onClick={() => play(track)}
                  aria-label={`Reproducir ${track.title}`}
                >
                  ▶
                </button>
                <button
                  className="btn-remove"
                  onClick={() => removeFromQueue(track.id)}
                  aria-label={`Eliminar ${track.title} de la cola`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueueView;
