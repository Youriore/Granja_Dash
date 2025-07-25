import { Link } from "react-router-dom";
import "../assets/css/header.css";
import {useAuth} from "../auth/authContext";
import { useNavigate } from "react-router-dom";

export function Nav() {

  const navigate = useNavigate();
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/GranjaDash/login");
  };


  const links = [
    {
      to: "/GranjaDash/ingresosTotales",
      label: <i className="iconNav">Ingresos</i>,
    },
    {
      to: "/GranjaDash/categorias",
      label: <i className="iconNav">Categorias</i>,
    },
    {
      to: "/GranjaDash/alimentacionRecursos",
      label: <i className="iconNav">Alimentacion</i>,
    },
    {
      to: "/GranjaDash/categoriaRazas",
      label: <i className="iconNav">Razas</i>,
    },
    {
      to: "/GranjaDash/LoteAnimales",
      label: <i className="iconNav">Lotes</i>,
    },
    {
      to: "/GranjaDash/ProductoAnimales",
      label: <i className="iconNav">Productos</i>,
    },
    {
      to: "/GranjaDash/comidaAnimales",
      label: <i className="iconNav">Comida</i>,
    },
  ];


  return (
    <nav className="p-2">
      <ul className="d-flex justify-content-center flex-column p-0 gap-3 mt-4">
        {links.map((link, index) => (
          <li
            key={index}
            className="list-unstyled d-flex justify-content-center"
          >
            <Link
              to={link.to}
              className="text-decoration-none p-2 d-flex align-items-center justify-content-center rounded border contenLink">
              {link.label}
            </Link>
            
          </li>
        ))}
        <button className="btn btn-danger btn-sm" onClick={handleLogout}> <i className="bi bi-box-arrow-right"></i></button>
      </ul>
    </nav>
  );
}
