// src/components/ui/Toast/ToastContainer.jsx
import { useState } from 'react';
import Toast from './Toast';

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    
    // Añadir el nuevo toast al final para que sea el último en el array
    // React renderizará el último elemento más abajo en un flex-direction: column normal.
    // Con flex-direction: column-reverse en el contenedor, el último en el array aparece arriba.
    setToasts(prev => [...prev, newToast]);
    
    // Eliminar toasts antiguos si hay demasiados para evitar sobrecarga
    setToasts(prev => prev.slice(Math.max(prev.length - 5, 0))); // Mantener solo los últimos 5

    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Hacer disponible la función addToast globalmente
  // @ts-ignore
  window.showToast = addToast;

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 pt-8 flex flex-col items-center space-y-2">
      {toasts.map((toast) => (
        <div key={toast.id}>
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;

