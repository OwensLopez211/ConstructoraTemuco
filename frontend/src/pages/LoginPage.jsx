// src/pages/auth/LoginPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  // Mostrar loading spinner mejorado
  if (loading || isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner más elegante */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-blue-200"></div>
            <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* El LoginForm ahora maneja todo el layout, incluyendo el fondo */}
      <LoginForm />
      
      {/* Footer absoluto en la parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 text-center py-4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm">
        <p className="text-xs text-gray-500">
          © 2024 Constructora Temuco. Todos los derechos reservados.
        </p>
      </div>
    </>
  );
};

export default LoginPage;