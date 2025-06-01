// src/components/admin/projects/DeleteConfirmationModal.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  projectName}) => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
      setConfirmText('');
    } catch (error) {
      console.error('Error al eliminar:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      onClose();
      setConfirmText('');
    }
  };

  const isConfirmTextValid = confirmText.toLowerCase() === 'eliminar';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      Confirmar Eliminación
                    </h3>
                    <p className="text-red-100 text-sm">
                      Esta acción no se puede deshacer
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    disabled={isDeleting}
                    className="ml-3 text-white/80 hover:text-white transition-colors disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed">
                    ¿Estás seguro de que quieres eliminar el proyecto{' '}
                    <span className="font-semibold text-gray-900">"{projectName}"</span>?
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Se eliminarán todos los datos, imágenes y archivos asociados.
                  </p>
                </div>

                {/* Confirmation Input */}
                <div className="mb-6">
                  <label htmlFor="confirmText" className="block text-sm font-medium text-gray-700 mb-2">
                    Para confirmar, escribe <span className="font-semibold text-red-600">"eliminar"</span>
                  </label>
                  <input
                    id="confirmText"
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    disabled={isDeleting}
                    placeholder="Escribe 'eliminar' para confirmar"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 disabled:bg-gray-50 disabled:opacity-50"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={!isConfirmTextValid || isDeleting}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isDeleting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Eliminando...
                      </>
                    ) : (
                      'Eliminar Proyecto'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;