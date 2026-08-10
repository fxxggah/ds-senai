require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db'); // Conexão com o MySQL

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// --- ROTAS DE AUTENTICAÇÃO (NOVO) ---
// ==========================================

// 1. Rota POST: Cadastrar novo funcionário
app.post('/cadastro', async (req, res) => {
  // O frontend envia: nome, email, senha, setor
  const { nome, email, senha, setor } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios!" });
  }

  try {
    const query = 'INSERT INTO usuarios (nome, email, senha, setor) VALUES (?, ?, ?, ?)';
    await db.query(query, [nome, email, senha, setor || 'Geral']);

    console.log(`[AUTH] Novo usuário cadastrado: ${nome}`);
    res.status(201).json({ message: "Funcionário cadastrado com sucesso!" });

  } catch (erro) {
    console.error(erro);
    // Verifica se o erro é de e-mail duplicado no banco (código ER_DUP_ENTRY do MySQL)
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Este e-mail já está cadastrado no sistema." });
    }
    res.status(500).json({ error: "Erro ao cadastrar funcionário no banco de dados." });
  }
});

// 2. Rota POST: Fazer Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios!" });
  }

  try {
    // Busca no banco se existe alguém com este email e senha
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    const [linhas] = await db.query(query, [email, senha]);

    // Se o array de linhas for maior que 0, o usuário foi encontrado
    if (linhas.length > 0) {
      const usuarioEncontrado = linhas[0];
      console.log(`[AUTH] Login efetuado por: ${usuarioEncontrado.email}`);
      
      // Retorna sucesso e os dados do usuário para o frontend usar (como o nome no Alert)
      res.status(200).json({
        message: "Login aprovado",
        usuario: {
          id: usuarioEncontrado.id,
          nome: usuarioEncontrado.nome,
          email: usuarioEncontrado.email,
          setor: usuarioEncontrado.setor
        }
      });
    } else {
      // Se não encontrou, credenciais inválidas
      res.status(401).json({ error: "E-mail ou senha incorretos." });
    }
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
});


// ==========================================
// --- ROTAS DE PRODUTOS (MANTIDAS) ---
// ==========================================

// Rota GET: Buscar produtos do MySQL
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

// Rota POST: Gravar produto real no MySQL
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

// Rota DELETE: Remover produto por ID no MySQL
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