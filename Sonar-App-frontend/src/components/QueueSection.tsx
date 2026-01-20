import React from "react";
import { usePlayer } from "../context/PlayerContext";
import "../styles/components/queue-section.css";

const QueueSection: React.FC = () => {
  const { queue, play, removeFromQueue } = usePlayer();

  if (queue.length === 0) return null;

  return (
    <div className="queue-section">
      <h3 className="queue-title">Mi lista</h3>
      <div className="queue-scroll">
        <ul className="queue-list">
          {queue.map((track) => (
            <li key={track.id} className="queue-item">
              <span className="track-title">
                {track.title}
                {track.artist && ` - ${track.artist}`}
              </span>
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
                  aria-label={`Eliminar ${track.title}`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QueueSection;
