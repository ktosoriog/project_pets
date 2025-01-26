import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import { useAlert } from '../context/AlertContext';
import ModalRegistroCliente from '../components/ModalRegistroCliente';
import ModalOlvideClave from '../components/ModalOlvideClave';
import './Login.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [showRegistro, setShowRegistro] = useState(false);
  const [showRecuperar, setShowRecuperar] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(correo, clave);
      if (data.rol === 'ADMINISTRADOR') {
        navigate('/admin');
      } else if (data.rol === 'VETERINARIO') {
        navigate('/veterinario');
      } else {
        navigate('/cliente');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showAlert(err.message || 'Error al iniciar sesión');
      } else {
        showAlert('Error desconocido al iniciar sesión');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <label htmlFor="clave">Clave:</label>
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>

        <div className="login-options">
          <div className="opciones-enlaces">
            <button className="btn-link" onClick={() => setShowRegistro(true)}>
              Crear Cuenta
            </button>
            <button className="btn-link" onClick={() => setShowRecuperar(true)}>
              Olvidé mi Contraseña
            </button>
          </div>
          <div className="volver-inicio-container">
            <Link to="/" className="btn-link">Volver al Inicio</Link>
          </div>
        </div>
      </div>
      <ModalRegistroCliente show={showRegistro} onClose={() => setShowRegistro(false)} />
      <ModalOlvideClave show={showRecuperar} onClose={() => setShowRecuperar(false)} />
    </div>
  );
}

export default Login;
