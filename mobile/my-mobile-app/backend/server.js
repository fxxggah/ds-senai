require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Importando o Multer
const db = require('./db'); // Conexão com o MySQL

const app = express();

// Configuração do Multer para guardar a foto na memória RAM
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// ==========================================
// --- ROTAS DE AUTENTICAÇÃO E PERFIL ---
// ==========================================

// 1. Rota POST: Cadastrar novo funcionário
app.post('/cadastro', async (req, res) => {
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
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    const [linhas] = await db.query(query, [email, senha]);

    if (linhas.length > 0) {
      const usuarioEncontrado = linhas[0];
      console.log(`[AUTH] Login efetuado por: ${usuarioEncontrado.email}`);
      
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
      res.status(401).json({ error: "E-mail ou senha incorretos." });
    }
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
});

// 3. Rota GET: Buscar perfil do usuário por ID (Atualizado para buscar a foto)
app.get('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT id, nome, email, setor, turno, foto FROM usuarios WHERE id = ?';
    const [linhas] = await db.query(query, [id]);

    if (linhas.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const usuario = linhas[0];
    if (usuario.foto) {
      usuario.foto = usuario.foto.toString('base64');
    }

    res.status(200).json(usuario);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao buscar dados do perfil." });
  }
});

// 4. Rota PATCH: Atualizar APENAS a foto (NOVO)
app.patch('/usuarios/:id/foto', upload.single('foto'), async (req, res) => {
  try {
      const fotoBuffer = req.file ? req.file.buffer : null;
      
      if (!fotoBuffer) {
          return res.status(400).json({ error: "Nenhuma foto foi enviada." });
      }

      await db.query('UPDATE usuarios SET foto = ? WHERE id = ?', [fotoBuffer, req.params.id]);
      res.json({ message: "Foto do perfil atualizada com sucesso!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao salvar a foto" });
  }
});

// 5. Rota DELETE: Excluir Perfil do Usuário (NOVO)
app.delete('/usuarios/:id', async (req, res) => {
  try {
      await db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
      res.json({ message: "Conta excluída." });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir conta." });
  }
});

// 6. Rota PUT: Atualizar Setor e Turno
app.put('/usuarios/:id', async (req, res) => {
  const { setor, turno } = req.body;
  
  try {
      await db.query(
        'UPDATE usuarios SET setor = ?, turno = ? WHERE id = ?', 
        [setor, turno, req.params.id]
      );
      res.json({ message: "Perfil atualizado com sucesso!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
});


// ==========================================
// --- ROTAS DE PRODUTOS E SUPORTE ---
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

app.post('/suporte', async (req, res) => {
  const { operador, setor, descricao } = req.body;
  
  if (!operador || !setor || !descricao) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  try {
    await db.query(
      'INSERT INTO chamados (operador, setor, descricao) VALUES (?, ?, ?)', 
      [operador, setor, descricao]
    );
    console.log("Chamada enviada com sucesso!");
    res.status(201).json({ message: "Chamado registrado." });
  } catch (erro) {
    res.status(500).json({ error: "Erro ao registrar o chamado." });
  }
});


// Iniciando o servidor na porta 3003
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor InfoEstoque rodando na porta ${PORT} 🚀`);
});