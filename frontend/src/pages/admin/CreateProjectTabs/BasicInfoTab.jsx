import React from 'react';

const BasicInfoTab = ({ formData, handleChange, errors, loading }) => {
  return (
    <div className="space-y-6">
      {/* Información Básica */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Información Básica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre del Proyecto */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Proyecto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${ errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300' }`}
              placeholder="Ej: Edificio Residencial Las Torres"
              disabled={loading}
              required
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.name[0]}
              </p>
            )}
          </div>

          {/* Tipo de Proyecto */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Proyecto <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${ errors.type ? 'border-red-300 bg-red-50' : 'border-gray-300' }`}
              disabled={loading}
              required
            >
              <option value="privado">Privado</option>
              <option value="gubernamental">Gubernamental</option>
            </select>
            {errors.type && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.type[0]}
              </p>
            )}
          </div>

          {/* Ubicación */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${ errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300' }`}
              placeholder="Ej: Temuco Centro"
              disabled={loading}
              required
            />
            {errors.location && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.location[0]}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoTab; 