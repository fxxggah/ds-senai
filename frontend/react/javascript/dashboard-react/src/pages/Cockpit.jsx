import { useState, useEffect } from 'react';

function Cockpit() {
  const [lotes, setLotes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/tarefas')
      .then((res) => res.json())
      .then((dados) => {
        setLotes(dados);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p className="text-center">Carregando dados do cockpit...</p>;

  const total = lotes.length;
  const aprovados = lotes.filter((l) => l.completed).length;
  const emInspecao = lotes.filter((l) => !l.completed).length;

  return (
    <div>
      <h3 className="mb-4">Cockpit Geral da Planta</h3>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card bg-primary text-white text-center p-3">
            <h5>Total de Lotes</h5>
            <h2>{total}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white text-center p-3">
            <h5>Lotes Aprovados</h5>
            <h2>{aprovados}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark text-center p-3">
            <h5>Em Inspeção</h5>
            <h2>{emInspecao}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cockpit;