
import { Header } from "../components/header.jsx";
import { Nav } from "../components/nav.jsx";
import "../assets/css/layout.css"; // Importamos los nuevos estilos

export function HistorialProductos() {
  return (
    <div className="main-container">
      <Header administrador="jesus" />
      <div className="d-flex">
        <Nav />
        <div className="w-100 d-flex gap-5">
            <section className="container">
                
            </section>
        </div>
      </div>
    </div>
  );
}
