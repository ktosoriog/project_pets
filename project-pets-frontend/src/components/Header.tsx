import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/images/logo.png';

function Header() {
    return (
        <header className="header-container">
            <div className="logo-section">
                <img src={logo} alt="Logo" className="logo-img" />
                <span className="project-name">Project Pets</span>
            </div>
            <nav className="menu">
                <Link to="/">Inicio</Link>
                <Link to="/#">Servicio</Link>
                <Link to="/#">Nosotros</Link>
                <Link to="/login" className="btn-entrar">Entrar</Link>
            </nav>
        </header>
    );
}

export default Header;
