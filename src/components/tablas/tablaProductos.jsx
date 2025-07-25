import TablaGenerica from "../TablaGenerica";
import {useState, useEffect} from "react";
import axios from "axios";
import { useAuth } from "../../auth/authContext.jsx";
import {ModalCrearProducto} from "../modales/modalCrearProducto.jsx";
import {ModalEditarProducto} from "../modales/modalEditarProducto.jsx";

const RUTAJAVA = import.meta.env.VITE_RUTAJAVA;

export default function TablaProductos() {

    const [productos, setProductos] = useState([]);
    const {auth} = useAuth();
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const fetchProductos = async () => {
         
        try {
            const response = await axios.get(`${RUTAJAVA}/api/productoAnimales`)
            console.log(response.data)
            setProductos(response.data)   
        } catch (error) {
            console.error("Error al obtener los datos:", error)
        }
    }
    useEffect(() => {
        fetchProductos();
    }, []);

    const handleDelete = async (id_producto) => {

        try {

            const response = await axios.delete(`${RUTAJAVA}/api/productoAnimales/${id_producto}`,
                {
                    headers:{
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            )
            console.log(response.data)
            alert("Producto eliminado correctamente");
            setProductos(prev => prev.filter(producto => producto.id_producto !== id_producto));
            console.log(response.data);
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("No se pudo eliminar el producto. Intente nuevamente.");
        }
    } 
    
    const  columns = [
        {
            header:"N°",
            accessorKey: "id_producto",
            cell: (info) => info.row.index + 1,
            enableSorting: false,
            size: 50
            
        },
        {
            header: "NOMBRE",
            accessorKey: "nombre",
            enableSorting: true
        },
        {
            header: "DESCRIPCION",
            accessorKey: "descripcion",
            enableSorting: true
        },
        {
            header: "CANTIDAD",
            accessorKey: "cantidad",
            enableSorting: true
        },
        {
            header: "RAZA",
            accessorKey: "nombreRaza",
            enableSorting: true
        },
        {
            header: "FECHA DE COMPRA",
            accessorKey: "fecha",
            enableSorting: true,
            cell: (info) => {
                const date = new Date(info.getValue());
                return date.toLocaleString("es-PE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                });
              }
        },
        {
            header: "ACCIÓN",
            enableSorting: false,
            cell: (info) => (
                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(info.row.original.id_producto)}
                    >
                        Eliminar
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEditarProducto"
                        onClick={() => setProductoSeleccionado(info.row.original)}
                    >
                        Editar
                    </button>
                </div>
            )
        }
    ]
        
    return (
        <div className="container mt-0 mb-4">
              <div className="d-flex justify-content-between mb-2">
                <h2>Lista de Productos</h2>
                
              </div>
              <hr />
              <TablaGenerica
                data={productos}
                columns={columns}
                showSearch={true}
                showPagination={true}
                showtock={true}
                stockModalId="#modalPrincipalStock"
                onStock={() => document.activeElement.blur()}
                createModalId="#modalCrearProducto"
                onCreate={() => document.activeElement.blur()}
              />
        
              <ModalEditarProducto onUpdated={fetchProductos} producto={productoSeleccionado} />
              <ModalCrearProducto onUpdated={fetchProductos} />
         
            </div>
    );
}