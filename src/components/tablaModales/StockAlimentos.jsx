import ModalStockCrearAlimentos from '../modales/modalCrearStock.jsx'
import ModalStockEditarAlimentos from '../modales/modalEditarStock.jsx'
import TablaGenerica from '../TablaGenerica'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/authContext.jsx';

const RUTAJAVA = import.meta.env.VITE_RUTAJAVA;

export default function StockAlimentos({ onUpdated }) {

    const [stock, setStock] = useState([])
    const { auth } = useAuth();
    const [alimentoSeleccionado, setAlimentoSeleccionado] = useState(null);
    

    const fetchStock = async () => {
        try {
            const response = await axios.get(`${RUTAJAVA}/api/stockAlimentos`,
                
            );
            console.log('Stocks de la tabla: ' , response.data);
            setStock(response.data);

        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    }
    useEffect(() => {
        fetchStock();
    }, []);

    const handleStockUpdate = () => {
        fetchStock();
        if (onUpdated) {
            onUpdated();
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
        header: "ALIMENTO",
        accessorKey: "nombreAlimento",
        enableSorting: true,

      },
      {
        header: "RAZA",
        accessorKey: "nombreRaza",
        enableSorting: true,
        cell: (info) => info.getValue() || "--------"
      },
      {
        header: "TIPO",
        accessorKey: "tipo",
        enableSorting: true,

      },
      {
        header: "CANTIDAD",
        accessorKey: "cantidad",
        enableSorting: true,
      },
      {
        header: "COSTO",
        accessorKey: "costo",
        enableSorting: true,
        cell: (info) => {
          const value = info.getValue();
          return (value != null && !isNaN(value)) ? `S/ ${parseFloat(value).toFixed(2)}` : "--------";
        }
      },
      {
        header: "ACCIÓN",
        enableSorting: false,
        cell: (info) => (
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-warning btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#modalStockEditarAlimentos"
              onClick={() => setAlimentoSeleccionado(info.row.original)}
            >
              Editar
            </button>
          </div>
        )
      }
    ];

    return (
        <>
            <div className="modal fade" id="modalPrincipalStock" tabIndex="-1" aria-labelledby="modalPrincipalStockLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalPrincipalStockLabel">Gestión de Stock de Alimentos</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <TablaGenerica
                                     data={stock}
                                     columns={columns}
                                     showSearch={true}
                                     showPagination={true}
                                     showtock={false}
                                     stockModalId="#modalPrincipalStock"
                                     onStock={() => document.activeElement.blur()}
                                     createModalId="#modalStockCrearAlimentos"
                                     onCreate={() => document.activeElement.blur()}
                            
                                     />
                        </div>
                        
                    </div>
                </div>
            </div>

            <ModalStockCrearAlimentos onUpdated={handleStockUpdate}  />
            <ModalStockEditarAlimentos onUpdated={handleStockUpdate} stockSeleccionado={alimentoSeleccionado} />
           
        </>
    )
}