import React, { useState, useEffect } from 'react';
import {
  Search,
  MoreVertical,
  Eye,
  Edit2,
  MessageSquare,
  Plus,
  Clock,
  UserCheck,
  Sparkles,
  Send,
  AlertCircle,
  FolderPlus,
  ArrowRight,
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../../shared/services/api/projectService';
import { ClientRequest } from '../../shared/types/types';
import { NewProjectModal } from './NewProjectModal';

export const UMKMProjects: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'All' | 'Drafts' | 'Published' | 'Active' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchProjects = () => {
    setIsLoading(true);
    projectService.getMyProjectsUMKM().then(data => {
      setRequests(data);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchProjects();

    const params = new URLSearchParams(window.location.search);
    if (params.get('create') === 'true') {
      setShowCreateModal(true);
      window.history.replaceState({}, '', '/umkm/projects');
    }
  }, []);

  const handlePublishProject = async (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setActionLoadingId(projectId);
    try {
      await projectService.updateProject(projectId, { status: 'PUBLISHED' });
      fetchProjects();
    } catch (err) {
      console.error('Failed to publish project:', err);
      alert('Failed to publish project. Please try again.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const draftCount = requests.filter(r => r.status?.toUpperCase() === 'DRAFT').length;
  const publishedCount = requests.filter(r => r.status?.toUpperCase() === 'PUBLISHED').length;
  const activeCount = requests.filter(r => r.status?.toUpperCase() === 'ACTIVE').length;
  const completedCount = requests.filter(r => r.status?.toUpperCase() === 'COMPLETED').length;

  const filteredRequests = requests.filter(r => {
    const status = r.status?.toUpperCase();
    if (activeTab === 'Drafts' && status !== 'DRAFT') return false;
    if (activeTab === 'Published' && status !== 'PUBLISHED') return false;
    if (activeTab === 'Active' && status !== 'ACTIVE') return false;
    if (activeTab === 'Completed' && status !== 'COMPLETED') return false;

    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] pb-24 pt-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Header Title & Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Projects
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage your draft listings, published recruitment, and active workspaces
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { key: 'All', label: 'All Projects', count: requests.length },
            { key: 'Drafts', label: 'Drafts', count: draftCount },
            { key: 'Published', label: 'Recruiting', count: publishedCount },
            { key: 'Active', label: 'Active', count: activeCount },
            { key: 'Completed', label: 'Completed', count: completedCount },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab.key ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Cards List */}
        <div className="space-y-4">
          {isLoading && (
            <div className="text-center py-16 space-y-2">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-semibold">Loading your projects...</p>
            </div>
          )}

          {!isLoading && filteredRequests.length === 0 && (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
                <FolderPlus className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">
                  {activeTab === 'Drafts'
                    ? 'No Draft Projects'
                    : activeTab === 'Published'
                    ? 'No Projects Open for Applications'
                    : activeTab === 'Active'
                    ? 'No Active Collaborative Workspaces'
                    : activeTab === 'Completed'
                    ? 'No Completed Projects Yet'
                    : 'No Projects Created Yet'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Post a new industry opportunity to collaborate with top university talents and build your business assets.
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Project</span>
              </button>
            </div>
          )}

          {!isLoading && filteredRequests.map((req) => {
            const statusUpper = req.status?.toUpperCase();
            const isDraft = statusUpper === 'DRAFT';
            const isPublished = statusUpper === 'PUBLISHED';
            const isActive = statusUpper === 'ACTIVE';
            const isCompleted = statusUpper === 'COMPLETED';

            return (
              <div
                key={req.id}
                onClick={() => navigate(`/umkm/projects/${req.id}`)}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all relative cursor-pointer group"
              >
                {/* Top Row: Badge & Publish Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      isDraft
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : isPublished
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : isCompleted
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    }`}>
                      {isDraft ? 'DRAFT (Unpublished)' : isPublished ? 'OPEN FOR TALENTS' : req.status}
                    </span>

                    {req.category && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                        {req.category}
                      </span>
                    )}
                  </div>

                  {/* One-Click Publish Button for Drafts */}
                  {isDraft && (
                    <button
                      onClick={(e) => handlePublishProject(e, req.id)}
                      disabled={actionLoadingId === req.id}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                    >
                      {actionLoadingId === req.id ? (
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>Publish to Market</span>
                    </button>
                  )}
                </div>

                {/* Title & Assigned Status */}
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {req.title}
                  </h3>
                  {req.assignedStudent ? (
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mt-1">
                      <UserCheck className="w-4 h-4 text-blue-600" />
                      <span>Assigned Talent: <strong className="text-slate-900">{req.assignedStudent}</strong></span>
                    </div>
                  ) : isDraft ? (
                    <p className="text-xs text-amber-700 font-medium mt-1">
                      Draft mode • Click "Publish" so students can view and apply
                    </p>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{req.applicationsCount || 0} applicant(s) waiting for review</span>
                    </div>
                  )}
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Last Updated: {req.lastUpdate}</span>
                  <span className="text-blue-600 font-bold group-hover:underline flex items-center gap-1">
                    <span>Manage Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {showCreateModal && (
        <NewProjectModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchProjects();
          }}
        />
      )}
    </div>
  );
};
