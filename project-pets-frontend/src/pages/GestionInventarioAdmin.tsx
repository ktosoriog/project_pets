// src/pages/GestionInventarioAdmin.tsx
import { useEffect, useState } from 'react';
import MenuAdmin from '../components/MenuAdmin';
import { useAlert } from '../context/AlertContext';
import {
    listarInventarioAdminPaginado,
    listarInventarioAdminTodo,
    crearInventarioAdmin,
    actualizarInventarioAdmin,
    eliminarInventarioAdmin,
    Inventario
} from '../services/inventarioService';
import Modal from '../components/Modal';
import './usuarios.css'; // Reutiliza estilos

function GestionInventarioAdmin() {
    const { showAlert } = useAlert();

    const [pagina, setPagina] = useState(0);
    const [filtro, setFiltro] = useState('');
    const [lista, setLista] = useState<Inventario[]>([]);
    const [totalPaginas, setTotalPaginas] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const [form, setForm] = useState<Inventario>({
        codigoProducto: '',
        nomProducto: '',
        precioUnitario: 0,
        descripcion: '',
        canDisponible: 0,
        ingreso: '',
        salida: '',
        stopMin: 0
    });

    useEffect(() => {
        cargarInventario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagina, filtro]);

    async function cargarInventario() {
        try {
            const resp = await listarInventarioAdminPaginado(pagina, filtro);
            setLista(resp.content);
            setTotalPaginas(resp.totalPages);
        } catch (error) {
            if (error instanceof Error) showAlert(error.message, 'error');
        }
    }

    function handleModalCrear() {
        setEditId(null);
        setForm({
            codigoProducto: '',
            nomProducto: '',
            precioUnitario: 0,
            descripcion: '',
            canDisponible: 0,
            ingreso: '',
            salida: '',
            stopMin: 0
        });
        setShowModal(true);
    }

    function handleModalEditar(item: Inventario) {
        setEditId(item.idInventario ?? null);
        setForm({ ...item });
        setShowModal(true);
    }

    async function handleGuardar() {
        if (!form.codigoProducto.trim()) {
            showAlert('Código de producto es obligatorio.', 'error');
            return;
        }
        if (!form.nomProducto.trim()) {
            showAlert('Nombre de producto es obligatorio.', 'error');
            return;
        }
        if (form.canDisponible < 0) {
            showAlert('Cantidad disponible no puede ser negativa.', 'error');
            return;
        }
        if (form.stopMin > form.canDisponible) {
            showAlert('Stock mínimo no puede ser mayor que la cantidad disponible.', 'error');
            return;
        }

        try {
            if (editId == null) {
                // Crear
                await crearInventarioAdmin(form);
                showAlert('Producto creado en inventario', 'success');
            } else {
                // Actualizar
                await actualizarInventarioAdmin(editId, form);
                showAlert('Producto actualizado en inventario', 'success');
            }
            setShowModal(false);
            cargarInventario();
        } catch (error) {
            if (error instanceof Error) showAlert(error.message, 'error');
        }
    }

    async function handleEliminar(item: Inventario) {
        if (!item.idInventario) return;
        if (!confirm(`¿Eliminar "${item.nomProducto}" del inventario?`)) return;
        try {
            await eliminarInventarioAdmin(item.idInventario);
            showAlert('Registro eliminado', 'success');
            cargarInventario();
        } catch (error) {
            if (error instanceof Error) showAlert(error.message, 'error');
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
            const todos = await listarInventarioAdminTodo(filtro);
            const columnas = [
                'idInventario',
                'codigoProducto',
                'nomProducto',
                'precioUnitario',
                'descripcion',
                'canDisponible',
                'ingreso',
                'salida',
                'stopMin'
            ];
            const cabeceras = columnas.join(';');
            const filas = todos.map(inv =>
                columnas.map(col => String(inv[col as keyof Inventario] ?? '')).join(';')
            );
            const csv = [cabeceras, ...filas].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'inventario_admin.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            if (error instanceof Error) showAlert(error.message, 'error');
        }
    }

    return (
        <div className="dashboard-container">
            <MenuAdmin />
            <div className="content">
                <h1>Gestión de Inventario</h1>
                <div className="top-actions">

                    <input
                        type="text"
                        placeholder="Buscar por código o nombre..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />


                    <button className="btn-primario" onClick={handleModalCrear}>Crear</button>

                    <button className="btn-secundario" onClick={exportCSV}>Exportar CSV</button>
                </div>

                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio U.</th>
                            <th>Cant. Disp</th>
                            <th>Ingreso</th>
                            <th>Ultimo Ingreso</th>
                            <th>StockMin</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((item) => (
                            <tr key={item.idInventario}>
                                <td>{item.codigoProducto}</td>
                                <td>{item.nomProducto}</td>
                                <td>{item.descripcion}</td>


                                <td>${Number(item.precioUnitario).toLocaleString('es-CO', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</td>

                                <td>{item.canDisponible}</td>
                                <td>{item.ingreso ?? ''}</td>
                                <td>{item.salida ?? ''}</td>
                                <td>{item.stopMin}</td>
                                <td>
                                    <button onClick={() => handleModalEditar(item)}>Editar</button>
                                    <button onClick={() => handleEliminar(item)}>Eliminar</button>
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
                    <button
                        onClick={paginaSiguiente}
                        disabled={pagina >= totalPaginas - 1}
                        className="btn-secundario"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            {showModal && (
                <Modal
                    title={editId ? 'Editar Inventario' : 'Crear Inventario'}
                    onClose={() => setShowModal(false)}
                >
                    <div className="modal-body">
                        <label>Código Producto:</label>
                        <input
                            type="text"
                            value={form.codigoProducto}
                            onChange={e => setForm({ ...form, codigoProducto: e.target.value })}
                        />

                        <label>Nombre Producto:</label>
                        <input
                            type="text"
                            value={form.nomProducto}
                            onChange={e => setForm({ ...form, nomProducto: e.target.value })}
                        />

                        <label>Precio Unitario:</label>
                        <input
                            type="number"
                            step="0.01"
                            value={form.precioUnitario ?? 0}
                            onChange={e => setForm({ ...form, precioUnitario: Number(e.target.value) })}
                        />




                        <label>Descripción:</label>
                        <input
                            type="text"
                            value={form.descripcion ?? ''}
                            onChange={e => setForm({ ...form, descripcion: e.target.value })}
                        />

                        <label>Cantidad Disponible:</label>
                        <input
                            type="number"
                            value={form.canDisponible}
                            onChange={e => setForm({ ...form, canDisponible: Number(e.target.value) })}
                        />

                        <label>Stock Mínimo:</label>
                        <input
                            type="number"
                            value={form.stopMin}
                            onChange={e => setForm({ ...form, stopMin: Number(e.target.value) })}
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn-secundario" onClick={() => setShowModal(false)}>
                            Cancelar
                        </button>
                        <button className="btn-primario" onClick={handleGuardar}>
                            {editId ? 'Guardar Cambios' : 'Crear'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default GestionInventarioAdmin;
