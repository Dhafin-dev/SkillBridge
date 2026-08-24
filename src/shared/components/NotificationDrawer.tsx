import React, { useState, useEffect } from 'react';
import { X, Bell, CheckCircle2, MessageSquare, Sparkles, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notificationService } from '../services/api/notificationService';
import { NotificationItem } from '../types/types';

interface NotificationDrawerProps {
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    notificationService.getNotifications().then(data => {
      setNotifications(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl p-5 space-y-5 flex flex-col animate-in slide-in-from-right duration-200">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-extrabold text-slate-900">Notifications</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {isLoading ? (
            <div className="text-center py-10 text-slate-500 font-semibold text-sm">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-10 text-slate-500 font-semibold text-sm">No notifications</div>
          ) : notifications.map(n => (
            <div
              key={n.id}
              onClick={async () => {
                if (!n.isRead) {
                  try {
                    await notificationService.markAsRead(n.id);
                  } catch (e) { }
                }
                if (n.actionRoute) {
                  if (n.actionRoute === 'messages') navigate('/messages');
                  else if (n.actionRoute === 'market') navigate('/market');
                }
                onClose();
              }}
              className={`p-3.5 rounded-2xl border space-y-1 transition-colors cursor-pointer ${n.isRead
                  ? 'bg-white border-slate-100 opacity-60'
                  : 'bg-slate-50 border-blue-100 shadow-sm hover:bg-blue-50/50'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{n.title}</span>
                <span className="text-[10px] text-slate-400 font-semibold">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">{n.message}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 text-center">
          <button
            onClick={async () => {
              try {
                await notificationService.markAllAsRead();
                setNotifications(notifications.map(n => ({ ...n, isRead: true })));
              } catch (e) { }
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Mark All as Read
          </button>
        </div>

      </div>
    </div>
  );
};
