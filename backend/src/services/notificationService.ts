import { notificationRepository } from '../repositories/notificationRepository';

export class NotificationService {
  async getUserNotifications(userId: string) {
    const notifications = await notificationRepository.findUserNotifications(userId);

    return notifications.map(n => ({
      id: n.id,
      type: n.type.toLowerCase(),
      title: n.title,
      message: n.message,
      timestamp: n.createdAt.toLocaleDateString(),
      isRead: n.isRead,
      actionRoute: n.actionRoute || undefined,
    }));
  }
}

export const notificationService = new NotificationService();
