import React, { useState, useEffect } from 'react';
import {
  SlidersHorizontal,
  MoreVertical,
  MessageSquare,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Clock,
  FolderKanban,
  Star,
  Sparkles,
  ArrowRight,
  Send,
  Building2,
  Calendar
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { projectService } from '../../shared/services/api/projectService';
import { ActiveStudentProject } from '../../shared/types/types';

export const MyProjectsWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'Pending' | 'Active' | 'Completed') || 'Active';
  const [activeTab, setActiveTab] = useState<'Pending' | 'Active' | 'Completed'>(initialTab);
  const [projects, setProjects] = useState<ActiveStudentProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    projectService.getMyProjectsStudent().then((data) => {
      setProjects(data);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  }, []);

  const pendingCount = projects.filter(p => p.status === 'Pending').length;
  const activeCount = projects.filter(p => p.status === 'Active' || p.status === 'Urgent').length;
  const completedCount = projects.filter(p => p.status === 'Completed').length;

  const filteredProjects = projects.filter(p => {
    if (activeTab === 'Active') return p.status === 'Active' || p.status === 'Urgent';
    return p.status === activeTab;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] pb-24 pt-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Projects
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Track your ongoing industry collaborations, milestones, and received reviews
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('Active')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'Active'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>Active Projects</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'Active' ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-700'
            }`}>
              {activeCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('Pending')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'Pending'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>Pending</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'Pending' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {pendingCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('Completed')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'Completed'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>Completed</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
              activeTab === 'Completed' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-700'
            }`}>
              {completedCount}
            </span>
          </button>
        </div>

        {/* Project Cards List */}
        <div className="space-y-4">
          {isLoading && (
            <div className="text-center py-16 space-y-2">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-semibold">Loading your projects...</p>
            </div>
          )}

          {!isLoading && filteredProjects.length === 0 && (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
                <FolderKanban className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">
                  {activeTab === 'Active'
                    ? 'No Active Projects Right Now'
                    : activeTab === 'Pending'
                    ? 'No Pending Applications'
                    : 'No Completed Projects Yet'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  {activeTab === 'Completed'
                    ? 'Once you complete an accepted project and receive an official review from your UMKM client, it will appear here.'
                    : 'Explore high-impact projects posted by real verified Indonesian small enterprises and start building your portfolio.'}
                </p>
              </div>

              {activeTab !== 'Completed' && (
                <button
                  onClick={() => navigate('/market')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-blue-600/20"
                >
                  <span>Explore Project Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {!isLoading && filteredProjects.map((proj) => {
            const isCompleted = proj.status === 'Completed';
            const isUrgent = proj.status === 'Urgent';

            return (
              <div
                key={proj.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5 hover:shadow-md transition-all relative overflow-hidden"
              >
                {/* Top Badge Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isUrgent
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {proj.status}
                    </span>

                    {proj.category && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                        {proj.category}
                      </span>
                    )}
                  </div>

                  {proj.stipend && (
                    <span className="text-xs font-bold text-slate-700">
                      {proj.stipend}
                    </span>
                  )}
                </div>

                {/* Project Title & UMKM Company */}
                <div>
                  <h3
                    className="text-xl font-extrabold text-slate-900 leading-tight hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => navigate(`/projects/${proj.id}`)}
                  >
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{proj.companyName}</span>
                  </div>
                </div>

                {/* Progress / Completion Status Box */}
                {isCompleted ? (
                  <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-xs font-black text-slate-900 ml-1">5.0</span>
                        </div>
                        <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                          Project completed & testimonial added to your profile
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/profile')}
                      className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-colors shrink-0"
                    >
                      View in Profile
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-800">{proj.phaseName || 'Sprint 1: Architecture & Prototyping'}</span>
                      <span className={proj.dueAlert ? "text-red-600 font-extrabold" : "text-slate-500"}>
                        {proj.dueDate || 'Ongoing'}
                      </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isUrgent ? 'bg-amber-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${proj.progressPercent || 50}%` }}
                      />
                    </div>

                    <div className="text-right text-xs font-extrabold text-slate-700 pt-0.5">
                      {proj.progressPercent || 50}% Complete
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => navigate(`/projects/${proj.id}`)}
                    className="py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Project Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigate(`/chat/${proj.id}`)}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open Chat</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
