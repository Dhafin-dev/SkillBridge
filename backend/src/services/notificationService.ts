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

  async createNotification(userId: string, type: string, title: string, message: string, actionRoute?: string) {
    return notificationRepository.create({
      userId,
      type,
      title,
      message,
      actionRoute
    });
  }

  async markAsRead(id: string, userId: string) {
    return notificationRepository.markAsRead(id, userId);
  }

  async markAllAsRead(userId: string) {
    return notificationRepository.markAllAsRead(userId);
  }
}

export const notificationService = new NotificationService();
