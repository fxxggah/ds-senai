import React from 'react';

const Sobre = () => (
  <div className="container mt-4 mb-5">
    <div className="card shadow-sm border-0">
      <div className="card-body p-4 p-md-5">
        <h2 className="card-title text-success mb-4 fw-bold border-bottom pb-2">Sobre Mim</h2>
        <p className="card-text text-secondary mb-5 lh-lg">
          Sou estudante de Engenharia de Software (UniFatecie) e Técnico em Desenvolvimento de Sistemas (SENAI). Meu foco é o desenvolvimento backend com <strong>Java e Spring Boot</strong>. Possuo facilidade de aprendizado rápido, pensamento analítico e foco em resultados, habilidades que desenvolvi em minhas experiências de trabalho.
        </p>

        <div className="row mt-4">
          <div className="col-lg-6 mb-4">
            <h4 className="text-dark mb-3">🎓 Formação & Certificações</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-transparent">
                <strong>Engenharia de Software</strong> - UniFatecie (2026 - 2029)
              </li>
              <li className="list-group-item bg-transparent">
                <strong>Técnico em Desenvolvimento de Sistemas</strong> - SENAI (2026 - 2027)
              </li>
              <li className="list-group-item bg-transparent">
                <strong>Formação Java Developer</strong> - DIO (Em andamento)
              </li>
              <li className="list-group-item bg-transparent">
                <strong>IA Generativa & Google Cloud</strong> - SENAI
              </li>
            </ul>
          </div>
          
          <div className="col-lg-6 mb-4">
            <h4 className="text-dark mb-3">💻 Hard Skills</h4>
            <div className="d-flex flex-wrap gap-2 mt-3">
              {['Java', 'Spring Boot', 'MySQL', 'Docker', 'APIs REST', 'JWT', 'Git & GitHub', 'Next.js', 'React', 'AWS'].map(skill => (
                <span key={skill} className="badge bg-dark fs-6 px-3 py-2 fw-normal">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Sobre;