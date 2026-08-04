import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => (
  <div className="container mt-5">
    <div className="p-5 text-center bg-light rounded-3 shadow-sm border">
      <h1 className="display-4 fw-bold text-primary mb-3">Olá, eu sou o Gabriel Silva!</h1>
      <h2 className="fs-4 text-muted mb-4">
        Estudante de Engenharia de Software | Desenvolvedor Backend Java
      </h2>
      <hr className="my-4 w-75 mx-auto" />
      <p className="lead mb-5">
        Sou apaixonado por tecnologia e focado em criar soluções escaláveis. Busco minha primeira oportunidade como desenvolvedor para aprender continuamente e gerar impacto real através de código limpo e arquitetura robusta.
      </p>
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <Link to="/projetos" className="btn btn-primary btn-lg px-4 shadow-sm">Ver Meus Projetos</Link>
        <Link to="/contato" className="btn btn-outline-dark btn-lg px-4 shadow-sm">Entrar em Contato</Link>
      </div>
    </div>
  </div>
);

export default Inicio;