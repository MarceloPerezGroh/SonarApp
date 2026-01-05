// components/PlayerLayout.tsx
import React from "react";
import MediaDisplay from "./MediaDisplay";
import QueueSection from "./QueueSection";
import "../styles/components/player-layout.css";

const PlayerLayout: React.FC = () => {
  return (
    <div className="player-layout">
      <div className="media-section">
        <MediaDisplay />
      </div>
      <div className="queue-section">
        <QueueSection />
      </div>
    </div>
  );
};

export default PlayerLayout;
