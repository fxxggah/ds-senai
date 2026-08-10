// 1. Carregar as variáveis do arquivo .env (DEVE ser na primeira linha)
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// 2. Importar a conexão com o MySQL
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// --- ENDPOINTS (Rotas da API) ---

// GET /perfil/:id (Consultar dados do operador no MySQL)
app.get('/perfil/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [linhas] = await db.query(
      'SELECT id, nome, email, setor, turno FROM operadores WHERE id = ?', 
      [id]
    );

    if (linhas.length > 0) {
      res.status(200).json(linhas[0]);
    } else {
      res.status(404).json({ error: "Operador não encontrado." });
    }
  } catch (erro) {
    console.error("Erro no MySQL:", erro);
    res.status(500).json({ error: "Erro ao consultar banco." });
  }
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
  console.log(`[PERFIL] Consulta de status solicitada.`);

  res.status(200).json({
    fabrica: "Unidade SENAI - Indústria 4.0",
    status: "Operacional",
    turnosAtivos: ["Manhã", "Tarde", "Noite"]
  });
});

// Iniciando o servidor na Porta 3002
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Serviço de Perfil rodando na porta ${PORT} 🚀`);
});