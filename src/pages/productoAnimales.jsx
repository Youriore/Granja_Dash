
import { Header } from "../components/header.jsx";
import { Nav } from "../components/nav.jsx";
import TablaProductos from "../components/tablas/tablaProductos.jsx"



export function ProductoAnimales() {
  return (
    <>
      <div className="main-container">
        <Header administrador="jesus" />
        <div className="content-wrapper">
          <Nav />
          <main className="page-content">
           <TablaProductos />
          </main>
        </div>
      </div>
    </>
  );
}
