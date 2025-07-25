import { useState } from "react";
import "../../assets/css/formCompra.css";

export default function FormularioAlimento({ onSubmit, mostrarCancelar }) {
  const [form, setForm] = useState({
    nombre: "",
    imagen: null,
    descripcion: "",
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecciona una imagen válida");
        return;
      }

      setForm((prev) => ({ ...prev, imagen: file }));
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-4">
      <section>
      <div className="mb-2">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          className="form-control form-control-compra"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="descripcion">Descripcion</label>
        <textarea
          id="descripcion"
          className="form-control form-control-compra"
          value={form.descripcion}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      </section>
      <section>
      <div className="mb-2">
        <label htmlFor="imagen">Imagen</label>
        <input
          type="file"
          id="imagen"
          className="form-control form-control-compraImagen"
          onChange={handleChange}
        />
      </div>

      {form.imagen && (
        <div className="mb-1 w-100 text-center d-flex justify-content-center ">
          
          <div className="contenImagenPrevia">
            <img
              src={URL.createObjectURL(form.imagen)}
              alt="Vista previa"
              style={{
                minWidth: "200px",
                minHeight: "200px",
              }}
            />
          </div>
        </div>
      )}
      
      <div className="modal-footer w-100 text-center d-flex justify-content-center">
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
      </section>
    </form>
  );
}
