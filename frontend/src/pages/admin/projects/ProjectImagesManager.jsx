// src/components/admin/projects/ProjectImagesManager.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  X, 
  Eye, 
  Star, 
  StarOff, 
  Trash2, 
  Image as ImageIcon,
  Download,
  ZoomIn,
  AlertCircle,
  CheckCircle,
  Plus
} from 'lucide-react';
import { projectService } from '../../../services/projectService';

const ProjectImagesManager = ({ projectId, editing }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  
  const fileInputRef = useRef(null);
  const dragRef = useRef(null);

  // Cargar imágenes del proyecto
  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await projectService.getProjectImages(projectId);
      setImages(response.data.images || []);
    } catch (err) {
      setError('Error al cargar imágenes: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      loadImages();
    }
  }, [projectId, loadImages]);

  // Limpiar mensajes después de un tiempo
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Manejar selección de archivos
  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isImage && isValidSize;
    });

    if (validFiles.length !== fileArray.length) {
      setError('Algunos archivos fueron ignorados. Solo se permiten imágenes menores a 10MB.');
    }

    // Crear previews
    const previews = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));

    setSelectedFiles(prev => [...prev, ...validFiles]);
    setPreviewImages(prev => [...prev, ...previews]);
  };

  // Manejar drag and drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  }, []);

  // Remover archivo seleccionado
  const removeSelectedFile = (indexToRemove) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setPreviewImages(prev => {
      const newPreviews = prev.filter((_, index) => index !== indexToRemove);
      // Limpiar URL del preview removido
      if (prev[indexToRemove]) {
        URL.revokeObjectURL(prev[indexToRemove].preview);
      }
      return newPreviews;
    });
  };

  // Subir imágenes
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setUploading(true);
      const formData = new FormData();
      
      selectedFiles.forEach((file) => {
        formData.append('images[]', file);
      });

      const response = await projectService.uploadProjectImages(projectId, formData);
      
      setSuccess(response.message);
      setSelectedFiles([]);
      setPreviewImages(prev => {
        // Limpiar URLs de previews
        prev.forEach(preview => URL.revokeObjectURL(preview.preview));
        return [];
      });
      
      // Recargar imágenes
      await loadImages();
      
    } catch (err) {
      setError('Error al subir imágenes: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Eliminar imagen
  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta imagen?')) return;

    try {
      await projectService.deleteProjectImage(projectId, imageId);
      setSuccess('Imagen eliminada exitosamente');
      await loadImages();
    } catch (err) {
      setError('Error al eliminar imagen: ' + err.message);
    }
  };

  // Establecer imagen principal
  const handleSetMainImage = async (imageId) => {
    try {
      await projectService.setMainProjectImage(projectId, imageId);
      setSuccess('Imagen principal establecida');
      await loadImages();
    } catch (err) {
      setError('Error al establecer imagen principal: ' + err.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-indigo-600" />
          Galería del Proyecto
          {images.length > 0 && (
            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {images.length} {images.length === 1 ? 'imagen' : 'imágenes'}
            </span>
          )}
        </h3>
      </div>

      {/* Mensajes de estado */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
        
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-4 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zona de subida (solo en modo edición) */}
      {editing && (
        <div className="mb-6">
          <div
            ref={dragRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              dragOver
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-25'
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Arrastra imágenes aquí o haz clic para seleccionar
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Formatos: JPG, JPEG, PNG, WEBP • Máximo: 10MB por imagen
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Seleccionar Imágenes
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
            </div>
          </div>

          {/* Preview de archivos seleccionados */}
          {previewImages.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">
                  Imágenes seleccionadas ({previewImages.length})
                </h4>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Subir Imágenes
                    </>
                  )}
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {previewImages.map((preview, index) => (
                  <div key={preview.id} className="relative group">
                    <img
                      src={preview.preview}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => removeSelectedFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lista de imágenes existentes */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : images.length > 0 ? (
        <div>
          <h4 className="font-medium text-gray-700 mb-4">
            Imágenes del proyecto
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200"
              >
                {/* Imagen */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.thumbnail_url || image.url}
                    alt={image.description || `Imagen ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                  />
                  
                  {/* Badge de imagen principal */}
                  {image.is_main && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Principal
                      </span>
                    </div>
                  )}

                  {/* Overlay con acciones */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      {/* Ver imagen */}
                      <button
                        onClick={() => setLightboxImage(image)}
                        className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors duration-200"
                        title="Ver imagen completa"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>

                      {editing && (
                        <>
                          {/* Establecer como principal */}
                          {!image.is_main && (
                            <button
                              onClick={() => handleSetMainImage(image.id)}
                              className="bg-yellow-500/90 text-white p-2 rounded-full hover:bg-yellow-500 transition-colors duration-200"
                              title="Establecer como imagen principal"
                            >
                              <Star className="w-4 h-4" />
                            </button>
                          )}

                          {/* Eliminar */}
                          <button
                            onClick={() => handleDeleteImage(image.id)}
                            className="bg-red-500/90 text-white p-2 rounded-full hover:bg-red-500 transition-colors duration-200"
                            title="Eliminar imagen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Información de la imagen */}
                <div className="p-3">
                  <p className="text-xs text-gray-500 truncate" title={image.original_name}>
                    {image.original_name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {image.formatted_size} • {image.dimensions}
                  </p>
                  {image.description && (
                    <p className="text-xs text-gray-600 mt-1 truncate" title={image.description}>
                      {image.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No hay imágenes en este proyecto
          </h3>
          <p className="text-gray-500 mb-4">
            {editing ? 'Comienza subiendo la primera imagen del proyecto' : 'Este proyecto aún no tiene imágenes'}
          </p>
        </div>
      )}

      {/* Lightbox para ver imágenes */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
              >
                <X className="w-8 h-8" />
              </button>
              
              <img
                src={lightboxImage.url}
                alt={lightboxImage.description || 'Imagen del proyecto'}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {lightboxImage.description && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                  <p className="text-center">{lightboxImage.description}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectImagesManager;