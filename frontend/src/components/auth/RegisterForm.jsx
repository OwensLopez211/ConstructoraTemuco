// src/pages/auth/LoginPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoginForm } from '../../components/auth/LoginForm';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  // No mostrar la página si está cargando o ya autenticado
  if (loading || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo de la empresa */}
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto"
            src="/logo-constructora.png"
            alt="Constructora Temuco"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Constructora Temuco
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Panel Administrativo
          </p>
        </div>

        {/* Formulario de login */}
        <LoginForm />

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            © 2024 Constructora Temuco. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};