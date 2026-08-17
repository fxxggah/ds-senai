const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// =========================================================
// MIDDLEWARES GLOBAIS
// =========================================================

// Habilita o CORS para permitir requisições do aplicativo mobile/web
app.use(cors());

// NOTA DE MANUTENÇÃO: Não adicione 'app.use(express.json())' aqui no Gateway!
// Isso corrompe o corpo (body) de requisições repassadas via proxy e uploads de arquivos.

// Middleware de log: exibe no terminal do Gateway todas as requisições que chegam
app.use((req, res, next) => {
  console.log(`[GATEWAY 3000] Recebeu chamada: ${req.method} ${req.url}`);
  next();
});

// =========================================================
// REGRAS DE ROTEAMENTO (PROXY REVERSO)
// =========================================================

// Endereço do servidor backend principal (Altere aqui se a porta/IP do backend mudar)
const BACKEND_URL = 'http://localhost:3003';

// 1. Mapeamento de Autenticação e Recuperação de Senha
// Entrada:  http://IP:3000/api/auth/login
// Saída:    http://localhost:3003/login
app.use('/api/auth', createProxyMiddleware({ 
    target: BACKEND_URL, 
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }, // Remove o prefixo '/api/auth' antes de repassar
    onError: (err, req, res) => {
      console.error('[GATEWAY ERRO AUTH]', err.message);
      res.status(502).json({ error: 'Gateway não conseguiu se comunicar com o serviço na porta 3003.' });
    }
}));

// 2. Mapeamento de Perfil e Gerenciamento de Usuários
// Entrada:  http://IP:3000/api/perfil/usuarios/1
// Saída:    http://localhost:3003/usuarios/1
app.use('/api/perfil', createProxyMiddleware({ 
    target: BACKEND_URL, 
    changeOrigin: true,
    pathRewrite: { '^/api/perfil': '' }, // Remove o prefixo '/api/perfil' antes de repassar
    onError: (err, req, res) => {
      console.error('[GATEWAY ERRO PERFIL]', err.message);
      res.status(502).json({ error: 'Gateway não conseguiu se comunicar com o serviço na porta 3003.' });
    }
}));

// =========================================================
// INICIALIZAÇÃO DO SERVIDOR
// =========================================================

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway (Portaria InfoEstoque) rodando na porta ${PORT}`);
});