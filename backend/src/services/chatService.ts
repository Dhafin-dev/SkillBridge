import { chatRepository } from '../repositories/chatRepository';
import { notificationService } from './notificationService';
import { AppError } from '../utils/AppError';

export class ChatService {
  async getChatContext(contextId: string, userId: string) {
    const context = await chatRepository.findContext(contextId, userId);
    if (!context) {
      // Fallback empty context
      return {
        messages: [],
        partner: {
          id: contextId,
          name: 'Workspace Member',
          avatar: '',
          role: 'Collaborator',
          status: 'Active',
        },
        project: {
          id: contextId,
          title: 'SkillBridge Collaboration',
        },
      };
    }

    const { workspace, partner, project } = context;
    const partnerId = partner.id !== userId ? partner.id : null;
    const messages = await chatRepository.findMessages(workspace?.id || null, userId, partnerId);

    const formattedMessages = messages.map(m => ({
      id: m.id,
      sender: m.sender.name,
      senderId: m.sender.id,
      senderAvatar: m.sender.avatar || '',
      isMe: m.sender.id === userId,
      text: m.text,
      time: m.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: m.createdAt.toISOString(),
    }));

    return {
      messages: formattedMessages,
      partner,
      project: {
        id: project.id,
        title: project.title,
      },
    };
  }

  async getChatHistory(contextId: string, userId: string) {
    const contextData = await this.getChatContext(contextId, userId);
    return contextData.messages;
  }

  async getConversations(userId: string) {
    return chatRepository.findConversations(userId);
  }

  async sendMessage(data: { projectId: string; text: string; receiverId?: string }, userId: string) {
    const { projectId: contextId, text, receiverId: explicitReceiverId } = data;

    const context = await chatRepository.findContext(contextId, userId);
    
    let targetReceiverId = explicitReceiverId;
    let workspaceId: string | null = null;

    if (context) {
      workspaceId = context.workspace?.id || null;
      if (!targetReceiverId) {
        targetReceiverId = context.partner.id !== userId ? context.partner.id : undefined;
      }
    } else {
      // Fallback: If contextId itself is a receiver User ID
      targetReceiverId = targetReceiverId || contextId;
    }

    if (!targetReceiverId) {
      throw new AppError('Recipient could not be determined for this message', 400);
    }

    const message = await chatRepository.createMessage({
      text,
      senderId: userId,
      receiverId: targetReceiverId,
      workspaceId,
    });

    // Notify recipient with real notification in DB
    try {
      await notificationService.createNotification(
        targetReceiverId,
        'MESSAGE',
        `New Message from ${message.sender.name}`,
        `${text.slice(0, 80)}${text.length > 80 ? '...' : ''}`,
        `/messages/${userId}`
      );
    } catch (err) {
      console.error('Failed to send notification for chat message:', err);
    }

    return {
      id: message.id,
      sender: message.sender.name,
      senderId: message.sender.id,
      senderAvatar: message.sender.avatar || '',
      isMe: true,
      text: message.text,
      time: message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: message.createdAt.toISOString(),
    };
  }
}

export const chatService = new ChatService();


