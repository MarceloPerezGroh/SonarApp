import { VolumeIcon } from "../icons";
import "../styles/components/volume-control.css";

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
  volume: number; // 0–1
  onVolumeChange: (v: number) => void;
}

export default function VolumeControl({ audioRef, volume, onVolumeChange }: Props) {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100; // normalizar a 0–1
    onVolumeChange(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="volume-control">
      <VolumeIcon />
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(volume * 100)}
        onChange={handleVolumeChange}
        aria-label="Control de volumen"
        title="Control de volumen"
      />
    </div>
  );
}
