import React, { createContext, useContext, useState, useEffect } from "react";
import { Track } from "../types/Track";
import tracksFile from "../data/tracks.json";

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

interface PlaylistContextType {
  playlists: Playlist[];
  query: string;
  filteredTracks: Track[];
  addPlaylist: (playlist: Playlist) => void;
  addTrack: (playlistId: string, track: Track) => void;
  removeTrack: (playlistId: string, trackId: number) => void;
  deletePlaylist: (playlistId: string) => void;
  searchTracks: (query: string) => void;
  clearSearch: () => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 🔑 Mapear src → url
  const initialTracks: Track[] = tracksFile.tracks.map((t) => ({
    id: t.id,
    title: t.title,
    artist: t.artist,
    url: t.src,
  }));

  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "default",
      name: "Todos los temas",
      tracks: initialTracks,
    },
  ]);
  const [query, setQuery] = useState("");
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(initialTracks);

  useEffect(() => {
    const allTracks = playlists.flatMap((pl) => pl.tracks);
    if (!query) {
      setFilteredTracks(allTracks);
    } else {
      setFilteredTracks(
        allTracks.filter(
          (t) =>
            t.title.toLowerCase().includes(query.toLowerCase()) ||
            t.artist.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [playlists, query]);

  const addPlaylist = (playlist: Playlist) => {
    setPlaylists((prev) => [...prev, { ...playlist, tracks: [] }]);
  };

  const addTrack = (playlistId: string, track: Track) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId ? { ...pl, tracks: [...pl.tracks, track] } : pl
      )
    );
  };

  const removeTrack = (playlistId: string, trackId: number) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, tracks: pl.tracks.filter((t) => t.id !== trackId) }
          : pl
      )
    );
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists((prev) => prev.filter((pl) => pl.id !== playlistId));
  };

  const searchTracks = (q: string) => setQuery(q);
  const clearSearch = () => setQuery("");

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        query,
        filteredTracks,
        addPlaylist,
        addTrack,
        removeTrack,
        deletePlaylist,
        searchTracks,
        clearSearch,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const ctx = useContext(PlaylistContext);
  if (!ctx) {
    throw new Error("usePlaylist debe usarse dentro de PlaylistProvider");
  }
  return ctx;
};
