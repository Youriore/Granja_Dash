import { useState } from "react";
import axios from "axios";
import TablaGenerica from "../TablaGenerica.jsx";
import ModalEditarRaza from "../modales/modalEditarRaza.jsx";
import ModalCrearRaza from "../modales/modalCrearRaza.jsx";

const RUTAJAVA = import.meta.env.VITE_RUTAJAVA;

export default function TablaRazaAnimal({ razasData, onDataUpdate }) {
  const [razaSeleccionada, setRazaSeleccionada] = useState(null);

  const handleDelete = async (id_raza) => {
    
      try {
        await axios.delete(`${RUTAJAVA}/api/razaAnimales/${id_raza}`);
        onDataUpdate();
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar la raza. Intente nuevamente.");
      }
    
  };

  const columns = [
    {
      header: "N°",
      accessorKey: "id",
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
      header: "CATEGORIA",
      accessorKey: "categoriaNombre", 
      enableSorting: true,
    },
    {
      header: "DISPOSICIÓN",
      accessorKey: "enUso", 
      enableSorting: true,
      cell: (info) => (
        <span className={`modern-badge ${info.row.original.enUso ? 'bg-warning text-dark' : 'bg-success'}`}>
          {info.row.original.enUso ? "En uso" : "Sin uso"}
        </span>
      )
    },
    {
      header: "ACCIÓN",
      enableSorting: false,
      cell: (info) => (
        <div className="modern-table-actions">
          <button
            type="button"
            className="modern-btn modern-btn-danger"
            onClick={() => handleDelete(info.row.original.id_raza)}
            disabled={info.row.original.enUso}
          >
            Eliminar
          </button>
          <button
            type="button"
            className="modern-btn modern-btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#ModalEditarRaza"
            onClick={() => setRazaSeleccionada(info.row.original)}
          >
            Editar
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="container mt-0 mb-4">
      <TablaGenerica
        data={razasData}
        columns={columns}
        showSearch={true}
        showPagination={true}
        itemsPerPage={10}
        createModalId="#ModalCrearTablaRaza"
        onCreate={() => document.activeElement.blur()}
      />
      <ModalEditarRaza
        raza={razaSeleccionada}
        onUpdated={onDataUpdate}
      />
      <ModalCrearRaza onUpdated={onDataUpdate} />
    </div>
  )
}