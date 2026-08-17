const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors());

// Log global do Gateway
app.use((req, res, next) => {
  console.log(`[GATEWAY 3000] Recebeu chamada: ${req.method} ${req.url}`);
  next();
});

// ---------------------------------------------------------
// REGRAS DE ROTEAMENTO (PROXY REVERSO)
// ---------------------------------------------------------

// 1. Rotas de Autenticação e Recuperação -> Redireciona para o Backend na porta 3003
app.use('/api/auth', createProxyMiddleware({ 
    target: 'http://localhost:3003', 
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' },
    onError: (err, req, res) => {
      console.error('[GATEWAY ERRO AUTH]', err.message);
      res.status(502).json({ error: 'Gateway não conseguiu se comunicar com o serviço na porta 3003.' });
    }
}));

// 2. Rotas de Perfil e Usuários -> Redireciona para o Backend na porta 3003
app.use('/api/perfil', createProxyMiddleware({ 
    target: 'http://localhost:3003', 
    changeOrigin: true,
    pathRewrite: { '^/api/perfil': '' },
    onError: (err, req, res) => {
      console.error('[GATEWAY ERRO PERFIL]', err.message);
      res.status(502).json({ error: 'Gateway não conseguiu se comunicar com o serviço na porta 3003.' });
    }
}));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway (Portaria InfoEstoque) rodando na porta ${PORT}`);
});