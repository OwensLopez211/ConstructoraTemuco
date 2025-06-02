import { api } from './api';

export const authService = {
  // Login - Compatible con tu API Laravel
  async login(credentials) {
    try {
      console.log('🔑 Intentando login con:', credentials.email);
      
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });
      
      console.log('✅ Respuesta de login:', response.data);
      
      // Tu API devuelve: { success: true, message: "Login exitoso", data: { user: {...}, token: "..." } }
      if (response.data.success) {
        // Guardar token con nombre consistente
        localStorage.setItem('auth_token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        console.log('💾 Token guardado exitosamente');
        
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
      console.error('❌ Login error:', error);
      
      // Manejar diferentes tipos de errores
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        if (errors) {
          return { success: false, errors: errors };
        } else {
          return { success: false, error: error.response?.data?.message || 'Error de validación' };
        }
      } else if (error.response?.status === 401) {
        throw new Error('Email o contraseña incorrectos');
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error('Error de conexión. Verifica que el servidor esté funcionando.');
      } else {
        throw new Error('Error de conexión. Intenta nuevamente.');
      }
    }
  },

  // Registro
  async register(userData) {
    try {
      console.log('📝 Intentando registro para:', userData.email);
      
      const response = await api.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
      });
      
      if (response.data.success) {
        // Guardar token después del registro
        localStorage.setItem('auth_token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
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
      console.error('❌ Register error:', error);
      
      if (error.response?.status === 422) {
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
      console.log('🚪 Cerrando sesión...');
      
      // Intentar logout en el servidor
      await api.post('/auth/logout');
      
      console.log('✅ Logout exitoso en servidor');
    } catch (error) {
      console.error('⚠️ Error en logout del servidor:', error);
      // Continuar con limpieza local aunque falle el servidor
    } finally {
      // Limpiar siempre el localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('🧹 localStorage limpiado');
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
      console.error('❌ Get user error:', error);
      throw error;
    }
  },

  // Verificar si el token es válido
  async verifyToken() {
    try {
      const userData = await this.getUser();
      return { valid: true, user: userData };
    } catch (error) {
      console.error('❌ Error verificando token:', error);
      return { valid: false, user: null };
    }
  },

  // Helpers para el estado local
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem('auth_token') || localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};