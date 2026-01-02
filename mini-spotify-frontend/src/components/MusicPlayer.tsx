import { useEffect, useState } from "react";
import axios from "axios";

interface Track {
  id: number;
  title: string;
  stream_url: string;
}

export default function MusicPlayer({ clientId }: { clientId: string }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await axios.get<Track[]>(
          `https://api.soundcloud.com/tracks?client_id=${clientId}&limit=10`
        );
        setTracks(res.data);
      } catch (err) {
        console.error("Error fetching tracks", err);
      }
    }
    fetchTracks();
  }, [clientId]);

  return (
    <div>
      <h2>🎶 SoundCloud Tracks</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.title}
            <button onClick={() => setCurrentTrack(track)}>Play</button>
          </li>
        ))}
      </ul>

      {currentTrack && (
        <audio
          controls
          autoPlay
          src={`${currentTrack.stream_url}?client_id=${clientId}`}
        />
      )}
    </div>
  );
}
