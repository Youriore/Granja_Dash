import axios from "axios";
import { useEffect, useState } from "react";

const RUTAJAVA = import.meta.env.VITE_RUTAJAVA;

export default function ModalEditarCategoria({ categoria, onUpdated }) {

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
    });

    useEffect(() => {
        if (categoria) {
          setForm({
            nombre: categoria.nombre || "",
            descripcion: categoria.descripcion || "",
          });
        }
      }, [categoria]);

      const handleChange = (e) => {
        const { id, value } = e.target;
        setForm((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        document.activeElement?.blur();


    try {
        const response = await axios.put(`${RUTAJAVA}/api/CategoriaProductos/${categoria.id_categoria}`,
            {
                nombre: form.nombre,
                descripcion: form.descripcion,
            }
        );
        console.log(response.data);
        if (onUpdated) onUpdated();
  
        // Cerrar el modal simulando un clic en el botón de cerrar
        const closeButton = document.querySelector(
          "#ModalEditarTablaCategoria .btn-close"
        );
        if (closeButton) {
          closeButton.click(); // Dispara el evento de cerrar
        }
      } catch (error) {
        console.error("Error al actualizar:", error);
        alert(
          `Ocurrió un error al actualizar:\n${
            error?.response?.data?.message || error.message
          }`
        );
      }
    };
    
  return (
    <div
      className="modal fade"
      id="ModalEditarTablaCategoria"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Editar Categoria
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="descripcion">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
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
        </div>
      </div>
    </div>
  );
}