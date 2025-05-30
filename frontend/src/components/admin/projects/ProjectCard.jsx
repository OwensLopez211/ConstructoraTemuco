// src/components/admin/projects/ProjectCard.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Building2, 
  Eye, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Camera,
  Heart,
  Edit,
  Trash2
} from 'lucide-react';

const ProjectCard = ({ 
  project, 
  index, 
  handleViewDetails, 
  handleDeleteProject, 
  navigate, 
  getTypeConfig, 
  getStatusConfig, 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showCarouselControls, setShowCarouselControls] = useState(false);

  const typeConfig = getTypeConfig(project.type);
  const statusConfig = getStatusConfig(project.status);
  const TypeIcon = typeConfig.icon;

  const nextImage = () => {
    if (project.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Card Container */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        
        {/* Header con imagen */}
        <div 
          className="relative h-48 overflow-hidden bg-gray-100"
          onMouseEnter={() => setShowCarouselControls(true)}
          onMouseLeave={() => setShowCarouselControls(false)}
        >
          {project.images && project.images.length > 0 ? (
            <>
              {/* Imagen principal */}
              <img 
                src={project.images[currentImageIndex].thumbnail_url || project.images[currentImageIndex].url}
                alt={`Imagen ${currentImageIndex + 1} de ${project.name}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay gradiente sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Controles de carrusel */}
              {project.images.length > 1 && (
                <AnimatePresence>
                  {showCarouselControls && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-between p-4"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="w-8 h-8 bg-white/90 text-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="w-8 h-8 bg-white/90 text-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors duration-200"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Indicadores de imagen */}
              {project.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        idx === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Contador de imágenes */}
              {project.images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  {currentImageIndex + 1}/{project.images.length}
                </div>
              )}
            </>
          ) : (
            // Placeholder cuando no hay imágenes
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <Building2 className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-500 text-sm">Sin imágenes</p>
              </div>
            </div>
          )}

          {/* Badge de tipo */}
          <div className="absolute top-3 left-3">
            <div className={`${typeConfig.bg} ${typeConfig.text} px-3 py-1.5 rounded-full shadow-sm border border-white/30`}>
              <div className="flex items-center gap-1.5">
                <TypeIcon className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">
                  {project.type_name || (project.type === 'gubernamental' ? 'Gov' : 'Private')}
                </span>
              </div>
            </div>
          </div>

          {/* Botón de like */}
          <div className="absolute top-3 right-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm border border-white/30 hover:bg-white transition-colors duration-200"
            >
              <Heart className={`w-4 h-4 transition-colors duration-200 ${
                isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'
              }`} />
            </button>
          </div>
        </div>

        {/* Contenido del card */}
        <div className="p-5 space-y-4">
          {/* Título y cliente */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-gray-900 leading-tight line-clamp-2">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium truncate">{project.client_name}</span>
            </div>
          </div>

          {/* Badge de estado */}
          <div className="flex justify-center">
            <span className={`${statusConfig.bg} ${statusConfig.text} px-4 py-2 rounded-full text-sm font-semibold border border-gray-100`}>
              {statusConfig.label}
            </span>
          </div>

          {/* Botón principal */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(project.id);
            }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Detalles</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Botones secundarios */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin/proyectos/editar/${project.id}`);
              }}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2.5 rounded-lg font-medium transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
              <span className="text-sm">Editar</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProject(project.id);
              }}
              className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2.5 rounded-lg font-medium transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;