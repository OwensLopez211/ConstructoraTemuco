import { useState, useEffect } from 'react';
import { projectService } from '../../../services/projectService';
import { useToast } from '../../ui/Toast/useToast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  DollarSign, 
  MapPin, 
  User, 
  Building2, 
  FileText, 
  Clock, 
  TrendingUp, 
  Phone, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  PauseCircle, 
  XCircle,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';

const ProjectDetailsModal = ({ projectId, isOpen, onClose }) => {
  const { showToast } = useToast();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    console.log('Modal useEffect triggered', { projectId, isOpen });
    if (!isOpen || !projectId) {
      console.log('Modal useEffect: Not open or no projectId', { projectId, isOpen });
      setProject(null);
      setError(null);
      return;
    }

    const fetchProjectDetails = async () => {
      console.log('Fetching project details for projectId:', projectId);
      setLoading(true);
      setError(null);
      try {
        const result = await projectService.getProject(projectId);
        console.log('Project service getProject result:', result);
        if (result.success && result.data && result.data.project) {
          console.log('Setting project data:', result.data.project);
          setProject(result.data.project);
        } else {
          console.error('Error in service response or no data.project:', result);
          setError(result.message || 'Error al cargar detalles del proyecto');
          showToast(result.message || 'Error al cargar detalles del proyecto', 'error');
        }
      } catch (err) {
        console.error('Caught error fetching project details:', err);
        setError(err.message || 'Error de conexión al cargar detalles');
        showToast(err.message || 'Error de conexión al cargar detalles', 'error');
      } finally {
        console.log('Fetch finished, loading set to false');
        setLoading(false);
      }
    };

    fetchProjectDetails();

    return () => {
       console.log('Modal useEffect cleanup', { projectId });
       setProject(null);
       setError(null);
       setLoading(true);
    };

  }, [projectId, isOpen, showToast]);

  // Configuraciones de tipo y estado
  const getTypeConfig = (type) => ({
    gubernamental: { 
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      icon: Building2
    },
    privado: { 
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      icon: User
    }
  }[type] || { 
    color: 'from-gray-500 to-gray-600',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    icon: Building2
  });

  const getStatusConfig = (status) => ({
    en_progreso: { 
      color: 'from-emerald-400 to-emerald-500',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      icon: Clock,
      label: 'En Progreso'
    },
    completado: { 
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      text: 'text-green-700',
      icon: CheckCircle,
      label: 'Completado'
    },
    pausado: { 
      color: 'from-amber-400 to-amber-500',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      icon: PauseCircle,
      label: 'Pausado'
    },
    cancelado: { 
      color: 'from-red-400 to-red-500',
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: XCircle,
      label: 'Cancelado'
    }
  }[status] || { 
    color: 'from-gray-400 to-gray-500',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    icon: AlertCircle,
    label: status
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'No definido';
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'No definido';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const nextImage = () => {
    if (project?.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project?.images && project.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  // Componente para secciones de información
  const InfoSection = ({ title, icon, children, className = "" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-gray-50 rounded-xl p-4 sm:p-6 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white rounded-lg p-2 shadow-sm">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  // Componente para items de información
  const InfoItem = ({ label, value, icon }) => (
    <div className="flex items-start gap-3 py-2">
      {icon && <div className="text-gray-500 mt-0.5 flex-shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-sm text-gray-900 break-words">{value}</p>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    {loading ? 'Cargando...' : project?.name || 'Detalles del Proyecto'}
                  </h2>
                  {project && (
                    <p className="text-sm text-gray-600 mt-1">
                      Cliente: {project.client_name}
                    </p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="ml-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-white transition-colors duration-200 flex-shrink-0"
                  disabled={loading}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Contenido del Modal con scroll */}
            <div className="flex-1 overflow-y-auto">
              {loading && (
                <div className="flex flex-col items-center justify-center py-16">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mb-4"
                  />
                  <p className="text-gray-600">Cargando detalles...</p>
                </div>
              )}

              {error && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 px-6"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar</h3>
                  <p className="text-red-600">{error}</p>
                </motion.div>
              )}

              {project && !loading && !error && (
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Galería de Imágenes */}
                  {project.images && project.images.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-900 rounded-xl overflow-hidden"
                    >
                      <div className="relative aspect-video sm:aspect-[2/1]">
                        <motion.img
                          key={currentImageIndex}
                          src={project.images[currentImageIndex].url || project.images[currentImageIndex].thumbnail_url}
                          alt={`Imagen ${currentImageIndex + 1} de ${project.name}`}
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Controles de navegación */}
                        {project.images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                            
                            {/* Indicadores */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                              {project.images.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setCurrentImageIndex(idx)}
                                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                    idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                  }`}
                                />
                              ))}
                            </div>
                            
                            {/* Contador de imágenes */}
                            <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" />
                              {currentImageIndex + 1} / {project.images.length}
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Estado y Progreso */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {(() => {
                          const statusConfig = getStatusConfig(project.status);
                          const StatusIcon = statusConfig.icon;
                          return (
                            <>
                              <div className={`${statusConfig.bg} rounded-lg p-2`}>
                                <StatusIcon className={`w-5 h-5 ${statusConfig.text}`} />
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Estado</p>
                                <p className="font-semibold text-gray-900">{statusConfig.label}</p>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                      
                      {project.progress_percentage !== undefined && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Progreso</span>
                            <span className="text-sm font-semibold text-gray-900">
                              {project.progress_percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress_percentage}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {(() => {
                          const typeConfig = getTypeConfig(project.type);
                          const TypeIcon = typeConfig.icon;
                          return (
                            <>
                              <div className={`${typeConfig.bg} rounded-lg p-2`}>
                                <TypeIcon className={`w-5 h-5 ${typeConfig.text}`} />
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Tipo</p>
                                <p className="font-semibold text-gray-900">{project.type_name || project.type}</p>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${project.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-sm text-gray-600">
                          {project.is_active ? 'Proyecto Activo' : 'Proyecto Inactivo'}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Información General */}
                  <InfoSection title="Información General" icon={<FileText className="w-5 h-5 text-gray-600" />}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoItem 
                        label="Ubicación" 
                        value={project.location || 'No especificada'} 
                        icon={<MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />} 
                      />
                      <InfoItem 
                        label="Cliente" 
                        value={project.client_name} 
                        icon={<User className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />} 
                      />
                      {project.client_contact && (
                        <InfoItem 
                          label="Contacto Cliente" 
                          value={project.client_contact} 
                          icon={<Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />} 
                        />
                      )}
                    </div>
                    
                    {project.description && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-600 mb-2">Descripción</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
                      </div>
                    )}
                  </InfoSection>

                  {/* Información Financiera y Cronograma */}
                  <InfoSection title="Cronograma y Presupuesto" icon={<Calendar className="w-5 h-5 text-gray-600" />}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InfoItem 
                        label="Presupuesto" 
                        value={project.formatted_budget || formatCurrency(project.budget)} 
                        icon={<DollarSign className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />} 
                      />
                      <InfoItem 
                        label="Fecha de Inicio" 
                        value={formatDate(project.start_date)} 
                        icon={<Calendar className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />} 
                      />
                      <InfoItem 
                        label="Fecha Estimada de Fin" 
                        value={formatDate(project.estimated_end_date)} 
                        icon={<Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />} 
                      />
                      {project.end_date && (
                        <InfoItem 
                          label="Fecha de Fin Real" 
                          value={formatDate(project.end_date)} 
                          icon={<CheckCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />} 
                        />
                      )}
                    </div>
                  </InfoSection>

                  {/* Gestor del Proyecto */}
                  {project.user && (
                    <InfoSection title="Gestor del Proyecto" icon={<User className="w-5 h-5 text-gray-600" />}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoItem 
                          label="Nombre" 
                          value={project.user.name} 
                          icon={<User className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />} 
                        />
                        <InfoItem 
                          label="Email" 
                          value={project.user.email} 
                          icon={<Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />} 
                        />
                        {project.user.role_name && (
                          <InfoItem 
                            label="Rol" 
                            value={project.user.role_name} 
                            icon={<Building2 className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />} 
                          />
                        )}
                      </div>
                    </InfoSection>
                  )}

                  {/* Notas */}
                  {project.notes && (
                    <InfoSection title="Notas Adicionales" icon={<FileText className="w-5 h-5 text-gray-600" />}>
                      <p className="text-sm text-gray-700 leading-relaxed">{project.notes}</p>
                    </InfoSection>
                  )}
                </div>
              )}
            </div>

            {/* Footer del Modal */}
            <div className="bg-gray-50 border-t border-gray-200 p-4 sm:p-6 flex-shrink-0">
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                  disabled={loading}
                >
                  Cerrar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;