import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import './menuAdmin.css';

interface MenuClienteProps {
    titulo?: string;
}

function MenuCliente({ titulo }: MenuClienteProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <h2>{titulo ?? 'Cliente'}</h2>
            <Link to="/cliente/gestion-mascotas">Mis Mascotas</Link>
            <Link to="/cliente/servicios">Mis Servicios</Link>
            <button className="logout-btn" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </div>
    );
}

export default MenuCliente;
