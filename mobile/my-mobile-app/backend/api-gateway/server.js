const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// =========================================================
// MIDDLEWARES GLOBAIS
// =========================================================

// Habilita o CORS para permitir requisições de diferentes origens (web e mobile)
app.use(cors());

// Middleware para registrar no terminal o método e a URL de cada requisição recebida
app.use((req, res, next) => {
  console.log(`[GATEWAY 3000] Recebeu chamada: ${req.method} ${req.url}`);
  next();
});

// =========================================================
// REGRAS DE ROTEAMENTO (PROXY REVERSO)
// =========================================================

// Endereço base do servidor backend central
const BACKEND_URL = 'http://127.0.0.1:3003';

// Tratador genérico para capturar erros de conexão entre o Gateway e o backend
const onError = (servico) => (err, req, res) => {
  console.error(`[GATEWAY ERRO ${servico}]`, err.message);
  res.status(502).json({ error: `Falha na comunicação com o backend (${servico}).` });
};

// Redireciona chamadas com prefixo /api/auth removendo o trecho da URL antes de enviar ao backend
app.use('/api/auth', createProxyMiddleware({ 
  target: BACKEND_URL, 
  changeOrigin: true,
  pathRewrite: { '^/api/auth': '' }, 
  onError: onError('AUTH')
}));

// Redireciona chamadas com prefixo /api/perfil removendo o trecho da URL antes de enviar ao backend
app.use('/api/perfil', createProxyMiddleware({ 
  target: BACKEND_URL, 
  changeOrigin: true,
  pathRewrite: { '^/api/perfil': '' },
  onError: onError('PERFIL')
}));

// Proxy coringa: repassa qualquer outra rota (/produtos, /rh/solicitacoes, etc.) sem alterar a URL original
app.use(createProxyMiddleware({ 
  target: BACKEND_URL, 
  changeOrigin: true,
  onError: onError('GERAL')
}));

// =========================================================
// INICIALIZAÇÃO DO SERVIDOR
// =========================================================

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway (Portaria InfoEstoque) rodando na porta ${PORT}`);
});