import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, MessageSquare, Briefcase, Check, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from './ui/EmptyState';
import { notificationService } from '../services/api/notificationService';
import { NotificationItem } from '../types/types';

export const NotificationCenter: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'Projects' | 'Messages' | 'System'>('All');
  const [readAll, setRead] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    notificationService.getNotifications().then(data => {
      setNotifications(data);
      setIsLoading(false);
    });
  }, []);

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'All') return true;
    if (filter === 'Projects') return n.type === 'project';
    if (filter === 'Messages') return n.type === 'message';
    if (filter === 'System') return n.type === 'system';
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] text-slate-900 pb-24 max-w-3xl mx-auto">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/market')}
            className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200 shadow-xs"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-extrabold text-slate-900">Notifications</h1>
        </div>
        <button
          onClick={() => setRead(true)}
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <main className="p-4 space-y-4">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          {(['All', 'Projects', 'Messages', 'System'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${filter === tab
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-10 text-slate-500 font-semibold">Loading notifications...</div>
          ) : filteredNotifications.length === 0 ? (
            <EmptyState
              icon={<Bell className="w-8 h-8" />}
              title="No notifications yet"
              description={`You don't have any ${filter.toLowerCase()} notifications at the moment.`}
            />
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  if (n.actionRoute === 'messages') navigate('/messages');
                  else if (n.actionRoute === 'project-details') navigate('/market');
                }}
                className={`bg-white rounded-2xl p-4 flex gap-3.5 border transition-all cursor-pointer hover:bg-slate-50 ${!n.isRead && !readAll ? 'border-blue-300 shadow-xs' : 'border-slate-200/80'
                  }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  {n.type === 'project' ? <Briefcase className="w-5 h-5" /> : n.type === 'message' ? <MessageSquare className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5 text-amber-600" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-slate-900">{n.title}</h3>
                    <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
