import { useState } from 'react';
import CardMaquina from './components/CardMaquina';
import FormNovaMaquina from './components/FormNovaMaquina';

function App() {
  // Lista inicial de máquinas
  const [maquinas, setMaquinas] = useState(['Torno CNC #01', 'Prensa Hidráulica']);

  // Função para adicionar nova máquina ao array
  const adicionarMaquina = (novoNome) => {
    setMaquinas([...maquinas, novoNome]);
  };

  // 1. Função para remover a máquina pelo índice
  const removerMaquina = (indexParaRemover) => {
    setMaquinas(maquinas.filter((_, index) => index !== indexParaRemover));
  };

  return (
    <div className="container py-4" style={{ maxWidth: '500px' }}>
      <h3 className="text-center mb-4"> Controle de Maquinário SENAI</h3>

      {/* Formulário enviando a função de cadastro via prop */}
      <FormNovaMaquina aoAdicionar={adicionarMaquina} />

      <h5 className="mt-4">Máquinas Monitoradas ({maquinas.length})</h5>

      {/* 2. Mensagem de painel vazio / Renderização condicional */}
      {maquinas.length === 0 ? (
        <div className="alert alert-warning text-center mt-3" role="alert">
          Nenhuma máquina cadastrada no momento.
        </div>
      ) : (
        /* Mapeando a lista e renderizando um card para cada máquina */
        maquinas.map((nomeMaquina, index) => (
          <CardMaquina
            key={index}
            nome={nomeMaquina}
            aoRemover={() => removerMaquina(index)}
          />
        ))
      )}
    </div>
  );
}

export default App;