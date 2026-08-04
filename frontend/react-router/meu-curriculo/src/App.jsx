import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importando os componentes isolados da pasta src/pages/
import Inicio from './pages/Inicio';
import Sobre from './pages/Sobre';
import Experiencia from './pages/Experiencia';
import Projetos from './pages/Projetos';
import Contato from './pages/Contato';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar Bootstrap com os novos botões adicionados */}
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <span className="navbar-brand">Meu Currículo</span>
            <div className="navbar-nav flex-row gap-3">
              <Link className="nav-link" to="/">Início</Link>
              <Link className="nav-link" to="/sobre">Sobre</Link>
              <Link className="nav-link" to="/experiencia">Experiência</Link>
              <Link className="nav-link" to="/projetos">Projetos</Link>
              <Link className="nav-link" to="/contato">Contato</Link>
            </div>
          </div>
        </nav>

        {/* Áreas das Rotas (agora contendo as 5 páginas) */}
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/experiencia" element={<Experiencia />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;