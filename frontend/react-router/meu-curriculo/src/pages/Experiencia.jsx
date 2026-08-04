import React from 'react';

const Experiencia = () => (
  <div className="container mt-4 mb-5">
    <h2 className="text-warning text-center mb-5 fw-bold">Trajetória Profissional</h2>
    
    <div className="row justify-content-center">
      <div className="col-lg-8">
        
        {/* Card 1 */}
        <div className="card shadow-sm border-0 border-start border-warning border-4 mb-4">
          <div className="card-body p-4">
            <h4 className="card-title text-dark mb-1">Prestador de Serviços de Informática</h4>
            <h6 className="card-subtitle text-muted mb-3">Comércio Local | 2026 – Atual</h6>
            <p className="card-text">Realização de serviços de informática em geral, conciliando o trabalho com os estudos e o desenvolvimento de projetos pessoais.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card shadow-sm border-0 border-start border-warning border-4 mb-4">
          <div className="card-body p-4">
            <h4 className="card-title text-dark mb-1">Vendedor Autônomo</h4>
            <h6 className="card-subtitle text-muted mb-3">Marketplace / Facebook | 2025 – Atual</h6>
            <p className="card-text">Compra e venda de eletrônicos. Atuação direta com negociação, atendimento ao cliente, precificação, controle de estoque e gestão financeira.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card shadow-sm border-0 border-start border-warning border-4 mb-4">
          <div className="card-body p-4">
            <h4 className="card-title text-dark mb-1">Jovem Aprendiz – PPCP</h4>
            <h6 className="card-subtitle text-muted mb-3">Caio Induscar | 2024 – 2025</h6>
            <p className="card-text">Atuei no setor de Planejamento e Controle da Produção em uma das maiores fabricantes de ônibus do país, desenvolvendo responsabilidade, análise de processos e trabalho em equipe.</p>
          </div>
        </div>

      </div>
    </div>
  </div>
);

export default Experiencia;