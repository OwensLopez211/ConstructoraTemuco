// src/pages/admin/ProjectEditPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../../services/projectService';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit3, 
  Save, 
  X
} from 'lucide-react';
import ProjectFormFields from './ProjectEditPage/ProjectFormFields';
import ProjectImagesManager from './projects/ProjectImagesManager';
import { useToast } from '../../components/ui/Toast/useToast';

const ProjectEditPage = () => {
  const { projectId } = useParams(); // Cambio de 'id' a 'projectId' para coincidir con la ruta
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});

  // Cargar datos del proyecto
  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Loading project with ID:', projectId); // Debug
      const response = await projectService.getProject(projectId);
      console.log('Service response:', response); // Debug
      
      // Los datos del proyecto están en response.data.project
      const projectData = response.data.project;
      console.log('Project data:', projectData); // Debug
      
      setProject(projectData);
      setFormData({
        name: projectData.name || '',
        client_name: projectData.client_name || '',
        description: projectData.description || '',
        location: projectData.location || '',
        type: projectData.type || 'gubernamental',
        status: projectData.status || 'completado',
        start_date: projectData.start_date ? projectData.start_date.split('T')[0] : '',
        end_date: projectData.end_date ? projectData.end_date.split('T')[0] : '',
        budget: projectData.budget || '',
        progress: projectData.progress_percentage || 0
      });
      
      console.log('Form data set:', {
        name: projectData.name || '',
        client_name: projectData.client_name || '',
        description: projectData.description || '',
        location: projectData.location || '',
        type: projectData.type || 'gubernamental',
        status: projectData.status || 'completado',
        start_date: projectData.start_date ? projectData.start_date.split('T')[0] : '',
        end_date: projectData.end_date ? projectData.end_date.split('T')[0] : '',
        budget: projectData.budget || '',
        progress: projectData.progress_percentage || 0
      }); // Debug
      
    } catch (err) {
      setError(`Error al cargar el proyecto: ${err.message}`);
      console.error('Error loading project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Excluir propiedades que no deben enviarse al backend en la actualización principal
      const { images, user, formatted_budget, type_name, status_name, days_remaining, is_overdue, can_be_edited, created_at, updated_at, ...dataToSave } = formData;

      // Asegurarse de que los campos vacíos se envíen como null si el backend lo espera
      for (const key in dataToSave) {
          if (dataToSave[key] === '') {
              dataToSave[key] = null;
          }
      }

      console.log('Saving data:', dataToSave); // Debug
      const response = await projectService.updateProject(projectId, dataToSave);
      console.log('Save response:', response); // Debug
      await loadProject(); // Recargar datos actualizados
      setEditing(false);
      showToast(response.message || 'Proyecto actualizado exitosamente', 'success');
    } catch (err) {
      showToast('Error al actualizar el proyecto: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Restaurar datos originales
    if (project) {
      setFormData({
        name: project.name || '',
        client_name: project.client_name || '',
        description: project.description || '',
        location: project.location || '',
        type: project.type || 'gubernamental',
        status: project.status || 'en_progreso',
        start_date: project.start_date ? project.start_date.split('T')[0] : '',
        end_date: project.end_date ? project.end_date.split('T')[0] : '',
        budget: project.budget || '',
        progress: project.progress_percentage || 0
      });
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={loadProject}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-3"
            >
              Reintentar
            </button>
            <button 
              onClick={() => navigate('/admin/proyectos')}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Volver a Proyectos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/proyectos')}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {editing ? 'Editando Proyecto' : 'Detalles del Proyecto'}
              </h1>
              <p className="text-gray-600">{project?.client_name}</p>
            </div>
          </div>

          <div className="flex gap-3">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Editar
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Form */}
        <motion.div 
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ProjectFormFields
            project={project}
            formData={formData}
            editing={editing}
            onInputChange={handleInputChange}
          />
        </motion.div>

        {/* Gestión de Imágenes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ProjectImagesManager
            projectId={projectId}
            editing={editing}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectEditPage;