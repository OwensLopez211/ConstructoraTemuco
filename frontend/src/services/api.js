import axios from 'axios';

// 🌐 CONFIGURACIÓN EXPLÍCITA DE PRODUCCIÓN
const PRODUCTION_API_URL = 'https://ctemuco.cl/api';

// Debug: Verificar variables de entorno
console.log('🔧 Variables de entorno:');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('Mode:', import.meta.env.MODE);
console.log('🎯 URL EXPLÍCITA DE PRODUCCIÓN:', PRODUCTION_API_URL);

// Configuración base de Axios - EXPLÍCITA PARA PRODUCCIÓN
export const api = axios.create({
  // ✅ URL EXPLÍCITA - SIEMPRE HTTPS://CTEMUCO.CL/API
  baseURL: PRODUCTION_API_URL,
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Importante para Laravel
  },
  timeout: 30000, // 30 segundos
  withCredentials: false, // false para tokens Bearer
});

// Debug: Confirmar URL final configurada
console.log('🌐 API Base URL EXPLÍCITA configurada:', api.defaults.baseURL);
console.log('✅ Configuración forzada a HTTPS para producción');

// Interceptor para requests - agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    // Buscar token en localStorage
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug: Log de cada request con URL completa
    console.log(`🚀 Request EXPLÍCITO to: ${config.baseURL}${config.url}`);
    console.log(`🔒 Usando HTTPS: ${config.baseURL.startsWith('https')}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses - manejar errores globalmente
api.interceptors.response.use(
  (response) => {
    // Debug: Log successful responses
    console.log(`✅ Response EXITOSA from: ${response.config.url}`);
    console.log(`🔒 Respuesta vía HTTPS: ${response.config.baseURL.startsWith('https')}`);
    return response;
  },
  async (error) => {
    console.error('❌ Response error:', error.response?.status, error.response?.data);
    console.error('🌐 Error en URL:', error.config?.baseURL + error.config?.url);
    
    const originalRequest = error.config;
    
    // Si el error es 401 y no es un reintento
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Limpiar tokens inválidos
      localStorage.removeItem('auth_token');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirigir a login solo si no estamos ya ahí
      if (!window.location.pathname.includes('/login')) {
        console.log('🔒 Token inválido, redirigiendo a login...');
        window.location.href = '/login';
      }
    }
    
    // Manejo específico de errores CORS
    if (error.code === 'ERR_NETWORK') {
      console.error('🚫 Error de red - posible problema CORS');
      console.error('🔍 Verifica que el backend esté en HTTPS y con CORS configurado');
    }
    
    // Manejo de otros errores
    if (error.response?.status === 403) {
      console.error('🚫 No tienes permisos para esta acción');
    }
    
    if (error.response?.status === 422) {
      console.error('📝 Errores de validación:', error.response.data.errors);
    }
    
    if (error.response?.status === 500) {
      console.error('🔥 Error interno del servidor');
    }
    
    return Promise.reject(error);
  }
);

// 🛡️ VERIFICACIÓN ADICIONAL DE SEGURIDAD
if (!api.defaults.baseURL.startsWith('https://')) {
  console.warn('⚠️ ADVERTENCIA: La API no está configurada con HTTPS');
  console.warn('🔒 URL actual:', api.defaults.baseURL);
  console.warn('✅ URL esperada: https://ctemuco.cl/api');
}

// Función helper para verificar configuración
export const verifyApiConfig = () => {
  console.log('🔍 VERIFICACIÓN DE CONFIGURACIÓN:');
  console.log('• Base URL:', api.defaults.baseURL);
  console.log('• Es HTTPS:', api.defaults.baseURL.startsWith('https://'));
  console.log('• Dominio correcto:', api.defaults.baseURL.includes('ctemuco.cl'));
  console.log('• Timeout:', api.defaults.timeout);
  console.log('• Headers:', api.defaults.headers);
  
  return {
    isHttps: api.defaults.baseURL.startsWith('https://'),
    isCorrectDomain: api.defaults.baseURL.includes('ctemuco.cl'),
    fullUrl: api.defaults.baseURL
  };
};

export default api;