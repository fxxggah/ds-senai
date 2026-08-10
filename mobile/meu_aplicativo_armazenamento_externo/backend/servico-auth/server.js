// A primeira linha DEVE ser a importação do dotenv
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importamos nossa conexão com o banco

const app = express();
app.use(cors());
app.use(express.json());

// --- ENDPOINTS (Rotas da API) ---

// POST /cadastro (Gravar no Banco)
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha, setor } = req.body;

  try {
    // O '?' evita ataques de SQL Injection (segurança!)
    const query = 'INSERT INTO operadores (nome, email, senha, setor) VALUES (?, ?, ?, ?)';
    const [resultado] = await db.query(query, [nome, email, senha, setor]);

    console.log(`[AUTH] Operador cadastrado com ID: ${resultado.insertId}`);
    res.status(201).json({ message: "Operador cadastrado com sucesso!", id: resultado.insertId });
  } catch (erro) {
    console.error(erro);
    // Se o erro for 1062, significa que o UNIQUE do email barrou a operação
    if (erro.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: "Este e-mail corporativo já está em uso." });
    } else {
      res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
});

// POST /login (Ler do Banco)
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const query = 'SELECT * FROM operadores WHERE email = ? AND senha = ?';
    const [linhas] = await db.query(query, [email, senha]);

    // O 'linhas' é uma matriz. Se length > 0, achamos o usuário.
    if (linhas.length > 0) {
      console.log(`[AUTH] Login autorizado: ${email}`);
      res.status(200).json({ message: "Login autorizado!", usuario: linhas[0] });
    } else {
      console.log(`[AUTH] Login falhou: ${email}`);
      res.status(401).json({ error: "E-mail ou senha incorretos." });
    }
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serviço de Autenticação rodando na porta ${PORT}`);
});