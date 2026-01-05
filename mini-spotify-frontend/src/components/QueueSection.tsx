// src/components/QueueSection.tsx
import React from "react";
import { usePlayer } from "../context/PlayerContext";
import "../styles/components/queue-section.css";

const QueueSection: React.FC = () => {
  const { queue, removeFromQueue } = usePlayer();

  return (
    <div className="queue-section">
      <h2 className="queue-title">Cola de reproducción</h2>
      {queue.length === 0 ? (
        <p className="queue-empty">No hay temas en cola</p>
      ) : (
        <ul className="queue-list">
          {queue.map((track) => (
            <li key={track.id} className="queue-item">
              <span className="queue-track">
                {track.title} {track.artist && `- ${track.artist}`}
              </span>
              <button
                className="queue-remove"
                onClick={() => removeFromQueue(track.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueueSection;
