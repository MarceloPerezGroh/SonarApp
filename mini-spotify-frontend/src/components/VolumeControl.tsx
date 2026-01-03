import { VolumeIcon } from "../icons";
import "../styles/components/volume-control.css";

export default function VolumeControl() {
  return (
    <div className="volume-control">
      <VolumeIcon />
      <input
        type="range"
        min={0}
        max={100}
        defaultValue={60}
        aria-label="Control de volumen"
        title="Control de volumen"
      />
    </div>
  );
}
