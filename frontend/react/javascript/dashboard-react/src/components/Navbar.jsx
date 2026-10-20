import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { perfil, alternarPerfil } = useContext(AuthContext);

    return (

        <nav className="navbar navbar-expand navbar-dark bg-dark mb-4 px-3 rounded">
            <span className="navbar-brand"> Indústria 4.0</span>
            <div className="navbar-nav me-auto">
                <Link className="nav-link" to="/">Cockpit</Link>
                <Link className="nav-link" to="/lotes">Gestão de Lotes</Link>
            </div>
            <div className="d-flex align-items-center gap-2">
                <span className="badge bg-secondary">Perfil: {perfil}</span>
                <button className="btn btn-outline-light btn-sm" onClick={alternarPerfil}>
                    Alternar para {perfil === 'OPERADOR' ? 'SUPERVISOR' : 'OPERADOR'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;