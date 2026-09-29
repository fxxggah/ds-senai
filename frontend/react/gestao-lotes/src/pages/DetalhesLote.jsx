import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetalheLote() {
  // 1. Capturar o parâmetro :id da URL
  const { id } = useParams();
  const navigate = useNavigate();

  const [lote, setLote] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // 2. Fazer requisição à API buscando exclusivamente os dados do lote selecionado
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => res.json())
      .then((dados) => {
        setLote(dados);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error('Erro ao buscar prontuário:', erro);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) {
    return <div className="text-center my-4">Carregando prontuário do lote #{id}...</div>;
  }

  if (!lote) {
    return <div className="alert alert-danger">Lote não encontrado.</div>;
  }

  return (
    <div>
      {/* 3. Exibir dados detalhados em um Card do Bootstrap */}
      <div className="card shadow-sm mb-3">
        <div className="card-header bg-primary text-white">
          <h4 className="my-1">Prontuário do Lote #{lote.id}</h4>
        </div>
        <div className="card-body">
          <h5 className="card-title mb-3">
            <strong>Descrição do Lote:</strong> {lote.title}
          </h5>
          <p className="card-text">
            <strong>ID do Responsável / Usuário:</strong> {lote.userId}
          </p>
          <div className="card-text mb-3">
            <strong>Status de Inspeção:</strong>{' '}
            {lote.completed ? (
              <span className="badge bg-success fs-6">Concluído / Liberado</span>
            ) : (
              <span className="badge bg-warning text-dark fs-6">Pendente / Em Processamento</span>
            )}
          </div>
        </div>
      </div>

      {/* 4. Botão para retornar programaticamente ao painel inicial */}
      <button className="btn btn-secondary" onClick={() => navigate('/')}>
        &larr; Voltar ao Painel
      </button>
    </div>
  );
}

export default DetalheLote;