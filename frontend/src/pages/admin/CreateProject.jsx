// src/pages/admin/CreateProject.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ui/Toast/useToast';
import { projectService } from '../../services/projectService';

// Importar componentes de pestaña
import BasicInfoTab from './CreateProjectTabs/BasicInfoTab';
import ClientInfoTab from './CreateProjectTabs/ClientInfoTab';
import FinancialTab from './CreateProjectTabs/FinancialTab';
import AdditionalDetailsTab from './CreateProjectTabs/AdditionalDetailsTab';
import ImagesTab from './CreateProjectTabs/ImagesTab';

const CreateProject = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Estado para manejar las pestañas
  const [activeTab, setActiveTab] = useState('basic_info');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'privado',
    location: '',
    budget: '',
    start_date: '',
    estimated_end_date: '',
    client_name: '',
    client_contact: '',
    notes: '',
    // Añadir estado para imágenes si es necesario, o manejarlo en el componente de imágenes
    // images: []
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo al cambiarlo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validaciones frontend
    if (!formData.name.trim()) {
      newErrors.name = ['El nombre del proyecto es requerido'];
    }
    
    if (!formData.type) {
      newErrors.type = ['El tipo de proyecto es requerido'];
    }
    
    if (!formData.location.trim()) {
      newErrors.location = ['La ubicación es requerida'];
    }
    
    if (!formData.client_name.trim()) {
      newErrors.client_name = ['El nombre del cliente es requerido'];
    }
    
    // Validar fechas
    if (formData.start_date && formData.estimated_end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.estimated_end_date);
      
      if (endDate <= startDate) {
        newErrors.estimated_end_date = ['La fecha de fin debe ser posterior a la fecha de inicio'];
      }
    }
    
    // Validar presupuesto
    if (formData.budget && parseFloat(formData.budget) <= 0) {
      newErrors.budget = ['El presupuesto debe ser mayor a 0'];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación frontend (actualizar para validar solo la pestaña actual o todo al final)
    if (!validateForm()) {
      showToast('Por favor corrige los errores en el formulario', 'error');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Preparar datos para enviar
      const dataToSend = { ...formData };
      
      // Convertir budget a número si no está vacío
      if (dataToSend.budget && dataToSend.budget.trim() !== '') {
        dataToSend.budget = parseFloat(dataToSend.budget);
      } else {
        delete dataToSend.budget; // No enviar si está vacío
      }

      // Limpiar campos vacíos
      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] === '') {
          delete dataToSend[key];
        }
      });

      const result = await projectService.createProject(dataToSend);

      if (result.success) {
        showToast(result.message || 'Proyecto creado exitosamente', 'success');
        
        // Esperar un momento antes de redirigir para que se vea el toast
        setTimeout(() => {
          navigate('/admin/proyectos', { 
            replace: true,
            state: { message: 'Proyecto creado exitosamente' }
          });
        }, 1500);
      } else {
        throw new Error(result.message || 'Error al crear proyecto');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      
      // Manejar errores de validación del backend
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        setErrors(backendErrors);
        
        // Mostrar el primer error en un toast
        const firstError = Object.values(backendErrors)[0]?.[0];
        if (firstError) {
          showToast(firstError, 'error');
        } else {
          showToast('Por favor corrige los errores en el formulario', 'error');
        }
      } else {
        // Error general
        const errorMessage = error.response?.data?.message || error.message || 'Error de conexión al crear proyecto';
        showToast(errorMessage, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Preguntar confirmación si hay cambios
    const hasChanges = Object.values(formData).some(value => value !== '' && value !== 'privado');
    
    if (hasChanges && !window.confirm('¿Estás seguro de que quieres cancelar? Se perderán los cambios no guardados.')) {
      return;
    }
    
    navigate('/admin/proyectos');
  };

  // Definir las pestañas
  const tabs = [
    { id: 'basic_info', label: 'Información Básica' },
    { id: 'client_info', label: 'Información del Cliente' },
    { id: 'financial', label: 'Financiero y Cronograma' },
    { id: 'additional_details', label: 'Detalles Adicionales' },
    { id: 'images', label: 'Agregar Imágenes' },
  ];

  // Renderizar el contenido de la pestaña activa
  const renderTabContent = () => {
    const tabProps = { formData, handleChange, errors, loading };

    switch (activeTab) {
      case 'basic_info':
        return <BasicInfoTab {...tabProps} />;
      case 'client_info':
        return <ClientInfoTab {...tabProps} />;
      case 'financial':
        return <FinancialTab {...tabProps} />;
      case 'additional_details':
        return <AdditionalDetailsTab {...tabProps} />;
      case 'images':
        return <ImagesTab {...tabProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleCancel}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              disabled={loading}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Proyecto</h1>
              <p className="text-gray-600 mt-1">Completa la información del proyecto por secciones</p>
            </div>
          </div>
        </div>

        {/* Contenedor Principal: Pestañas y Contenido */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Navegación de Pestañas */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    ${
                      activeTab === tab.id
                        ? 'border-green-600 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  `}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                  disabled={loading} // Deshabilitar pestañas mientras se carga
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenido de la Pestaña Activa */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
               {renderTabContent()}
            </form>
          </div>

          {/* TODO: Reubicar botones de navegación (Siguiente, Anterior, Crear Proyecto) */}
          {/* Footer con botones - Mantener por ahora, se adaptará después */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="text-red-500">*</span> Campos requeridos (por sección)
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                disabled={loading}
              >
                Cancelar
              </button>
              {/* El botón de submit/crear proyecto se adaptará para el último paso */}
               <button
                 type="submit"
                 onClick={handleSubmit} // Submit handled by form element
                 className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                 disabled={loading}
               >
                 {loading ? (
                   <>
                     <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Creando Proyecto...
                   </>
                 ) : (
                   <>
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                     </svg>
                     Crear Proyecto
                   </>
                 )}
               </button>
            </div>
          </div>

        </div> {/* Fin del Contenedor Principal */}

        {/* Información adicional */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-2">Información importante</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• El proyecto se creará con estado "En Progreso" por defecto</li>
                <li>• Podrás agregar imágenes y documentos después de crear el proyecto</li>
                <li>• El progreso se puede actualizar desde la vista de detalles del proyecto</li>
                <li>• Todos los campos se pueden editar posteriormente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;