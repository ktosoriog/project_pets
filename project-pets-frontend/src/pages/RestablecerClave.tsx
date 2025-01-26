import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import { restablecerClave } from '../services/authService';
import './Login.css';

function RestablecerClave() {

    const { showAlert } = useAlert();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [nuevaClave, setNuevaClave] = useState('');
    const [resultado, setResultado] = useState<string | null>(null);

    async function handleRestablecer() {
        if (!nuevaClave.trim()) {
            showAlert('Debes ingresar una contraseña', 'error');
            return;
        }
        if (!token) {
            showAlert('El token no está presente', 'error');
            return;
        }
        try {
            const mensaje = await restablecerClave(token, nuevaClave);
            setResultado(mensaje);
        } catch (error) {
            if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    }

    if (!token) {
        return <div className="login-page">El token no es válido en la URL</div>;
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Restablecer Contraseña</h2>
                {!resultado && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleRestablecer();
                    }}>
                        <label htmlFor="nuevaClave">Nueva Contraseña:</label>
                        <input
                            id="nuevaClave"
                            type="password"
                            value={nuevaClave}
                            onChange={(e) => setNuevaClave(e.target.value)}
                        />
                        <button type="submit">Guardar</button>
                        <div className="volver-inicio-container">
                            <Link to="/" className="btn-link">Volver al Inicio</Link>
                        </div>
                    </form>
                )}
                {resultado && (
                    <>
                        <div style={{ color: 'green', marginTop: '1rem' }}>
                            {resultado}
                        </div>
                        <div className="volver-inicio-container">
                            <Link to="/" className="btn-link">Volver al Inicio</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default RestablecerClave;