import './dashboard.css';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function DashboardCliente() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2>Cliente</h2>
                <a href="#">Mis Mascotas</a>
                <a href="#">Mis Servicios</a>
                <button className="logout-btn" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
            <div className="content">
                <h1>Bienvenido Cliente</h1>
            </div>
        </div>
    );
}

export default DashboardCliente;
