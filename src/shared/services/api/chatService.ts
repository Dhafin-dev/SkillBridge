import { ChatMessage } from '../../types/types';
import apiClient from './apiClient';

export interface ChatPartner {
  id?: string;
  name: string;
  avatar: string;
  role: string;
  status: string;
}

export interface ChatContextData {
  messages: any[];
  partner: ChatPartner;
  project?: {
    id: string;
    title: string;
  };
}

export interface ConversationItem {
  id: string;
  title: string;
  subtitle: string;
  avatar?: string;
  role?: string;
  projectTitle?: string;
  lastMessage?: {
    text: string;
    createdAt: string;
    isMe: boolean;
  };
  status: string;
}

export const chatService = {
  getConversations: async (): Promise<ConversationItem[]> => {
    const response = await apiClient.get('/chats/conversations');
    return response.data;
  },

  getChatMessages: async (contextId?: string): Promise<any[]> => {
    const url = contextId ? `/chats/context/${contextId}` : '/chats';
    const response = await apiClient.get(url);
    return response.data?.messages || response.data || [];
  },

  getChatContext: async (contextId: string): Promise<ChatContextData> => {
    const response = await apiClient.get(`/chats/context/${contextId}`);
    return response.data;
  },
  
  sendMessage: async (contextId: string, text: string): Promise<any> => {
    const response = await apiClient.post(`/chats/${contextId}/messages`, { projectId: contextId, text });
    return response.data;
  }
};


