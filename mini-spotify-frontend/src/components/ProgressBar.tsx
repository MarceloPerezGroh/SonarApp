import "../styles/components/progress-bar.css";

export default function ProgressBar() {
  return (
    <div className="progress-bar">
      <span className="time">0:00</span>
      <input
        type="range"
        min={0}
        max={100}
        defaultValue={0}
        aria-label="Barra de progreso de la canción"
        title="Barra de progreso de la canción"
      />
      <span className="time">3:45</span>
    </div>
  );
}
