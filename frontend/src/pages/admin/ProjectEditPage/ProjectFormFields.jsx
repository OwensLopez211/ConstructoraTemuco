// src/components/admin/projects/ProjectFormFields.jsx
import { memo, useCallback } from 'react';
import { 
  Calendar,
  DollarSign,
  MapPin,
  Building2,
  User,
  FileText,
  TrendingUp
} from 'lucide-react';

const ProjectFormFields = memo(({ 
  project, 
  formData, 
  editing, 
  onInputChange 
}) => {
  // Formatear moneda chilena
  const formatCurrency = useCallback((amount) => {
    if (!amount || amount === 0) return 'Sin presupuesto';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }, []);

  // Formatear fecha
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'Sin fecha';
    return new Date(dateString).toLocaleDateString('es-CL', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  // Obtener color del progreso
  const getProgressColor = useCallback((progress) => {
    if (progress >= 90) return 'from-emerald-400 to-emerald-500';
    if (progress >= 70) return 'from-blue-400 to-blue-500';
    if (progress >= 50) return 'from-amber-400 to-amber-500';
    if (progress >= 25) return 'from-orange-400 to-orange-500';
    return 'from-red-400 to-red-500';
  }, []);

  // Obtener badge del estado
  const getStatusBadge = useCallback((status, statusName) => {
    const configs = {
      'planificacion': { color: 'bg-blue-100 text-blue-800', icon: '📋' },
      'en_progreso': { color: 'bg-emerald-100 text-emerald-800', icon: '⚡' },
      'completado': { color: 'bg-green-100 text-green-800', icon: '✅' },
      'pausado': { color: 'bg-amber-100 text-amber-800', icon: '⏸️' },
      'cancelado': { color: 'bg-red-100 text-red-800', icon: '❌' }
    };
    
    const config = configs[status] || { color: 'bg-gray-100 text-gray-800', icon: '📄' };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${config.color}`}>
        <span>{config.icon}</span>
        {statusName || status || 'Sin estado'}
      </span>
    );
  }, []);

  // Obtener badge del tipo
  const getTypeBadge = useCallback((type, typeName) => {
    const configs = {
      'gubernamental': { color: 'bg-indigo-100 text-indigo-800', icon: '🏛️' },
      'privado': { color: 'bg-purple-100 text-purple-800', icon: '🏢' }
    };
    
    const config = configs[type] || { color: 'bg-gray-100 text-gray-800', icon: '📄' };
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${config.color}`}>
        <span>{config.icon}</span>
        {typeName || (type === 'gubernamental' ? 'Gubernamental' : 'Privado') || 'Sin tipo'}
      </span>
    );
  }, []);

  // Handlers optimizados para evitar re-creación en cada render
  const handleNameChange = useCallback((e) => {
    onInputChange('name', e.target.value);
  }, [onInputChange]);

  const handleClientChange = useCallback((e) => {
    onInputChange('client_name', e.target.value);
  }, [onInputChange]);

  const handleLocationChange = useCallback((e) => {
    onInputChange('location', e.target.value);
  }, [onInputChange]);

  const handleTypeChange = useCallback((e) => {
    onInputChange('type', e.target.value);
  }, [onInputChange]);

  const handleStatusChange = useCallback((e) => {
    onInputChange('status', e.target.value);
  }, [onInputChange]);

  const handleProgressChange = useCallback((e) => {
    onInputChange('progress', parseInt(e.target.value) || 0);
  }, [onInputChange]);

  const handleStartDateChange = useCallback((e) => {
    onInputChange('start_date', e.target.value);
  }, [onInputChange]);

  const handleEndDateChange = useCallback((e) => {
    onInputChange('end_date', e.target.value);
  }, [onInputChange]);

  const handleBudgetChange = useCallback((e) => {
    onInputChange('budget', e.target.value);
  }, [onInputChange]);

  const handleDescriptionChange = useCallback((e) => {
    onInputChange('description', e.target.value);
  }, [onInputChange]);

  return (
    <div className="space-y-8">
      {/* Información Básica */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Información Básica
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Nombre del Proyecto */}
          <div className="lg:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Building2 className="w-4 h-4 text-gray-500" />
              Nombre del Proyecto
              <span className="text-red-500">*</span>
            </label>
            {editing ? (
              <input
                type="text"
                value={formData.name || ''}
                onChange={handleNameChange}
                placeholder="Ingrese el nombre del proyecto..."
                maxLength={100}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                         focus:ring-4 focus:ring-blue-100 focus:border-blue-500 
                         transition-all duration-200 placeholder-gray-400
                         hover:border-gray-300"
              />
            ) : (
              <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 
                            text-gray-900 min-h-[48px] flex items-center">
                <span className="font-medium">{project?.name || 'Sin nombre'}</span>
              </div>
            )}
          </div>

          {/* Cliente */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <User className="w-4 h-4 text-gray-500" />
              Cliente
              <span className="text-red-500">*</span>
            </label>
            {editing ? (
              <input
                type="text"
                value={formData.client_name || ''}
                onChange={handleClientChange}
                placeholder="Nombre del cliente..."
                maxLength={80}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                         focus:ring-4 focus:ring-blue-100 focus:border-blue-500 
                         transition-all duration-200 placeholder-gray-400
                         hover:border-gray-300"
              />
            ) : (
              <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 
                            text-gray-900 min-h-[48px] flex items-center">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{project?.client_name || 'Sin cliente'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Ubicación */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              Ubicación
            </label>
            {editing ? (
              <input
                type="text"
                value={formData.location || ''}
                onChange={handleLocationChange}
                placeholder="Ciudad, región..."
                maxLength={100}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                         focus:ring-4 focus:ring-blue-100 focus:border-blue-500 
                         transition-all duration-200 placeholder-gray-400
                         hover:border-gray-300"
              />
            ) : (
              <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 
                            text-gray-900 min-h-[48px] flex items-center">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{project?.location || 'Sin ubicación'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clasificación y Estado */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Clasificación y Estado
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tipo */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Building2 className="w-4 h-4 text-gray-500" />
              Tipo de Proyecto
            </label>
            {editing ? (
              <select
                value={formData.type || 'gubernamental'}
                onChange={handleTypeChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                         focus:ring-4 focus:ring-blue-100 focus:border-blue-500 
                         transition-all duration-200 hover:border-gray-300"
              >
                <option value="gubernamental">🏛️ Gubernamental</option>
                <option value="privado">🏢 Privado</option>
              </select>
            ) : (
              <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 
                            text-gray-900 min-h-[48px] flex items-center">
                {getTypeBadge(project?.type, project?.type_name)}
              </div>
            )}
          </div>

          {/* Estado */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              Estado del Proyecto
            </label>
            {editing ? (
              <select
                value={formData.status || 'en_progreso'}
                onChange={handleStatusChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                         focus:ring-4 focus:ring-blue-100 focus:border-blue-500 
                         transition-all duration-200 hover:border-gray-300"
              >
                <option value="planificacion">📋 Planificación</option>
                <option value="en_progreso">⚡ En Progreso</option>
                <option value="completado">✅ Completado</option>
                <option value="pausado">⏸️ Pausado</option>
                <option value="cancelado">❌ Cancelado</option>
              </select>
            ) : (
              <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 
                            text-gray-900 min-h-[48px] flex items-center">
                {getStatusBadge(project?.status, project?.status_name)}
              </div>
            )}
          </div>

          {/* Progreso */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              Progreso del Proyecto
            </label>
            {editing ? (
              <div className="space-y-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress || 0}
                  onChange={handleProgressChange}
                  placeholder="0-100"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                           focus:ring-4 focus:ring-blue-100 focus:border-blue-500 
                           transition-all duration-200 placeholder-gray-400
                           hover:border-gray-300"
                />
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${getProgressColor(formData.progress)}`}
                    style={{ width: `${Math.min(Math.max(formData.progress || 0, 0), 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 
                            text-gray-900 min-h-[48px] space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">{project?.progress_percentage || 0}%</span>
                  <span className="text-sm text-gray-500">
                    {project?.progress_percentage >= 100 ? 'Completado' : 
                     project?.progress_percentage >= 75 ? 'Casi terminado' : 
                     project?.progress_percentage >= 50 ? 'En desarrollo' : 
                     project?.progress_percentage >= 25 ? 'Iniciando' : 'Sin avance'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r transition-all duration-500 ${getProgressColor(project?.progress_percentage)}`}
                    style={{ width: `${project?.progress_percentage || 0}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cronograma y Presupuesto */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          Cronograma y Presupuesto
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Fecha de Inicio */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Calendar className="w-4 h-4 text-gray-500" />
              Fecha de Inicio
            </label>
            {editing ? (
              <input
                type="date"
                value={formData.start_date || ''}
                onChange={handleStartDateChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                         focus:ring-4 focus:ring-blue-100 focus:border-blue-500 
                         transition-all duration-200 hover:border-gray-300"
              />
            ) : (
              <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 
                            text-gray-900 min-h-[48px] flex items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>{formatDate(project?.start_date)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Fecha de Fin */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Calendar className="w-4 h-4 text-gray-500" />
              Fecha de Finalización
            </label>
            {editing ? (
              <input
                type="date"
                value={formData.end_date || ''}
                onChange={handleEndDateChange}
                min={formData.start_date}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                         focus:ring-4 focus:ring-blue-100 focus:border-blue-500 
                         transition-all duration-200 hover:border-gray-300"
              />
            ) : (
              <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 
                            text-gray-900 min-h-[48px] flex items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span>{formatDate(project?.end_date)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Presupuesto */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <DollarSign className="w-4 h-4 text-gray-500" />
              Presupuesto Total
            </label>
            {editing ? (
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.budget || ''}
                  onChange={handleBudgetChange}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                           focus:ring-4 focus:ring-blue-100 focus:border-blue-500 
                           transition-all duration-200 placeholder-gray-400
                           hover:border-gray-300"
                />
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 
                            text-gray-900 min-h-[48px] flex items-center">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-700">
                    {formatCurrency(project?.budget)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-600" />
          Descripción del Proyecto
        </h3>
        
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <FileText className="w-4 h-4 text-gray-500" />
            Descripción Detallada
          </label>
          {editing ? (
            <>
              <textarea
                value={formData.description || ''}
                onChange={handleDescriptionChange}
                rows={6}
                placeholder="Describa el proyecto, objetivos, alcance y detalles importantes..."
                maxLength={1000}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl 
                         focus:ring-4 focus:ring-blue-100 focus:border-blue-500 
                         transition-all duration-200 placeholder-gray-400 resize-none
                         hover:border-gray-300"
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>Máximo 1000 caracteres</span>
                <span>{(formData.description || '').length}/1000</span>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-4 
                          text-gray-900 min-h-[120px] items-start">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {project?.description || 'Sin descripción disponible'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ProjectFormFields.displayName = 'ProjectFormFields';

export default ProjectFormFields;