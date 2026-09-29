import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PainelLotes() {
  const [lotes, setLotes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [novoLote, setNovoLote] = useState('');

  // 1. GET - Buscar 8 primeiros registros da API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
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

  // 2. POST - Cadastrar Novo Lote
  const lidarComSubmitPost = (e) => {
    e.preventDefault();
    if (!novoLote.trim()) return;

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: novoLote, completed: false, userId: 1 })
    })
      .then((res) => res.json())
      .then((dadoCriado) => {
        // Inclui o novo lote no início da lista
        setLotes([dadoCriado, ...lotes]);
        setNovoLote(''); // Limpa o campo de texto
      });
  };

  // 3. PATCH - Alternância Dinâmica de Status
  const alternarStatusPatch = (id, statusAtual) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !statusAtual }) // Envia apenas o valor invertido
    })
      .then((res) => res.json())
      .then(() => {
        setLotes(
          lotes.map((lote) =>
            lote.id === id ? { ...lote, completed: !statusAtual } : lote
          )
        );
      });
  };

  // 4. DELETE - Deleta o lote
  const deletarLote = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      if (res.ok) {
        setLotes(lotes.filter((item) => item.id !== id));
      }
    });
  };


  if (carregando) {
    return <div className="text-center my-4">Carregando estoque de lotes...</div>;
  }

  return (
    <div>
      <h2 className="mb-3">Painel de Estoque de Lotes</h2>

      {/* FORMULÁRIO DE CADASTRO (POST) */}
      <form onSubmit={lidarComSubmitPost} className="input-group mb-4 shadow-sm">
        <input
          type="text"
          className="form-control"
          placeholder="Descrição do novo lote de produção..."
          value={novoLote}
          onChange={(e) => setNovoLote(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Cadastrar Lote (POST)
        </button>
      </form>

      <div className="list-group">
        {lotes.map((lote) => (
          <div
            key={lote.id}
            className="list-group-item d-flex justify-content-between align-items-center py-3"
          >
            <div>
              <strong>Lote #{lote.id}</strong>: {lote.title}
              <div className="mt-1">
                {lote.completed ? (
                  <span className="badge bg-success">Concluído</span>
                ) : (
                  <span className="badge bg-warning text-dark">Pendente</span>
                )}
              </div>
            </div>

            {/* GRUPO DE BOTÕES DE AÇÃO */}
            <div>
              <button
                className={`btn btn-sm me-2 ${lote.completed ? 'btn-outline-warning' : 'btn-outline-success'}`}
                onClick={() => alternarStatusPatch(lote.id, lote.completed)}
              >
                Alternar Status (PATCH)
              </button>
              <Link to={`/lote/${lote.id}`} className="btn btn-primary btn-sm">
                Ver Prontuário
              </Link>
            </div>
            <button className='btn btn-danger btn-sm'
              onClick={() => deletarLote(lote.id)} >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PainelLotes;