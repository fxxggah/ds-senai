require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db'); // Conexão com o MySQL

const app = express();

app.use(cors());
app.use(express.json());

// --- ROTAS DA API ---

// 1. Rota GET: Buscar produtos do MySQL
app.get('/produtos', async (req, res) => {
  try {
    const [produtos] = await db.query('SELECT * FROM produtos');
    console.log('[INFOESTOQUE] Produtos buscados no banco.');
    res.status(200).json(produtos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao buscar produtos no banco de dados." });
  }
});

// 2. Rota POST: Gravar produto real no MySQL
app.post('/produtos', async (req, res) => {
  const { nome, categoria, quantidade, preco } = req.body;

  if (!nome || quantidade === undefined) {
    return res.status(400).json({ error: "Nome e quantidade são obrigatórios!" });
  }

  try {
    const query = 'INSERT INTO produtos (nome, categoria, quantidade, preco) VALUES (?, ?, ?, ?)';
    const [resultado] = await db.query(query, [
      nome, 
      categoria || 'Geral', 
      Number(quantidade), 
      Number(preco) || 0.00
    ]);

    console.log(`[INFOESTOQUE] Produto cadastrado com ID: ${resultado.insertId}`);

    res.status(201).json({
      message: "Produto cadastrado com sucesso no banco!",
      id: resultado.insertId
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao salvar produto no banco." });
  }
});

// 3. Rota DELETE: Remover produto por ID no MySQL
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [resultado] = await db.query('DELETE FROM produtos WHERE id = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    console.log(`[INFOESTOQUE] Produto ID ${id} removido.`);
    res.status(200).json({ message: "Produto removido com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao deletar produto." });
  }
});

// Iniciando o servidor na porta 3003
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor InfoEstoque rodando na porta ${PORT} 🚀`);
});