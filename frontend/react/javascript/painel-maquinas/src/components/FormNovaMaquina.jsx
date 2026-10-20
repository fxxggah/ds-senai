import { useState } from 'react';

function FormNovaMaquina({ aoAdicionar }) {
    // Estado para armazenar o texto do input
    const [nomeInput, setNomeInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita recarregar a página
        if (nomeInput.trim() === '') return;

        aoAdicionar(nomeInput); // Envia o nome para a lista principal
        setNomeInput('');      // Limpa o campo de texto
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3 mb-4 bg-light shadow-sm">
            <h6 className="mb-3">➕ Cadastrar Nova Máquina</h6>
            <div className="mb-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nome da máquina (ex: Impressora 3D #01)"
                    value={nomeInput}
                    onChange={(e) => setNomeInput(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">
                Cadastrar no Painel
            </button>
        </form>
    );
}

export default FormNovaMaquina;