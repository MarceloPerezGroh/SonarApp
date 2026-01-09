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
import { useEffect } from "react";

export default function PlayerControls() {
  const {
    isPlaying,
    playPause,
    prev,
    next,
    shuffle,
    repeatToggle,
    currentTrack,
    audioRef,        // 👈 ahora viene del contexto
    currentTime,     // 👈 segundos actuales
    duration,        // 👈 duración total
    seek,            // 👈 función para mover la línea de tiempo
  } = usePlayer();

  // Formatear minutos:segundos
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Progreso en porcentaje
  const progress = duration ? (currentTime / duration) * 100 : 0;

  // 👇 Actualizar variable CSS externa en cada cambio de progreso
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--progress", `${progress}%`);
  }, [progress]);

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

      {/* Timeline con minutos y color amarillo */}
      <div className="timeline">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={(e) => seek(parseFloat(e.target.value))}
          className="seek"
          aria-label="Barra de progreso"
        />
        <span className="time">{formatTime(duration)}</span>
      </div>
    </div>
  );
}
