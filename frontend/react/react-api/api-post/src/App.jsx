import { useState } from "react"

function App() {

  const [tela, setTela] = useState('login')
  const [nome, setNome] = useState('')

  const [emailLogin, setEmailLogin] = useState('')
  const [senhaLogin, setSenhaLogin] = useState('')

  const [emailCadastro, setEmailCadastro] = useState('')
  const [senhaCadastro, setSenhaCadastro] = useState('')

  const [setor, setSetor] = useState('Desenvolvimento')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  const lidarCadastro = (e) => {
    e.preventDefault()
    setCarregando(true)
    setMensagem('')
    fetch("https://reqres.in/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailCadastro,
        senha: senhaCadastro,
        nome: nome,
        setor: setor
      })
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao cadastrar, dados inválidos')
        }
        return resposta.json()
      })
      .then((dados) => {
        setMensagem('Operador cadastrado com sucesso!')
        setCarregando(false)
      })
      .catch((erro) => {
        setMensagem(erro.message)
        setCarregando(false)
      })
  }

  const lidarLogin = (e) => {
    e.preventDefault()
    setCarregando(true)
    setMensagem('')
    fetch("https://reqres.in/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailLogin,
        senha: senhaLogin,
      })
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao logar, dados inválidos')
        }
        return resposta.json()
      })
      .then((dados) => {
        setMensagem('Operador logado com sucesso!')
        setCarregando(false)
      })
      .catch((erro) => {
        setMensagem(erro.message)
        setCarregando(false)
      })
  }

  return (
    <>
      <h1>Sistema do Operador</h1>

      {mensagem && <p>{mensagem}</p>}

      {tela === 'login' ? (
        <form onSubmit={lidarLogin}>
          <h3>Acesso ao sistema</h3>
          
          <div>
            <label>E-mail</label>
            <input 
              type="email" 
              value={emailLogin} 
              onChange={(e) => setEmailLogin(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label>Senha</label>
            <input 
              type="password" 
              value={senhaLogin} 
              onChange={(e) => setSenhaLogin(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" disabled={carregando}>
            {carregando ? 'Autenticando...' : 'Entrar no Sistema'}
          </button>

          <p>
            Não tem uma conta?{' '}
            <button 
              type="button" 
              onClick={() => { setTela('cadastro'); setMensagem('') }}
            >
              Cadastre-se
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={lidarCadastro}>
          <h3>Cadastro de Operador</h3>

          <div>
            <label>Nome</label>
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label>E-mail</label>
            <input 
              type="email" 
              value={emailCadastro} 
              onChange={(e) => setEmailCadastro(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label>Senha</label>
            <input 
              type="password" 
              value={senhaCadastro} 
              onChange={(e) => setSenhaCadastro(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label>Setor</label>
            <select value={setor} onChange={(e) => setSetor(e.target.value)}>
              <option value="Desenvolvimento">Desenvolvimento</option>
              <option value="Suporte">Suporte</option>
              <option value="Operações">Operações</option>
            </select>
          </div>

          <button type="submit" disabled={carregando}>
            {carregando ? 'Cadastrando...' : 'Cadastrar Operador'}
          </button>

          <p>
            Já tem uma conta?{' '}
            <button 
              type="button" 
              onClick={() => { setTela('login'); setMensagem('') }}
            >
              Voltar ao Login
            </button>
          </p>
        </form>
      )}
    </>
  )
}

export default App