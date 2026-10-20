import React from 'react';

const Projetos = () => (
  <div className="container mt-4 mb-5">
    <h2 className="text-danger text-center mb-4 fw-bold">Meus Projetos</h2>
    <p className="text-center text-secondary mb-5">Conheça algumas soluções que desenvolvi aplicando arquitetura e boas práticas em backend.</p>
    
    <div className="row g-4">
      {/* Projeto 1 */}
      <div className="col-md-6 col-lg-4">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-danger fw-bold">Catálogos Personalizados</h5>
            <p className="card-text flex-grow-1 mt-2">Sistema completo para conectar catálogos a uma dashboard administrativa, contendo autenticação JWT e gerenciamento de usuários.</p>
            <div className="mb-4">
              <span className="badge bg-secondary me-1">Java</span>
              <span className="badge bg-secondary me-1">Spring Boot</span>
              <span className="badge bg-secondary me-1">Next.js</span>
            </div>
            <a href="https://github.com/fxxggah" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger w-100 mt-auto">Ver Repositório</a>
          </div>
        </div>
      </div>

      {/* Projeto 2 */}
      <div className="col-md-6 col-lg-4">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-danger fw-bold">API Controle de Estoque</h5>
            <p className="card-text flex-grow-1 mt-2">API RESTful para gerenciamento de produtos e estoque. Implementa operações CRUD, persistência de dados e arquitetura em camadas.</p>
            <div className="mb-4">
              <span className="badge bg-secondary me-1">Java</span>
              <span className="badge bg-secondary me-1">MySQL</span>
              <span className="badge bg-secondary me-1">Docker</span>
            </div>
            <a href="https://github.com/fxxggah" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger w-100 mt-auto">Ver Repositório</a>
          </div>
        </div>
      </div>

      {/* Projeto 3 */}
      <div className="col-md-6 col-lg-4">
        <div className="card h-100 shadow-sm border-0">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-danger fw-bold">Bot para Afiliados</h5>
            <p className="card-text flex-grow-1 mt-2">Aplicação desenvolvida para automatizar a coleta e a organização de ofertas de marketplaces, auxiliando na divulgação de produtos.</p>
            <div className="mb-4">
              <span className="badge bg-secondary me-1">Python</span>
              <span className="badge bg-secondary me-1">Automação</span>
            </div>
            <a href="https://github.com/fxxggah" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger w-100 mt-auto">Ver Repositório</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Projetos;