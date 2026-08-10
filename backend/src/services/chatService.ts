import { chatRepository } from '../repositories/chatRepository';

export class ChatService {
  async getChatHistory(projectId: string, userId: string) {
    const messages = await chatRepository.findMessagesByWorkspaceOrProject(projectId, userId);

    return messages.map(m => ({
      id: m.id,
      sender: m.sender.name,
      senderAvatar: m.sender.avatar || '',
      isMe: m.senderId === userId,
      text: m.text,
      timestamp: m.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
  }
}

export const chatService = new ChatService();
