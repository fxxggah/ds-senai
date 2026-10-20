import { useState } from 'react'
import './App.css'

function App() {
  const defaultFoto = "/profile-default.jpeg"
  const [foto, setFoto] = useState(defaultFoto)
  const [filtro, setFiltro] = useState(false)
  const [modoEscuro, setModoEscuro] = useState(true)
  const [zoom, setZoom] = useState(false)

  const isDefault = foto === defaultFoto
  const corBorda = isDefault ? 'borda-reset' : 'borda-sucesso'

  return (
    <div className={`container ${modoEscuro ? 'dark-mode' : ''}`}>
      <h1>Perfil do Usuário</h1>
      
      <img 
        src={foto} 
        alt="Profile" 
        onClick={() => setZoom(!zoom)}
        className={`foto-perfil ${filtro ? 'pb' : ''} ${zoom ? 'zoom' : ''} ${corBorda}`} 
      />

      <div className='botoes'>
        <button onClick={() => setFoto("/myself.jpeg")}>Simular Upload</button>
        
        <button onClick={() => setFiltro(!filtro)}>
          {filtro ? "Colorir" : "P&B"}
        </button>

        <button onClick={() => setModoEscuro(!modoEscuro)}>
          {modoEscuro ? "Light Mode" : "Dark Mode"}
        </button>

        {!isDefault && (
          <button className="btn-excluir" onClick={() => setFoto(defaultFoto)}>
            Limpar Foto
          </button>
        )}
      </div>
    </div>
  )
}

export default App