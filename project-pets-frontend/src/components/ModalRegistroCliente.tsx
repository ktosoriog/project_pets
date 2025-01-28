import { useState } from 'react';
import Modal from './Modal';
import { registroCliente } from '../services/authService';
import { useAlert } from '../context/AlertContext';

interface ModalRegistroClienteProps {
    onClose: () => void;
    show: boolean;
}

function ModalRegistroCliente({ onClose, show }: ModalRegistroClienteProps) {
    const { showAlert } = useAlert();
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        identificacion: '',
        direccion: '',
        telefono: '',
        correo: '',
        clave: '',
        confirmarClave: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    if (!show) return null;

    async function handleRegistro() {
        // Validar campos
        if (
            !form.nombre.trim() ||
            !form.apellido.trim() ||
            !form.identificacion.trim() ||
            !form.direccion.trim() ||
            !form.telefono.trim() ||
            !form.correo.trim() ||
            !form.clave.trim() ||
            !form.confirmarClave.trim()
        ) {
            showAlert('Todos los campos son obligatorios', 'error');
            return;
        }

        if (form.clave !== form.confirmarClave) {
            showAlert('Las contraseñas no coinciden', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            await registroCliente({
                nombre: form.nombre,
                apellido: form.apellido,
                identificacion: form.identificacion,
                direccion: form.direccion,
                telefono: form.telefono,
                correo: form.correo,
                clave: form.clave
            });
            showAlert('Tu cuenta se ha creado exitosamente. Ahora puedes iniciar sesión.', 'success');

            setForm({
                nombre: '',
                apellido: '',
                identificacion: '',
                direccion: '',
                telefono: '',
                correo: '',
                clave: '',
                confirmarClave: ''
            });
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Modal title="Regístrate" onClose={onClose}>
            <div className="modal-body">
                <label>Nombre:</label>
                <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />

                <label>Apellido:</label>
                <input
                    type="text"
                    value={form.apellido}
                    onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                />

                <label>Identificación:</label>
                <input
                    type="text"
                    value={form.identificacion}
                    onChange={(e) => setForm({ ...form, identificacion: e.target.value })}
                />

                <label>Dirección:</label>
                <input
                    type="text"
                    value={form.direccion}
                    onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                />

                <label>Teléfono:</label>
                <input
                    type="text"
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                />

                <label>Correo:</label>
                <input
                    type="email"
                    value={form.correo}
                    onChange={(e) => setForm({ ...form, correo: e.target.value })}
                />

                <label>Contraseña:</label>
                <input
                    type="password"
                    value={form.clave}
                    onChange={(e) => setForm({ ...form, clave: e.target.value })}
                />

                <label>Confirmar Contraseña:</label>
                <input
                    type="password"
                    value={form.confirmarClave}
                    onChange={(e) => setForm({ ...form, confirmarClave: e.target.value })}
                />
            </div>
            <div className="modal-footer">
                <button className="btn-secundario" onClick={onClose} disabled={isSubmitting}>
                    Salir
                </button>
                <button className="btn-primario" onClick={handleRegistro} disabled={isSubmitting}>
                    {isSubmitting ? 'Creando...' : 'Crear Cuenta'}
                </button>
            </div>
        </Modal>
    );
}

export default ModalRegistroCliente;