// src/pages/admin/ProjectList.jsx
import { useState, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import { useNavigate } from 'react-router-dom';
import ProjectDetailsModal from '../../components/admin/projects/ProjectDetailsModal';

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
  // Nuevo estado para el modal de detalles
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Cargar proyectos del backend
  const loadProjects = async (filters = {}) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await projectService.getProjects({
        search: searchTerm,
        type: filterType !== 'all' ? filterType : undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters
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
  };

  // Cargar proyectos al montar el componente
  useEffect(() => {
    loadProjects();
  }, []);

  // Recargar cuando cambien los filtros
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadProjects({ page: 1 });
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterType, filterStatus]);

  // Funciones de utilidad para mapear los datos del backend
  const getTypeLabel = (type) => ({
    gubernamental: 'Gubernamental',
    privado: 'Privado'
  }[type] || type);

  const getTypeColor = (type) => ({
    gubernamental: 'bg-blue-500',
    privado: 'bg-purple-500'
  }[type] || 'bg-gray-500');

  const getStatusLabel = (status) => ({
    en_progreso: 'En Progreso',
    completado: 'Completado',
    pausado: 'Pausado',
    cancelado: 'Cancelado'
  }[status] || status);

  const getStatusColor = (status) => ({
    en_progreso: 'bg-blue-500',
    completado: 'bg-green-500',
    pausado: 'bg-yellow-500',
    cancelado: 'bg-red-500'
  }[status] || 'bg-gray-500');

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-400 to-green-600';
    if (progress >= 50) return 'from-blue-400 to-blue-600';
    if (progress >= 25) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
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

  // Manejar eliminación de proyecto
  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      return;
    }

    try {
      await projectService.deleteProject(projectId);
      loadProjects(); // Recargar la lista
      alert('Proyecto eliminado exitosamente');
    } catch (err) {
      alert(`Error al eliminar proyecto: ${err.message}`);
    }
  };

  // Manejar cambio de estado activo/inactivo
  const handleToggleStatus = async (projectId) => {
    try {
      await projectService.toggleProjectStatus(projectId);
      loadProjects(); // Recargar la lista
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
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

      {/* Content Area - Sin scroll vertical */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
        {viewMode === 'cards' ? (
          /* Vista de Cards */
          <div className="h-full overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Header de la Card */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                        {project.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(project.type)}`}>
                          {getTypeLabel(project.type)}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                          {getStatusLabel(project.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`w-3 h-3 rounded-full ${project.is_active ? 'bg-green-500' : 'bg-red-500'} shadow-sm`}></div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progreso</span>
                      <span className="text-sm font-bold text-gray-900">{project.progress_percentage || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getProgressColor(project.progress_percentage || 0)} rounded-full transition-all duration-500 shadow-sm`}
                        style={{ width: `${project.progress_percentage || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>

                  {/* Budget */}
                  {project.formatted_budget && (
                    <div className="mb-4 p-3 bg-green-50 rounded-xl">
                      <p className="text-xs text-green-700 font-medium">PRESUPUESTO</p>
                      <p className="text-lg font-bold text-green-800">{project.formatted_budget}</p>
                    </div>
                  )}

                  {/* Fechas */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">INICIO</p>
                      <p className="text-sm font-bold text-gray-900">{formatDate(project.start_date)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">FIN ESTIMADO</p>
                      <p className="text-sm font-bold text-gray-900">{formatDate(project.estimated_end_date)}</p>
                    </div>
                  </div>

                  {/* Client Info */}
                  {project.client_name && (
                    <div className="mb-4 text-sm text-gray-600">
                      <span className="font-medium">Cliente:</span> {project.client_name}
                    </div>
                  )}

                  {/* Days remaining */}
                  {project.days_remaining && (
                    <div className="mb-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        project.days_remaining > 30 ? 'bg-green-100 text-green-800' :
                        project.days_remaining > 7 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.days_remaining} días restantes
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewDetails(project.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Ver detalles"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {project.can_be_edited && (
                        <button 
                          onClick={() => window.location.href = `/admin/proyectos/${project.id}/edit`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          title="Editar proyecto"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      )}
                      <button 
                        onClick={() => handleToggleStatus(project.id)}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                        title={project.is_active ? 'Desactivar' : 'Activar'}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Eliminar proyecto"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Vista de Tabla Compacta */
          <div className="h-full overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Proyecto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Info</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Presupuesto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fechas</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">{project.name}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {project.location}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div
                            className={`h-2 bg-gradient-to-r ${getProgressColor(project.progress_percentage || 0)} rounded-full`}
                            style={{ width: `${project.progress_percentage || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{project.progress_percentage || 0}%</span>
                        {project.client_name && (
                          <div className="text-xs text-gray-500 mt-1">Cliente: {project.client_name}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(project.type)}`}>
                            {getTypeLabel(project.type)}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                            {getStatusLabel(project.status)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${project.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-xs text-gray-600">{project.is_active ? 'Activo' : 'Inactivo'}</span>
                          </div>
                          {project.days_remaining && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              project.days_remaining > 30 ? 'bg-green-100 text-green-700' :
                              project.days_remaining > 7 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {project.days_remaining}d
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {project.formatted_budget ? (
                          <div className="font-semibold text-green-600">{project.formatted_budget}</div>
                        ) : (
                          <div className="text-gray-400">No definido</div>
                        )}
                        {project.user && (
                          <div className="text-xs text-gray-500 mt-1">
                            Gestor: {project.user.name}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900 font-medium">
                          Inicio: {formatDate(project.start_date)}
                        </div>
                        <div className="text-gray-600">
                          Fin Est.: {formatDate(project.estimated_end_date)}
                        </div>
                        {project.end_date && (
                          <div className="text-green-600 text-xs">
                            Completado: {formatDate(project.end_date)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleViewDetails(project.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          title="Ver detalles"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        {project.can_be_edited && (
                          <button 
                            onClick={() => window.location.href = `/admin/proyectos/${project.id}/edit`}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                            title="Editar"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                        <button 
                          onClick={() => handleToggleStatus(project.id)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                          title={project.is_active ? 'Desactivar' : 'Activar'}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Eliminar"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Sin resultados */}
        {projects.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay proyectos</h3>
            <p className="text-gray-500 mb-6">No se encontraron proyectos con los filtros aplicados.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterStatus('all');
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Paginación */}
      {pagination.last_page > 1 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mostrando {((pagination.current_page - 1) * pagination.per_page) + 1} a {Math.min(pagination.current_page * pagination.per_page, pagination.total)} de {pagination.total} proyectos
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (pagination.current_page > 1) {
                    setPagination(prev => ({ ...prev, current_page: prev.current_page - 1 }));
                    loadProjects({ page: pagination.current_page - 1 });
                  }
                }}
                disabled={pagination.current_page <= 1}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(Math.min(5, pagination.last_page))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => {
                        setPagination(prev => ({ ...prev, current_page: page }));
                        loadProjects({ page });
                      }}
                      className={`px-3 py-2 text-sm rounded-lg ${
                        pagination.current_page === page
                          ? 'bg-green-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  if (pagination.current_page < pagination.last_page) {
                    setPagination(prev => ({ ...prev, current_page: prev.current_page + 1 }));
                    loadProjects({ page: pagination.current_page + 1 });
                  }
                }}
                disabled={pagination.current_page >= pagination.last_page}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalles del Proyecto */}
      <ProjectDetailsModal
        projectId={selectedProjectId}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
      />

      {/* Loading overlay */}
      {loading && projects.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 flex items-center gap-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            <span>Cargando proyectos...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;