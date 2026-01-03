import PlayerControls from "../components/PlayerControls";
import ProgressBar from "../components/ProgressBar";
import VolumeControl from "../components/VolumeControl";
import "../styles/layout/bottom-player.css";

export default function BottomPlayer() {
  return (
    <footer className="bottom-player">
      <div className="controls"><PlayerControls /></div>
      <div className="progress"><ProgressBar /></div>
      <div className="volume"><VolumeControl /></div>
    </footer>
  );
}
