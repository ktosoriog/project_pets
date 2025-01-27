import { useEffect, useState } from 'react';
import {
    listarMascotasAdminPaginado,
    listarMascotasAdminTodo,
    crearMascotaAdmin,
    actualizarMascotaAdmin,
    eliminarMascotaAdmin,
    Mascota
} from '../services/mascotaService';
import { useAlert } from '../context/AlertContext';
import MenuAdmin from '../components/MenuAdmin';
import Modal from '../components/Modal';
import './usuarios.css';

function GestionMascotasAdmin() {
    const { showAlert } = useAlert();
    const [pagina, setPagina] = useState(0);
    const [lista, setLista] = useState<Mascota[]>([]);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [form, setForm] = useState<Mascota>({
        nombre: '',
        fechaNacimiento: '',
        idRaza: 1,
        idDueno: 0, // ID del dueño (usuario)
    });

    useEffect(() => {
        cargarMascotas();
    }, [pagina]);

    async function cargarMascotas() {
        try {
            const resp = await listarMascotasAdminPaginado(pagina);
            setLista(resp.content);
            setTotalPaginas(resp.totalPages);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    function handleModalCrear() {
        setEditId(null);
        setForm({ nombre: '', fechaNacimiento: '', idRaza: 1, idDueno: 0 });
        setShowModal(true);
    }

    function handleModalEditar(m: Mascota) {
        setEditId(m.idMascota ?? null);
        setForm({
            nombre: m.nombre,
            fechaNacimiento: m.fechaNacimiento,
            idRaza: m.idRaza,
            idDueno: m.idDueno ?? 0,
        });
        setShowModal(true);
    }

    async function handleGuardar() {
        if (!form.nombre.trim()) {
            showAlert('Nombre es obligatorio', 'error');
            return;
        }
        if (!form.idDueno) {
            showAlert('Debes indicar el idDueno (dueño).', 'error');
            return;
        }
        try {
            if (editId == null) {
                await crearMascotaAdmin(form);
                showAlert('Mascota creada', 'success');
            } else {
                await actualizarMascotaAdmin(editId, form);
                showAlert('Mascota actualizada', 'success');
            }
            setShowModal(false);
            cargarMascotas();
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    async function handleEliminar(m: Mascota) {
        if (!m.idMascota) return;
        if (!confirm(`Eliminar la mascota "${m.nombre}"?`)) return;
        try {
            await eliminarMascotaAdmin(m.idMascota);
            showAlert('Mascota eliminada', 'success');
            cargarMascotas();
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    function paginaAnterior() {
        if (pagina > 0) setPagina(pagina - 1);
    }
    function paginaSiguiente() {
        if (pagina < totalPaginas - 1) setPagina(pagina + 1);
    }

    async function exportCSV() {
        try {
            const todos = await listarMascotasAdminTodo();
            const columnas = ['idMascota', 'nombre', 'fechaNacimiento', 'idRaza', 'idDueno', 'nombreDueno', 'identificacionDueno'];
            const cabeceras = columnas.join(';');
            const filas = todos.map(m =>
                columnas.map(col => String(m[col as keyof Mascota] ?? '')).join(';')
            );
            const csv = [cabeceras, ...filas].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'mascotas_admin.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    return (
        <div className="dashboard-container">
            <MenuAdmin />
            <div className="content">
                <h1>Gestión de Mascotas (ADMIN)</h1>
                <div className="top-actions">
                    <button onClick={handleModalCrear} className="btn-primario">Crear Mascota</button>
                    <button onClick={exportCSV} className="btn-secundario">Exportar CSV</button>
                </div>

                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Raza</th>
                            <th>Dueño</th>
                            <th>ID Dueño</th>
                            <th>F.Nac.</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((m) => (
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
                    <button onClick={paginaAnterior} disabled={pagina === 0} className="btn-secundario">
                        Anterior
                    </button>
                    <span>Página {pagina + 1} de {totalPaginas}</span>
                    <button onClick={paginaSiguiente} disabled={pagina >= totalPaginas - 1} className="btn-secundario">
                        Siguiente
                    </button>
                </div>
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
                        <label>idDueno (Cliente):</label>
                        <input
                            type="number"
                            value={form.idDueno ?? 0}
                            onChange={(e) => setForm({ ...form, idDueno: Number(e.target.value) })}
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

export default GestionMascotasAdmin;