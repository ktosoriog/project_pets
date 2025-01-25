import { useEffect, useState } from 'react';
import { useAlert } from '../context/AlertContext';
import {
    listarUsuariosPaginado,
    listarUsuariosTodo,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    Usuario,
} from '../services/usuarioService';

import MenuAdmin from '../components/MenuAdmin';
import Modal from '../components/Modal';
import './usuarios.css';

function GestionUsuarios() {

    const { showAlert } = useAlert();
    const [pagina, setPagina] = useState(0);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [usuarioForm, setUsuarioForm] = useState<Usuario>({
        nombre: '',
        apellido: '',
        identificacion: '',
        direccion: '',
        correo: '',
        telefono: '',
        clave: '',
        idRol: 3,
    });
    const roles = [
        { id: 1, name: 'ADMINISTRADOR' },
        { id: 2, name: 'VETERINARIO' },
        { id: 3, name: 'CLIENTE' },
    ];

    // Cargar usuarios cada vez que cambie "pagina"
    useEffect(() => {
        cargarUsuarios();
    }, [pagina]);

    async function cargarUsuarios() {
        try {
            const resp = await listarUsuariosPaginado(pagina);
            setUsuarios(resp.content);
            setTotalPaginas(resp.totalPages);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    function handleAbrirModalCrear() {
        setEditandoId(null);
        setUsuarioForm({
            nombre: '',
            apellido: '',
            identificacion: '',
            direccion: '',
            correo: '',
            telefono: '',
            clave: '',
            idRol: 3,
        });
        setShowModal(true);
    }

    function handleAbrirModalEditar(u: Usuario) {
        setEditandoId(u.idUsuario ?? null);
        setUsuarioForm({
            ...u,
            clave: '', // no sobreescribir
        });
        setShowModal(true);
    }

    function handleCerrarModal() {
        setShowModal(false);
    }

    async function handleGuardar() {
        if (
            !usuarioForm.nombre?.trim() ||
            !usuarioForm.apellido?.trim() ||
            !usuarioForm.identificacion?.trim() ||
            !usuarioForm.direccion?.trim() ||
            !usuarioForm.correo?.trim() ||
            !usuarioForm.telefono?.trim() ||
            (!editandoId && !usuarioForm.clave?.trim())
        ) {
            showAlert('Todos los campos son obligatorios', 'error');
            return;
        }
        try {
            if (editandoId === null) {
                const creado = await crearUsuario(usuarioForm);
                showAlert(`Usuario creado: ${creado.nombre}`, 'success');
            } else {
                await actualizarUsuario(editandoId, usuarioForm);
                showAlert('Usuario actualizado', 'success');
            }
            setShowModal(false);
            cargarUsuarios();
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    async function handleEliminar(u: Usuario) {
        if (!u.idUsuario) return;
        if (!confirm(`¿Eliminar a ${u.nombre} (${u.correo})?`)) return;
        try {
            await eliminarUsuario(u.idUsuario);
            showAlert('Usuario eliminado', 'success');
            cargarUsuarios();
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    async function exportarCSV() {
        try {
            const todos = await listarUsuariosTodo();
            const columnas = ['idUsuario', 'nombre', 'apellido', 'correo', 'nombreRol'];
            const cabeceras = columnas.join(';');
            const filas = todos.map(u => {
                return columnas
                    .map(col => String(u[col as keyof Usuario] ?? ''))
                    .join(';');
            });
            const csv = [cabeceras, ...filas].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'usuarios.csv');
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
                <h1>Gestión de Usuarios</h1>

                <div className="top-actions">
                    <button onClick={handleAbrirModalCrear} className="btn-primario">Crear Usuario</button>
                    <button onClick={exportarCSV} className="btn-secundario">Exportar CSV</button>
                </div>

                <table className="usuarios-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((u) => (
                            <tr key={u.idUsuario}>
                                <td>{u.idUsuario}</td>
                                <td>{u.nombre}</td>
                                <td>{u.apellido}</td>
                                <td>{u.correo}</td>
                                <td>{u.nombreRol ?? ''}</td>
                                <td>
                                    <button onClick={() => handleAbrirModalEditar(u)}>Editar</button>
                                    <button onClick={() => handleEliminar(u)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination-controls">
                    <button onClick={paginaAnterior} disabled={pagina === 0} className="btn-secundario">
                        Anterior
                    </button>
                    <span>
                        Página {pagina + 1} de {totalPaginas}
                    </span>
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
                    title={editandoId ? 'Editar Usuario' : 'Crear Usuario'}
                    onClose={handleCerrarModal}
                >
                    <div className="modal-body">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={usuarioForm.nombre}
                            onChange={(e) => setUsuarioForm({ ...usuarioForm, nombre: e.target.value })}
                        />

                        <label>Apellido:</label>
                        <input
                            type="text"
                            value={usuarioForm.apellido}
                            onChange={(e) => setUsuarioForm({ ...usuarioForm, apellido: e.target.value })}
                        />

                        <label>Identificación:</label>
                        <input
                            type="text"
                            value={usuarioForm.identificacion ?? ''}
                            onChange={(e) =>
                                setUsuarioForm({ ...usuarioForm, identificacion: e.target.value })
                            }
                        />

                        <label>Dirección:</label>
                        <input
                            type="text"
                            value={usuarioForm.direccion ?? ''}
                            onChange={(e) =>
                                setUsuarioForm({ ...usuarioForm, direccion: e.target.value })
                            }
                        />

                        <label>Teléfono:</label>
                        <input
                            type="text"
                            value={usuarioForm.telefono ?? ''}
                            onChange={(e) =>
                                setUsuarioForm({ ...usuarioForm, telefono: e.target.value })
                            }
                        />

                        <label>Correo:</label>
                        <input
                            type="email"
                            value={usuarioForm.correo}
                            onChange={(e) => setUsuarioForm({ ...usuarioForm, correo: e.target.value })}
                        />

                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={usuarioForm.clave ?? ''}
                            onChange={(e) => setUsuarioForm({ ...usuarioForm, clave: e.target.value })}
                        />
                        {editandoId && (
                            <p className="nota-clave">
                                Dejar en blanco si NO deseas cambiar la contraseña
                            </p>
                        )}

                        <label>Rol:</label>
                        <select
                            value={usuarioForm.idRol}
                            onChange={(e) => setUsuarioForm({ ...usuarioForm, idRol: Number(e.target.value) })}
                        >
                            {roles.map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-footer">
                        <button className="btn-secundario" onClick={handleCerrarModal}>
                            Cancelar
                        </button>
                        <button className="btn-primario" onClick={handleGuardar}>
                            {editandoId ? 'Guardar Cambios' : 'Crear Usuario'}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default GestionUsuarios;
