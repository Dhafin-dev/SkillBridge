import { Project, ClientRequest, ActiveStudentProject } from '../../types/types';
import apiClient from './apiClient';

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get('/projects');
    return response.data;
  },

  getProjectById: async (id: string): Promise<Project | null> => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  getMyProjectsStudent: async (): Promise<ActiveStudentProject[]> => {
    const response = await apiClient.get('/projects/student/me');
    return response.data;
  },

  getMyProjectsUMKM: async (): Promise<ClientRequest[]> => {
    const response = await apiClient.get('/projects/umkm/me');
    return response.data;
  },

  createProject: async (data: any): Promise<any> => {
    const response = await apiClient.post('/projects', data);
    return response.data;
  },

  applyToProject: async (projectId: string): Promise<void> => {
    await apiClient.post(`/projects/${projectId}/applications`);
  },

  acceptApplicant: async (projectId: string, studentId: string): Promise<any> => {
    const response = await apiClient.post(`/projects/${projectId}/applications/${studentId}/accept`);
    return response.data;
  },

  rejectApplicant: async (projectId: string, studentId: string): Promise<any> => {
    const response = await apiClient.post(`/projects/${projectId}/applications/${studentId}/reject`);
    return response.data;
  }
};
