import { api } from './api';

export const dashboardService = {
  /**
   * Obtiene el resumen de estadísticas de proyectos.
   * @returns {Promise<{ success: boolean, data: object, message?: string }>}
   */
  async getProjectSummaryStats() {
    try {
      const response = await api.get('/projects/statistics/summary');
      
      if (response.data.success) {
        // Asumiendo que los datos relevantes están directamente en response.data.data
        return {
          success: true,
          data: response.data.data
        };
      } else {
        // Si la API responde pero success es falso
        throw new Error(response.data.message || 'Error al obtener estadísticas del dashboard');
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Manejo de errores de red o respuesta no exitosa
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error de conexión al obtener estadísticas del dashboard'
      );
    }
  }
  
  // Puedes añadir aquí otras funciones relacionadas con el dashboard si las necesitas en el futuro
}; 