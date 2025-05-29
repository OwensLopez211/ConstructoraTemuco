import React from 'react';

const AdditionalDetailsTab = ({ formData, handleChange, errors, loading }) => {
  return (
    <div className="space-y-6">
      {/* Detalles Adicionales */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Detalles Adicionales</h2>
        <div className="space-y-6">
          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción del Proyecto
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none ${ errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300' }`}
              placeholder="Describe el proyecto, objetivos, características especiales..."
              disabled={loading}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.description[0]}
              </p>
            )}
          </div>

          {/* Notas */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notas Adicionales
            </label>
            <textarea
              name="notes"
              id="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none ${ errors.notes ? 'border-red-300 bg-red-50' : 'border-gray-300' }`}
              placeholder="Notas internas, consideraciones especiales, recordatorios..."
              disabled={loading}
            />
            {errors.notes && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.notes[0]}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetailsTab; 