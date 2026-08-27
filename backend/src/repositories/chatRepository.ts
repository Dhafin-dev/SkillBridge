import prisma from '../utils/prisma';

const userInclude = {
  studentProfile: true,
  umkmProfile: true,
};

const getDisplayName = (user: any): string => {
  return user?.umkmProfile?.companyName || user?.name || 'User';
};

export class ChatRepository {
  async findContext(contextId: string, userId: string) {
    // 1. Try finding by workspace ID directly
    const workspaceById = await prisma.workspace.findUnique({
      where: { id: contextId },
      include: {
        project: { include: { owner: { include: userInclude } } },
        student: { include: userInclude },
        umkm: { include: userInclude },
      },
    });
    if (workspaceById) {
      const isStudent = workspaceById.studentId === userId;
      const partnerUser: any = isStudent ? workspaceById.umkm : workspaceById.student;
      return {
        type: 'workspace' as const,
        workspace: workspaceById,
        project: workspaceById.project,
        partner: {
          id: partnerUser.id,
          name: getDisplayName(partnerUser),
          avatar: partnerUser.avatar || '',
          role: partnerUser.role.toLowerCase(),
          status: 'Active Collaborator',
        },
      };
    }

    // 2. Try finding workspace by projectId and user involvement
    const workspaceByProjectAndUser = await prisma.workspace.findFirst({
      where: {
        projectId: contextId,
        OR: [{ studentId: userId }, { umkmId: userId }],
      },
      include: {
        project: { include: { owner: { include: userInclude } } },
        student: { include: userInclude },
        umkm: { include: userInclude },
      },
    });
    if (workspaceByProjectAndUser) {
      const isStudent = workspaceByProjectAndUser.studentId === userId;
      const partnerUser: any = isStudent ? workspaceByProjectAndUser.umkm : workspaceByProjectAndUser.student;
      return {
        type: 'workspace' as const,
        workspace: workspaceByProjectAndUser,
        project: workspaceByProjectAndUser.project,
        partner: {
          id: partnerUser.id,
          name: getDisplayName(partnerUser),
          avatar: partnerUser.avatar || '',
          role: partnerUser.role.toLowerCase(),
          status: 'Active Collaborator',
        },
      };
    }

    // 3. Try finding by Project ID
    const project = await prisma.project.findUnique({
      where: { id: contextId },
      include: {
        owner: { include: userInclude },
        applications: {
          include: { student: { include: userInclude } },
        },
        workspaces: {
          include: { student: { include: userInclude }, umkm: { include: userInclude } },
        },
      },
    });
    if (project) {
      const isOwner = project.ownerId === userId;
      let partnerUser: any = project.owner;
      if (isOwner) {
        // If owner is looking at the project chat, find the active student or first applicant
        const activeWs = project.workspaces[0];
        if (activeWs) {
          partnerUser = activeWs.student;
        } else if (project.applications.length > 0) {
          partnerUser = project.applications[0].student;
        }
      }
      return {
        type: 'project' as const,
        workspace: project.workspaces[0] || null,
        project,
        partner: {
          id: partnerUser.id,
          name: getDisplayName(partnerUser),
          avatar: partnerUser.avatar || '',
          role: partnerUser.role.toLowerCase(),
          status: 'Project Member',
        },
      };
    }

    // 4. Try finding by User ID (direct 1-on-1 chat)
    const directUser = await prisma.user.findUnique({
      where: { id: contextId },
      include: userInclude,
    });
    if (directUser) {
      // Find any shared project or workspace between them
      const sharedWorkspace = await prisma.workspace.findFirst({
        where: {
          OR: [
            { studentId: userId, umkmId: directUser.id },
            { studentId: directUser.id, umkmId: userId },
          ],
        },
        include: { project: true },
      });

      return {
        type: 'direct' as const,
        workspace: sharedWorkspace || null,
        project: sharedWorkspace?.project || { id: directUser.id, title: 'Direct Conversation' },
        partner: {
          id: directUser.id,
          name: getDisplayName(directUser),
          avatar: directUser.avatar || '',
          role: directUser.role.toLowerCase(),
          status: 'Direct Chat',
        },
      };
    }

    return null;
  }

  async findMessages(workspaceId: string | null, userId: string, partnerId: string | null) {
    const conditions: any[] = [];

    if (workspaceId) {
      conditions.push({ workspaceId });
    }

    if (partnerId) {
      conditions.push(
        { senderId: userId, receiverId: partnerId },
        { senderId: partnerId, receiverId: userId }
      );
    }

    if (conditions.length === 0) {
      return [];
    }

    return prisma.message.findMany({
      where: {
        OR: conditions,
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findConversations(userId: string) {
    // 1. Get all messages involving the user
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: { include: userInclude },
        receiver: { include: userInclude },
        workspace: { include: { project: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const conversationMap = new Map<string, any>();

    for (const msg of messages) {
      const partner: any = msg.senderId === userId ? msg.receiver : msg.sender;
      const convId = partner.id;

      if (!conversationMap.has(convId)) {
        conversationMap.set(convId, {
          id: convId,
          title: getDisplayName(partner),
          subtitle: msg.text,
          avatar: partner.avatar || '',
          role: partner.role.toLowerCase(),
          projectTitle: msg.workspace?.project?.title || 'Direct Conversation',
          lastMessage: {
            text: msg.text,
            createdAt: msg.createdAt.toISOString(),
            isMe: msg.senderId === userId,
          },
          status: 'Active',
        });
      }
    }

    // 2. Add workspaces where user is participating
    const workspaces = await prisma.workspace.findMany({
      where: {
        OR: [{ studentId: userId }, { umkmId: userId }],
      },
      include: {
        project: true,
        student: { include: userInclude },
        umkm: { include: userInclude },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    for (const ws of workspaces) {
      const isStudent = ws.studentId === userId;
      const partner: any = isStudent ? ws.umkm : ws.student;
      const convId = partner.id;

      if (!conversationMap.has(convId)) {
        const lastMsg = ws.messages[0];
        conversationMap.set(convId, {
          id: convId,
          title: getDisplayName(partner),
          subtitle: lastMsg ? lastMsg.text : ws.project.title,
          avatar: partner.avatar || '',
          role: partner.role.toLowerCase(),
          projectTitle: ws.project.title,
          lastMessage: lastMsg
            ? {
                text: lastMsg.text,
                createdAt: lastMsg.createdAt.toISOString(),
                isMe: lastMsg.senderId === userId,
              }
            : undefined,
          status: ws.status === 'ACTIVE' ? 'Active' : 'Completed',
        });
      }
    }

    return Array.from(conversationMap.values());
  }

  async createMessage(data: {
    text: string;
    senderId: string;
    receiverId: string;
    workspaceId?: string | null;
  }) {
    return prisma.message.create({
      data: {
        text: data.text,
        senderId: data.senderId,
        receiverId: data.receiverId,
        workspaceId: data.workspaceId || null,
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
        receiver: { select: { id: true, name: true, avatar: true } },
      },
    });
  }
}

export const chatRepository = new ChatRepository();



