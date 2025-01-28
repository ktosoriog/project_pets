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
                <h1>Bienvenido, Veterinario</h1>
                <p className="welcome-text">
                    En tu panel de control, podrás gestionar los servicios asignados y brindar atención médica de calidad. Estas son tus funcionalidades clave:
                </p>
                <ul className="functionality-list">
                    <li><strong>Gestión de Servicios:</strong> Acepta, inicia, finaliza o cancela servicios asignados. Actualiza el estado en tiempo real (Pendiente, Aceptado, En curso, Finalizado).</li>
                    <li><strong>Detalles de Atención:</strong> Registra procedimientos realizados, medicamentos usados y observaciones clínicas al finalizar cada servicio.</li>
                    <li><strong>Historias Clínicas:</strong> Crea o actualiza el historial médico de las mascotas, consulta antecedentes y diagnósticos previos.</li>
                    <li><strong>Inventario:</strong> Verifica la disponibilidad de medicamentos e insumos antes de iniciar un servicio.</li>
                </ul>
                <p className="welcome-text">
                    Tu trabajo es fundamental para garantizar el bienestar de nuestras mascotas. ¡Gracias por tu dedicación!
                </p>
            </div>
        </div>
    );
}

export default DashboardVet;
