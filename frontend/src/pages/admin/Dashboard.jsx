// src/pages/admin/Dashboard.jsx (o donde tengas tu Dashboard)
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { dashboardService } from '../../services/dashboardService';
import { projectService } from '../../services/projectService';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              ¡Bienvenido, {user?.name || 'Admin'}!
            </h1>
            <p className="text-sm md:text-base text-green-100">
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

      {/* Stats Cards - Ajuste para móvil */}
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
          statsToDisplay.map((stat, index) => {
            // Renderizado condicional o con clases responsivas para combinar en móvil
            // Esta es una aproximación simple; un diseño más complejo podría requerir un componente dedicado
            if ((stat.title === 'Proyectos Totales' || stat.title === 'Proyectos Activos') && window.innerWidth < 640) { // 640px es el breakpoint 'sm'
              // Podríamos intentar un flex row aquí o ajustar padding/margin
              // Para simplicidad inicial, mantenemos el card pero ajustamos estilos si es necesario
            }

            // Determinar clases de columna basadas en el título y tamaño de pantalla
            const colSpanClass = (stat.title === 'Proyectos Totales' || stat.title === 'Proyectos Activos') 
                               ? 'lg:col-span-2' // Abasca 2 columnas en lg+
                               : ''; // Por defecto no abarca más de 1 columna

            return (
              <div
                key={index}
                // Añadir clases de columna dinámicamente
                className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200 ${colSpanClass}`}
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
            );
          })
        )}
      </div>

      {/* Main Content Grid - Ajuste para reordenar secciones en móvil */}
      {/* Usamos order-last en lg:col-span-2 para que Proyectos Recientes vaya al final en lg+ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions - Order first on mobile */}
        <div className="order-2 lg:order-none bg-white rounded-xl shadow-sm border border-gray-100"> {/* order-2 para móvil, order-none para escritorio */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Acciones Rápidas
            </h2>
          </div>
          <div className="p-4 sm:p-6"> {/* Reducir padding en móvil */}
            <div className="space-y-2"> {/* Reducir espacio entre botones en móvil */}
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = action.href}
                  className={`w-full ${action.color} text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 transform hover:scale-105 active:scale-95`} // Reducir padding y tamaño de texto en móvil
                >
                  <div className="flex items-center space-x-2"> {/* Reducir espacio en móvil */}
                    {/* Icono */}
                    <div className="w-5 h-5"> {/* Ajustar tamaño del icono si es necesario */}
                      {action.icon}
                    </div>
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

        {/* Recent Projects - Order second on mobile, but takes 2 columns on desktop */}
        <div className="order-1 lg:order-none lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100"> {/* order-1 para móvil, order-none para escritorio */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Proyectos Recientes
              </h2>
              <button 
                onClick={() => navigate('/admin/proyectos')}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
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
                      </div>
                      <div className="mt-3">
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
      </div>
    </div>
  );
};

export default Dashboard;