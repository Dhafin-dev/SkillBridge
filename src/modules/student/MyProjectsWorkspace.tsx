import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, MoreVertical, MessageSquare, ExternalLink, AlertCircle, CheckCircle2, Clock, FolderKanban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../../shared/services/api/projectService';
import { ActiveStudentProject } from '../../shared/types/types';

export const MyProjectsWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Pending' | 'Active' | 'Completed'>('Active');
  const [projects, setProjects] = useState<ActiveStudentProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    projectService.getMyProjectsStudent().then((data) => {
      setProjects(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] pb-24 pt-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          My Projects
        </h1>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('Pending')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${activeTab === 'Pending'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
          >
            Pending <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">{projects.filter(p => p.status === 'Pending').length}</span>
          </button>

          <button
            onClick={() => setActiveTab('Active')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${activeTab === 'Active'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
          >
            Active <span className="ml-1 px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px]">{projects.filter(p => p.status === 'Active' || p.status === 'Urgent').length}</span>
          </button>

          <button
            onClick={() => setActiveTab('Completed')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${activeTab === 'Completed'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
          >
            Completed <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">{projects.filter(p => p.status === 'Completed').length}</span>
          </button>
        </div>



        {/* Active Projects Cards List */}
        <div className="space-y-4">
          {isLoading && <div className="text-center py-10 text-slate-500 font-semibold">Loading projects...</div>}
          {!isLoading && projects.filter(p => activeTab === 'Active' ? (p.status === 'Active' || p.status === 'Urgent') : p.status === activeTab).length === 0 && (
            <div className="text-center py-10 text-slate-500 font-semibold">No {activeTab.toLowerCase()} projects found.</div>
          )}
          {!isLoading && projects.filter(p => activeTab === 'Active' ? (p.status === 'Active' || p.status === 'Urgent') : p.status === activeTab).map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5 hover:shadow-md transition-all"
            >
              {/* Header Badge & Menu Row */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${proj.status === 'Urgent'
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                  {proj.status}
                </span>
                <button className="text-slate-400 hover:text-slate-600 p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Title & UMKM Subtitle */}
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                  {proj.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mt-1">
                  <span>🏪</span>
                  <span>{proj.companyName}</span>
                </div>
              </div>

              {/* Progress Bar Container matching Screenshot 4 */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">{proj.phaseName}</span>
                  <span className={proj.dueAlert ? "text-red-600 font-extrabold" : "text-slate-500"}>
                    {proj.dueDate}
                  </span>
                </div>

                {/* Progress Bar Track */}
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${proj.status === 'Urgent' ? 'bg-amber-600' : 'bg-blue-600'
                      }`}
                    style={{ width: `${proj.progressPercent}%` }}
                  ></div>
                </div>

                <div className="text-right text-xs font-extrabold text-slate-700 pt-0.5">
                  {proj.progressPercent}% Complete
                </div>
              </div>

              {/* Workspace & Chat Action Buttons matching Screenshot 4 */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => navigate(`/student/workspace/${proj.id}`)}
                  className="py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs transition-colors shadow-md shadow-blue-600/15"
                >
                  Workspace
                </button>
                <button
                  onClick={() => navigate(`/chat/${proj.id}`)}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
