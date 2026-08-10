import { ChatMessage } from '../../types/types';
import apiClient from './apiClient';

export const chatService = {
  getChatMessages: async (projectId?: string): Promise<ChatMessage[]> => {
    const url = projectId ? `/chats?projectId=${projectId}` : '/chats';
    const response = await apiClient.get(url);
    return response.data;
  },
  
  sendMessage: async (projectId: string, text: string): Promise<ChatMessage> => {
    const response = await apiClient.post('/chats', { projectId, text });
    return response.data;
  }
};
