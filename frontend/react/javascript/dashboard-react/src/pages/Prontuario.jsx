import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Prontuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lote, setLote] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/tarefas/${id}`)
      .then((res) => res.json())
      .then((dados) => {
        setLote(dados);
        setTitulo(dados.title);
        setCarregando(false);
      });
  }, [id]);

  // PUT: Editar
  const salvarEdicao = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lote, title: titulo })
    })
      .then((res) => res.json())
      .then((dadosAtualizados) => {
        setLote(dadosAtualizados);
        alert('Lote atualizado com sucesso via PUT!');
      });
  };

  if (carregando) return <p className="text-center">Carregando prontuário #{id}...</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Prontuário do Lote #{lote.id}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={salvarEdicao}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nome do Lote:</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <p>
            <strong>Status Atual: </strong>
            <span className={lote.completed ? 'text-success fw-bold' : 'text-warning fw-bold'}>
              {lote.completed ? 'Aprovado' : 'Em Inspeção'}
            </span>
          </p>
          <hr />
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/lotes')}>
              ← Voltar à Lista
            </button>
            <button type="submit" className="btn btn-warning">
              Salvar Alterações (PUT)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Prontuario;