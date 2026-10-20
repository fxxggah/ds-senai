import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetalheLote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lote, setLote] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Estados para a edição
  const [tituloEditado, setTituloEditado] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Busca os dados do lote
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => res.json())
      .then((dados) => {
        setLote(dados);
        setTituloEditado(dados.title); // Preenche o input editável
        setCarregando(false);
      })
      .catch((erro) => {
        console.error('Erro ao buscar prontuário:', erro);
        setCarregando(false);
      });
  }, [id]);

  // PUT - Edição Completa de Dados
  const salvarAlteracoesPut = () => {
    if (!tituloEditado.trim()) return;

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: lote.id,
        title: tituloEditado,
        completed: lote.completed,
        userId: lote.userId
      }) // Envia o objeto substituído completo
    })
      .then((res) => res.json())
      .then((dadosAtualizados) => {
        setLote(dadosAtualizados);
        setMensagemSucesso('Dados atualizados com sucesso! (PUT executado)');

        // Remove a mensagem após 5 segundos
        setTimeout(() => setMensagemSucesso(''), 5000);
      });
  };

  if (carregando) {
    return <div className="text-center my-4">Carregando prontuário do lote #{id}...</div>;
  }

  if (!lote) {
    return <div className="alert alert-danger">Lote não encontrado.</div>;
  }

  return (
    <div>
      {/* Alerta de Sucesso após a edição */}
      {mensagemSucesso && (
        <div className="alert alert-success shadow-sm" role="alert">
          {mensagemSucesso}
        </div>
      )}

      <div className="card shadow-sm mb-3">
        <div className="card-header bg-primary text-white">
          <h4 className="my-1">Prontuário do Lote #{lote.id}</h4>
        </div>
        <div className="card-body">

          {/* CAMPO DE ENTRADA EDITÁVEL */}
          <div className="mb-3">
            <label className="form-label fw-bold">Descrição do Lote:</label>
            <input
              type="text"
              className="form-control"
              value={tituloEditado}
              onChange={(e) => setTituloEditado(e.target.value)}
            />
          </div>

          <p className="card-text">
            <strong>ID do Responsável / Usuário:</strong> {lote.userId}
          </p>
          <div className="card-text mb-4">
            <strong>Status de Inspeção:</strong>{' '}
            {lote.completed ? (
              <span className="badge bg-success fs-6">Concluído</span>
            ) : (
              <span className="badge bg-warning text-dark fs-6">Pendente</span>
            )}
          </div>

          {/* BOTÃO PARA SALVAR ALTERAÇÕES */}
          <button
            className="btn btn-success me-2"
            onClick={salvarAlteracoesPut}
          >
            Salvar Alterações (PUT)
          </button>
        </div>
      </div>

      <button className="btn btn-secondary" onClick={() => navigate('/')}>
        &larr; Voltar ao Painel
      </button>
    </div>
  );
}

export default DetalheLote;