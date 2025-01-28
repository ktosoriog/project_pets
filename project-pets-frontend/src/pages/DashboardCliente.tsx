import MenuCliente from '../components/MenuCliente';
import { getNombre } from '../services/authService';
import './dashboard.css';

function DashboardCliente() {
    const nombre = getNombre() ?? 'Cliente';
    return (
        <div className="dashboard-container">
            <MenuCliente />
            <div className="content">
                <h1>Bienvenido, {nombre}</h1>
                <p className="welcome-text">
                    En tu panel de control, podrás gestionar todas las actividades relacionadas con tus mascotas y servicios. Aquí tienes un resumen de lo que puedes hacer:
                </p>
                <ul className="functionality-list">
                    <li><strong>Gestión de Mascotas:</strong> Añade, edita o elimina la información de tus mascotas.</li>
                    <li><strong>Reservar Servicios:</strong> Agenda citas para tus mascotas seleccionando el tipo de servicio, fecha, hora y veterinario.</li>
                    <li><strong>Ver Historial:</strong> Consulta el historial de servicios y las historias clínicas de tus mascotas.</li>
                    <li><strong>Cancelar Servicios:</strong> Si es necesario, puedes cancelar servicios que no hayan iniciado.</li>
                </ul>
                <p className="welcome-text">
                    ¡Gracias por confiar en nosotros para el cuidado de tus mascotas!
                </p>
            </div>
        </div>
    );
}

export default DashboardCliente;
