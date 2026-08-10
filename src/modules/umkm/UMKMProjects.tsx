import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, Eye, Edit2, MessageSquare, Plus, Clock, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../../shared/services/api/projectService';
import { ClientRequest } from '../../shared/types/types';

export const UMKMProjects: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Active' | 'Pending' | 'Matched' | 'Draft'>('Active');
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    projectService.getMyProjectsUMKM().then(data => {
      setRequests(data);
      setIsLoading(false);
    });
  }, []);

  const filteredRequests = requests.filter(r => {
    if (activeTab && r.status !== activeTab) return false;
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
              onClick={() => navigate('?create=true')}
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
          {(['Active', 'Pending', 'Matched', 'Draft'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tab
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
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-all relative"
            >
              {/* Top Row: Badge & Menu */}
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
                  {req.status}
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
                  <div className="text-xs font-semibold text-amber-600 mt-1">
                    Pending student match application
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

              {/* Action Buttons Icons Row matching Screenshot 5 */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => navigate(`/umkm/projects/${req.id}`)}
                  className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="View Project Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate(`/umkm/projects/${req.id}?edit=true`)}
                  className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Edit Project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate(`/chat/${req.id}`)}
                  className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all"
                  title="Open Chat with Student"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
