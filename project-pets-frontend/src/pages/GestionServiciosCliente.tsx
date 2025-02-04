import { useState, useEffect } from 'react';
import MenuCliente from '../components/MenuCliente';
import Modal from '../components/Modal';
import { useAlert } from '../context/AlertContext';
import {
    listarServiciosClientePaginado,
    crearServicioCliente,
    cancelarServicioCliente,
    Servicio
} from '../services/servicioClienteService'; // crea un "servicioClienteService"
import { listarMascotasClienteTodo, Mascota } from '../services/mascotaService';
import { listarTipoServiciosTodoCliente, TipoServicio } from '../services/tipoServicioService'; // asume que lo tienes
import { listarHistoriaPorServicio, HistoriaClinica } from '../services/historiaClinicaService';
import './usuarios.css';

function GestionServiciosCliente() {

    const { showAlert } = useAlert();
    const [lista, setLista] = useState<Servicio[]>([]);
    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [filtro, setFiltro] = useState('');

    const [showModalCrear, setShowModalCrear] = useState(false);
    const [formCrear, setFormCrear] = useState<Servicio>({
        idMascota: undefined,
        idTipoServ: undefined,
        fechaServ: '',
        horaServicio: '',
        estado: 'PENDIENTE',
    });

    const [misMascotas, setMisMascotas] = useState<Mascota[]>([]);
    const [tipos, setTipos] = useState<TipoServicio[]>([]);

    // Historia
    const [showHistoria, setShowHistoria] = useState(false);
    const [historia, setHistoria] = useState<HistoriaClinica[]>([]);
    const [servicioSeleccionado, setServicioSeleccionado] = useState<Servicio | null>(null);

    async function cargarServicios() {
        try {
            const resp = await listarServiciosClientePaginado(pagina, filtro);
            setLista(resp.content);
            setTotalPaginas(resp.totalPages);
        } catch (error) {
            if (error instanceof Error) showAlert(error.message, 'error');
        }
    }

    async function cargarMascotasYTipos() {
        try {
            const [mascotas, servicios] = await Promise.all([
                listarMascotasClienteTodo(),        // => Promise<Mascota[]>
                listarTipoServiciosTodoCliente()    // => Promise<TipoServicio[]>
            ]);
            setMisMascotas(mascotas);
            setTipos(servicios);
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    useEffect(() => {
        cargarServicios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagina, filtro]);

    useEffect(() => {
        cargarMascotasYTipos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function paginaAnterior() {
        if (pagina > 0) setPagina(pagina - 1);
    }
    function paginaSiguiente() {
        if (pagina < totalPaginas - 1) setPagina(pagina + 1);
    }

    function handleModalCrear() {
        setFormCrear({
            idMascota: undefined,
            idTipoServ: undefined,
            fechaServ: '',
            horaServicio: '',
            estado: 'PENDIENTE'
        });
        setShowModalCrear(true);
    }

    async function handleCrearServicio() {
        if (!formCrear.idMascota || !formCrear.idTipoServ) {
            showAlert('Debes seleccionar mascota y tipo de servicio', 'error');
            return;
        }
        if (!formCrear.fechaServ) {
            showAlert('Debes seleccionar fecha', 'error');
            return;
        }
        if (!formCrear.horaServicio) {
            showAlert('Debes seleccionar hora', 'error');
            return;
        }
        try {
            await crearServicioCliente(formCrear);
            showAlert('Servicio creado con éxito', 'success');
            setShowModalCrear(false);
            cargarServicios();
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    async function handleCancelarServicio(s: Servicio) {
        if (!confirm(`Cancelar el servicio #${s.idServicio}?`)) return;
        try {
            await cancelarServicioCliente(s.idServicio!);
            showAlert('Servicio cancelado', 'success');
            cargarServicios();
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }

    // Ver historia en modo lectura
    async function verHistoria(s: Servicio) {
        setServicioSeleccionado(s);
        try {
            // Llamas a un endpoint: GET /api/historia/{idServicio}?pagina=0
            const resp = await listarHistoriaPorServicio(s.idServicio!);
            setHistoria(resp.content);
            setShowHistoria(true);
        } catch (e) {
            if (e instanceof Error) showAlert(e.message, 'error');
        }
    }


    return (
        <div className="dashboard-container">
            <MenuCliente />
            <div className="content">
                <h1>Mis Servicios</h1>
                <div className="top-actions">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <button className="btn-primario" onClick={handleModalCrear}>Crear Servicio</button>

                </div>

                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Mascota</th>
                            <th>Servicio</th>
                            <th>Veterinario</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(s => (
                            <tr key={s.idServicio}>
                                <td>{s.nomMascota}</td>
                                <td>{s.nomTipoServ}</td>
                                <td>{s.nomVet} {s.apeVet}</td>
                                <td>{s.estado}</td>
                                <td>{s.fechaServ || ''}</td>
                                <td>{s.horaServicio || ''}</td>
                                <td>
                                    {s.estado !== 'CANCELADO' && s.estado !== 'FINALIZADO' && (
                                        <button onClick={() => handleCancelarServicio(s)}>Cancelar</button>
                                    )}
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

            {/* Modal CREAR SERVICIO */}
            {showModalCrear && (
                <Modal title="Crear Servicio" onClose={() => setShowModalCrear(false)}>
                    <div className="modal-body">
                        <label>Mascota:</label>
                        <select
                            value={formCrear.idMascota || 0}
                            onChange={e => setFormCrear({ ...formCrear, idMascota: Number(e.target.value) })}
                        >
                            <option value={0}>--Seleccione--</option>
                            {misMascotas.map((m) => (
                                <option key={m.idMascota} value={m.idMascota}>
                                    {m.nombre}
                                </option>
                            ))}


                        </select>

                        <label>Tipo de Servicio:</label>
                        <select
                            value={formCrear.idTipoServ || 0}
                            onChange={e => setFormCrear({ ...formCrear, idTipoServ: Number(e.target.value) })}
                        >
                            <option value={0}>--Seleccione--</option>
                            {tipos.map((t) => (
                                <option key={t.idTipoServ} value={t.idTipoServ}>
                                    {t.nombre} - ${t.precio}
                                </option>
                            ))}
                        </select>

                        <label>Fecha (YYYY-MM-DD):</label>
                        <input
                            type="date"
                            value={formCrear.fechaServ ?? ''}
                            onChange={e => setFormCrear({ ...formCrear, fechaServ: e.target.value })}
                            min={new Date().toISOString().split('T')[0]}
                        />

                        <label>Hora (8 AM - 8 PM):</label>
                        <select
                            value={formCrear.horaServicio ?? ''}
                            onChange={e => setFormCrear({ ...formCrear, horaServicio: e.target.value })}
                        >
                            <option value="">--Seleccione--</option>
                            {Array.from({ length: 13 }, (_, i) => 8 + i).map(h => {
                                const hh = h.toString().padStart(2, '0');
                                return (
                                    <option key={h} value={`${hh}:00`}>{hh}:00</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-secundario" onClick={() => setShowModalCrear(false)}>Cancelar</button>
                        <button className="btn-primario" onClick={handleCrearServicio}>Crear</button>
                    </div>
                </Modal>
            )}

            {/* Modal de HISTORIA (solo lectura) */}
            {showHistoria && (
                <Modal title={`Historia Clínica del servicio #${servicioSeleccionado?.idServicio}`} onClose={() => setShowHistoria(false)}>
                    <div className="modal-body">
                        {historia.length === 0 ? (
                            <p>No hay registros de historia.</p>
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
                        <button className="btn-primario" onClick={() => setShowHistoria(false)}>Cerrar</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default GestionServiciosCliente;
