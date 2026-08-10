import React from 'react';
import { LayoutDashboard, Users, Briefcase, Settings, Shield, FolderGit2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const getActiveTab = () => {
    if (currentPath.includes('/admin/overview')) return 'dashboard';
    if (currentPath.includes('/admin/users')) return 'users';
    if (currentPath.includes('/admin/projects')) return 'projects';
    if (currentPath.includes('/admin/categories')) return 'categories';
    if (currentPath.includes('/admin/verifications')) return 'verifications';
    if (currentPath.includes('/admin/settings')) return 'settings';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, action: () => navigate('/admin/overview') },
    { id: 'users', label: 'Users', icon: Users, action: () => navigate('/admin/users') },
    { id: 'projects', label: 'Projects', icon: Briefcase, action: () => navigate('/admin/projects') },
    { id: 'categories', label: 'Categories', icon: FolderGit2, action: () => navigate('/admin/categories') },
    { id: 'verifications', label: 'Verifications', icon: Shield, action: () => navigate('/admin/verifications') },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 flex-col z-50 shadow-sm text-slate-300">
      <div className="p-6 border-b border-slate-800">
      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mb-2">
        <span className="text-white font-bold text-sm">A</span>
      </div>
      <span className="font-extrabold text-white text-lg tracking-tight">Admin Portal</span>
    </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Management</div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold text-sm ${
              activeTab === item.id
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-400' : 'text-slate-500'}`} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => navigate('/admin/settings')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all font-semibold text-sm"
        >
          <Settings className="w-5 h-5 text-slate-500" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};
