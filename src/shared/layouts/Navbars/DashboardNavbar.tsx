import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Sparkles, ChevronDown, User, LogOut, Briefcase, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface DashboardNavbarProps {
  onOpenNotifications: () => void;
  onOpenCreateProject?: () => void;
  unreadCount?: number;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  onOpenNotifications,
  onOpenCreateProject,
  unreadCount = 0
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const currentPath = location.pathname;
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(event.target as Node)) {
        setShowRoleMenu(false);
      }
    };
    if (showRoleMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showRoleMenu]);

  if (!currentUser) return null;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs px-4 py-3 transition-all">
      <div className="flex items-center justify-between gap-3">
        {/* Mobile Menu Button - (You could add logic here to open a mobile sidebar later) */}
        <button className="md:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>

        {/* Primary Navigation is handled via Sidebar. Top Nav is for Utilities Only. */}

        {/* Fill empty space */}
        <div className="flex-1"></div>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2">
          {currentUser.role !== 'admin' && (
            <div onClick={() => navigate('/search')} className="relative hidden sm:block cursor-pointer">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" readOnly placeholder="Search..." className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-40 cursor-pointer focus:outline-none hover:bg-slate-100 transition-all pointer-events-none" />
            </div>
          )}


          <button onClick={onOpenNotifications} className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors">
            <Bell className="w-5 h-5 text-slate-700" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>}
          </button>

          {/* User Profile Menu */}
          <div className="relative" ref={roleMenuRef}>
            <button onClick={() => setShowRoleMenu(!showRoleMenu)} className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors border border-slate-200/80">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 ring-2 ring-blue-500/20">
                  <User className="w-4 h-4" />
                </div>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 pr-0.5 hidden sm:block" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-70 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900 truncate">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                    {currentUser.role}
                  </div>
                </div>

                <div className="py-1">
                  <button onClick={() => { setShowRoleMenu(false); navigate('/profile'); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>My Profile</span>
                  </button>
                  <button onClick={() => { setShowRoleMenu(false); logout(); navigate('/login'); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
