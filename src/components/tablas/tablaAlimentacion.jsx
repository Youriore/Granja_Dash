import React, { useState, useEffect } from "react";
import axios from "axios";
import TablaGenerica from "../TablaGenerica";
import ModalEditarTablaAlimentos from "../modales/modalEditarTablaAlimentos";
import ModalCrearTablaAlimentos from "../modales/modalCrearTablaAlimentos";
import StockAlimentos from "../tablaModales/StockAlimentos";
import ModalStockAlimentos from "../modales/modalCrearStock";
import { useAuth } from "../../auth/authContext.jsx";

const RUTAJAVA = import.meta.env.VITE_RUTAJAVA;

export default function AlimentacionList() {

  const [alimentoSeleccionado, setAlimentoSeleccionado] = useState(null);
  const [alimentos, setAlimentos] = useState([]);
  const { auth } = useAuth();

  const fetchAlimentos = async () => {
    try {
      const response = await axios.get(`${RUTAJAVA}/api/alimentacion`);
      console.log(response.data);
      setAlimentos(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchAlimentos();
  }, []);

  const handleDelete = async (id_alimento) => {
   
      try {
        await axios.delete(`${RUTAJAVA}/api/alimentacion/${id_alimento}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          }
        );
        console.log("Alimento eliminado correctamente: ", id_alimento);
        setAlimentos(prev => prev.filter(alimento => alimento.id_alimento !== id_alimento));
      } catch (error) { 
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el alimento. Intente nuevamente.");
      }
    
  };

  const columns = [
    {
      header: "N°",
      accessorKey: "id_alimento",
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
      header: "CANTIDAD",
      accessorKey: "cantidad",
      enableSorting: true
    },
    {
      header: "DESCRIPCION",
      accessorKey: "descripcion",
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
      header: "COMPROBANTE",
      accessorKey: "imagen",
      enableSorting: false,
      cell: (info) => (
        <img
          src={`${RUTAJAVA}/uploads/${info.getValue()}`}
          alt="Comprobante"
          style={{
            width: "80px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          onClick={() => window.open(`${RUTAJAVA}/uploads/${info.getValue()}`, '_blank')}
        />
      )
    },
    {
      header: "ACCIÓN",
      enableSorting: false,
      cell: (info) => (
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(info.row.original.id_alimento)}

          >
            Eliminar
          </button>
          <button
            type="button"
            className="btn btn-warning btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#ModalEditarTablaAlimentos"
            onClick={() => setAlimentoSeleccionado(info.row.original)}
          >
            Editar
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="container mt-0 mb-4">
      <div className="d-flex justify-content-between mb-2">
        <h2>Lista de Alimentos</h2>
        
      </div>
      <hr />
      <TablaGenerica
        data={alimentos}
        columns={columns}
        showSearch={true}
        showPagination={true}
        showtock={true}
        stockModalId="#modalPrincipalStock"
        onStock={() => document.activeElement.blur()}
        createModalId="#ModalCrearTablaAlimentos"
        onCreate={() => document.activeElement.blur()}
      />

      <ModalEditarTablaAlimentos
        alimento={alimentoSeleccionado}
        onUpdated={fetchAlimentos}
      />
      <ModalCrearTablaAlimentos onUpdated={fetchAlimentos} />
      <StockAlimentos onUpdated={fetchAlimentos} />
    </div>
  );
}
