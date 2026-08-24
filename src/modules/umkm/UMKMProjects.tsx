import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, Eye, Edit2, MessageSquare, Plus, Clock, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../../shared/services/api/projectService';
import { ClientRequest } from '../../shared/types/types';
import { NewProjectModal } from './NewProjectModal';

export const UMKMProjects: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchProjects = () => {
    setIsLoading(true);
    projectService.getMyProjectsUMKM().then(data => {
      setRequests(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchProjects();

    // Check if ?create=true is in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('create') === 'true') {
      setShowCreateModal(true);
      // Clean up URL without reloading
      window.history.replaceState({}, '', '/umkm/projects');
    }
  }, []);

  const filteredRequests = requests.filter(r => {
    if (activeTab !== 'All') {
      const mappedStatus = r.status.toUpperCase() === 'COMPLETED' ? 'COMPLETED' : 'ACTIVE';
      if (mappedStatus !== activeTab.toUpperCase()) return false;
    }
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] pb-24 pt-4 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Header Title & Search Button matching Screenshot 5 */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Projects
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
            <button className="p-2.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors">
              <Search className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Status Filter Tabs matching Screenshot 5 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {(['All', 'Active', 'Completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Request Cards List matching Screenshot 5 */}
        <div className="space-y-4">
          {isLoading && <div className="text-center py-10 text-slate-500 font-semibold">Loading projects...</div>}
          {!isLoading && filteredRequests.map((req) => (
            <div
              key={req.id}
              onClick={() => navigate(`/umkm/projects/${req.id}`)}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all relative cursor-pointer group"
            >
              {/* Top Row: Badge & Menu */}
              <div className="flex items-center justify-between">
                <span className={`px-3.5 py-1 rounded-full text-xs font-bold border ${
                  req.status.toUpperCase() === 'COMPLETED' 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {req.status.toUpperCase() === 'COMPLETED' ? 'Completed' : 'Active'}
                </span>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Assigned Student */}
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                  {req.title}
                </h3>
                {req.assignedStudent ? (
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mt-1">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span>Assigned Student: <strong className="text-slate-900">{req.assignedStudent}</strong></span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>Waiting for student applicants ({req.applicationsCount || 0} applications)</span>
                  </div>
                )}
              </div>

              {/* Progress Bar & Last Update */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Progress</span>
                  <span className="text-blue-600">{req.progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${req.progressPercent}%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 pt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Last Update: {req.lastUpdate}</span>
                </div>
              </div>

            </div>
          ))}
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
