import { useEffect, useState } from 'react';
import MenuAdmin from '../components/MenuAdmin';
import { useAlert } from '../context/AlertContext';
import { listarClientesConFiltro, Usuario } from '../services/usuarioService';
import { useNavigate } from 'react-router-dom';
import './usuarios.css';

function GestionClientesAdmin() {
    const [listaClientes, setListaClientes] = useState<Usuario[]>([]);
    const [filtro, setFiltro] = useState('');
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    async function cargarClientes() {
        try {
            const resp = await listarClientesConFiltro(filtro);
            setListaClientes(resp);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    useEffect(() => {
        cargarClientes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtro]);

    function verMascotas(cliente: Usuario) {
        navigate(`/admin/gestion-mascotas-cliente/${cliente.idUsuario}`, { state: { nombreCliente: `${cliente.nombre} ${cliente.apellido}` } });
    }

    return (
        <div className="dashboard-container">
            <MenuAdmin />
            <div className="content">
                <h1>Gestión de Clientes y Mascotas</h1>

                <div className="top-actions">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o identificación..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Identificación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaClientes.map((c) => (
                            <tr key={c.idUsuario}>
                                <td>{c.nombre}</td>
                                <td>{c.apellido}</td>
                                <td>{c.identificacion}</td>
                                <td>
                                    <button onClick={() => verMascotas(c)}>
                                        Mascotas
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GestionClientesAdmin;
