import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PainelLotes() {
  const [lotes, setLotes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Fazer o consumo dos 8 primeiros registros da API ao montar o componente
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=8')
      .then((res) => res.json())
      .then((dados) => {
        setLotes(dados);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error('Erro ao buscar lotes:', erro);
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <div className="text-center my-4">Carregando estoque de lotes...</div>;
  }

  return (
    <div>
      <h2 className="mb-3">Painel de Estoque de Lotes</h2>
      <div className="list-group">
        {lotes.map((lote) => (
          <div
            key={lote.id}
            className="list-group-item d-flex justify-content-between align-items-center py-3"
          >
            <div>
              <strong>Lote #{lote.id}</strong>: {lote.title}
              <div className="mt-1">
                {/* Indicador visual do status do lote */}
                {lote.completed ? (
                  <span className="badge bg-success">Aprovado / Concluído</span>
                ) : (
                  <span className="badge bg-warning text-dark">Em Inspeção / Pendente</span>
                )}
              </div>
            </div>

            {/* Link para rota dinâmica do item selecionado */}
            <Link to={`/lote/${lote.id}`} className="btn btn-outline-primary btn-sm">
              Ver Prontuário
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PainelLotes;