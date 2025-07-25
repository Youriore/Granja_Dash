import { Header } from "../components/header.jsx";
import { Nav } from "../components/nav.jsx";
import { Secciones } from "../components/secciones.jsx";
import Graficos from "../components/graficos/graficosIngresos.jsx";

export function IngresosTotales() {
  return (
    <>
      <Header administrador="jesus" />
      <div className="d-flex">
        <Nav />

        <section className="container">
          <Secciones dataGeneral="1000" />
          <Graficos />
        </section>
      </div>
    </>
  );
}
