// src/utils/validators.js
export const validators = {
    // Validación de email
    email: (value) => {
      if (!value) return 'El email es requerido';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'El email no es válido';
      return null;
    },
  
    // Validación de contraseña
    password: (value, minLength = 8) => {
      if (!value) return 'La contraseña es requerida';
      if (value.length < minLength) return `La contraseña debe tener al menos ${minLength} caracteres`;
      
      // Verificar que tenga al menos una mayúscula, una minúscula y un número
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
      }
      
      return null;
    },
  
    // Validación de confirmación de contraseña
    passwordConfirmation: (value, originalPassword) => {
      if (!value) return 'Confirma tu contraseña';
      if (value !== originalPassword) return 'Las contraseñas no coinciden';
      return null;
    },
  
    // Validación de nombre
    name: (value, minLength = 2) => {
      if (!value || !value.trim()) return 'El nombre es requerido';
      if (value.trim().length < minLength) return `El nombre debe tener al menos ${minLength} caracteres`;
      return null;
    },
  
    // Validación de texto requerido
    required: (value, fieldName = 'Este campo') => {
      if (!value || (typeof value === 'string' && !value.trim())) {
        return `${fieldName} es requerido`;
      }
      return null;
    },
  
    // Validación de número
    number: (value, fieldName = 'Este campo') => {
      if (value === '' || value === null || value === undefined) {
        return `${fieldName} es requerido`;
      }
      if (isNaN(value)) return `${fieldName} debe ser un número válido`;
      return null;
    },
  
    // Validación de rango numérico
    numberRange: (value, min, max, fieldName = 'Este campo') => {
      const numberError = validators.number(value, fieldName);
      if (numberError) return numberError;
      
      const num = parseFloat(value);
      if (min !== undefined && num < min) return `${fieldName} debe ser mayor o igual a ${min}`;
      if (max !== undefined && num > max) return `${fieldName} debe ser menor o igual a ${max}`;
      return null;
    },
  
    // Validación de URL
    url: (value, fieldName = 'La URL') => {
      if (!value) return `${fieldName} es requerida`;
      try {
        new URL(value);
        return null;
      } catch {
        return `${fieldName} no es válida`;
      }
    },
  
    // Validación de teléfono chileno
    phoneChile: (value) => {
      if (!value) return 'El teléfono es requerido';
      const phoneRegex = /^(\+56|56)?[2-9]\d{8}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        return 'El teléfono no es válido (formato: +56912345678)';
      }
      return null;
    }
  };
  
  // src/utils/constants.js
  export const constants = {
    // URLs de la API
    api: {
      baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
      appUrl: import.meta.env.VITE_APP_URL || 'http://localhost:8000',
    },
  
    // Configuración de la aplicación
    app: {
      name: import.meta.env.VITE_APP_NAME || 'Constructora Temuco',
      env: import.meta.env.VITE_APP_ENV || 'development',
      debug: import.meta.env.VITE_APP_DEBUG === 'true',
    },
  
    // Tipos de proyectos
    projectTypes: {
      GUBERNAMENTAL: 'gubernamental',
      PRIVADO: 'privado',
    },
  
    // Etiquetas para mostrar
    projectTypeLabels: {
      gubernamental: 'Gubernamental',
      privado: 'Privado',
    },
  
    // Estados de proyectos
    projectStatuses: {
      PLANNING: 'planning',
      IN_PROGRESS: 'in_progress',
      COMPLETED: 'completed',
      ON_HOLD: 'on_hold',
    },
  
    // Etiquetas de estados
    projectStatusLabels: {
      planning: 'En Planificación',
      in_progress: 'En Progreso',
      completed: 'Completado',
      on_hold: 'En Pausa',
    },
  
    // Configuración de paginación
    pagination: {
      defaultPageSize: 10,
      pageSizeOptions: [5, 10, 20, 50],
    },
  
    // Configuración de archivos
    files: {
      maxImageSize: 5 * 1024 * 1024, // 5MB
      allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
      maxImagesPerProject: 10,
    },
  
    // Mensajes de error comunes
    errors: {
      network: 'Error de conexión. Verifica tu internet e intenta nuevamente.',
      unauthorized: 'No tienes permisos para realizar esta acción.',
      validation: 'Por favor revisa los campos marcados en rojo.',
      server: 'Error interno del servidor. Intenta más tarde.',
      notFound: 'El recurso solicitado no fue encontrado.',
    },
  
    // Mensajes de éxito
    success: {
      created: 'Creado exitosamente',
      updated: 'Actualizado exitosamente',
      deleted: 'Eliminado exitosamente',
      saved: 'Guardado exitosamente',
    },
  
    // Configuración de localStorage
    storage: {
      tokenKey: 'auth_token',
      userKey: 'user_data',
      preferencesKey: 'user_preferences',
    },
  };
  
  // src/utils/formatters.js
  export const formatters = {
    // Formatear moneda chilena
    currency: (amount) => {
      if (!amount && amount !== 0) return '-';
      return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
      }).format(amount);
    },
  
    // Formatear números
    number: (num) => {
      if (!num && num !== 0) return '-';
      return new Intl.NumberFormat('es-CL').format(num);
    },
  
    // Formatear fechas
    date: (date, options = {}) => {
      if (!date) return '-';
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      
      return new Intl.DateTimeFormat('es-CL', { ...defaultOptions, ...options }).format(dateObj);
    },
  
    // Formatear fecha y hora
    datetime: (date) => {
      if (!date) return '-';
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      return new Intl.DateTimeFormat('es-CL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);
    },
  
    // Formatear fecha relativa (hace X tiempo)
    timeAgo: (date) => {
      if (!date) return '-';
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      const now = new Date();
      const diffInSeconds = Math.floor((now - dateObj) / 1000);
  
      if (diffInSeconds < 60) return 'Hace un momento';
      if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
      if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
      if (diffInSeconds < 2592000) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
      
      return formatters.date(dateObj);
    },
  
    // Truncar texto
    truncate: (text, maxLength = 100) => {
      if (!text) return '';
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },
  
    // Capitalizar primera letra
    capitalize: (text) => {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
  
    // Formatear teléfono chileno
    phone: (phone) => {
      if (!phone) return '-';
      const cleaned = phone.replace(/\D/g, '');
      
      if (cleaned.length === 9) {
        return `+56 ${cleaned.substring(0, 1)} ${cleaned.substring(1, 5)} ${cleaned.substring(5)}`;
      }
      
      return phone;
    },
  
    // Formatear tamaño de archivo
    fileSize: (bytes) => {
      if (!bytes) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    },
  };