const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- ENDPOINTS (Rotas da API) ---

// GET /perfil (Consultar dados do operador)
app.get('/perfil', (req, res) => {
  console.log(`[PERFIL] Consulta de dados solicitada.`);

  // Simulação dos dados que futuramente virão do Banco de Dados para serem mostradas no frontend (celular)
  const dadosOperador = {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@industria.com",
    setor: "Usinagem",
    turno: "Manhã"
  };

  res.status(200).json(dadosOperador);
});

// PUT /perfil (Atualizar dados do operador)
app.put('/perfil', (req, res) => {
  const { setor, turno } = req.body;
  console.log(`[PERFIL] Atualizando setor para ${setor} e turno para ${turno}`);

  res.status(200).json({ message: "Dados atualizados com sucesso!" });
});

// DELETE /perfil (Remover operador do sistema)
app.delete('/perfil', (req, res) => {
  console.log(`[PERFIL] Solicitação de exclusão de conta recebida.`);

  res.status(200).json({ message: "Operador removido do sistema corporativo." });
});

// GET /status (Consultar status)
app.get('/status', (req, res) => {
  console.log(`[PERFIL] Consulta de dados solicitada.`);

  res.status(200).json({
    fabrica: "Unidade SENAI - Indústria 4.0",
    status: "Operacional",
    turnosAtivos: ["Manhã", "Tarde", "Noite"]
  });
});


// Iniciando o servidor na Porta 3002
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Serviço de Perfil rodando na porta ${PORT} 🚀`);
});