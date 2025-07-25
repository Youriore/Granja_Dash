import "../assets/css/header.css"
import { useAuth } from "../auth/authContext";
export function Header() {
    const { auth } = useAuth();
    return (
        <>
        <header className="contenHeader d-flex justify-content-between align-items-center">
            <div className="container d-flex justify-content-between ">
            <span className="d-flex align-items-center">
            <h1>GRANJA DASH</h1>
            </span>
            <span className="d-flex align-items-center contenimg">
            <p>Bienvenido: <span>{auth.nombre}</span></p>
            <img className="w-25" src="https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-black-hen-logo-vector-png-image_6681063.png" alt="" />
            </span>
            </div>
        </header>
        </>
    )
}