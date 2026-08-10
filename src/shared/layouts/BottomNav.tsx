import React from 'react';
import { Home, Store, MessageSquare, User, LayoutDashboard, Briefcase, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface BottomNavProps {
  chatUnreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  chatUnreadCount = 1
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const currentPath = location.pathname;
  // Determine active tab identifier based on screen
  const getActiveTab = () => {
    if (currentPath === '/' || currentPath.includes('/dashboard') || currentPath.includes('/admin/overview')) return 'home';
    if (currentPath === '/market' || currentPath.startsWith('/projects/')) return 'market';
    if (currentPath.includes('/my-projects') || currentPath.includes('/my-requests')) return 'workspace';
    if (currentPath.includes('/messages')) return 'messages';
    if (currentPath.includes('/profile') || currentPath.includes('/students/')) return 'profile';
    return 'home';
  };

  const activeTab = getActiveTab();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 py-2 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Home Tab */}
        <button
          onClick={() => {
            if (currentUser.role === 'student') navigate('/student/dashboard');
            else if (currentUser.role === 'admin') navigate('/admin/overview');
            else if (currentUser.role === 'umkm') navigate('/umkm/dashboard');
            else navigate('/');
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${
            activeTab === 'home' ? 'bg-emerald-300/80 text-emerald-900 shadow-xs scale-105' : ''
          }`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium tracking-tight">Home</span>
        </button>

        {/* Market Tab */}
        <button
          onClick={() => navigate('/market')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'market' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${
            activeTab === 'market' ? 'bg-emerald-300/80 text-emerald-900 shadow-xs scale-105' : ''
          }`}>
            <Store className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium tracking-tight">Market</span>
        </button>

        {/* Workspace Tab */}
        <button
          onClick={() => {
            if (currentUser.role === 'student') navigate('/student/my-projects');
            else navigate('/umkm/projects');
          }}
          className={`flex flex-col items-center gap-1 transition-all relative ${
            activeTab === 'workspace' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all relative ${
            activeTab === 'workspace' ? 'bg-emerald-300/80 text-emerald-900 shadow-xs scale-105' : ''
          }`}>
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium tracking-tight">Workspace</span>
        </button>
        
        {/* Messages Tab */}
        <button
          onClick={() => navigate('/messages')}
          className={`flex flex-col items-center gap-1 transition-all relative ${
            activeTab === 'messages' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all relative ${
            activeTab === 'messages' ? 'bg-emerald-300/80 text-emerald-900 shadow-xs scale-105' : ''
          }`}>
            <MessageSquare className="w-5 h-5" />
            {chatUnreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-600 border-2 border-white rounded-full"></span>
            )}
          </div>
          <span className="text-[11px] font-medium tracking-tight">Messages</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => {
            navigate('/profile');
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'profile'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${
            activeTab === 'profile'
              ? 'bg-emerald-300/80 text-emerald-900 shadow-xs scale-105'
              : ''
          }`}>
            <User className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium tracking-tight">Profile</span>
        </button>
      </div>
    </div>
  );
};
