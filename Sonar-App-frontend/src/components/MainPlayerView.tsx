import NowPlayingImage from "./NowPlayingImage";
import "../styles/components/main-player-view.css";

export default function MainPlayerView() {
  return (
    <div className="main-player-view">
      <NowPlayingImage />
      <div className="placeholder-text">IMAGEN DEL TEMA</div>
    </div>
  );
}
