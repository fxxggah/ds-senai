require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const db = require('./db');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve o painel do RH em HTML

// Middleware de Log para monitorar conexões no terminal
app.use((req, res, next) => {
  console.log(`[BACKEND 3003] Requisição recebida: ${req.method} ${req.url}`);
  next();
});

// ==========================================
// --- ROTAS DE RECUPERAÇÃO DE SENHA E RH ---
// ==========================================

// 🚀 POST /recuperar (App Mobile pede ajuda ao RH)
app.post('/recuperar', async (req, res) => {
  const { email } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'E-mail corporativo não encontrado.' });
    }

    await db.query('INSERT INTO solicitacoes_senha (email) VALUES (?)', [email]);
    
    console.log(`[RH] Solicitação de senha registrada para: ${email}`);
    res.status(200).json({ message: 'Solicitação enviada ao RH com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: 'Erro ao registrar solicitação.' });
  }
});

// 🚀 GET /rh/solicitacoes (Listar chamados pendentes para a tela do RH no navegador)
app.get('/rh/solicitacoes', async (req, res) => {
  try {
    const [solicitacoes] = await db.query(
      "SELECT * FROM solicitacoes_senha WHERE status = 'PENDENTE' ORDER BY data_solicitacao DESC"
    );
    res.status(200).json(solicitacoes);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: 'Erro ao buscar solicitações.' });
  }
});

// 🚀 PUT /rh/resetar-senha (RH redefine a senha do usuário)
app.put('/rh/resetar-senha', async (req, res) => {
  const { email, idSolicitacao } = req.body;
  const SENHA_PADRAO = 'senai123';

  try {
    await db.query('UPDATE usuarios SET senha = ? WHERE email = ?', [SENHA_PADRAO, email]);
    await db.query("UPDATE solicitacoes_senha SET status = 'RESOLVIDO' WHERE id = ?", [idSolicitacao]);

    console.log(`[RH] Senha do e-mail ${email} resetada para '${SENHA_PADRAO}'`);
    res.status(200).json({ message: `Senha redefinida com sucesso para: ${SENHA_PADRAO}` });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: 'Erro ao redefinir senha.' });
  }
});

// ==========================================
// --- ROTAS DE AUTENTICAÇÃO E PERFIL ---
// ==========================================

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

app.post('/login', async (req, res) => {
  console.log('[AUTH] Dados recebidos para login:', req.body);
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios!" });
  }

  try {
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    const [linhas] = await db.query(query, [email, senha]);

    if (linhas.length > 0) {
      const usuarioEncontrado = linhas[0];
      console.log(`[AUTH] Login aprovado para: ${usuarioEncontrado.email}`);
      
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
      console.log(`[AUTH] Falha de login para: ${email} (Credenciais incorretas)`);
      res.status(401).json({ error: "E-mail ou senha incorretos." });
    }
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
});

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

app.delete('/usuarios/:id', async (req, res) => {
  try {
      await db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
      res.json({ message: "Conta excluída." });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir conta." });
  }
});

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

app.get('/produtos', async (req, res) => {
  try {
    const [produtos] = await db.query('SELECT * FROM produtos');
    res.status(200).json(produtos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao buscar produtos no banco de dados." });
  }
});

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

    res.status(201).json({
      message: "Produto cadastrado com sucesso no banco!",
      id: resultado.insertId
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao salvar produto no banco." });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [resultado] = await db.query('DELETE FROM produtos WHERE id = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

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
    res.status(201).json({ message: "Chamado registrado." });
  } catch (erro) {
    res.status(500).json({ error: "Erro ao registrar o chamado." });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor InfoEstoque rodando na porta ${PORT} 🚀`);
});