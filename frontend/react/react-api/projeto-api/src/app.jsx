import { useState, useEffect } from "react"

function App() {
    const [tarefas, setTarefas] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [temaEscuro, setTemaEscuro] = useState(false)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=50')
            .then((resposta) => resposta.json())
            .then((dados) => {
                setTarefas(dados)
                setCarregando(false)
            })
    }, [])

    const alternarTema = () => {
        setTemaEscuro(!temaEscuro)
    }

    return (
        <div data-bs-theme={temaEscuro ? 'dark' : 'light'} className="bg-body text-body min-vh-100 py-5 transition-all">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow border-0">
                            {/* Cabeçalho com o botão de alternar tema */}
                            <div className="card-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <h2 className="h5 mb-1">Tarefas vindas da API</h2>
                                    <p className="small mb-0 opacity-75">
                                        Consumindo JSONPlaceholder
                                    </p>
                                </div>
                                <button 
                                    onClick={alternarTema} 
                                    className="btn btn-sm btn-light border-0 fw-semibold shadow-sm"
                                    type="button"
                                >
                                    {temaEscuro ? '☀️ Claro' : '🌙 Escuro'}
                                </button>
                            </div>

                            <div className="card-body p-0">
                                {carregando ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Carregando...</span>
                                        </div>
                                        <p className="mt-2 text-muted mb-0">Carregando dados da API...</p>
                                    </div>
                                ) : (
                                    <ul className="list-group list-group-flush">
                                        {tarefas.map((item) => (
                                            <li 
                                                key={item.id} 
                                                className="list-group-item d-flex justify-content-between align-items-center py-3"
                                            >
                                                <span className="me-3 text-truncate">{item.title}</span>
                                                <span className={`badge rounded-pill ${
                                                    item.completed 
                                                        ? 'bg-success-subtle text-success border border-success' 
                                                        : 'bg-warning-subtle text-warning border border-warning'
                                                }`}>
                                                    {item.completed ? 'Concluída' : 'Pendente'}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App