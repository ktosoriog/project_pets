import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import './menuAdmin.css';

interface MenuAdminProps {
    titulo?: string;
}

function MenuAdmin({ titulo }: MenuAdminProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <h2>{titulo ?? 'Administrador'}</h2>
            <Link to="/admin/usuarios">Gestión Usuarios</Link>
            <Link to="/admin/tipos-servicio">Tipos de Servicio</Link>
            <Link to="#">Servicios</Link>
            <Link to="#">Inventario</Link>
            <Link to="/admin/gestion-mascotas">Gestion Mascotas Clientes</Link>

            <button className="logout-btn" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </div>
    );
}

export default MenuAdmin;
