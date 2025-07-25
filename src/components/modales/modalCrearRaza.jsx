
import FormRaza from "../form/formRaza.jsx";
import { useState } from "react";
import axios from "axios";

const RUTAJAVA = import.meta.env.VITE_RUTAJAVA;

export default function ModalCrearRaza({ onUpdated, mostrarCancelar = true }) {
    const [formKey, setFormKey] = useState(0);

    const handleCrear = async (form) => {
        const response = await axios.post(`${RUTAJAVA}/api/razaAnimales`, 
            {
                nombre: form.nombre,
                id_categoria: form.id_categoria,
            }
        );
            if (onUpdated) onUpdated();
            setFormKey(prevKey => prevKey + 1); // Reinicia el formulario
            console.log(response.data);
            alert("Raza creada correctamente")
            
            const closeButton = document.querySelector(
                "#ModalCrearTablaRaza .btn-close"
              );
              if (closeButton) {
                closeButton.click(); // Dispara el evento de cerrar
              }
              if (document.activeElement) {
                document.activeElement.blur();
              }
    }
    
    return (
        
        <div
            className="modal fade"
            id="ModalCrearTablaRaza"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Crear Raza
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <FormRaza key={formKey} onSubmit={handleCrear} mostrarCancelar={mostrarCancelar} />
                </div>
              </div>
            </div>
          </div>
    
    )
}