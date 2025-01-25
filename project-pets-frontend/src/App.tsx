// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardVet from './pages/DashboardVet';
import DashboardCliente from './pages/DashboardCliente';
import PrivateRoute from './router/PrivateRoute';
import GestionUsuarios from './pages/GestionUsuarios';
import GestionTipoServicio from './pages/GestionTipoServicio';


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/admin"
                element={
                    <PrivateRoute requiredRole="ADMINISTRADOR">
                        <DashboardAdmin />
                    </PrivateRoute>
                }
            />
            <Route
                path="/veterinario"
                element={
                    <PrivateRoute requiredRole="VETERINARIO">
                        <DashboardVet />
                    </PrivateRoute>
                }
            />
            <Route
                path="/cliente"
                element={
                    <PrivateRoute requiredRole="CLIENTE">
                        <DashboardCliente />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/usuarios"
                element={
                    <PrivateRoute requiredRole="ADMINISTRADOR">
                        <GestionUsuarios />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/tipos-servicio"
                element={
                    <PrivateRoute requiredRole="ADMINISTRADOR">
                        <GestionTipoServicio />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;
