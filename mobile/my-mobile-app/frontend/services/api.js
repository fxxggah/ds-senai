import axios from 'axios';

// IPv4 da sua máquina na rede local
const MEU_IP = '10.226.170.175'; 

const api = axios.create({
  baseURL: `http://${MEU_IP}:3000`, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;