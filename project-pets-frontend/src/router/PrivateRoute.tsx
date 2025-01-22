import { Navigate } from 'react-router-dom';
import { estaLogueado, getRol } from '../services/authService';

type PrivateRouteProps = Readonly<{
    children: JSX.Element;
    requiredRole?: string;
}>;

function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
    const logged = estaLogueado();
    const rolUsuario = getRol();
    if (!logged) {
        return <Navigate to="/login" replace />;
    }
    if (requiredRole && rolUsuario !== requiredRole) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default PrivateRoute;