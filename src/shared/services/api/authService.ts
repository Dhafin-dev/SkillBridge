import { UserProfile } from '../../types/types';
import apiClient from './apiClient';
import { storageService } from '../storageService';

export const authService = {
  login: async (email: string, password?: string): Promise<{ token: string; user: UserProfile }> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (data: any): Promise<{ token: string; user: UserProfile }> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  verifyToken: async (): Promise<UserProfile | null> => {
    const token = storageService.getAccessToken();
    if (!token) return null;
    
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      return null;
    }
  },

  forgotPassword: async (email: string): Promise<{ message: string; resetToken?: string }> => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/reset-password', { token, newPassword });
    return response.data;
  }
};

