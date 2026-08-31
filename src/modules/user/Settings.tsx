import React, { useState } from 'react';
import { User, Shield, Key, Bell, Palette, Globe, FileText, Headphones, Info, LogOut, ChevronRight, ArrowLeft, SlidersHorizontal, Mail, Save, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [platformName, setPlatformName] = useState('SkillBridge Academic Hub');
  const [saved, setSaved] = useState(false);

  const handleAdminSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-20 pt-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => {
                if (currentUser.role === 'student') navigate('/student/dashboard');
                else if (currentUser.role === 'umkm') navigate('/umkm/dashboard');
                else if (currentUser.role === 'admin') navigate('/admin/overview');
                else navigate('/');
              }}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
          </div>
          <p className="text-sm text-slate-500">Manage your account preferences, security configurations, and application experience.</p>
        </div>
        {currentUser.role === 'admin' && (
          <button
            onClick={handleAdminSave}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save Platform Settings</span>
          </button>
        )}
      </div>

      {saved && currentUser.role === 'admin' && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Platform configuration updated successfully.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Settings Column */}
        <div className="md:col-span-8 space-y-6">
          {/* Account Section */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-base font-semibold text-slate-900">Account</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {/* Profile */}
              <button
                onClick={() => navigate('/profile')}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50/80 transition-colors text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Profile</div>
                    <div className="text-xs text-slate-500">View and manage your public profile</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>


              {/* Password */}
              <button
                onClick={() => navigate('/settings/change-password')}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50/80 transition-colors text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Password</div>
                    <div className="text-xs text-slate-500">Change or reset security credentials</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-base font-semibold text-slate-900">Preferences</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {/* Notifications */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Notifications</div>
                    <div className="text-xs text-slate-500">Email and real-time push updates</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Appearance */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Appearance</div>
                    <div className="text-xs text-slate-500">Light / Dark theme preference</div>
                  </div>
                </div>
                <select
                  value={themeMode}
                  onChange={(e) => setThemeMode(e.target.value as 'light' | 'dark')}
                  className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                </select>
              </div>

              {/* Language */}
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Language</div>
                    <div className="text-xs text-slate-500">System display language</div>
                  </div>
                </div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Admin Specific Platform Settings */}
          {currentUser.role === 'admin' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                  <h2 className="text-base font-semibold text-slate-900">Platform Settings</h2>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Admin Only</span>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="px-6 py-4 space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-slate-500 mb-1">Platform Name</label>
                    <input
                      type="text"
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Maintenance Mode</p>
                      <p className="text-[11px] text-slate-500">Restrict access to admins only.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Secondary Info Column */}
        <div className="md:col-span-4 space-y-6">
          {/* User Brief Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-3">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                <User className="w-6 h-6" />
              </div>
            )}
            <div className="overflow-hidden">
              <h3 className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</h3>
              <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
              <span className="inline-block mt-1 bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider">
                {currentUser.role} Account
              </span>
            </div>
          </div>

          {/* Support & About Section */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-100">
              <button
                onClick={() => navigate('/help')}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Headphones className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-800">Help Center & Support</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/about')}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-800">About SkillBridge</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/terms')}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-800">Privacy Policy & Terms</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm h-11 rounded-2xl transition-colors border border-red-200/60"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};
