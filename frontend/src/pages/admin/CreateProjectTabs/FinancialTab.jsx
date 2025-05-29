import React from 'react';

const FinancialTab = ({ formData, handleChange, errors, loading }) => {
  return (
    <div className="space-y-6">
      {/* Información Financiera y Cronograma */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Financiero y Cronograma</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Presupuesto */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Presupuesto (CLP)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="budget"
                id="budget"
                value={formData.budget}
                onChange={handleChange}
                min="0"
                className={`w-full pl-8 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${ errors.budget ? 'border-red-300 bg-red-50' : 'border-gray-300' }`}
                placeholder="1500000"
                disabled={loading}
              />
            </div>
            {errors.budget && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.budget[0]}
              </p>
            )}
          </div>

          {/* Fecha de Inicio */}
          <div>
            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Inicio
            </label>
            <input
              type="date"
              name="start_date"
              id="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${ errors.start_date ? 'border-red-300 bg-red-50' : 'border-gray-300' }`}
              disabled={loading}
            />
            {errors.start_date && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.start_date[0]}
              </p>
            )}
          </div>

          {/* Fecha Estimada de Fin */}
          <div>
            <label htmlFor="estimated_end_date" className="block text-sm font-medium text-gray-700 mb-2">
              Fecha Estimada de Fin
            </label>
            <input
              type="date"
              name="estimated_end_date"
              id="estimated_end_date"
              value={formData.estimated_end_date}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${ errors.estimated_end_date ? 'border-red-300 bg-red-50' : 'border-gray-300' }`}
              disabled={loading}
            />
            {errors.estimated_end_date && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.estimated_end_date[0]}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTab; 