// src/pages/admin/Dashboard.jsx (o donde tengas tu Dashboard)
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dashboardService } from '../../services/dashboardService';
import { projectService } from '../../services/projectService';

const Dashboard = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  // Estado para las estadísticas del dashboard
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState(null);

  // Nuevo estado para proyectos recientes
  const [recentProjects, setRecentProjects] = useState([]);
  const [loadingRecentProjects, setLoadingRecentProjects] = useState(true);
  const [recentProjectsError, setRecentProjectsError] = useState(null);

  // Actualizar hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Cargar estadísticas del dashboard al montar el componente
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoadingStats(true);
        const result = await dashboardService.getProjectSummaryStats();
        if (result.success && result.data) {
          setDashboardStats(result.data);
        } else {
          setStatsError(result.message || 'Error al cargar estadísticas');
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setStatsError(err.message || 'Error de conexión al cargar estadísticas');
      } finally {
        setLoadingStats(false);
      }
    };

    fetchDashboardStats();
  }, []); // El array vacío asegura que solo se ejecute al montar

  // Cargar proyectos recientes al montar el componente
  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        setLoadingRecentProjects(true);
        setRecentProjectsError(null);
        // Obtener los 5 proyectos más recientes
        const result = await projectService.getProjects({
          sort_by: 'created_at',
          sort_direction: 'desc',
          per_page: 5 // Limitar a 5 proyectos recientes
        });

        if (result.success && result.data) {
          setRecentProjects(result.data);
        } else {
          setRecentProjectsError(result.message || 'Error al cargar proyectos recientes');
        }
      } catch (err) {
        console.error('Error fetching recent projects:', err);
        setRecentProjectsError(err.message || 'Error de conexión al cargar proyectos recientes');
      } finally {
        setLoadingRecentProjects(false);
      }
    };

    fetchRecentProjects();
  }, []); // El array vacío asegura que solo se ejecute al montar

  // Datos de ejemplo (en el futuro vendrán de tu API)
  const staticStats = [
    {
      title: 'Proyectos Totales',
      value: '24',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'blue'
    },
    {
      title: 'Proyectos Activos',
      value: '16',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'green'
    },
    {
      title: 'En Progreso',
      value: '8',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'orange'
    },
    {
      title: 'Completados',
      value: '12',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'indigo'
    }
  ];

  const quickActions = [
    {
      title: 'Nuevo Proyecto',
      description: 'Crear un nuevo proyecto',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: 'bg-green-500 hover:bg-green-600',
      href: '/admin/proyectos/crear'
    },
    {
      title: 'Subir Imágenes',
      description: 'Agregar fotos a proyectos',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-blue-500 hover:bg-blue-600',
      href: '/admin/imagenes'
    },
    {
      title: 'Ver Reportes',
      description: 'Análisis y estadísticas',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'bg-purple-500 hover:bg-purple-600',
      href: '/admin/reportes'
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'bg-gray-500 hover:bg-gray-600',
      href: '/admin/configuracion'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    };
    return colors[color] || colors.blue;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status) => {
    const colors = {
      'En Progreso': 'bg-blue-100 text-blue-800',
      'Finalizando': 'bg-green-100 text-green-800',
      'Iniciando': 'bg-yellow-100 text-yellow-800',
      'Completado': 'bg-indigo-100 text-indigo-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Mapear los datos de la API a la estructura esperada por las tarjetas
  const mappedStats = dashboardStats ? [
    {
      title: 'Proyectos Totales',
      value: dashboardStats.total_projects !== undefined ? dashboardStats.total_projects : '--',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'blue'
    },
    {
      title: 'Proyectos Activos',
      value: dashboardStats.active_projects !== undefined ? dashboardStats.active_projects : '--',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'green'
    },
    {
      title: 'En Progreso',
      value: dashboardStats.by_status?.en_progreso !== undefined ? dashboardStats.by_status.en_progreso : '--',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'orange'
    },
     { // Añadir Completados basado en la API
      title: 'Completados',
      value: dashboardStats.by_status?.completado !== undefined ? dashboardStats.by_status.completado : '--',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'indigo'
    }
    // Puedes añadir más tarjetas según las estadísticas que quieras mostrar
    // como overdue_projects, total_budget, etc.
  ] : [];

  // Determinar qué estadísticas usar: cargadas de la API si están disponibles y no hay error, si no, mostrar cargando o error.
  const statsToDisplay = dashboardStats ? mappedStats : (loadingStats ? [] : staticStats);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              ¡Bienvenido, {user?.name || 'Admin'}! 👋
            </h1>
            <p className="text-green-100">
              Panel de Control - Constructora Temuco
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-green-100 text-sm">Hoy es</p>
            <p className="text-xl font-semibold">
              {currentTime.toLocaleDateString('es-CL', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-green-200">
              {currentTime.toLocaleTimeString('es-CL', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loadingStats ? (
          // Indicador de carga para las estadísticas
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
               <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
            ))}
          </div>
        ) : statsError ? (
          // Mensaje de error si falla la carga de estadísticas
          <div className="lg:col-span-4 text-center p-6 bg-red-50 rounded-xl text-red-700">
            Error al cargar estadísticas: {statsError}
          </div>
        ) : (
          // Mostrar estadísticas cargadas o estáticas si falla la carga inicial
          statsToDisplay.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Proyectos Recientes
              </h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Ver todos →
              </button>
            </div>
          </div>
          <div className="p-6">
            {loadingRecentProjects ? (
              // Indicador de carga para proyectos recientes
              <div className="animate-pulse space-y-4">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                 ))}
              </div>
            ) : recentProjectsError ? (
              // Mensaje de error si falla la carga de proyectos recientes
              <div className="text-center p-6 bg-red-50 rounded-xl text-red-700">
                Error al cargar proyectos recientes: {recentProjectsError}
              </div>
            ) : recentProjects.length > 0 ? (
              // Mostrar proyectos recientes cargados
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id} // Usar project.id como key
                    className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        {/* Usar status_name si está disponible, si no status */}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status_name || project.status)}`}>
                          {project.status_name || project.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                         {/* Usar type_name si está disponible, si no type */}
                        <span className={`px-2 py-1 rounded text-xs ${ project.type === 'gubernamental' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700' }`}>
                          {project.type_name || project.type}
                        </span>
                        {/* Mostrar fecha de fin estimada o fecha de fin si existe */}
                        <span>Vence: {project.estimated_end_date ? new Date(project.estimated_end_date).toLocaleDateString('es-CL') : (project.end_date ? new Date(project.end_date).toLocaleDateString('es-CL') : 'Sin fecha fin') }</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progreso</span>
                          <span className="font-medium">{project.progress_percentage || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(project.progress_percentage || 0)}`}
                            style={{ width: `${project.progress_percentage || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Mensaje si no hay proyectos recientes
               <div className="text-center p-6 text-gray-500">
                 No hay proyectos recientes disponibles.
               </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Acciones Rápidas
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = action.href}
                  className={`w-full ${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95`}
                >
                  <div className="flex items-center space-x-3">
                    {action.icon}
                    <div className="text-left">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-white/80">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Actividad Reciente
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Nuevo proyecto creado:</span> Edificio Residencial Las Torres
                </p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Imágenes subidas:</span> 15 fotos añadidas al proyecto Plaza Norte
                </p>
                <p className="text-xs text-gray-500">Hace 5 horas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Proyecto actualizado:</span> Progreso del 90% en Complejo El Bosque
                </p>
                <p className="text-xs text-gray-500">Ayer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;