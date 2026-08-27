import apiClient from './apiClient';

export interface WorkspaceTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  assignedTo: string;
}

export interface WorkspaceData {
  id: string;
  projectId: string;
  project: {
    id: string;
    title: string;
    status: string;
    duration: string;
    stipend: string;
    category: string;
    owner: any;
  };
  status: string;
  progressPercent: number;
  currentPhase: string;
  tasks: WorkspaceTask[];
  deliverables: string[];
  student: any;
  umkm: any;
  createdAt?: string;
}

export const workspaceService = {
  getWorkspaceByProjectId: async (projectId: string): Promise<WorkspaceData> => {
    const response = await apiClient.get(`/workspaces/project/${projectId}`);
    return response.data;
  },

  addTask: async (workspaceId: string, data: { title: string; dueDate?: string; assignedTo?: string }): Promise<WorkspaceTask> => {
    const response = await apiClient.post(`/workspaces/${workspaceId}/tasks`, data);
    return response.data;
  },

  toggleTask: async (workspaceId: string, taskId: string, completed?: boolean): Promise<WorkspaceTask> => {
    const response = await apiClient.patch(`/workspaces/${workspaceId}/tasks/${taskId}`, { completed });
    return response.data;
  },

  deleteTask: async (workspaceId: string, taskId: string): Promise<{ success: boolean }> => {
    const response = await apiClient.delete(`/workspaces/${workspaceId}/tasks/${taskId}`);
    return response.data;
  },

  updateProgress: async (workspaceId: string, progressPercent: number): Promise<any> => {
    const response = await apiClient.patch(`/workspaces/${workspaceId}/progress`, { progressPercent });
    return response.data;
  }
};
