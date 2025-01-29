import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import MenuAdmin from '../components/MenuAdmin';
import MenuCliente from '../components/MenuCliente';
import Modal from '../components/Modal';
import './usuarios.css';

import { listarMascotasAdminPaginado, listarMascotasAdminTodo, Mascota, crearMascotaAdmin, actualizarMascotaAdmin, eliminarMascotaAdmin, listarMascotasClientePaginado, crearMascotaCliente, actualizarMascotaCliente, eliminarMascotaCliente } from '../services/mascotaService';
import { listarEspecies, listarRazasPorEspecie, Especie, Raza } from '../services/catalogoService';
import { useAlert } from '../context/AlertContext';
import { getRol, getNombre } from '../services/authService';

function GestionMascotasPorCliente() {

    const { showAlert } = useAlert();
    const { idCliente } = useParams<{ idCliente: string }>();
    const idDueno = Number(idCliente) || 0;
    const location = useLocation();
    const nombreCliente = location.state?.nombreCliente || getNombre();
    const rolUsuario = getRol(); // "ADMINISTRADOR" o "CLIENTE"
    const [mascotas, setMascotas] = useState<Mascota[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const [form, setForm] = useState<Mascota>({
        nombre: '',
        fechaNacimiento: '',
        idRaza: 0,
        idDueno: idDueno,
    });

    const [especies, setEspecies] = useState<Especie[]>([]);
    const [razas, setRazas] = useState<Raza[]>([]);
    const [idEspecieSeleccionada, setIdEspecieSeleccionada] = useState<number | null>(null);

    // Paginación
    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        cargarEspecies();
        cargarMascotas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagina, filtro]);

    async function cargarMascotas() {
        try {
            if (rolUsuario === 'ADMINISTRADOR') {
                // Administrador: listar mascotas del cliente con paginación
                const resp = await listarMascotasAdminPaginado(pagina, filtro);
                // Filtrar las que correspondan al cliente
                const filtradas = resp.content.filter(m => m.idDueno === idDueno);
                setMascotas(filtradas);
                setTotalPaginas(resp.totalPages);
            } else if (rolUsuario === 'CLIENTE') {
                // Cliente: listar sus propias mascotas con paginación
                const resp = await listarMascotasClientePaginado(pagina, filtro);
                setMascotas(resp.content);
                setTotalPaginas(resp.totalPages);
            }
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    async function cargarEspecies() {
        try {
            const resp = await listarEspecies();
            setEspecies(resp);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    async function handleCambiarEspecie(e: React.ChangeEvent<HTMLSelectElement>) {
        const idEsp = Number(e.target.value);
        setIdEspecieSeleccionada(idEsp);
        setForm({ ...form, idRaza: 0 });
        try {
            const resp = await listarRazasPorEspecie(idEsp);
            setRazas(resp);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    function handleModalCrear() {
        setEditId(null);
        setIdEspecieSeleccionada(null);
        setRazas([]);
        setForm({
            nombre: '',
            fechaNacimiento: '',
            idRaza: 0,
            idDueno: idDueno,
        });
        setShowModal(true);
    }

    function handleModalEditar(m: Mascota) {
        setEditId(m.idMascota ?? null);
        setForm({
            nombre: m.nombre,
            fechaNacimiento: m.fechaNacimiento ?? '',
            idRaza: m.idRaza,
            idDueno: m.idDueno,
        });
        // Buscamos la especie a partir de m.idEspecie
        if (m.idEspecie) {
            setIdEspecieSeleccionada(m.idEspecie);
            listarRazasPorEspecie(m.idEspecie).then(resp => {
                setRazas(resp);
            });
        } else {
            setIdEspecieSeleccionada(null);
            setRazas([]);
        }
        setShowModal(true);
    }

    async function handleGuardar() {
        if (!form.nombre.trim()) {
            showAlert('El nombre de la mascota es obligatorio', 'error');
            return;
        }
        if (form.fechaNacimiento && !/^\d{4}-\d{2}-\d{2}$/.test(form.fechaNacimiento)) {
            showAlert('Formato de fecha inválido. Debe ser YYYY-MM-DD (ej: 2024-12-31)', 'error');
            return;
        }
        if (!form.idRaza) {
            showAlert('Debes seleccionar una raza', 'error');
            return;
        }

        try {
            if (rolUsuario === 'ADMINISTRADOR') {
                if (editId == null) {
                    // crear
                    await crearMascotaAdmin(form);
                    showAlert('Mascota creada con éxito', 'success');
                } else {
                    await actualizarMascotaAdmin(editId, form);
                    showAlert('Mascota actualizada con éxito', 'success');
                }
            } else if (rolUsuario === 'CLIENTE') {
                if (editId == null) {
                    // crear
                    await crearMascotaCliente(form);
                    showAlert('Mascota creada con éxito', 'success');
                } else {
                    await actualizarMascotaCliente(editId, form);
                    showAlert('Mascota actualizada con éxito', 'success');
                }
            }
            setShowModal(false);
            cargarMascotas();
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    async function handleEliminar(m: Mascota) {
        if (!m.idMascota) return;
        if (!confirm(`¿Eliminar la mascota "${m.nombre}"?`)) return;
        try {
            if (rolUsuario === 'ADMINISTRADOR') {
                await eliminarMascotaAdmin(m.idMascota);
            } else if (rolUsuario === 'CLIENTE') {
                await eliminarMascotaCliente(m.idMascota);
            }
            showAlert('Mascota eliminada', 'success');
            cargarMascotas();
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    async function exportCSV() {
        try {
            let mascotasAExportar: Mascota[] = [];
            if (rolUsuario === 'ADMINISTRADOR') {
                // Administrador: exportar las mascotas filtradas
                const resp = await listarMascotasAdminTodo();
                mascotasAExportar = resp.filter(m => m.idDueno === idDueno);
            } else if (rolUsuario === 'CLIENTE') {
                // Cliente: exportar sus propias mascotas
                mascotasAExportar = mascotas;
            }
            const columnas = ['nombre', 'fechaNacimiento', 'nomEspecie', 'nomRaza', 'nombreDueno', 'identificacionDueno'];
            const cabeceras = columnas.join(';');
            const filas = mascotasAExportar.map(m =>
                columnas.map(col => String(m[col as keyof Mascota] ?? '')).join(';')
            );
            const csv = [cabeceras, ...filas].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `mascotas_cliente_${nombreCliente}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    function paginaAnterior() {
        if (pagina > 0) setPagina(pagina - 1);
    }
    function paginaSiguiente() {
        if (pagina < totalPaginas - 1) setPagina(pagina + 1);
    }

    return (
        <div className="dashboard-container">
            {rolUsuario === 'ADMINISTRADOR' ? <MenuAdmin /> : <MenuCliente />}
            <div className="content">
                <h1>
                    {rolUsuario === 'ADMINISTRADOR'
                        ? `Mascotas del Cliente ${nombreCliente}`
                        : 'Mis Mascotas'
                    }
                </h1>
                {rolUsuario === 'ADMINISTRADOR' && (
                    <div style={{ marginBottom: '1rem' }}>
                        <Link to="/admin/clientes" className="btn-secundario">Volver a Clientes</Link>
                    </div>
                )}
                <div className="top-actions">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, especie o raza..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <button className="btn-primario" onClick={handleModalCrear}>Crear Mascota</button>
                    <button className="btn-secundario" onClick={exportCSV}>Exportar CSV</button>
                </div>

                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Especie</th>
                            <th>Raza</th>
                            <th>F.Nacimiento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mascotas.map(m => (
                            <tr key={m.idMascota}>
                                <td>{m.nombre}</td>
                                <td>{m.nomEspecie}</td>
                                <td>{m.nomRaza}</td>
                                <td>{m.fechaNacimiento || ''}</td>
                                <td>
                                    <button onClick={() => handleModalEditar(m)}>Editar</button>
                                    <button onClick={() => handleEliminar(m)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Paginación */}
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
                            onChange={e => setForm({ ...form, nombre: e.target.value })}
                        />

                        <label>Fecha Nacimiento (YYYY-MM-DD):</label>
                        <input
                            type="text"
                            value={form.fechaNacimiento ?? ''}
                            onChange={e => setForm({ ...form, fechaNacimiento: e.target.value })}
                        />

                        <label>Especie:</label>
                        <select
                            value={idEspecieSeleccionada ?? 0}
                            onChange={handleCambiarEspecie}
                        >
                            <option value={0}>--Seleccione--</option>
                            {especies.map(e => (
                                <option key={e.idEspecie} value={e.idEspecie}>
                                    {e.nomEspecie}
                                </option>
                            ))}
                        </select>

                        <label>Raza:</label>
                        <select
                            value={form.idRaza}
                            onChange={e => setForm({ ...form, idRaza: Number(e.target.value) })}
                        >
                            <option value={0}>--Seleccione--</option>
                            {razas.map(r => (
                                <option key={r.idRaza} value={r.idRaza}>
                                    {r.nomRaza}
                                </option>
                            ))}
                        </select>
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

export default GestionMascotasPorCliente;
