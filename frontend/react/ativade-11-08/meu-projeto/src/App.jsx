import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- PÁGINA 1: INÍCIO ---
const Inicio = () => (
  <div className="card shadow-sm p-4 mt-4">
    <h2 className="text-primary"> Página Inicial</h2>
    <p className="lead">Bem-vindo ao meu primeiro site feito em React e Bootstrap!</p>
    <Link to="/sobre" className="btn btn-primary mt-2">Ir para Sobre </Link>
  </div>
);

// --- PÁGINA 2: SOBRE ---
const Sobre = () => (
  <div className="card shadow-sm p-4 mt-4">
    <h2 className="text-success"> Sobre Mim</h2>
    <p className="lead">Este é o meu projeto publicado no GitHub Pages.</p>
    <Link to="/" className="btn btn-secondary mt-2"> Voltar para o Início</Link>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
function App() {
  return (
    // Usamos HashRouter para não dar erro 404 ao atualizar a página no GitHub Pages
    <Router>
      <div>
        {/* Barra de Navegação do Bootstrap */}
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <span className="navbar-brand">Meu Projeto</span>
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Início</Link>
              <Link className="nav-link" to="/sobre">Sobre</Link>
            </div>
          </div>
        </nav>

        {/* Conteúdo Central */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
