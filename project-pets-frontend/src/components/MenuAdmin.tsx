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
            <Link to="/admin/usuarios">Gestión de Usuarios</Link>
            <Link to="/admin/tipos-servicio">Gestión de Tipos de Servicio</Link>
            <Link to="#">Gestión de Servicios</Link>
            <Link to="/admin/clientes">Gestión de Clientes y Mascotas</Link>
            <Link to="#">Gestión de Inventario</Link>
            <button className="logout-btn" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </div>
    );
}

export default MenuAdmin;
