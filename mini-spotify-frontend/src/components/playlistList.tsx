import { usePlaylists } from "../hooks/usePlaylists";

function PlaylistsList() {
  const { playlists, loading, error } = usePlaylists();

  if (loading) return <p>Cargando playlists...</p>;
  if (error) return <p className="error">{error}</p>;
  if (playlists.length === 0) return <p>No tenés playlists todavía 🎶</p>;

  return (
    <ul>
      {playlists.map((pl) => (
        <li key={pl.id}>{pl.name}</li>
      ))}
    </ul>
  );
}

export default PlaylistsList;
