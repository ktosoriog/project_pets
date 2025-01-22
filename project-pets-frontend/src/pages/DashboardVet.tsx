import './dashboard.css';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function DashboardVet() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2>Veterinario</h2>
                <a href="#">Mis Servicios</a>
                <a href="#">Historias Clínicas</a>
                <button className="logout-btn" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
            <div className="content">
                <h1>Bienvenido Veterinario</h1>
            </div>
        </div>
    );
}

export default DashboardVet;
