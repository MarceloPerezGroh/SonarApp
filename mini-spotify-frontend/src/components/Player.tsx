import { Track } from "../types/Track";
import { useRef, useEffect, useState } from "react";
import VolumeControl from "./VolumeControl";
import "../styles/components/player.css";

interface Props {
  track: Track | null;
}

const Player: React.FC<Props> = ({ track }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.6); // estado controlado 0–1

  // Cuando cambia el track, reproducimos y aseguramos el volumen inicial
  useEffect(() => {
    if (!track || !audioRef.current) return;
    audioRef.current.load();
    audioRef.current.volume = volume;
    // play debe dispararse tras una interacción del usuario en algunos navegadores
    audioRef.current.play().catch(() => {
      // Si el navegador bloquea autoplay, el usuario tendrá que darle "play" manualmente
    });
  }, [track]);

  // Mantener audioRef sincronizado con el estado de volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  if (!track) return <div>Selecciona un track para reproducir 🎵</div>;

  return (
    <div className="player">
      <h3>Reproduciendo: {track.title}</h3>
      <audio ref={audioRef} controls>
        <source src={track.url} type="audio/mpeg" />
        Tu navegador no soporta audio.
      </audio>

      {/* Control de volumen conectado al audio y al estado */}
      <VolumeControl audioRef={audioRef} volume={volume} onVolumeChange={setVolume} />
    </div>
  );
};

export default Player;
