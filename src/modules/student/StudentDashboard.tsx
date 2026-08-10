import React from 'react';
import { Briefcase, CheckCircle, Award, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../shared/context/AuthContext';
import { projectService } from '../../shared/services/api/projectService';
import { ActiveStudentProject } from '../../shared/types/types';
import { StatCard } from '../../shared/components/ui/StatCard';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['studentProjects'],
    queryFn: () => projectService.getMyProjectsStudent()
  });

  const activeProjectsCount = projects.filter(p => p.status === 'In Progress').length;
  const completedProjectsCount = projects.filter(p => p.status === 'Completed').length;

  if (!currentUser) return null;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] pb-24 pt-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-5">
        
        {/* Header Greeting matching Screenshot 11 */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            Here's your academic and project overview.
          </p>
        </div>

        {/* Metric Cards Grid matching Screenshot 11 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            title="Active Projects"
            value={activeProjectsCount}
            icon={<Briefcase className="w-5 h-5" />}
            iconColor="text-slate-400"
            layout="spacious"
          />
          <StatCard
            title="Completed Projects"
            value={completedProjectsCount}
            icon={<CheckCircle className="w-5 h-5" />}
            iconColor="text-emerald-500"
            tag="Lifetime"
            layout="spacious"
          />
        </div>

        {/* Portfolio Score Banner Card matching Screenshot 11 */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-600/20 flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1 z-10">
            <span className="text-xs font-semibold opacity-90 block">Portfolio Score</span>
            <div className="text-5xl font-black tracking-tight leading-none">
              {currentUser.portfolioScore || 85}
            </div>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/30 z-10">
            Top 5% Student
          </div>
        </div>

        {/* Recent Projects List matching Screenshot 11 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Recent Projects
            </h2>
            <button 
              onClick={() => navigate('/student/my-projects')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-6 text-slate-500 font-semibold text-sm">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-6 text-slate-500 font-semibold text-sm">No recent projects found. Apply to a project in the market!</div>
            ) : (
              projects.slice(0, 3).map((project, idx) => (
                <div 
                  key={idx}
                  onClick={() => navigate('/student/my-projects')}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                      {project.title.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{project.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{project.companyName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold block mb-1 ${
                      project.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {project.progressPercent}% Done
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Monthly Activity Bar Chart matching Screenshot 11 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Monthly Activity
          </h2>

          <div className="pt-6 pb-2">
            <div className="flex items-center justify-center h-36 px-4 border-b border-slate-100 text-sm font-medium text-slate-400">
              Activity data will appear here once projects are completed.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
