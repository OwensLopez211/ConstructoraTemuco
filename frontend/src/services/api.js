// src/services/api.js
import axios from 'axios';
import { authService } from './authService'; // Importar authService

// Configuración base de Axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Para Laravel Sanctum
});

// Interceptor para requests - agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses - manejar errores globalmente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no es un reintento de la solicitud de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marcar la solicitud como reintentada

      try {
        // Intentar refrescar el token
        const refreshResponse = await authService.refreshToken();

        // Si el refresco es exitoso, actualizar el token en localStorage y en los headers de la instancia de api
        if (refreshResponse.success) {
          localStorage.setItem('token', refreshResponse.token);
          api.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.token}`;

          // Actualizar el header de autorización en la solicitud original y reintentarla
          originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.token}`;
          return api(originalRequest); // Reintentar la solicitud original
        }
      } catch (refreshError) {
        // Si falla el refresco (ej. token de refresco inválido), limpiar token y redirigir al login
        console.error('Error al refrescar token:', refreshError);
        localStorage.removeItem('token');
        // Solo redirigir si no estamos ya en login
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError); // Rechazar con el error de refresco
      }
    }

    // Manejo de otros errores (403, 422, 500, etc.)
    // Error 403: No autorizado
    if (error.response?.status === 403) {
      console.error('No tienes permisos para esta acción');
    }
    
    // Error 422: Errores de validación
    if (error.response?.status === 422) {
      console.error('Errores de validación:', error.response.data.errors);
    }
    
    // Error 500: Error del servidor
    if (error.response?.status === 500) {
      console.error('Error interno del servidor');
    }

    return Promise.reject(error); // Rechazar con el error original si no fue 401 manejado
  }
);

export default api;