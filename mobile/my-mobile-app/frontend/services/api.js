import axios from 'axios';

// =========================================================
// CONFIGURAÇÃO DO CLIENTE HTTP (AXIOS)
// Centraliza as requisições enviadas ao API Gateway
// =========================================================

// Endereço IP local (IPv4) do servidor Gateway
const MEU_IP = '10.226.170.175'; 

// Instância customizada do Axios apontando para a porta do Gateway (3000)
const api = axios.create({
  baseURL: `http://${MEU_IP}:3000`, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;