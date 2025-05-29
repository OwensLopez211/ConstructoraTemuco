// src/components/ui/Toast/useToast.js
import { useCallback } from 'react';

export const useToast = () => {
  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    if (window.showToast) {
      return window.showToast(message, type, duration);
    } else {
      // Fallback si el ToastContainer no está montado
      console.log(`Toast ${type}: ${message}`);
    }
  }, []);

  return { showToast };
};