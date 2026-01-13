// src/components/UploadTrackForm.tsx
import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { Track } from "../types/Track";
import "../styles/components/upload-track-form.css";


const UploadTrackForm: React.FC = () => {
  const { allTracks, addTrack } = usePlayer();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState<number | undefined>(undefined);

  const handleSubmit = (persist: boolean, e?: React.FormEvent) => {
    e?.preventDefault();

    const newTrack: Track = {
      id: allTracks.length ? Math.max(...allTracks.map(t => t.id)) + 1 : 1,
      title,
      artist,
      imageUrl,
      genre,
      year,
      url: audioUrl || videoUrl || "",
      audioUrl: audioUrl || undefined,
      videoUrl: videoUrl || undefined,
    };

    if (!newTrack.url) {
      alert("Necesitas especificar Audio URL o Video URL.");
      return;
    }

    addTrack(newTrack, persist); 
    alert(persist ? "Track guardado!" : "Track agregado temporalmente!");

    // Reset
    setTitle("");
    setArtist("");
    setAudioUrl("");
    setVideoUrl("");
    setImageUrl("");
    setGenre("");
    setYear(undefined);
  };

  return (
    <div className="upload-modal">
      <div className="upload-card">
        <div className="upload-header">
          <h3>Subir nuevo track</h3>
          <button
            className="upload-close"
            aria-label="Cerrar"
            title="Cerrar"
            onClick={() => {
              // Evento custom para que TopBar pueda cerrar el modal
              document.dispatchEvent(new Event("close-upload-form"));
            }}
          >
            ✕
          </button>
        </div>

        <form className="upload-form" onSubmit={(e) => handleSubmit(true, e)}>
          <label>
            <span>Título</span>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título del track" required />
          </label>

          <label>
            <span>Artista</span>
            <input value={artist} onChange={e => setArtist(e.target.value)} placeholder="Nombre del artista" />
          </label>

          <label>
            <span>Audio URL</span>
            <input value={audioUrl} onChange={e => setAudioUrl(e.target.value)} placeholder="https://...mp3" />
          </label>

          <label>
            <span>Video URL</span>
            <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://...mp4" />
          </label>

          <label>
            <span>Imagen URL</span>
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="/images/portada.jpg" />
          </label>

          <div className="upload-row">
            <label className="upload-col">
              <span>Género</span>
              <input value={genre} onChange={e => setGenre(e.target.value)} placeholder="Techno, Rock..." />
            </label>

            <label className="upload-col">
              <span>Año</span>
              <input type="number" value={year ?? ""} onChange={e => setYear(Number(e.target.value))} placeholder="1998" />
            </label>
          </div>

          <div className="upload-actions">
            <button type="submit" className="upload-submit">Subir y guardar</button>
            <button
              type="button"
              className="upload-temp"
              onClick={() => handleSubmit(false)}
            >
              Solo reproducir
            </button>
            <button
              type="button"
              className="upload-cancel"
              onClick={() => {
                document.dispatchEvent(new Event("close-upload-form"));
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadTrackForm;
