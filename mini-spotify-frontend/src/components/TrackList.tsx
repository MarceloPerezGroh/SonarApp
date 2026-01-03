import { Track } from "../types/Track";
import TrackItem from "./TrackItem";

interface Props {
  tracks: Track[];
  onSelect: (track: Track) => void;
}

const TrackList: React.FC<Props> = ({ tracks, onSelect }) => {
  return (
    <div>
      {tracks.map((track) => (
        <TrackItem key={track.id} track={track} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default TrackList;
