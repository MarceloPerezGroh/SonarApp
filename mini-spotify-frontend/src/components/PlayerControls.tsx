import { ShuffleIcon, PrevIcon, PlayIcon, PauseIcon, NextIcon, RepeatIcon } from "../icons";
import "../styles/components/player-controls.css";
import { usePlayer } from "../context/PlayerContext";


export default function PlayerControls() {
  const { isPlaying, playPause, prev, next, shuffle, repeatToggle } = usePlayer();

  return (
    <div className="player-controls">
      <button className="icon-btn" onClick={shuffle} aria-label="Aleatorio">
        <ShuffleIcon />
      </button>
      <button className="icon-btn" onClick={prev} aria-label="Anterior">
        <PrevIcon />
      </button>
      <button
        className="play-btn"
        onClick={playPause}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button className="icon-btn" onClick={next} aria-label="Siguiente">
        <NextIcon />
      </button>
      <button className="icon-btn" onClick={repeatToggle} aria-label="Repetir">
        <RepeatIcon />
      </button>
    </div>
  );
}
