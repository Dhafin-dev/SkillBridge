import React, { useState, useEffect } from 'react';
import { Users, ClipboardList, CheckCircle2, TrendingUp, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService, AdminStats } from '../../shared/services/api/adminService';

export const AdminOverview: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    adminService.getOverviewStats().then(setStats);
  }, []);
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] pb-24 pt-4 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-5">
        

        {/* Header Title */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Overview
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            Comprehensive metrics and recent activities for platform management.
          </p>
        </div>



        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Metric Card 1: TOTAL USERS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Users className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12%</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                TOTAL USERS
              </span>
              <span className="text-4xl font-black text-slate-900 leading-none">
                {stats ? stats.totalUsers.toLocaleString() : '...'}
              </span>
            </div>
          </div>

          {/* Metric Card 2: ACTIVE PROJECTS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+5%</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                ACTIVE PROJECTS
              </span>
              <span className="text-4xl font-black text-slate-900 leading-none">
                {stats ? stats.activeProjects.toLocaleString() : '...'}
              </span>
            </div>
          </div>

          {/* Metric Card 3: SUCCESS RATE matching Screenshot 10 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 relative overflow-hidden hover:shadow-md transition-all">
            {/* Top Green Accent Border */}
            <div className="h-1.5 w-full bg-emerald-500 absolute top-0 left-0 right-0"></div>

            <div className="flex items-center justify-between pt-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                SUCCESS RATE
              </span>
              <span className="text-4xl font-black text-slate-900 leading-none">
                {stats ? stats.successRate : '...'}%
              </span>
            </div>
          </div>
        </div>

        {/* Growth Analytics Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-900">Platform Growth Overview</h3>
            <select className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-3 px-2">
            {[40, 70, 45, 90, 65, 85, 120].map((val, i) => (
              <div key={i} className="w-full relative group flex justify-center h-full items-end">
                <div 
                  className="w-full max-w-[48px] bg-blue-100 group-hover:bg-blue-500 rounded-t-xl transition-all duration-300 relative cursor-pointer"
                  style={{ height: `${(val / 120) * 100}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold py-1.5 px-2.5 rounded-lg transition-opacity whitespace-nowrap shadow-xl z-10 pointer-events-none">
                    {val} Users
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

      </div>
    </div>
  );
};
