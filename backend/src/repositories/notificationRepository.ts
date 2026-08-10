import prisma from '../utils/prisma';

export class NotificationRepository {
  async findUserNotifications(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}

export const notificationRepository = new NotificationRepository();
