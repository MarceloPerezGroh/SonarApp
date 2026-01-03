import { Track } from "../types/Track";
import "./TrackItem.css"; // importamos el CSS externo

interface Props {
  track: Track;
  onSelect: (track: Track) => void;
}

const TrackItem: React.FC<Props> = ({ track, onSelect }) => {
  return (
    <div className="track-item" onClick={() => onSelect(track)}>
      <strong>{track.title}</strong> — {track.artist}
    </div>
  );
};

export default TrackItem;
