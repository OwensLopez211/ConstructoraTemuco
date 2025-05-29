// src/components/auth/LoginForm.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { useToast } from '../ui/Toast/useToast.js';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Limpiar mensajes generales
    if (generalError) setGeneralError('');
    if (successMessage) setSuccessMessage('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setGeneralError('');
    setSuccessMessage('');
    
    try {
      const result = await login(formData);
      
      if (result.success) {
        setSuccessMessage(result.message || 'Login exitoso');
        
        // Mostrar mensaje de éxito brevemente antes de redirigir
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
        
      } else if (result.errors) {
        // Si hay errores específicos por campo, actualiza el estado de errores y muestra toasts
        setErrors(result.errors);
        setGeneralError('Por favor corrige los errores en el formulario.'); // Mensaje general opcional
        
        // Mostrar toast por cada error de campo
        Object.values(result.errors).forEach(messages => {
          messages.forEach(message => {
            showToast(message, 'error');
          });
        });
        
      } else {
        // Si no hay errores específicos, muestra el error general como toast
        setGeneralError(result.error);
        showToast(result.error, 'error');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setGeneralError('Error de conexión. Intenta nuevamente.'); // Mensaje general opcional
      showToast('Error de conexión. Intenta nuevamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accede al panel administrativo
          </p>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mensaje de éxito */}
          {successMessage && (
            <div className="p-3 rounded-md bg-green-50 border border-green-200">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            </div>
          )}
          
          {/* Mensaje de error */}
          {generalError && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-600">{generalError}</p>
              </div>
            </div>
          )}
          
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="admin@constructoratemuco.cl"
            required
            autoComplete="email"
            disabled={loading}
          />
          
          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
            required
            autoComplete="current-password"
            disabled={loading}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                disabled={loading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>
            
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-green-600 hover:text-green-500"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full bg-green-600 hover:bg-green-700 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                ¿No tienes cuenta?
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Crear una cuenta nueva
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;