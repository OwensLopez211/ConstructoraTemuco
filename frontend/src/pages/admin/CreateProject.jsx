import React, { useState } from 'react';
import { ChevronLeft, Check, AlertCircle, Plus, Calendar, DollarSign, MapPin, User, FileText, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../../services/projectService';

// Componente principal CreateProject
const CreateProject = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
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
  });

  const [errors, setErrors] = useState({});
  const [completedTabs, setCompletedTabs] = useState(new Set());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validar pestaña actual
  const validateCurrentTab = () => {
    const newErrors = {};
    
    switch (activeTab) {
      case 0: // Información Básica
        if (!formData.name.trim()) newErrors.name = 'El nombre del proyecto es requerido';
        if (!formData.type) newErrors.type = 'El tipo de proyecto es requerido';
        if (!formData.location.trim()) newErrors.location = 'La ubicación es requerida';
        break;
      case 1: // Cliente
        if (!formData.client_name.trim()) newErrors.client_name = 'El nombre del cliente es requerido';
        break;
      case 2: // Financiero
        if (formData.budget && parseFloat(formData.budget) <= 0) {
          newErrors.budget = 'El presupuesto debe ser mayor a 0';
        }
        if (formData.start_date && formData.estimated_end_date) {
          const startDate = new Date(formData.start_date);
          const endDate = new Date(formData.estimated_end_date);
          if (endDate <= startDate) {
            newErrors.estimated_end_date = 'La fecha de fin debe ser posterior a la fecha de inicio';
          }
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentTab()) {
      setCompletedTabs(prev => new Set(prev).add(activeTab));
      setActiveTab(prev => Math.min(prev + 1, tabs.length - 1));
    }
  };

  const handlePrevious = () => {
    setActiveTab(prev => Math.max(prev - 1, 0));
  };

  const handleTabClick = (index) => {
    if (index <= activeTab || completedTabs.has(index)) {
      setActiveTab(index);
    }
  };

  const handleSubmit = async () => {
    // Validar todas las pestañas
    let hasErrors = false;
    for (let i = 0; i < tabs.length - 1; i++) {
      const currentTab = activeTab;
      setActiveTab(i);
      if (!validateCurrentTab()) {
        hasErrors = true;
        break;
      }
    }
    setActiveTab(activeTab);
    
    if (hasErrors) return;

    setLoading(true);
    try {
      // 1. Crear el proyecto primero
      const createProjectResponse = await projectService.createProject(formData);

      if (createProjectResponse.success) {
        console.log('Proyecto creado exitosamente!', createProjectResponse.data); // Log de éxito de la API
        const projectId = createProjectResponse.data.id; // <-- Obtener el ID del proyecto creado

        alert(createProjectResponse.message || 'Proyecto creado exitosamente!'); // Siempre mostrar mensaje de éxito del proyecto

        // 3. Navegar al menú de proyectos después de crear
        navigate('/admin/proyectos');

      } else {
        // Esto se maneja principalmente en el catch, pero como fallback:
        console.error('Error al crear proyecto (API reporta false success):', createProjectResponse.message);
        alert(createProjectResponse.message || 'Error al crear proyecto');
      }

    } catch (error) {
      console.error('Error en el proceso de creación:', error); // Ajustar log y mensaje
      alert(`Error en el proceso: ${error.message}`); // Mostrar error al usuario
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { 
      id: 'basic', 
      label: 'Básico', 
      icon: FileText,
      shortLabel: 'Básico'
    },
    { 
      id: 'client', 
      label: 'Cliente', 
      icon: User,
      shortLabel: 'Cliente'
    },
    { 
      id: 'financial', 
      label: 'Financiero', 
      icon: DollarSign,
      shortLabel: 'Dinero'
    },
    { 
      id: 'details', 
      label: 'Detalles', 
      icon: Info,
      shortLabel: 'Extra'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <button className="p-2 sm:p-3 text-slate-600 hover:text-slate-900 hover:bg-white/60 rounded-xl transition-all duration-200 backdrop-blur-sm">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                Nuevo Proyecto
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                Completa la información paso a paso
              </p>
            </div>
          </div>
        </div>

        {/* Contenedor Principal */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          
          {/* Progress Bar */}
          <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">
                Paso {activeTab + 1} de {tabs.length}
              </span>
              <span className="text-sm text-slate-500">
                {Math.round((activeTab / (tabs.length - 1)) * 100)}% completado
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(activeTab / (tabs.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-4 sm:px-8 pb-6">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = index === activeTab;
                const isCompleted = completedTabs.has(index);
                const isAccessible = index <= activeTab || isCompleted;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(index)}
                    disabled={!isAccessible}
                    className={`
                      flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl
                      font-medium text-sm transition-all duration-200 min-w-max
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                        : isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : isAccessible
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        : 'bg-slate-50 text-slate-400 cursor-not-allowed'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-4 sm:px-8 pb-8">
            {activeTab === 0 && (
              <BasicInfoTab 
                formData={formData} 
                handleChange={handleChange} 
                errors={errors} 
                loading={loading} 
              />
            )}
            {activeTab === 1 && (
              <ClientInfoTab 
                formData={formData} 
                handleChange={handleChange} 
                errors={errors} 
                loading={loading} 
              />
            )}
            {activeTab === 2 && (
              <FinancialTab 
                formData={formData} 
                handleChange={handleChange} 
                errors={errors} 
                loading={loading} 
              />
            )}
            {activeTab === 3 && (
              <AdditionalDetailsTab 
                formData={formData} 
                handleChange={handleChange} 
                errors={errors} 
                loading={loading} 
              />
            )}
          </div>

          {/* Footer Navigation */}
          <div className="px-4 sm:px-8 py-4 sm:py-6 bg-slate-50/50 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-500 order-2 sm:order-1">
              <span className="text-red-500">*</span> Campos requeridos
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
              {activeTab > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-all duration-200"
                  disabled={loading}
                >
                  Anterior
                </button>
              )}
              
              {activeTab < tabs.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  disabled={loading}
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creando...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Crear Proyecto
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 sm:mt-8 bg-blue-50/50 backdrop-blur-xl border border-blue-200/30 rounded-2xl p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm sm:text-base font-medium text-blue-900 mb-2">
                Información importante
              </h3>
              <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
                <li>• El proyecto se creará con estado "En Progreso" por defecto</li>
                <li>• Puedes agregar más detalles después de crear el proyecto</li>
                <li>• Todos los campos se pueden editar posteriormente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Input reutilizable
const Input = ({ label, name, type = "text", value, onChange, error, required, placeholder, disabled, icon: Icon, prefix, min }) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
      )}
      {prefix && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
          {prefix}
        </span>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        min={min}
        className={`
          w-full px-4 py-3 rounded-xl border transition-all duration-200
          ${Icon || prefix ? 'pl-10' : ''}
          ${error 
            ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
            : 'border-slate-300 bg-white focus:ring-blue-500 focus:border-blue-500'
          }
          focus:ring-2 focus:ring-opacity-20 outline-none
          disabled:bg-slate-50 disabled:text-slate-500
        `}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
    </div>
    {error && (
      <p className="text-sm text-red-600 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    )}
  </div>
);

// Componente Select reutilizable
const Select = ({ label, name, value, onChange, error, required, disabled, options, icon: Icon }) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
      )}
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-3 rounded-xl border transition-all duration-200 appearance-none
          ${Icon ? 'pl-10' : ''}
          ${error 
            ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
            : 'border-slate-300 bg-white focus:ring-blue-500 focus:border-blue-500'
          }
          focus:ring-2 focus:ring-opacity-20 outline-none
          disabled:bg-slate-50 disabled:text-slate-500
        `}
        disabled={disabled}
        required={required}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    {error && (
      <p className="text-sm text-red-600 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    )}
  </div>
);

// Componente Textarea reutilizable
const Textarea = ({ label, name, value, onChange, error, required, placeholder, disabled, rows = 4 }) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`
        w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none
        ${error 
          ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
          : 'border-slate-300 bg-white focus:ring-blue-500 focus:border-blue-500'
        }
        focus:ring-2 focus:ring-opacity-20 outline-none
        disabled:bg-slate-50 disabled:text-slate-500
      `}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
    />
    {error && (
      <p className="text-sm text-red-600 flex items-center gap-1">
        <AlertCircle className="w-4 h-4" />
        {error}
      </p>
    )}
  </div>
);

// Tab Components
const BasicInfoTab = ({ formData, handleChange, errors, loading }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Información Básica</h2>
      <p className="text-slate-600 text-sm sm:text-base mb-6">
        Define los datos principales de tu proyecto
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="lg:col-span-2">
        <Input
          label="Nombre del Proyecto"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          placeholder="Ej: Edificio Residencial Las Torres"
          disabled={loading}
          icon={FileText}
        />
      </div>
      
      <Select
        label="Tipo de Proyecto"
        name="type"
        value={formData.type}
        onChange={handleChange}
        error={errors.type}
        required
        disabled={loading}
        options={[
          { value: 'privado', label: 'Privado' },
          { value: 'gubernamental', label: 'Gubernamental' }
        ]}
      />
      
      <Input
        label="Ubicación"
        name="location"
        value={formData.location}
        onChange={handleChange}
        error={errors.location}
        required
        placeholder="Ej: Temuco Centro"
        disabled={loading}
        icon={MapPin}
      />
    </div>
  </div>
);

const ClientInfoTab = ({ formData, handleChange, errors, loading }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Información del Cliente</h2>
      <p className="text-slate-600 text-sm sm:text-base mb-6">
        Datos de contacto y referencia del cliente
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Input
        label="Nombre del Cliente"
        name="client_name"
        value={formData.client_name}
        onChange={handleChange}
        error={errors.client_name}
        required
        placeholder="Ej: Juan Pérez Construcciones"
        disabled={loading}
        icon={User}
      />
      
      <Input
        label="Contacto del Cliente"
        name="client_contact"
        value={formData.client_contact}
        onChange={handleChange}
        error={errors.client_contact}
        placeholder="Teléfono o email"
        disabled={loading}
      />
    </div>
  </div>
);

const FinancialTab = ({ formData, handleChange, errors, loading }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Financiero y Cronograma</h2>
      <p className="text-slate-600 text-sm sm:text-base mb-6">
        Presupuesto y fechas del proyecto
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Input
        label="Presupuesto (CLP)"
        name="budget"
        type="number"
        value={formData.budget}
        onChange={handleChange}
        error={errors.budget}
        placeholder="1500000"
        disabled={loading}
        prefix="$"
        min="0"
      />
      
      <Input
        label="Fecha de Inicio"
        name="start_date"
        type="date"
        value={formData.start_date}
        onChange={handleChange}
        error={errors.start_date}
        disabled={loading}
        icon={Calendar}
      />
      
      <Input
        label="Fecha Estimada de Fin"
        name="estimated_end_date"
        type="date"
        value={formData.estimated_end_date}
        onChange={handleChange}
        error={errors.estimated_end_date}
        disabled={loading}
        icon={Calendar}
      />
    </div>
  </div>
);

const AdditionalDetailsTab = ({ formData, handleChange, errors, loading }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Detalles Adicionales</h2>
      <p className="text-slate-600 text-sm sm:text-base mb-6">
        Información complementaria del proyecto
      </p>
    </div>
    
    <div className="space-y-6">
      <Textarea
        label="Descripción del Proyecto"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        placeholder="Describe el proyecto, objetivos, características especiales..."
        disabled={loading}
        rows={4}
      />
      
      <Textarea
        label="Notas Adicionales"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        error={errors.notes}
        placeholder="Notas internas, consideraciones especiales, recordatorios..."
        disabled={loading}
        rows={3}
      />
    </div>
  </div>
);

export default CreateProject;