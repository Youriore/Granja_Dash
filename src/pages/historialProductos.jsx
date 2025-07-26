
import { Header } from "../components/header.jsx";
import { Nav } from "../components/nav.jsx";
import "../assets/css/layout.css";
import { useState } from "react";

export function HistorialProductos() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="main-layout">
        <Nav isOpen={sidebarOpen} onClose={closeSidebar} />
        <main className="main-content">
          <div className="content-wrapper">
            <section className="container">
                {/* Contenido del historial de productos */}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
