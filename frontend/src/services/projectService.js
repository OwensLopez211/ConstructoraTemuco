// src/services/projectService.js
import { api } from './api';

export const projectService = {
  // Listar todos los proyectos con filtros y paginación
  async getProjects(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      // Agregar filtros si existen
      if (filters.search) params.append('search', filters.search);
      if (filters.type && filters.type !== 'all') params.append('type', filters.type);
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.location) params.append('location', filters.location);
      if (filters.is_active !== undefined) params.append('is_active', filters.is_active);
      if (filters.page) params.append('page', filters.page);
      if (filters.per_page) params.append('per_page', filters.per_page);
      if (filters.sort_by) params.append('sort_by', filters.sort_by);
      if (filters.sort_order) params.append('sort_order', filters.sort_order);

      const response = await api.get(`/projects?${params.toString()}`);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data.data, // Los proyectos están en data.data.data
          pagination: {
            current_page: response.data.data.current_page,
            per_page: response.data.data.per_page,
            total: response.data.data.total,
            last_page: response.data.data.last_page
          },
          meta: response.data.meta || {}
        };
      } else {
        throw new Error(response.data.message || 'Error al obtener proyectos');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error de conexión al obtener proyectos'
      );
    }
  },

  // Obtener un proyecto específico por ID
  async getProject(id) {
    try {
      const response = await api.get(`/projects/${id}`);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data
        };
      } else {
        throw new Error(response.data.message || 'Error al obtener proyecto');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error de conexión al obtener proyecto'
      );
    }
  },

  // Crear nuevo proyecto
  async createProject(projectData) {
    try {
      const response = await api.post('/projects', projectData);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Proyecto creado exitosamente'
        };
      } else {
        throw new Error(response.data.message || 'Error al crear proyecto');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      
      if (error.response?.status === 422) {
        // Errores de validación
        const errors = error.response.data.errors || {};
        const firstError = Object.values(errors)[0]?.[0];
        throw new Error(firstError || 'Datos de validación incorrectos');
      }
      
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error de conexión al crear proyecto'
      );
    }
  },

  // Actualizar proyecto
  async updateProject(id, projectData) {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Proyecto actualizado exitosamente'
        };
      } else {
        throw new Error(response.data.message || 'Error al actualizar proyecto');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      
      if (error.response?.status === 422) {
        const errors = error.response.data.errors || {};
        const firstError = Object.values(errors)[0]?.[0];
        throw new Error(firstError || 'Datos de validación incorrectos');
      }
      
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error de conexión al actualizar proyecto'
      );
    }
  },

  // Eliminar proyecto
  async deleteProject(id) {
    try {
      const response = await api.delete(`/projects/${id}`);
      
      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Proyecto eliminado exitosamente'
        };
      } else {
        throw new Error(response.data.message || 'Error al eliminar proyecto');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error de conexión al eliminar proyecto'
      );
    }
  },

  // Cambiar estado activo/inactivo
  async toggleProjectStatus(id) {
    try {
      const response = await api.patch(`/projects/${id}/toggle-status`);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Estado actualizado exitosamente'
        };
      } else {
        throw new Error(response.data.message || 'Error al cambiar estado');
      }
    } catch (error) {
      console.error('Error toggling project status:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error de conexión al cambiar estado'
      );
    }
  },

  // Obtener estadísticas de proyectos
  async getProjectStats() {
    try {
      const response = await api.get('/projects/stats');
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data
        };
      } else {
        throw new Error(response.data.message || 'Error al obtener estadísticas');
      }
    } catch (error) {
      console.error('Error fetching project stats:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error de conexión al obtener estadísticas'
      );
    }
  }
};