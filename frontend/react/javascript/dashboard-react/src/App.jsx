import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cockpit from './pages/Cockpit'
import GestaoLotes from './pages/GestaoLotes'

function App() {

  return (
    <>
      <Navbar>
        <Routes>
          
          <Route path="/" element={<Cockpit />} />
          <Route path="/lotes" element={<GestaoLotes />} />
          <Route path="/lotes/:id" element={<Prontuario />} />
        </Routes>
      </Navbar>
    </>
  )
}

export default App
