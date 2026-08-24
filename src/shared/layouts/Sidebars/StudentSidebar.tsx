import React from 'react';
import { Home, Store, Briefcase, MessageSquare, User, Settings, GraduationCap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  chatUnreadCount?: number;
}

export const StudentSidebar: React.FC<SidebarProps> = ({ chatUnreadCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const getActiveTab = () => {
    if (currentPath.includes('/student/dashboard')) return 'home';
    if (currentPath === '/market' || currentPath.startsWith('/projects/')) return 'market';
    if (currentPath.includes('/my-projects')) return 'workspace';
    if (currentPath.includes('/messages')) return 'messages';
    if (currentPath.includes('/profile') || currentPath.includes('/students/')) return 'profile';
    return 'home';
  };

  const activeTab = getActiveTab();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, action: () => navigate('/student/dashboard') },
    { id: 'market', label: 'Market', icon: Store, action: () => navigate('/market') },
    { id: 'workspace', label: 'My Projects', icon: Briefcase, action: () => navigate('/student/my-projects') },
    { id: 'messages', label: 'Messages', icon: MessageSquare, action: () => navigate('/messages'), badge: chatUnreadCount },
    { id: 'profile', label: 'Profile', icon: User, action: () => navigate('/profile') }
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200/80 flex-col z-50 shadow-sm">
      <div className="p-6 mb-4 border-b border-slate-100">
        <div 
          className="flex items-center gap-2 cursor-pointer w-fit opacity-100 hover:opacity-80 transition-opacity"
          onClick={() => navigate('/student/dashboard')}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-slate-900 text-lg tracking-tight">SkillBridge</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Student Menu</div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold text-sm relative ${
              activeTab === item.id
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 ? (
              <span className="absolute right-3 w-5 h-5 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full">
                {item.badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={() => navigate('/settings')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all font-semibold text-sm"
        >
          <Settings className="w-5 h-5 text-slate-400" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};
