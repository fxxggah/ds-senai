import axios from 'axios';

const api = axios.create({
  // ⚠️ IMPORTANTE: Troque o IP abaixo pelo IPv4 que você anotou no Passo 2!
  // ATENÇÃO: A porta aqui é a 3003 (porta do backend do estoque_info)
  baseURL: 'http://10.90.108.139:3003',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;