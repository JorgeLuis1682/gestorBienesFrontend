import axios from 'axios';

// Crear una instancia de axios
const api = axios.create({
  baseURL: '/api',
});

// Variable para controlar si hay una petición de refresh en curso
let isRefreshing = false;
// Cola de peticiones que fallaron por token expirado
let failedQueue = [];

// Función para procesar la cola de peticiones fallidas
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor para las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para las respuestas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no es una petición de refresh
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('refresh')
    ) {
      if (isRefreshing) {
        // Si ya hay un refresh en curso, encolar la petición
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await api.post('/refresh/', {
          refresh: refreshToken,
        });

        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        // Actualizar el token en la petición original
        originalRequest.headers.Authorization = `Bearer ${access}`;

        // Procesar la cola de peticiones fallidas
        processQueue(null, access);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Si falla el refresh, redirigir al login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
