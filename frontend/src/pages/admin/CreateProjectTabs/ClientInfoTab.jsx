import React from 'react';

const ClientInfoTab = ({ formData, handleChange, errors, loading }) => {
  return (
    <div className="space-y-6">
      {/* Información del Cliente */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Información del Cliente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre del Cliente */}
          <div>
            <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Cliente <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="client_name"
              id="client_name"
              value={formData.client_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${ errors.client_name ? 'border-red-300 bg-red-50' : 'border-gray-300' }`}
              placeholder="Ej: Juan Pérez Construcciones"
              disabled={loading}
              required
            />
            {errors.client_name && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.client_name[0]}
              </p>
            )}
          </div>

          {/* Contacto del Cliente */}
          <div>
            <label htmlFor="client_contact" className="block text-sm font-medium text-gray-700 mb-2">
              Contacto del Cliente
            </label>
            <input
              type="text"
              name="client_contact"
              id="client_contact"
              value={formData.client_contact}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${ errors.client_contact ? 'border-red-300 bg-red-50' : 'border-gray-300' }`}
              placeholder="Ej: +56 9 1234 5678 o email@cliente.com"
              disabled={loading}
            />
            {errors.client_contact && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.client_contact[0]}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfoTab; 