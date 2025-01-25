import MenuAdmin from '../components/MenuAdmin';
import './dashboard.css';

function DashboardAdmin() {
    return (
        <div className="dashboard-container">
            <MenuAdmin />
            <div className="content">
                <h1>Bienvenido, Admin</h1>
                <p>
                    En este panel de administrador podrás gestionar los usuarios, administrar los tipos
                    de servicio, realizar facturación, controlar el inventario y muchas funciones más.
                    ¡Explora el menú a la izquierda para iniciar!
                </p>
            </div>
        </div>
    );
}

export default DashboardAdmin;
