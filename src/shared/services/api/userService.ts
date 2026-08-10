import { StudentCandidate, UserProfile } from '../../types/types';
import apiClient from './apiClient';

export const userService = {
  getRecommendedStudents: async (): Promise<StudentCandidate[]> => {
    const response = await apiClient.get('/users/students/recommended');
    return response.data;
  },
  
  getProfile: async (id?: string): Promise<UserProfile> => {
    const url = id ? `/users/${id}` : '/users/me';
    const response = await apiClient.get(url);
    return response.data;
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await apiClient.patch('/users/me', data);
    return response.data;
  }
};
