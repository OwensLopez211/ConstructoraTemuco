// src/components/auth/LoginForm.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { useToast } from '../ui/Toast/useToast.js';
import LogoNav from '../../../public/LogoNav2.png'; // Asegúrate de que la ruta sea correcta

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
      // Normalizar el email a minúsculas antes de enviar
      const credentialsToSend = {
        ...formData,
        email: formData.email.toLowerCase()
      };

      const result = await login(credentialsToSend);
      
      if (result.success) {
        setSuccessMessage(result.message || 'Login exitoso');
        // Mostrar toast de éxito
        showToast(result.message || 'Login exitoso', 'success');
        
        // Mostrar mensaje de éxito brevemente antes de redirigir
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
        
      } else if (result.errors) {
        // Si hay errores específicos por campo, actualiza el estado de errores
        setErrors(result.errors); // Mantener esto para mostrar errores bajo los campos
        // Usar el mensaje general de la API en lugar de uno fijo
        setGeneralError(result.message || 'Las credenciales proporcionadas son incorrectas.'); // Usar mensaje de API

        // Mostrar un único toast usando el mensaje de la API
        showToast(result.message || 'Las credenciales proporcionadas son incorrectas.', 'error'); // Usar mensaje de API para toast
        
      } else {
        // Si no hay errores específicos, muestra el error general como toast
        setGeneralError(result.error);
        showToast(result.error, 'error');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      // Mostrar toast de error de conexión
      showToast('Error de conexión. Intenta nuevamente.', 'error');
      setGeneralError('Error de conexión. Intenta nuevamente.'); // Mensaje general opcional
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <img 
            src={LogoNav} 
            alt="Logo Constructora Temuco" 
            className="mx-auto w-72 h-72 object-contain mb-4 rounded-xl"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido</h1>
          <p className="text-gray-600">Accede a tu panel administrativo</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mensaje de éxito */}
              {successMessage && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm font-medium text-emerald-800">{successMessage}</p>
                  </div>
                </div>
              )}
              
              {/* Mensaje de error */}
              {generalError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200/50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm font-medium text-red-800">{generalError}</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-5">
                <Input
                  label="Correo electrónico"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="admin@constructoratemuco.cl"
                  required
                  autoComplete="email"
                  disabled={loading}
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-gray-50/50 focus:bg-white"
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
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                    disabled={loading}
                  />
                  <span className="ml-2 block text-sm text-gray-700">Recordarme</span>
                </label>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500 rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </span>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Protegido con encriptación de nivel empresarial
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;