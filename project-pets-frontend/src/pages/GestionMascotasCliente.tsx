import { useEffect, useState } from 'react';
import {
    listarMascotasClientePaginado,
    listarMascotasClienteTodo,
    crearMascotaCliente,
    actualizarMascotaCliente,
    eliminarMascotaCliente,
    Mascota
} from '../services/mascotaService';
import { useAlert } from '../context/AlertContext';
import Modal from '../components/Modal';
import './usuarios.css'; // Reutiliza estilos (por ejemplo)

function GestionMascotasCliente() {
    const { showAlert } = useAlert();

    const [pagina, setPagina] = useState(0);
    const [lista, setLista] = useState<Mascota[]>([]);
    const [totalPaginas, setTotalPaginas] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    // Datos del formulario
    const [form, setForm] = useState<Mascota>({
        nombre: '',
        fechaNacimiento: '',
        idRaza: 1
    });

    // Cargar la lista de mascotas según la página actual
    useEffect(() => {
        cargarMascotas();
    }, [pagina]);

    async function cargarMascotas() {
        try {
            const resp = await listarMascotasClientePaginado(pagina);
            setLista(resp.content);
            setTotalPaginas(resp.totalPages);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    // Abrir modal para crear
    function handleModalCrear() {
        setEditId(null);
        setForm({
            nombre: '',
            fechaNacimiento: '',
            idRaza: 1
        });
        setShowModal(true);
    }

    // Abrir modal para editar
    function handleModalEditar(m: Mascota) {
        setEditId(m.idMascota ?? null);
        setForm({
            nombre: m.nombre,
            fechaNacimiento: m.fechaNacimiento,
            idRaza: m.idRaza
        });
        setShowModal(true);
    }

    // Guardar cambios (crear o actualizar)
    async function handleGuardar() {
        if (!form.nombre.trim()) {
            showAlert('El nombre de la mascota es obligatorio', 'error');
            return;
        }
        try {
            if (editId == null) {
                // Crear
                await crearMascotaCliente(form);
                showAlert('Mascota creada exitosamente', 'success');
            } else {
                // Actualizar
                await actualizarMascotaCliente(editId, form);
                showAlert('Mascota actualizada exitosamente', 'success');
            }
            setShowModal(false);
            cargarMascotas();
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    // Eliminar
    async function handleEliminar(m: Mascota) {
        if (!m.idMascota) return;
        if (!confirm(`¿Estás seguro de eliminar la mascota "${m.nombre}"?`)) return;
        try {
            await eliminarMascotaCliente(m.idMascota);
            showAlert('Mascota eliminada', 'success');
            cargarMascotas();
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    // Paginación
    function paginaAnterior() {
        if (pagina > 0) setPagina(pagina - 1);
    }
    function paginaSiguiente() {
        if (pagina < totalPaginas - 1) setPagina(pagina + 1);
    }

    // Exportar CSV
    async function exportCSV() {
        try {
            const todos = await listarMascotasClienteTodo();
            // Ajusta las columnas a mostrar
            const columnas = [
                'idMascota',
                'nombre',
                'fechaNacimiento',
                'idRaza',
                'nomRaza',
                'idDueno',
                'nombreDueno',
                'identificacionDueno'
            ];
            const cabeceras = columnas.join(';');
            const filas = todos.map(m =>
                columnas.map(col => String(m[col as keyof Mascota] ?? '')).join(';')
            );
            const csv = [cabeceras, ...filas].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'mis_mascotas.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Mis Mascotas</h1>
            <div className="top-actions">
                <button onClick={handleModalCrear} className="btn-primario">
                    Crear Mascota
                </button>
                <button onClick={exportCSV} className="btn-secundario">
                    Exportar CSV
                </button>
            </div>

            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Raza</th>
                        <th>Dueño</th>
                        <th>ID Dueño</th>
                        <th>F.Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map(m => (
                        <tr key={m.idMascota}>
                            <td>{m.nombre}</td>
                            <td>{m.nomRaza}</td>
                            <td>{m.nombreDueno}</td>
                            <td>{m.identificacionDueno}</td>
                            <td>{m.fechaNacimiento || ''}</td>
                            <td>
                                <button onClick={() => handleModalEditar(m)}>Editar</button>
                                <button onClick={() => handleEliminar(m)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button
                    onClick={paginaAnterior}
                    disabled={pagina === 0}
                    className="btn-secundario"
                >
                    Anterior
                </button>
                <span>Página {pagina + 1} de {totalPaginas}</span>
                <button
                    onClick={paginaSiguiente}
                    disabled={pagina >= totalPaginas - 1}
                    className="btn-secundario"
                >
                    Siguiente
                </button>
            </div>

            {showModal && (
                <Modal
                    title={editId ? 'Editar Mascota' : 'Crear Mascota'}
                    onClose={() => setShowModal(false)}
                >
                    <div className="modal-body">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        />

                        <label>Fecha Nacimiento (YYYY-MM-DD):</label>
                        <input
                            type="text"
                            value={form.fechaNacimiento ?? ''}
                            onChange={(e) => setForm({ ...form, fechaNacimiento: e.target.value })}
                        />

                        <label>idRaza:</label>
                        <input
                            type="number"
                            value={form.idRaza}
                            onChange={(e) => setForm({ ...form, idRaza: Number(e.target.value) })}
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn-secundario" onClick={() => setShowModal(false)}>
                            Cancelar
                        </button>
                        <button className="btn-primario" onClick={handleGuardar}>
                            {editId ? 'Guardar Cambios' : 'Crear Mascota'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default GestionMascotasCliente;