import React from 'react';

const ImagesTab = ({ formData, handleChange, errors, loading }) => {
  // TODO: Implementar lógica para subir y previsualizar imágenes
  return (
    <div className="space-y-6">
      {/* Agregar Imágenes */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Agregar Imágenes del Proyecto</h2>
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 005.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-2 text-sm">Drag and drop o haz clic para subir imágenes</p>
          {/* Aquí podrías agregar un input file */}
          {/* <input type="file" multiple className="sr-only" onChange={handleFileSelect} /> */}
        </div>
        {/* TODO: Mostrar previsualizaciones de imágenes */}
        {/* TODO: Manejar errores de carga/subida de imágenes */}
      </div>
    </div>
  );
};

export default ImagesTab; 