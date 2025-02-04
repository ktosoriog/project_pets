import { useEffect, useState } from 'react';
import MenuAdmin from '../components/MenuAdmin';
import { useAlert } from '../context/AlertContext';
import {
    listarServiciosAdminPaginado,
    listarServiciosAdminTodo,
    Servicio
} from '../services/servicioAdminService';
import {
    listarHistoriaPorServicio,
    HistoriaClinica
} from '../services/historiaClinicaService';
import Modal from '../components/Modal';
import './usuarios.css';

function GestionServiciosAdmin() {

    const { showAlert } = useAlert();
    const [lista, setLista] = useState<Servicio[]>([]);
    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [filtro, setFiltro] = useState('');
    const [showModalHistoria, setShowModalHistoria] = useState(false);
    const [historia, setHistoria] = useState<HistoriaClinica[]>([]);
    const [servicioHistoria, setServicioHistoria] = useState<Servicio | null>(null);

    async function cargarServicios() {
        try {
            const resp = await listarServiciosAdminPaginado(pagina, filtro);
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

    async function verHistoria(s: Servicio) {
        setServicioHistoria(s);
        try {
            const resp = await listarHistoriaPorServicio(s.idServicio!);
            setHistoria(resp.content);
            setShowModalHistoria(true);
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    async function exportCSV() {
        try {
            const todos = await listarServiciosAdminTodo();
            const columnas = ['idServicio', 'nomCliente', 'apeCliente', 'nomMascota', 'nomTipoServ', 'fechaServ', 'horaServicio', 'estado'];
            const cabeceras = columnas.join(';');
            const filas = todos.map(s =>
                columnas.map(col => String(s[col as keyof Servicio] ?? '')).join(';')
            );
            const csv = [cabeceras, ...filas].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'servicios_admin.csv');
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
                <h1>Gestión de Servicios (ADMIN)</h1>
                <div className="top-actions">
                    <input
                        type="text"
                        placeholder="Buscar por cliente, mascota, vet, servicio..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <button className="btn-secundario" onClick={exportCSV}>Exportar CSV</button>
                </div>

                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Mascota</th>
                            <th>Servicio</th>
                            <th>Vet</th>
                            <th>Estado</th>
                            <th>Fecha/Hora</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(s => (
                            <tr key={s.idServicio}>
                                <td>{s.nomCliente} {s.apeCliente}</td>
                                <td>{s.nomMascota}</td>
                                <td>{s.nomTipoServ}</td>
                                <td>{s.nomVet} {s.apeVet}</td>
                                <td>{s.estado}</td>
                                <td>{s.fechaServ} {s.horaServicio}</td>
                                <td>
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

            {/* Modal Historia */}
            {showModalHistoria && servicioHistoria && (
                <Modal
                    title={`Historia Clínica - Servicio #${servicioHistoria.idServicio}`}
                    onClose={() => setShowModalHistoria(false)}
                >
                    <div className="modal-body">
                        {historia.length === 0 ? (
                            <p>No hay historia</p>
                        ) : (
                            <ul>
                                {historia.map(h => (
                                    <li key={h.idHistoria}>
                                        <strong>{h.fechaServ}</strong> - {h.detalle}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => setShowModalHistoria(false)} className="btn-primario">Cerrar</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default GestionServiciosAdmin;
