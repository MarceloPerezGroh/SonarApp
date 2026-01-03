import PlaylistItem from "../components/PlaylistItem";
import { PlusIcon, ExpandIcon } from "../icons";
import "../styles/layout/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Tu biblioteca</h3>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Crear playlist"><PlusIcon /></button>
          <button className="icon-btn" aria-label="Expandir"><ExpandIcon /></button>
        </div>
      </div>

      <div className="sidebar-filters">
        <button className="pill">Listas</button>
      </div>

      <div className="sidebar-search">
        {/* ícono de lupa simple */}
        <span className="search-icon">🔍</span>
      </div>

      <div className="sidebar-list">
        <PlaylistItem title="Mi lista" subtitle="Lista" />
        {/* agrega más PlaylistItem según necesites */}
      </div>
    </aside>
  );
}
