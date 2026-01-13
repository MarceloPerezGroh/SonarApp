import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import "./PlaylistDetail.css";   

interface Song {
  id: string;
  title: string;
  artist: string;
}

interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

function PlaylistDetail() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Error al cargar playlist");
        }

        const data: Playlist = await res.json();
        setPlaylist(data);
      } catch (err: any) {
        setError(err.message || "Error al cargar playlist");
      }
    };
    if (token) fetchDetail();
  }, [id, token]);

  if (error) return <p className="error">{error}</p>;   
  if (!playlist) return <p className="loading">Cargando...</p>; 

  return (
    <div className="playlist-detail">
      <h2>{playlist.name}</h2>
      <ul>
        {playlist.songs.map((s) => (
          <li key={s.id}>
            {s.title} - {s.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaylistDetail;

