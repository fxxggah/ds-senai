import { useState } from 'react';

// Recebemos a prop aoRemover
function CardMaquina({ nome, aoRemover }) {
    // 1. Estado local para o status da máquina
    const [status, setStatus] = useState('DESLIGADA');

    // 2. Função para alternar o status
    const alternarStatus = () => {
        if (status === 'DESLIGADA') {
            setStatus('LIGADA');
        } else {
            setStatus('DESLIGADA');
        }
    };

    return (
        <div className="card p-3 my-2 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="m-0">Máquina: {nome}</h5>

                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={aoRemover}
                    title="Excluir máquina"
                >
                    Excluir
                </button>
            </div>

            <p className="my-2">
                Status Atual:
                <span className={`badge ms-2 ${status === 'LIGADA' ? 'bg-success' : 'bg-danger'}`}>
                    {status}
                </span>
            </p>

            <button
                className={`btn ${status === 'LIGADA' ? 'btn-outline-danger' : 'btn-success'}`}
                onClick={alternarStatus}
            >
                {status === 'LIGADA' ? 'Desligar Máquina' : 'Ligar Máquina'}
            </button>
        </div>
    );
}

export default CardMaquina;