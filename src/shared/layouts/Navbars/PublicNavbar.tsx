import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export const PublicNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

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
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => navigate('/')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              currentPath === '/' ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Landing
          </button>
          <button
            onClick={() => navigate('/market')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              currentPath === '/market' || currentPath.startsWith('/projects/') ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Explore Projects
          </button>
          <button
            onClick={() => navigate('/about')}
            className={`px-3.5 py-1.5 rounded-lg transition-all text-slate-600 hover:text-slate-900`}
          >
            About
          </button>
          <button
            onClick={() => navigate('/help')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              currentPath === '/help' ? 'text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Help
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </header>
  );
};
