import React from 'react';
import { Briefcase, CheckCircle, Users, Plus, ChevronRight, Activity, TrendingUp, Sparkles, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../shared/context/AuthContext';
import { userService } from '../../shared/services/api/userService';
import { StudentCandidate, ClientRequest } from '../../shared/types/types';
import { projectService } from '../../shared/services/api/projectService';
import { StatCard } from '../../shared/components/ui/StatCard';

export const UMKMDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const { data: recommendedStudents = [] } = useQuery({
    queryKey: ['recommendedStudents'],
    queryFn: () => userService.getRecommendedStudents()
  });

  const { data: projects = [], isLoading: isLoadingProjects } = useQuery({
    queryKey: ['umkmProjects'],
    queryFn: () => projectService.getMyProjectsUMKM()
  });

  const activeProjectsCount = projects.filter(p => p.status === 'ACTIVE').length;
  const completedProjectsCount = projects.filter(p => p.status === 'COMPLETED').length;
  const draftProjectsCount = projects.filter(p => p.status === 'DRAFT').length;
  const totalAppsCount = projects.reduce((acc, p) => acc + (p.applicationsCount || 0), 0);

  const performanceData = [
    { label: 'Total Projects', value: projects.length.toString(), trend: '' },
    { label: 'Total Applications', value: totalAppsCount.toString(), trend: '' },
    { label: 'Active Projects', value: activeProjectsCount.toString(), trend: '' },
  ];

  if (!currentUser) return null;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] pb-24 pt-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header Greeting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Here's your business collaboration overview.
            </p>
          </div>
          <button
            onClick={() => navigate('/umkm/projects?create=true')}

            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Project</span>
          </button>
        </div>

        {/* Business Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Active Projects"
            value={activeProjectsCount}
            icon={<Briefcase className="w-4 h-4" />}
            iconColor="text-blue-500"
            layout="compact"
          />
          <StatCard
            title="Open Apps"
            value={totalAppsCount}
            icon={<Users className="w-4 h-4" />}
            iconColor="text-amber-500"
            layout="compact"
          />
          <StatCard
            title="Total Collabs"
            value={projects.length}
            icon={<Activity className="w-4 h-4" />}
            iconColor="text-indigo-500"
            layout="compact"
          />
          <StatCard
            title="Completed"
            value={completedProjectsCount}
            icon={<CheckCircle className="w-4 h-4" />}
            iconColor="text-emerald-500"
            layout="compact"
          />
        </div>

        {/* Project Performance Summary */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-1 z-10 w-full sm:w-auto">
            <span className="text-xs font-semibold opacity-80 block text-blue-200">Overall Performance</span>
            <div className="text-xl sm:text-2xl font-bold tracking-tight">
              Projects are tracking well
            </div>
          </div>
          <div className="flex gap-4 sm:gap-6 z-10 w-full sm:w-auto justify-between sm:justify-end">
            {performanceData.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{stat.label}</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black">{stat.value}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 gap-6">
          {/* Recent Project Requests */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Recent Projects
              </h2>
              <button
                onClick={() => navigate('/umkm/projects')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>

            <div className="space-y-3 flex-1">
              {isLoadingProjects ? (
                <div className="text-center py-6 text-slate-500 font-semibold text-sm">Loading projects...</div>
              ) : projects.length === 0 ? (
                <div className="text-center py-6 text-slate-500 font-semibold text-sm">No projects created yet.</div>
              ) : (
                projects.slice(0, 3).map((req, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition cursor-pointer" onClick={() => navigate(`/umkm/projects/${req.id}`)}>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{req.title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{req.applicationsCount || 0} applications</p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${req.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                      }`}>
                      {req.status === 'ACTIVE' ? 'Active' : req.status === 'DRAFT' ? 'Draft' : req.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Recent Notifications Quick View */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Recent Activity
            </h2>
            <button
              onClick={() => navigate('/notifications')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              All Activity
            </button>
          </div>
          <div className="space-y-3">
            <div className="text-center py-6 text-slate-500 font-semibold text-sm">No recent activity.</div>
          </div>
        </div>

      </div>
    </div>
  );
};
