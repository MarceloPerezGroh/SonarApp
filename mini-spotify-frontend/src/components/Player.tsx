import { Track } from "../types/Track";
import { useRef, useEffect } from "react";

interface Props {
  track: Track | null;
}

const Player: React.FC<Props> = ({ track }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [track]);

  if (!track) return <div>Selecciona un track para reproducir 🎵</div>;

  return (
    <div>
      <h3>Reproduciendo: {track.title}</h3>
      <audio ref={audioRef} controls>
        <source src={track.url} type="audio/mpeg" />
        Tu navegador no soporta audio.
      </audio>
    </div>
  );
};

export default Player;
