import { NotificationItem } from '../../types/types';
import apiClient from './apiClient';

export const notificationService = {
  getNotifications: async (): Promise<NotificationItem[]> => {
    const response = await apiClient.get('/notifications');
    return response.data;
  },
  
  markAsRead: async (id: string): Promise<void> => {
    await apiClient.patch(`/notifications/${id}/read`);
  },
  
  markAllAsRead: async (): Promise<void> => {
    await apiClient.patch('/notifications/read-all');
  }
};
