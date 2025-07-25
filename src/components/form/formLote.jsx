import { useState, useEffect } from "react";
import axios from "axios";

const RUTAJAVA = import.meta.env.VITE_RUTAJAVA;

export function FormLote({onSubmit, mostrarCancelar}) {
    const [form, setForm] = useState({
        nombre: "",
        cantidad: "",
        id_raza: "",
        imagen: null,
      });
      
      const [razas, setRazas] = useState([]);

      const handleChange = (e) => {
        const {id, value, files} = e.target;
        if(files && files.length > 0) {
          const file = files[0];
          if(!file.type.startsWith("image/")) {
            alert("Por favor, selecciona una imagen valida");
            return;
          }
          setForm((prev) => ({...prev, imagen: file}));
        } else {
          setForm((prev) => ({...prev, [id]: value}));
        }
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
      };

      useEffect(() => {
        const fetchRazas = async () => {
          try {
            const response = await axios.get(`${RUTAJAVA}/api/razaAnimales`);
            setRazas(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          }
        };
        fetchRazas();
      }, []);

    return (
        <form onSubmit={handleSubmit}>
        <div className="mb-2">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          className="form-control"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="number"
          id="cantidad"
          className="form-control"
          value={form.cantidad}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="id_raza">Raza</label>
        <select
          className="form-control"
          id="id_raza"
          value={form.id_raza}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar</option>
          {razas.map((raza) => (
            <option key={raza.id_raza} value={raza.id_raza}>
              {raza.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="imagen">Imagen</label>
        <input
          type="file"
          id="imagen"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      {form.imagen && (
        <div className="mb-1 ">
          <label className="form-label">Vista previa:</label>
          <div>
            <img
              src={URL.createObjectURL(form.imagen)}
              alt="Vista previa"
              style={{
                maxWidth: "200px",
                height: "200px",
              }}
            />
          </div>
        </div>
      )}

      <div className="modal-footer">
        {mostrarCancelar && (
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={() => {
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
    )
}