import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/', // Cambia esto según tu configuración
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
