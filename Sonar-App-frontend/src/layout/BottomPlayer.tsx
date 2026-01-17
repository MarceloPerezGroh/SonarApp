import { useRef, useState } from "react";
import PlayerControls from "../components/PlayerControls";
import ProgressBar from "../components/ProgressBar";
import VolumeControl from "../components/VolumeControl";
import "../styles/layout/bottom-player.css";

export default function BottomPlayer() {
  // referencia al elemento de audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // estado para el volumen
  const [volume, setVolume] = useState(1); // 1 = 100%

  // función para manejar cambios de volumen
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <footer className="bottom-player">
      <div className="controls"><PlayerControls /></div>
      <div className="progress"><ProgressBar /></div>
      <div className="volume">
        <VolumeControl
          audioRef={audioRef}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </footer>
  );
}
