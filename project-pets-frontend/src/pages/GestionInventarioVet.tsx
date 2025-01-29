// src/pages/GestionInventarioVet.tsx
import { useEffect, useState } from 'react';
import { useAlert } from '../context/AlertContext';
import {
    listarInventarioVetPaginado,
    Inventario
} from '../services/inventarioService';
import './usuarios.css';
import MenuVet from '../components/MenuVet';

function GestionInventarioVet() {
    const { showAlert } = useAlert();

    const [pagina, setPagina] = useState(0);
    const [filtro, setFiltro] = useState('');
    const [lista, setLista] = useState<Inventario[]>([]);
    const [totalPaginas, setTotalPaginas] = useState(0);

    useEffect(() => {
        cargarInventario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagina, filtro]);

    async function cargarInventario() {
        try {
            const resp = await listarInventarioVetPaginado(pagina, filtro);
            setLista(resp.content);
            setTotalPaginas(resp.totalPages);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    function handleBuscar() {
        setPagina(0);
        cargarInventario();
    }

    function paginaAnterior() {
        if (pagina > 0) setPagina(pagina - 1);
    }

    function paginaSiguiente() {
        if (pagina < totalPaginas - 1) setPagina(pagina + 1);
    }

    return (
        <div className="dashboard-container">
            <MenuVet />
            <div className="content">
                <h1>Consulta de Inventario</h1>
                <div className="top-actions">
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            placeholder="Buscar por código o nombre..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                        <button className="btn-primario" onClick={handleBuscar}>
                            Buscar
                        </button>
                    </div>
                </div>

                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio U.</th>
                            <th>Cant. Disp.</th>
                            <th>Ingreso</th>
                            <th>Ultimo Ingreso</th>
                            <th>StopMin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map(inv => (
                            <tr key={inv.idInventario}>
                                <td>{inv.codigoProducto}</td>
                                <td>{inv.nomProducto}</td>
                                <td>{inv.descripcion}</td>
                                <td>${Number(inv.precioUnitario).toLocaleString('es-CO', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</td>
                                <td>{inv.canDisponible}</td>
                                <td>{inv.ingreso ?? ''}</td>
                                <td>{inv.salida ?? ''}</td>
                                <td>{inv.stopMin}</td>
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
            </div>
        </div>
    );
}

export default GestionInventarioVet;
