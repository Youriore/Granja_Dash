import { FormLote } from "../form/formLote";
import { useState, useEffect } from "react";
import axios from "axios";

const RUTAJAVA = import.meta.env.VITE_RUTAJAVA;

export default function ModalCrearLote({ onUpdated }) {

    const [formKey, setFormKey] = useState(0);


    const handleSubmit = (form) => {

        const data = new FormData();
        data.append("nombre", form.nombre);
        data.append("cantidad", form.cantidad);
        data.append("id_raza", form.id_raza);
        if (form.imagen) {
            data.append("imagen", form.imagen);
        }

        try {
            const response = axios.post(`${RUTAJAVA}/api/lotesDeAnimales`, data);
            console.log(response.data);
            alert("Lote creado correctamente");
            setFormKey(prevKey => prevKey + 1); // Reinicia el formulario

            const closeButton = document.querySelector(
                "#ModalCrearTablaLote .btn-close"
            );
            if (closeButton) {
                closeButton.click(); // Dispara el evento de cerrar
            }
            if (document.activeElement) {
                document.activeElement.blur();
            }
            if (onUpdated) onUpdated();
        } catch (error) {
            console.log(error);
            alert("Error al crear el lote");
        }
    }
    return (
        <div
            className="modal fade"
            id="ModalCrearTablaLote"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Crear Lote
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <FormLote onSubmit={handleSubmit} mostrarCancelar={true} key={formKey} />
                    </div>
                </div>
            </div>
        </div>
    )
}   