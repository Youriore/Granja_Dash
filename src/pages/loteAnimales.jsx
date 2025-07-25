
import { Header } from "../components/header.jsx";
import { Nav } from "../components/nav.jsx";
import TablaLotesAnimales from "../components/tablas/tablaLotesAnimales.jsx";

export function LoteAnimales() {
    return (
        <>
            <div className="main-container">
                <Header administrador="jesus" />
                <div className="content-wrapper">
                    <Nav />
                    <main className="page-content">
                        <TablaLotesAnimales />
                    </main>
                </div>
            </div>
        </>
    )
}