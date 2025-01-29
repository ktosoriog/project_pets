import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import './menuAdmin.css';

interface MenuVetProps {
    titulo?: string;
}

function MenuVet({ titulo }: MenuVetProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <h2>{titulo ?? 'Vet'}</h2>
            <Link to="">Mis Servicios</Link>
            <Link to="/veterinario/inventario">Inventario</Link>
            <button className="logout-btn" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </div>
    );
}

export default MenuVet;
