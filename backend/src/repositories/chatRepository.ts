import prisma from '../utils/prisma';

export class ChatRepository {
  async findMessagesByWorkspaceOrProject(projectId: string, userId: string) {
    return prisma.message.findMany({
      where: {
        workspaceId: projectId, // Currently using workspaceId for project context if active
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        sender: { select: { name: true, avatar: true } },
      },
      orderBy: { createdAt: 'asc' }
    });
  }
}

export const chatRepository = new ChatRepository();
