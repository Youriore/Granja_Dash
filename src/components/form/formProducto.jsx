import { useState, useEffect } from "react";
import axios from "axios";

const RUTAJAVA = import.meta.env.VITE_RUTAJAVA;

export function FormProducto({
  onSubmit,
  form,
  handleChange,
  mostrarCancelar,
  onCancelar,
}) {
  const [razas, setRazas] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  useEffect(() => {
    const fetchRazas = async () => {
      try {
        const response = await axios.get(`${RUTAJAVA}/api/razaAnimales`);
        console.log(response.data);
        setRazas(response.data);
      } catch (error) {
        console.log("error al obtener las razas", error);
      }
    };
    fetchRazas();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="nombre"> Nombre</label>
          <input
            type="text"
            id="nombre"
            className="form-control form-control-compra"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="id_raza">Raza</label>
          <select
            name="id_raza"
            id="id_raza"
            className="form-control"
            value={form.id_raza}
            onChange={handleChange}
          >
            <option value=""> -- Seleccionar --</option>
            {razas.map((raza) => (
              <option key={raza.id_raza} value={raza.id_raza}>
                {raza.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="descripcion"> Descripcion</label>
          <textarea
            name="descripcion"
            id="descripcion"
            className="form-control"
            value={form.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="modal-footer">
          {mostrarCancelar && (
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                onCancelar();
                document.activeElement?.blur();
              }}
            >
              Cancelar
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
        </div>
      </form>
    </>
  );
}
