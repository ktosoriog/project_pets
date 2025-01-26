import { useState } from 'react';
import Modal from './Modal';
import { useAlert } from '../context/AlertContext';
import { solicitarRestablecerClave } from '../services/authService';

interface ModalOlvideClaveProps {
    show: boolean;
    onClose: () => void;
}

function ModalOlvideClave({ show, onClose }: ModalOlvideClaveProps) {

    const { showAlert } = useAlert();
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState<string | null>(null);

    if (!show) return null;

    async function handleEnviar() {
        if (!correo.trim()) {
            showAlert('Debes ingresar un correo', 'error');
            return;
        }
        try {
            const respuesta = await solicitarRestablecerClave(correo);
            setMensaje(respuesta);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    return (
        <Modal title="Restablecer contraseña" onClose={onClose}>
            <div className="modal-body">
                {!mensaje && (
                    <>
                        <label>Ingresa tu correo para restablecer tu contraseña:</label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </>
                )}
                {mensaje && (
                    <div style={{ color: 'green', fontWeight: 'bold' }}>{mensaje}</div>
                )}
            </div>
            <div className="modal-footer">
                {!mensaje && (
                    <button className="btn-primario" onClick={handleEnviar}>Enviar</button>
                )}
                <button className="btn-secundario" onClick={onClose}>Cerrar</button>
            </div>
        </Modal>
    );
}

export default ModalOlvideClave;