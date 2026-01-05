import {
  ShuffleIcon,
  PrevIcon,
  PlayIcon,
  PauseIcon,
  NextIcon,
  RepeatIcon,
} from "../icons";
import "../styles/components/player-controls.css";
import { usePlayer } from "../context/PlayerContext";
import { useRef, useEffect, useState } from "react";

export default function PlayerControls() {
  const {
    isPlaying,
    playPause,
    prev,
    next,
    shuffle,
    repeatToggle,
    currentTrack,
  } = usePlayer();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  // Actualiza reproducción y progreso
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    isPlaying ? audio.play() : audio.pause();

    const updateProgress = () => {
      if (!audio.duration) return;
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [isPlaying]);

  // Control de seek (barra de tiempo)
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const value = parseFloat(e.target.value);
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

  return (
    <div className="player-controls-wrapper">
      {/* Audio real */}
      <audio ref={audioRef} src={currentTrack?.audioUrl} />

      {/* Controles principales */}
      <div className="player-controls">
        <button className="icon-btn" onClick={shuffle} aria-label="Aleatorio">
          <ShuffleIcon />
        </button>
        <button className="icon-btn" onClick={prev} aria-label="Anterior">
          <PrevIcon />
        </button>
        <button className="play-btn" onClick={playPause} aria-label="Play/Pause">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className="icon-btn" onClick={next} aria-label="Siguiente">
          <NextIcon />
        </button>
        <button className="icon-btn" onClick={repeatToggle} aria-label="Repetir">
          <RepeatIcon />
        </button>
      </div>

      {/* Timeline minimalista */}
      <div className="timeline">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={handleSeek}
          className="seek"
          aria-label="Barra de progreso"
        />
      </div>
    </div>
  );
}
