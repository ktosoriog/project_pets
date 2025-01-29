import { useEffect, useState } from 'react';
import { useAlert } from '../context/AlertContext';
import {
    listarTipoServiciosPaginado,
    listarTipoServiciosTodo,
    crearTipoServicio,
    actualizarTipoServicio,
    eliminarTipoServicio,
    TipoServicio
} from '../services/tipoServicioService';
import MenuAdmin from '../components/MenuAdmin';
import Modal from '../components/Modal';
import './usuarios.css';

function GestionTipoServicio() {

    const { showAlert } = useAlert();
    const [pagina, setPagina] = useState(0);
    const [filtro, setFiltro] = useState('');
    const [lista, setLista] = useState<TipoServicio[]>([]);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [tsForm, setTsForm] = useState<TipoServicio>({
        nombre: '',
        precio: 0,
        descripcion: ''
    });

    useEffect(() => {
        cargarTipoServicios();
    }, [pagina, filtro]);

    async function cargarTipoServicios() {
        try {
            const resp = await listarTipoServiciosPaginado(pagina, filtro);
            setLista(resp.content);
            setTotalPaginas(resp.totalPages);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    function handleAbrirModalCrear() {
        setEditandoId(null);
        setTsForm({ nombre: '', precio: 0, descripcion: '' });
        setShowModal(true);
    }

    function handleAbrirModalEditar(ts: TipoServicio) {
        setEditandoId(ts.idTipoServ ?? null);
        setTsForm({
            nombre: ts.nombre,
            precio: ts.precio,
            descripcion: ts.descripcion
        });
        setShowModal(true);
    }

    function handleCerrarModal() {
        setShowModal(false);
    }

    async function handleGuardar() {
        if (!tsForm.nombre.trim() || tsForm.precio <= 0 || !tsForm.descripcion.trim()) {
            showAlert('Todos los campos (Nombre, Precio, Descripción) son obligatorios', 'error');
            return;
        }
        try {
            if (editandoId === null) {
                // Crear
                const creado = await crearTipoServicio(tsForm);
                showAlert(`Tipo de Servicio creado: ${creado.nombre}`, 'success');
            } else {
                // Actualizar
                await actualizarTipoServicio(editandoId, tsForm);
                showAlert('Tipo de Servicio actualizado', 'success');
            }
            setShowModal(false);
            cargarTipoServicios();
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    async function handleEliminar(ts: TipoServicio) {
        if (!ts.idTipoServ) return;
        if (!confirm(`¿Eliminar el servicio "${ts.nombre}"?`)) return;
        try {
            await eliminarTipoServicio(ts.idTipoServ);
            showAlert('Tipo de Servicio eliminado', 'success');
            cargarTipoServicios();
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    async function exportarCSV() {
        try {
            const todos = await listarTipoServiciosTodo();
            const columnas = ['nombre', 'precio', 'descripcion'];
            const cabeceras = columnas.join(';');
            const filas = todos.map(t => {
                return columnas.map(col => String(t[col as keyof TipoServicio] ?? '')).join(';');
            });
            const csv = [cabeceras, ...filas].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'tipos_servicio.csv');
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
        if (pagina > 0) {
            setPagina(pagina - 1);
        }
    }

    function paginaSiguiente() {
        if (pagina < totalPaginas - 1) {
            setPagina(pagina + 1);
        }
    }

    return (
        <div className="dashboard-container">
            <MenuAdmin />
            <div className="content">
                <h1>Gestión de Tipos de Servicio</h1>

                <div className="top-actions">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o descripción..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <button onClick={handleAbrirModalCrear} className="btn-primario">Crear TipoServicio</button>
                    <button onClick={exportarCSV} className="btn-secundario">Exportar CSV</button>
                </div>

                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(ts => (
                            <tr key={ts.idTipoServ}>
                                <td>{ts.nombre}</td>
                                <td>${Number(ts.precio).toLocaleString('es-CO', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</td>
                                <td>{ts.descripcion}</td>
                                <td>
                                    <button onClick={() => handleAbrirModalEditar(ts)}>Editar</button>
                                    <button onClick={() => handleEliminar(ts)}>Eliminar</button>
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
                    title={editandoId ? 'Editar Tipo de Servicio' : 'Crear Tipo de Servicio'}
                    onClose={handleCerrarModal}
                >
                    <div className="modal-body">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={tsForm.nombre}
                            onChange={(e) => setTsForm({ ...tsForm, nombre: e.target.value })}
                        />

                        <label>Precio:</label>
                        <input
                            type="number"
                            step="0.01"
                            value={tsForm.precio}
                            onChange={(e) => setTsForm({ ...tsForm, precio: Number(e.target.value) })}
                        />

                        <label>Descripción:</label>
                        <input
                            type="text"
                            value={tsForm.descripcion}
                            onChange={(e) => setTsForm({ ...tsForm, descripcion: e.target.value })}
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn-secundario" onClick={handleCerrarModal}>
                            Cancelar
                        </button>
                        <button className="btn-primario" onClick={handleGuardar}>
                            {editandoId ? 'Guardar Cambios' : 'Crear Servicio'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default GestionTipoServicio;
