import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../auth/authContext.jsx";

const RUTAJAVA = import.meta.env.VITE_RUTAJAVA;

export default function ModalEditarLote({ lote, onUpdated }) {

    const [preview, setPreview] = useState(null);
    const [razas, setRazas] = useState([]);

    const { auth } = useAuth();

    const [form, setForm] = useState({
        nombre: "",
        cantidad: "",
        id_raza: "",
        imagen: null,
    });

    useEffect(() => {
        if (lote) {
            setForm({
                nombre: lote.nombre || "",
                cantidad: lote.cantidad || "",
                id_raza: lote.id_raza || "",
            });
            setPreview(`${RUTAJAVA}/uploads/${lote.imagen}`);
        }
    }, [lote]);

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        if (files && files.length > 0) {
            const imagen = files[0];
            setForm((prev) => ({ ...prev, imagen }));
            setPreview(URL.createObjectURL(imagen));
        } else {
            setForm((prev) => ({ ...prev, [id]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        document.activeElement?.blur();

        const data = new FormData();
        data.append("nombre", form.nombre);
        data.append("cantidad", form.cantidad);
        data.append("id_raza", form.id_raza);
        if (form.imagen) {
            data.append("imagen", form.imagen);
        }

        try {

            const response = await axios.put(`${RUTAJAVA}/api/lotesDeAnimales/${lote.id_lote}`, data,
              {
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              }
            );
            console.log(response.data);
            if (onUpdated) onUpdated();

            // Cerrar el modal simulando un clic en el botón de cerrar
            const closeButton = document.querySelector(
                "#ModalEditarTablaLote .btn-close"
            );
            if (closeButton) {
                closeButton.click(); // Dispara el evento de cerrar
            }
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert(
                `Ocurrió un error al actualizar:\n${error?.response?.data?.message || error.message
                }`
            );
        }

    }

    useEffect(() => {

        const fetchCategorias = async () => {
            try {
                const response = await axios.get(`${RUTAJAVA}/api/razaAnimales`);
                setRazas(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        }
        fetchCategorias();
    }, [])

    return (
        <div
            className="modal fade"
            id="ModalEditarTablaLote"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Editar Lote
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
                                <label htmlFor="cantidad">Cantidad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cantidad"
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

                            {preview && (
                                <div className="mb-1 ">
                                    <label className="form-label">Vista previa:</label>
                                    <div>
                                        <img
                                            src={preview}
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}