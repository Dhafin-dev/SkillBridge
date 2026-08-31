import apiClient from './apiClient';

export interface AdminStats {
  totalUsers: number;
  activeProjects: number;
  successRate: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  status: string;
  avatar: string;
}

export interface AdminProject {
  id: string;
  title: string;
  status: string;
  umkm: string;
  student: string;
  progress: number;
  date: string;
  overdue: boolean;
}

export interface AdminCategory {
  id: string;
  name: string;
  projectCount: number;
  status: string;
}

export interface MatchRecommendation {
  id: string;
  projectTitle: string;
  companyName: string;
  compatibility: number;
  studentName: string;
  studentAvatar: string;
  studentInfo: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'manual';
}

export interface VerificationRequest {
  id: string;
  name: string;
  institution: string;
  role: string;
  docType: string;
  date: string;
  photo: string;
  docScan: string;
  status: string;
}

export const adminService = {
  getOverviewStats: async (): Promise<AdminStats> => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },

  getAllUsers: async (): Promise<AdminUser[]> => {
    const response = await apiClient.get('/admin/users');
    return response.data;
  },

  getAllProjects: async (): Promise<AdminProject[]> => {
    const response = await apiClient.get('/admin/projects');
    return response.data;
  },

  getAllCategories: async (): Promise<AdminCategory[]> => {
    const response = await apiClient.get('/admin/categories');
    return response.data;
  },

  createCategory: async (name: string, description?: string): Promise<AdminCategory> => {
    const response = await apiClient.post('/admin/categories', { name, description });
    return response.data;
  },

  updateCategory: async (id: string, name: string, description?: string): Promise<AdminCategory> => {
    const response = await apiClient.put(`/admin/categories/${id}`, { name, description });
    return response.data;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/categories/${id}`);
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/users/${id}`);
  },

  toggleUserStatus: async (id: string, isVerified: boolean): Promise<void> => {
    await apiClient.patch(`/admin/users/${id}/status`, { isVerified });
  },

  deleteProject: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/projects/${id}`);
  },

  getMatchRecommendations: async (): Promise<MatchRecommendation[]> => {
    const response = await apiClient.get('/admin/match-recommendations');
    return response.data;
  },

  getVerifications: async (): Promise<VerificationRequest[]> => {
    const response = await apiClient.get('/admin/verifications');
    return response.data;
  },

  approveVerification: async (id: string): Promise<void> => {
    await apiClient.post(`/admin/verifications/${id}/approve`);
  },

  rejectVerification: async (id: string, reason?: string): Promise<void> => {
    await apiClient.post(`/admin/verifications/${id}/reject`, { reason });
  }
};
