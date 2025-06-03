// src/pages/admin/ProjectList.jsx
import { useState, useEffect, useCallback } from 'react';
import { projectService } from '../../services/projectService';
import { useNavigate } from 'react-router-dom';
import ProjectDetailsModal from '../../components/admin/projects/ProjectDetailsModal';
import DeleteConfirmationModal from '../../components/admin/projects/DeleteConfirmationModal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Building2, 
  User, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  Clock,
  Star
} from 'lucide-react';
import ProjectCard from '../../components/admin/projects/ProjectCard';
import { useToast } from '../../components/ui/Toast/useToast';

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('cards');
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 15,
    total: 0,
    last_page: 1
  });
  const [meta, setMeta] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // Estados para el modal de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Usar el hook useToast
  const { showToast } = useToast();

  // Cargar proyectos del backend
  const loadProjects = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await projectService.getProjects({
        search: searchTerm,
        type: filterType !== 'all' ? filterType : undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        page: filters.page !== undefined ? filters.page : pagination.current_page,
        per_page: pagination.per_page,
      });

      setProjects(response.data);
      setPagination(response.pagination);
      setMeta(response.meta);
    } catch (err) {
      setError(err.message);
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterType, filterStatus, pagination.current_page, pagination.per_page]);

  // Cargar proyectos al montar el componente
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Recargar cuando cambien los filtros
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadProjects({ page: 1 });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterType, filterStatus, loadProjects]);

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
      label: 'En Progreso'
    },
    completado: { 
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      text: 'text-green-700',
      label: 'Completado'
    },
    pausado: { 
      color: 'from-amber-400 to-amber-500',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      label: 'Pausado'
    },
    cancelado: { 
      color: 'from-red-400 to-red-500',
      bg: 'bg-red-50',
      text: 'text-red-700',
      label: 'Cancelado'
    }
  }[status] || { 
    color: 'from-gray-400 to-gray-500',
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    label: status
  });

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-400 to-green-500';
    if (progress >= 50) return 'from-blue-400 to-blue-500';
    if (progress >= 25) return 'from-orange-400 to-orange-500';
    return 'from-red-400 to-red-500';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'short'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'No definido';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      notation: 'compact'
    }).format(amount);
  };

  // Función para iniciar el proceso de eliminación
  const handleDeleteProject = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjectToDelete(project);
      setIsDeleteModalOpen(true);
    }
  };

  // Función para confirmar la eliminación
  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;
    
    try {
      await projectService.deleteProject(projectToDelete.id);
      loadProjects();
      
      // Mostrar mensaje de éxito (puedes usar tu sistema de toasts aquí)
      showToast('Proyecto eliminado exitosamente', 'success');
      
    } catch (err) {
      console.error('Error al eliminar proyecto:', err);
      showToast(`Error al eliminar proyecto: ${err.message}`, 'error');
      throw err; // Re-throw para que el modal maneje el estado de loading
    }
  };

  // Función para cerrar el modal de eliminación
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  // Manejar cambio de estado activo/inactivo
  const handleToggleStatus = async (projectId) => {
    try {
      await projectService.toggleProjectStatus(projectId);
      loadProjects();
    } catch (err) {
      alert(`Error al cambiar estado: ${err.message}`);
    }
  };

  // Función para abrir el modal de detalles
  const handleViewDetails = (projectId) => {
    setSelectedProjectId(projectId);
    setIsDetailsModalOpen(true);
  };

  // Función para cerrar el modal de detalles
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedProjectId(null);
  };

  if (loading && projects.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar proyectos</h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <button 
              onClick={() => loadProjects()}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-h-screen overflow-hidden">
      {/* Header Fixed */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-0 z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Proyectos</h1>
            <p className="text-gray-600 mt-1">
              {projects.length} de {pagination.total} proyectos
              {meta.total_projects && (
                <span className="text-sm text-gray-500 ml-2">
                  • {meta.active_projects} activos • {meta.user_projects} propios
                </span>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Toggle View Mode */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'cards' 
                    ? 'bg-white shadow-sm text-green-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'table' 
                    ? 'bg-white shadow-sm text-green-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
              </button>
            </div>
            
            <button 
              onClick={() => navigate('/admin/proyectos/crear')}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              + Nuevo Proyecto
            </button>
          </div>
        </div>

        {/* Filtros Compactos */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-200"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-200"
          >
            <option value="all">Todos los tipos</option>
            <option value="gubernamental">Gubernamental</option>
            <option value="privado">Privado</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-200"
          >
            <option value="all">Todos los estados</option>
            <option value="en_progreso">En Progreso</option>
            <option value="completado">Completado</option>
            <option value="pausado">Pausado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Contenido principal con scroll */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-8">
        {/* Cards View */}
        {viewMode === 'cards' && (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {projects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  handleViewDetails={handleViewDetails}
                  handleDeleteProject={handleDeleteProject}
                  navigate={navigate}
                  getTypeConfig={getTypeConfig}
                  getStatusConfig={getStatusConfig}
                  getProgressColor={getProgressColor}
                  formatDate={formatDate}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Building2 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron proyectos
            </h3>
            <p className="text-gray-500 mb-6">
              Intenta cambiar los filtros o crear un nuevo proyecto
            </p>
            <button 
              onClick={() => navigate('/admin/proyectos/crear')}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              + Crear Primer Proyecto
            </button>
          </motion.div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imágenes</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      // En ProjectList.jsx, donde tienes la tabla, cambiar:
                      {project.images && project.images.length > 0 ? (
                        <img 
                          src={project.images[0].thumbnail_url || `https://ctemuco.cl/storage/${project.images[0].path}`}
                          alt={`Imagen de ${project.name}`}
                          className="w-16 h-12 object-cover rounded"
                          onError={(e) => {
                            console.log('❌ Error loading project image:', e.target.src);
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">Sin imágenes</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeConfig(project.type).color} text-white`}>
                        {project.type_name}
                       </span>
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                       {project.client_name}
                     </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                       <button
                        onClick={(e) => { e.stopPropagation(); handleViewDetails(project.id); }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                       >
                         Ver Detalles
                       </button>
                    </td>
                  </tr>
                ))}
                 {!loading && projects.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        No se encontraron proyectos.
                      </td>
                    </tr>
                 )}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginación */}
        {pagination.last_page > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px bg-white border border-gray-200" aria-label="Pagination">
              <button
                onClick={() => loadProjects({ page: pagination.current_page - 1 })}
                disabled={pagination.current_page <= 1}
                className="relative inline-flex items-center px-3 py-2 rounded-l-xl border-r border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span className="sr-only">Anterior</span>
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Páginas */}
              {[...Array(Math.min(pagination.last_page, 7))].map((_, i) => {
                let pageNumber;
                if (pagination.last_page <= 7) {
                  pageNumber = i + 1;
                } else {
                  const current = pagination.current_page;
                  const total = pagination.last_page;
                  
                  if (current <= 4) {
                    pageNumber = i + 1;
                  } else if (current >= total - 3) {
                    pageNumber = total - 6 + i;
                  } else {
                    pageNumber = current - 3 + i;
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => loadProjects({ page: pageNumber })}
                    aria-current={pagination.current_page === pageNumber ? 'page' : undefined}
                    className={`relative inline-flex items-center px-4 py-2 border-r border-gray-200 text-sm font-medium transition-colors duration-200 ${
                      pagination.current_page === pageNumber
                        ? 'z-10 bg-green-50 text-green-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => loadProjects({ page: pagination.current_page + 1 })}
                disabled={pagination.current_page >= pagination.last_page}
                className="relative inline-flex items-center px-3 py-2 rounded-r-xl text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span className="sr-only">Siguiente</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        )}
      </div>
      
      {/* Modal de Detalles */}
      {isDetailsModalOpen && (
        <ProjectDetailsModal
          projectId={selectedProjectId}
          isOpen={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
        />
      )}

      {/* Modal de Confirmación de Eliminación */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeleteProject}
        projectName={projectToDelete?.name || ''}
      />
    </div>
  );
};

export default ProjectList;