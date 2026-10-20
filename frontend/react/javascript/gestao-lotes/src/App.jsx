import { Routes, Route, Link } from 'react-router-dom';
import PainelLotes from './pages/PainelLotes';
import DetalheLote from './pages/DetalhesLote';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-4" style={{ maxWidth: '750px' }}>
      {/* MENU DE NAVEGAÇÃO FIXO */}
      <nav className="navbar navbar-expand navbar-dark bg-dark mb-4 px-3 rounded">
        <span className="navbar-brand">Empresa X</span>
      </nav>

      {/* ROTEAMENTO */}
      <Routes>
        {/* ROTA 1: Lista Geral */}
        <Route path="/" element={<PainelLotes />} />

        {/* ROTA 2: Detalhes com Parâmetro Dinâmico :id */}
        <Route path="/lote/:id" element={<DetalheLote />} />
      </Routes>
    </div>
  );
}

export default App;