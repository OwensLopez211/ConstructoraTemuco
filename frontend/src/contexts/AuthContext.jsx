// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));

  // Verificar autenticación al cargar la app
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('auth_token');
      
      if (savedToken) {
        try {
          // Verificar que el token sea válido
          const verificationResult = await authService.verifyToken();
          
          if (verificationResult.valid) {
            setUser(verificationResult.user);
            setToken(savedToken);
          } else {
            // Token inválido, limpiar
            localStorage.removeItem('auth_token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Error durante la verificación inicial del token:', error);
          // Si verifyToken lanza un error (más allá de un 401 que debería manejar el interceptor), limpiar de todas formas
          localStorage.removeItem('auth_token');
          setToken(null);
          setUser(null);
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);

      const response = await authService.login(credentials);

      if (response.success) {
        // Guardar token y usuario SOLO si el login fue exitoso
        localStorage.setItem('auth_token', response.token);
        setToken(response.token);
        setUser(response.user);

        return {
          success: true,
          message: response.message || 'Login exitoso',
          user: response.user
        };
      } else {
        // Si el servicio devuelve success: false (como en errores 422 con detalles)
        // Retornar el objeto de respuesta directamente, que ya contiene success: false y los errores/mensajes
        return response; // Esto pasará { success: false, errors: ... } o { success: false, error: ... } a LoginForm
      }

    } catch (error) {
      // Este catch se activará para errores lanzados (como 401 o errores de conexión genéricos manejados en authService)
      console.error('Login error en AuthContext:', error); // Log más descriptivo

      // Retornar un objeto de fallo con el mensaje de error
      return {
        success: false,
        error: error.message || 'Error de autenticación desconocido'
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      const response = await authService.register(userData);
      
      // Auto-login después del registro exitoso
      localStorage.setItem('auth_token', response.token);
      setToken(response.token);
      setUser(response.user);
      
      return { 
        success: true, 
        message: response.message || 'Registro exitoso',
        user: response.user
      };
      
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        error: error.message || 'Error en el registro' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Intentar hacer logout en el servidor
      await authService.logout();
      
    } catch (error) {
      console.error('Logout error:', error);
      // Continuar con logout local incluso si falla el servidor
    } finally {
      // Limpiar estado local siempre
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const refreshAuth = async () => {
    try {
      const userData = await authService.getUser();
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Refresh auth error:', error);
      // Si falla, limpiar autenticación
      await logout();
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    refreshAuth,
    isAuthenticated: !!user && !!token,
    // Información adicional del usuario desde tu API
    userRole: user?.role || null,
    userName: user?.name || '',
    userEmail: user?.email || '',
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  
  return context;
};

export default AuthContext;