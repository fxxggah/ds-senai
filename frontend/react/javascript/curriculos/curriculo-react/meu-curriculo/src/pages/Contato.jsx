import React from 'react';

const Contato = () => (
  <div className="container mt-5 text-center">
    <h2 className="text-info fw-bold mb-3">Vamos Conversar?</h2>
    <p className="lead text-secondary mb-5">Estou sempre aberto a novas conexões, aprendizados e oportunidades na área de desenvolvimento.</p>
    
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-sm border-0 p-3">
          <div className="card-body">
            <ul className="list-group list-group-flush fs-5">
              <li className="list-group-item bg-transparent py-4">
                <strong>📧 E-mail: </strong> 
                <a href="mailto:gabrielsilvaoli07@gmail.com" className="text-decoration-none text-info">gabrielsilvaoli07@gmail.com</a>
              </li>
              <li className="list-group-item bg-transparent py-4">
                <strong>🐙 GitHub: </strong> 
                <a href="https://github.com/fxxggah" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">github.com/fxxggah</a>
              </li>
              <li className="list-group-item bg-transparent py-4">
                <strong>💼 LinkedIn: </strong> 
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-primary">Acessar meu Perfil</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contato;