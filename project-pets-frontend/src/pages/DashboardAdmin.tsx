import MenuAdmin from '../components/MenuAdmin';
import { getNombre } from '../services/authService';
import './dashboard.css';

function DashboardAdmin() {
    const nombre = getNombre() ?? 'Administrador';
    return (
        <div className="dashboard-container">
            <MenuAdmin />
            <div className="content">
                <h1>Bienvenido, {nombre}</h1>
                <p className="welcome-text">
                    En tu panel de control, tienes acceso a todas las herramientas necesarias para gestionar eficientemente la plataforma. Aquí tienes un resumen de las funcionalidades disponibles:
                </p>
                <ul className="functionality-list">
                    <li><strong>Gestión de Usuarios:</strong> Crea, edita, elimina y lista usuarios (clientes y veterinarios). Además, puedes generar reportes en formato CSV.</li>
                    <li><strong>Gestión de Tipos de Servicio:</strong> Administra los tipos de servicios ofrecidos (crear, editar, eliminar) y genera reportes en CSV.</li>
                    <li><strong>Gestión de Servicios:</strong> Lista, crea, edita y cancela servicios. También puedes ver el estado de cada servicio (Pendiente, Aceptado, En curso, Finalizado, Cancelado).</li>
                    <li><strong>Gestión de Clientes y Mascotas:</strong> Lista y edita la información de las mascotas registradas en el sistema.</li>
                    <li><strong>Gestión de Inventario:</strong> Administra los productos disponibles (crear, editar, eliminar) y asócialos a los servicios según sea necesario.</li>
                </ul>
                <p className="welcome-text">
                    Utiliza estas herramientas para mantener el sistema organizado y garantizar una experiencia óptima para todos los usuarios.
                </p>
            </div>
        </div>
    );
}

export default DashboardAdmin;
