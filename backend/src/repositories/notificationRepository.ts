import prisma from '../utils/prisma';

export class NotificationRepository {
  async findUserNotifications(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(data: { userId: string, type: string, title: string, message: string, actionRoute?: string, relatedEntityId?: string, relatedEntityType?: string }) {
    return prisma.notification.create({ data });
  }

  async markAsRead(id: string, userId: string) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true }
    });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true }
    });
  }
}

export const notificationRepository = new NotificationRepository();
