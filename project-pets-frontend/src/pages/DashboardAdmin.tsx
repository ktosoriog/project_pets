import './dashboard.css';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function DashboardAdmin() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2>Administrador</h2>
                <a href="#">Gestión Usuarios</a>
                <a href="#">Tipos de Servicio</a>
                <a href="#">Servicios</a>
                <a href="#">Facturación</a>
                <a href="#">Inventario</a>
                <button className="logout-btn" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
            <div className="content">
                <h1>Bienvenido Admin</h1>
            </div>
        </div>
    );
}

export default DashboardAdmin;
