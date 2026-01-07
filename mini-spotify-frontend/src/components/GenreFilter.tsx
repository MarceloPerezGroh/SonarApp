import { usePlayer } from "../context/PlayerContext";

export const GenreFilter = () => {
  const { allTracks } = usePlayer();

  // obtener lista única de géneros
  const genres = Array.from(new Set(allTracks.map(t => t.genre).filter(Boolean)));

  return (
    <div>
      {genres.map(g => (
        <button key={g} onClick={() => console.log("Filtrar por", g)}>
          {g}
        </button>
      ))}
    </div>
  );
};
