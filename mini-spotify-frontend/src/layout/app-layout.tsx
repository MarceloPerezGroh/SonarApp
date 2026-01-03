import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import BottomPlayer from "./BottomPlayer";
import "../styles/layout/app-layout.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-layout">
      <TopBar />
      <div className="app-body">
        <Sidebar />
        <main className="main-view">{children}</main>
      </div>
      <BottomPlayer />
    </div>
  );
}
