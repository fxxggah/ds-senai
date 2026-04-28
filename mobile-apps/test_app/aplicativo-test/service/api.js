import axios from "axios"

const api = axios.create({
    baseURL: "http://10.90.134.138:3000/api",
    headers: {"Content-Type": "application/json"},
    // Opcional
    timeout: 5000,
});

export default api;