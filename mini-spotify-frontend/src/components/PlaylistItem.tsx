import { NoteIcon } from "../icons";
import "../styles/components/playlist-item.css";

export default function PlaylistItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <button className="playlist-item">
      <NoteIcon />
      <div className="playlist-texts">
        <span className="title">{title}</span>
        <span className="subtitle">{subtitle}</span>
      </div>
    </button>
  );
}
