

import { useState } from "react";
import FormBoton from "./formBoton";

export default function FormularioCategoria({ onSubmit }) {
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormBoton
                id="nombre"
                label="Nombre"
                type="text"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                required
            />
            <FormBoton
                id="descripcion"
                label="Descripción"
                type="text"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Ingrese la descripción"
                required
            />

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => document.activeElement.blur()}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar cambios
              </button>
            </div>

            
        </form>
    );
}