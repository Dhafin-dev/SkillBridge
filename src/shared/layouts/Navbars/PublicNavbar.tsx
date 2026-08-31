import React from 'react';

import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut, ChevronDown } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { currentUser, logout } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('landing');

  React.useEffect(() => {
    if (currentPath !== '/') return;

    const handleScroll = () => {
      const sections = ['landing', 'about', 'help'];
      let current = 'landing';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs px-4 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              <path d="M5 13.18v4.32L12 21l7-3.5v-4.32l-7 3.82-7-3.82z" opacity="0.8" />
              <path d="M9 16v3h2v-3H9zm4 0v3h2v-3h-2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-blue-700 leading-none">
              SkillBridge
            </span>
            <span className="text-[10px] font-semibold text-blue-500 uppercase tracking-wider mt-0.5 hidden sm:inline">
              Academia × Enterprise
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
          <button
            onClick={() => navigate('/')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              currentPath === '/' ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => navigate('/market')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              currentPath === '/market' ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Market
          </button>

          <button
            onClick={() => navigate('/about')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              currentPath === '/about' ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            About
          </button>

          <button
            onClick={() => navigate('/help')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              currentPath === '/help' ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Help & FAQ
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-2.5 p-1 pr-3 rounded-full border border-slate-200 hover:border-slate-300 bg-white shadow-xs transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-slate-900 leading-none">{currentUser.name?.split(' ')[0]}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-[70] animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                      {currentUser.role}
                    </div>
                  </div>

                  <div className="py-1">
                    <button onClick={() => { setShowRoleMenu(false); navigate(`/${currentUser.role}/dashboard`); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span>Dashboard</span>
                    </button>
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
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-700 hover:text-blue-700 font-semibold text-sm px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2 rounded-xl shadow-md shadow-blue-500/20 transition-all"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
