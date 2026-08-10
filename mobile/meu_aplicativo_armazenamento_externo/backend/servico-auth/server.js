// Importando as ferramentas
const express = require('express');
const cors = require('cors');

// Inicializando o aplicativo Express
const app = express();

// Configurações (Middlewares)
app.use(cors()); // Permite que o frontend (celular) conecte sem bloqueios
app.use(express.json()); // Ensina o servidor a entender dados no formato JSON

// --- ENDPOINTS (Rotas da API) ---

// POST /cadastro (Criar novo operador)
app.post('/cadastro', (req, res) => {
  // req.body contém os dados que o celular enviará
  const { nome, email, senha, setor } = req.body;
  
  console.log(`[AUTH] Recebido pedido de cadastro para: ${nome}`);
  
  // Simulação de resposta de sucesso (Código 201: Created)
  res.status(201).json({ message: "Operador cadastrado com sucesso!" });
});

// POST /login (Autenticar operador)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  
  console.log(`[AUTH] Tentativa de login: ${email}`);
  
  // Na próxima aula, verificaremos isso no Banco de Dados
  if (email && senha) {
    // Código 200: OK
    res.status(200).json({ message: "Login autorizado!", token: "12345" });
  } else {
    // Código 400: Bad Request (Erro do cliente)
    res.status(400).json({ error: "E-mail ou senha ausentes" });
  }
});

// POST /recuperar (Recuperar senha)
app.post('/recuperar', (req, res) => {
  const { email } = req.body;
  console.log(`[AUTH] Pedido de recuperação para: ${email}`);
  res.status(200).json({ message: "Instruções enviadas para o e-mail." });
});

// POST /logout (Encerrar sessão)
app.post('/logout', (req, res) => {
  const { email } = req.body;
  
  console.log(`[AUTH] Sessão encerrada para: ${email}`);
  
  res.status(200).json({
    message: "Sessão encerrada com sucesso!"
  });
});


// Iniciando o servidor na Porta 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serviço de Autenticação rodando na porta ${PORT} 🚀`);
});