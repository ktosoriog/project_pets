// src/pages/GestionServiciosVet.tsx
import { useState, useEffect } from 'react';
import MenuVet from '../components/MenuVet';
import Modal from '../components/Modal';
import { useAlert } from '../context/AlertContext';
import {
    listarTodoServiciosVet,
    listarServiciosVetPaginado,
    aceptarServicio,
    actualizarEstadoServicio,
    Servicio
} from '../services/servicioVetService'; // un wrapper que llame a /api/vet/servicios
import {
    listarHistoriaPorServicio,
    crearHistoria,
    editarHistoria,
    eliminarHistoria,
    HistoriaClinica
} from '../services/historiaClinicaService';
import './usuarios.css';

function GestionServiciosVet() {
    const { showAlert } = useAlert();
    const [lista, setLista] = useState<Servicio[]>([]);
    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [filtro, setFiltro] = useState('');

    // Modal para editar estado
    const [showModalEstado, setShowModalEstado] = useState(false);
    const [servicioEditar, setServicioEditar] = useState<Servicio | null>(null);
    const [nuevoEstado, setNuevoEstado] = useState('');

    // Modal Historia
    const [showModalHistoria, setShowModalHistoria] = useState(false);
    const [historia, setHistoria] = useState<HistoriaClinica[]>([]);
    const [servicioHistoria, setServicioHistoria] = useState<Servicio | null>(null);

    // Modal Crear/Editar Historia
    const [showModalEditarHistoria, setShowModalEditarHistoria] = useState(false);
    const [historiaForm, setHistoriaForm] = useState<HistoriaClinica>({ detalle: '' } as HistoriaClinica);
    const [editHistoriaId, setEditHistoriaId] = useState<number | undefined>(undefined);

    async function cargarServicios() {
        try {
            const resp = await listarServiciosVetPaginado(pagina, filtro);
            setLista(resp.content);
            setTotalPaginas(resp.totalPages);
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    useEffect(() => {
        cargarServicios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagina, filtro]);

    function paginaAnterior() {
        if (pagina > 0) setPagina(pagina - 1);
    }
    function paginaSiguiente() {
        if (pagina < totalPaginas - 1) setPagina(pagina + 1);
    }

    async function handleAceptar(serv: Servicio) {
        if (!confirm(`¿Aceptar el servicio #${serv.idServicio}?`)) return;
        try {
            await aceptarServicio(serv.idServicio!);
            showAlert('Servicio aceptado', 'success');
            cargarServicios();
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    function handleModalEstado(serv: Servicio) {
        setServicioEditar(serv);
        setNuevoEstado(serv.estado || '');
        setShowModalEstado(true);
    }

    async function guardarEstado() {
        if (!servicioEditar) return;
        try {
            await actualizarEstadoServicio(servicioEditar.idServicio!, nuevoEstado);
            showAlert('Estado actualizado', 'success');
            setShowModalEstado(false);
            cargarServicios();
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    function verHistoria(serv: Servicio) {
        setServicioHistoria(serv);
        listarHistoriaPorServicio(serv.idServicio!, 0)
            .then(resp => {
                setHistoria(resp.content);
                setShowModalHistoria(true);
            })
            .catch(err => {
                if (err instanceof Error) showAlert(err.message, 'error');
            });
    }

    function handleCrearHistoria() {
        setHistoriaForm({ detalle: '' } as HistoriaClinica);
        setShowModalEditarHistoria(true);
    }

    async function guardarHistoria() {
        if (!servicioHistoria) return;
        try {
            if (editHistoriaId == null) {
                // crear
                await crearHistoria(servicioHistoria.idServicio!, { detalle: historiaForm.detalle });
                showAlert('Historia creada', 'success');
            } else {
                // editar
                await editarHistoria(editHistoriaId, { detalle: historiaForm.detalle });
                showAlert('Historia editada', 'success');
            }
            setShowModalEditarHistoria(false);
            verHistoria(servicioHistoria); // recargar
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    function editarHistoriaItem(h: HistoriaClinica) {
        setEditHistoriaId(h.idHistoria);
        setHistoriaForm({ detalle: h.detalle });
        setShowModalEditarHistoria(true);
    }

    async function eliminarHistoriaItem(h: HistoriaClinica) {
        if (!confirm(`¿Eliminar la entrada de historia #${h.idHistoria}?`)) return;
        try {
            await eliminarHistoria(h.idHistoria!);
            showAlert('Historia eliminada', 'success');
            if (servicioHistoria) verHistoria(servicioHistoria);
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    async function exportCSV() {
        try {
            const todos = await listarTodoServiciosVet();
            const columnas = ['idServicio', 'nomCliente', 'apeCliente', 'identCliente', 'nomMascota', 'nomTipoServ', 'fechaServ', 'horaServicio', 'estado'];
            const cabeceras = columnas.join(';');
            const filas = todos.map(s =>
                columnas.map(col => String(s[col as keyof Servicio] ?? '')).join(';')
            );
            const csv = [cabeceras, ...filas].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'servicios_vet.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    return (
        <div className="dashboard-container">
            <MenuVet />
            <div className="content">
                <h1>Gestión de Servicios (Veterinario)</h1>
                <div className="top-actions">
                    <input
                        type="text"
                        placeholder="Buscar por cliente, identificación, mascota, servicio..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <button className="btn-secundario" onClick={exportCSV}>Exportar CSV</button>
                </div>

                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Identificación</th>
                            <th>Mascota</th>
                            <th>Servicio</th>
                            <th>Estado</th>
                            <th>Fecha/Hora</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(s => (
                            <tr key={s.idServicio}>
                                <td>{s.nomCliente} {s.apeCliente}</td>
                                <td>{s.identCliente}</td>
                                <td>{s.nomMascota}</td>
                                <td>{s.nomTipoServ}</td>
                                <td>{s.estado}</td>
                                <td>{s.fechaServ} {s.horaServicio}</td>
                                <td>
                                    {s.estado === 'PENDIENTE' && (
                                        <button onClick={() => handleAceptar(s)}>Aceptar</button>
                                    )}
                                    <button onClick={() => handleModalEstado(s)}>Editar Estado</button>
                                    <button onClick={() => verHistoria(s)}>Historia</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination-controls">
                    <button onClick={paginaAnterior} disabled={pagina === 0} className="btn-secundario">Anterior</button>
                    <span>Página {pagina + 1} de {totalPaginas}</span>
                    <button onClick={paginaSiguiente} disabled={pagina >= totalPaginas - 1} className="btn-secundario">Siguiente</button>
                </div>
            </div>

            {/* MODAL EDITAR ESTADO */}
            {showModalEstado && servicioEditar && (
                <Modal title={`Editar estado del servicio #${servicioEditar.idServicio}`} onClose={() => setShowModalEstado(false)}>
                    <div className="modal-body">
                        <label>Estado:</label>
                        <select value={nuevoEstado} onChange={e => setNuevoEstado(e.target.value)}>
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="ACEPTADO">ACEPTADO</option>
                            <option value="EN_CURSO">EN_CURSO</option>
                            <option value="FINALIZADO">FINALIZADO</option>
                            <option value="CANCELADO">CANCELADO</option>
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-secundario" onClick={() => setShowModalEstado(false)}>Cancelar</button>
                        <button className="btn-primario" onClick={guardarEstado}>Guardar</button>
                    </div>
                </Modal>
            )}

            {/* MODAL HISTORIA (Lista) */}
            {showModalHistoria && servicioHistoria && (
                <Modal
                    title={`Historia Clínica - Servicio #${servicioHistoria.idServicio}`}
                    onClose={() => setShowModalHistoria(false)}
                >
                    <div className="modal-body">
                        <button className="btn-primario" onClick={handleCrearHistoria}>Crear Historia</button>
                        {historia.length === 0 ? (
                            <p>No hay historia</p>
                        ) : (
                            <ul>
                                {historia.map(h => (
                                    <li key={h.idHistoria}>
                                        <strong>{h.fechaServ}</strong> - {h.detalle}
                                        <button onClick={() => editarHistoriaItem(h)}>Editar</button>
                                        <button onClick={() => eliminarHistoriaItem(h)}>Eliminar</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => setShowModalHistoria(false)} className="btn-secundario">Cerrar</button>
                    </div>
                </Modal>
            )}

            {/* MODAL CREAR/EDITAR HISTORIA */}
            {showModalEditarHistoria && (
                <Modal
                    title={editHistoriaId ? 'Editar Historia' : 'Crear Historia'}
                    onClose={() => setShowModalEditarHistoria(false)}
                >
                    <div className="modal-body">
                        <label>Detalle:</label>
                        <textarea
                            value={historiaForm.detalle}
                            onChange={e => setHistoriaForm({ ...historiaForm, detalle: e.target.value })}
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn-secundario" onClick={() => setShowModalEditarHistoria(false)}>Cancelar</button>
                        <button className="btn-primario" onClick={guardarHistoria}>
                            {editHistoriaId ? 'Guardar Cambios' : 'Crear'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default GestionServiciosVet;
