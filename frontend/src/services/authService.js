// src/services/authService.js
import { api } from './api';

export const authService = {
  // Login - Compatible con tu API Laravel (SIN CSRF)
  async login(credentials) {
    try {
      // Hacer login directo (sin CSRF para API tokens)
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });
      
      // Tu API devuelve: { success: true, message: "Login exitoso", data: { user: {...}, token: "..." } }
      if (response.data.success) {
        return {
          success: true,
          user: response.data.data.user,
          token: response.data.data.token,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message || 'Error en el login');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Manejar diferentes tipos de errores
      if (error.response?.status === 422) {
        // Errores de validación
        const errors = error.response.data.errors; // Obtener errores específicos si existen
        if (errors) {
          // Devolver un objeto con los errores por campo
          return { success: false, errors: errors };
        } else {
          // Si no hay errores específicos, devolver un mensaje genérico
          return { success: false, error: error.response?.data?.message || 'Error de validación' };
        }
      } else if (error.response?.status === 401) {
        // Credenciales incorrectas
        throw new Error('Email o contraseña incorrectos');
      } else if (error.response?.data?.message) {
        // Error específico del servidor
        throw new Error(error.response.data.message);
      } else {
        // Error genérico
        throw new Error('Error de conexión. Intenta nuevamente.');
      }
    }
  },

  // Registro
  async register(userData) {
    try {      
      const response = await api.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
      });
      
      if (response.data.success) {
        return {
          success: true,
          user: response.data.data.user,
          token: response.data.data.token,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Register error:', error);
      
      if (error.response?.status === 422) {
        // Errores de validación específicos
        const errors = error.response.data.errors;
        if (errors) {
          const firstError = Object.values(errors)[0][0];
          throw new Error(firstError);
        }
        throw new Error('Por favor verifica los datos ingresados');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Error de conexión. Intenta nuevamente.');
      }
    }
  },

  // Logout
  async logout() {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      // Incluso si falla el logout en el servidor, limpiar localmente
      throw error;
    }
  },

  // Obtener datos del usuario autenticado
  async getUser() {
    try {
      const response = await api.get('/auth/me');
      
      if (response.data.success) {
        return response.data.data.user;
      } else {
        throw new Error('No se pudo obtener la información del usuario');
      }
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },

  // Verificar si el token es válido
  async verifyToken() {
    try {
      const userData = await this.getUser();
      return { valid: true, user: userData };
    } catch (error) {
      console.error('Error verificando token:', error);
      return { valid: false, user: null };
    }
  },

  // Refresh token (si tu API lo soporta)
  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh');
      
      if (response.data.success) {
        return {
          success: true,
          token: response.data.data.token,
          user: response.data.data.user
        };
      } else {
        throw new Error('No se pudo renovar el token');
      }
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error;
    }
  }
};