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
    const response = await apiClient.get('/projects/student/active');
    return response.data;
  },

  getMyProjectsUMKM: async (): Promise<ClientRequest[]> => {
    const response = await apiClient.get('/projects/umkm/requests');
    return response.data;
  }
};
