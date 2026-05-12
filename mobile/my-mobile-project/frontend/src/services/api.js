import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.90.189.230:3000',
});

export default api;