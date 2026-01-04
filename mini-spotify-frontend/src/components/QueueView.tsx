import React from "react";
import { usePlayer } from "../context/PlayerContext";
import "../styles/components/queue-view.css";

const QueueView: React.FC = () => {
  const { queue } = usePlayer();

  return (
    <div className="queue-view">
      <h3 className="queue-title">Mi lista</h3>
      {queue.length === 0 ? (
        <p className="empty-msg">No hay temas en la cola.</p>
      ) : (
        <ul className="queue-list">
          {queue.map((track) => (
            <li key={track.id} className="queue-item">
              {track.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueueView;
