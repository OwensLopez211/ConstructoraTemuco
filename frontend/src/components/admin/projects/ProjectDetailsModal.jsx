import { useState, useEffect } from 'react';
import { projectService } from '../../../services/projectService';
import { useToast } from '../../ui/Toast/useToast';

const ProjectDetailsModal = ({ projectId, isOpen, onClose }) => {
  const { showToast } = useToast();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header del Modal */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900 truncate">
            {loading ? 'Cargando...' : project?.name || 'Detalles del Proyecto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            disabled={loading}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 flex-1">
          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
               <p className="text-gray-600">Cargando detalles...</p>
            </div>
          )}

          {error && !loading && (
             <div className="text-center py-8 text-red-600">
                <p>{error}</p>
             </div>
          )}

          {project && !loading && !error && (
            <div className="space-y-6 text-gray-700">
              {/* Información Básica */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Información General</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Nombre:</p>
                    <p>{project.name}</p>
                  </div>
                  <div>
                    <p className="font-medium">Tipo:</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.type === 'gubernamental' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {project.type_name || project.type}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">Ubicación:</p>
                    <p>{project.location}</p>
                  </div>
                   <div>
                    <p className="font-medium">Estado:</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === 'en_progreso' ? 'bg-blue-100 text-blue-800' : project.status === 'completado' ? 'bg-green-100 text-green-800' : project.status === 'pausado' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {project.status_name || project.status}
                    </span>
                  </div>
                   <div>
                    <p className="font-medium">Activo:</p>
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {project.is_active ? 'Sí' : 'No'}
                    </span>
                  </div>
                   {project.progress_percentage !== undefined && (
                     <div>
                        <p className="font-medium">Progreso:</p>
                         <p>{project.progress_percentage}%</p>
                     </div>
                   )}
                </div>
              </div>

               {/* Información Financiera y Cronograma */}
               <div>
                 <h3 className="text-lg font-semibold text-gray-900 mb-3">Financiero y Cronograma</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                   <div>
                     <p className="font-medium">Presupuesto:</p>
                     <p>{project.formatted_budget || 'No definido'}</p>
                   </div>
                    <div>
                     <p className="font-medium">Fecha de Inicio:</p>
                     <p>{project.start_date || 'No definido'}</p>
                   </div>
                    <div>
                     <p className="font-medium">Fecha Estimada de Fin:</p>
                     <p>{project.estimated_end_date || 'No definido'}</p>
                   </div>
                    {project.end_date && (
                      <div>
                        <p className="font-medium">Fecha de Fin Real:</p>
                        <p>{project.end_date}</p>
                      </div>
                    )}
                 </div>
               </div>

                {/* Información del Cliente */}
                {project.client_name && (
                 <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Información del Cliente</h3>
                    <div className="space-y-2 text-sm">
                     <div>
                       <p className="font-medium">Nombre:</p>
                       <p>{project.client_name}</p>
                     </div>
                      {project.client_contact && (
                       <div>
                         <p className="font-medium">Contacto:</p>
                         <p>{project.client_contact}</p>
                       </div>
                      )}
                    </div>
                 </div>
                )}

                {/* Descripción */}
                {project.description && (
                  <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
                     <div className="text-sm leading-relaxed">
                       {project.description}
                     </div>
                  </div>
                )}

                 {/* Notas */}
                 {project.notes && (
                  <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-3">Notas</h3>
                     <div className="text-sm leading-relaxed">
                       {project.notes}
                     </div>
                  </div>
                 )}

                 {/* Información del Gestor (User) */}
                 {project.user && (
                   <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-3">Gestor del Proyecto</h3>
                      <div className="text-sm space-y-1">
                         <p><span className="font-medium">Nombre:</span> {project.user.name}</p>
                         <p><span className="font-medium">Email:</span> {project.user.email}</p>
                         {project.user.role_name && <p><span className="font-medium">Rol:</span> {project.user.role_name}</p>}
                      </div>
                   </div>
                 )}

                 {/* Permisos (si aplica mostrar en detalles) */}
                 {/* Puedes añadir aquí la información de permisos si viene en la respuesta */} {/* project.permissions */} 

            </div>
          )}
        </div>

        {/* Footer del Modal (Opcional - Botones de acción) */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
           <button
             onClick={onClose}
             className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200"
             disabled={loading}
           >
             Cerrar
           </button>
         </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal; 