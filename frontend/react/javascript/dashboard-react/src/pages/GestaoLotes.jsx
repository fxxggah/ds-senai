import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function GestaoLotes() {
  const { perfil } = useContext(AuthContext);
  const [lotes, setLotes] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/tarefas')
      .then((res) => res.json())
      .then((dados) => setLotes(dados));
  }, []);

  // POST: Cadastrar
  const criarLote = (e) => {
    e.preventDefault();
    if (!novoTitulo.trim()) return;

    fetch('http://localhost:3000/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: novoTitulo, completed: false })
    })
      .then((res) => res.json())
      .then((novo) => {
        setLotes([novo, ...lotes]);
        setNovoTitulo('');
      });
  };

  // PATCH: Alternar Status
  const alternarStatus = (id, statusAtual) => {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !statusAtual })
    })
      .then((res) => res.json())
      .then((atualizado) => {
        setLotes(lotes.map((l) => (l.id === id ? atualizado : l)));
      });
  };

  // DELETE: Excluir (Exclusivo Supervisor)
  const excluirLote = (id) => {
    fetch(`http://localhost:3000/tarefas/${id}`, { method: 'DELETE' }).then(() => {
      setLotes(lotes.filter((l) => l.id !== id));
    });
  };

  return (
    <div>
      <h3 className="mb-3">Gestão de Lotes de Produção</h3>

      {/* FORMULÁRIO POST */}
      <form onSubmit={criarLote} className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Nome do novo lote..."
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
        />
        <button className="btn btn-success" type="submit">+ Cadastrar (POST)</button>
      </form>

      {/* LISTAGEM */}
      <div className="list-group">
        {lotes.map((lote) => (
          <div key={lote.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
            <div>
              <strong className="me-2">#{lote.id}</strong>
              <span>{lote.title}</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                className={`btn btn-sm ${lote.completed ? 'btn-success' : 'btn-warning'}`}
                onClick={() => alternarStatus(lote.id, lote.completed)}
              >
                {lote.completed ? 'Aprovado' : 'Em Inspeção'} (PATCH)
              </button>

              <Link to={`/lotes/${lote.id}`} className="btn btn-outline-primary btn-sm">
                Prontuário
              </Link>

              {/* BOTÃO EXCLUSIVO PARA SUPERVISOR */}
              {perfil === 'SUPERVISOR' && (
                <button className="btn btn-outline-danger btn-sm" onClick={() => excluirLote(lote.id)}>
                  Excluir
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GestaoLotes;
