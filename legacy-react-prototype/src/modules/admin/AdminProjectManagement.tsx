import React, { useState, useEffect } from 'react';
import { Search, Plus, CheckCircle, Clock, Hourglass, ShieldCheck, Calendar, ExternalLink, Trash2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService, AdminProject } from '../../shared/services/api/adminService';

export const AdminProjectManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'In Progress' | 'Pending' | 'Completed'>('All');

  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the project "${title}"? This will also remove any active workspace tasks and applications.`)) {
      return;
    }

    try {
      setDeletingId(id);
      await adminService.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      showToast(`Project "${title}" deleted successfully.`);
    } catch (err: any) {
      showToast(err.response?.data?.message || err.response?.data?.error || 'Failed to delete project.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filterStatus === 'All' || p.status === filterStatus || (filterStatus === 'In Progress' && (p.status === 'Active' || p.status === 'In Progress'));
    const matchesSearch = !searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.umkm.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`p-4 rounded-2xl text-xs font-bold shadow-md flex items-center gap-2 animate-fade-in ${
          toastMessage.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toastMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Project Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Oversee UMKM listings, active student collaboration workspaces, and deliverables.</p>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects or business..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
            />
          </div>
          <button
            onClick={() => navigate('/market')}
            className="w-full sm:w-auto h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Marketplace</span>
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Projects</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{projects.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Draft / Pending</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{projects.filter(p => p.status === 'Pending' || p.status === 'DRAFT').length}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Hourglass className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider">In Progress</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{projects.filter(p => p.status === 'Active' || p.status === 'In Progress' || p.status === 'PUBLISHED').length}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Completed</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{projects.filter(p => p.status === 'Completed' || p.status === 'COMPLETED').length}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200/80 pb-3 overflow-x-auto no-scrollbar">
        {(['All', 'In Progress', 'Pending', 'Completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-colors shrink-0 ${
              filterStatus === status
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Project Cards List */}
      <div className="space-y-3">
        {isLoading && (
          <div className="text-center py-16 text-slate-500 font-semibold space-y-2">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
            <p className="text-xs">Loading projects...</p>
          </div>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-400 font-semibold bg-white rounded-3xl border border-slate-200">
            No projects found matching the selected filter.
          </div>
        )}

        {!isLoading && filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-5 sm:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:shadow-md transition-all"
          >
            <div className="flex-1 w-full space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-extrabold text-slate-900">{proj.title}</h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  proj.status === 'Completed' || proj.status === 'COMPLETED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : proj.status === 'In Progress' || proj.status === 'ACTIVE' || proj.status === 'PUBLISHED'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {proj.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Business Owner: <strong className="text-slate-800 font-bold">{proj.umkm}</strong>
              </p>
            </div>

            <div className="flex flex-row md:flex-col lg:flex-row gap-3 items-center w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{proj.date}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/projects/${proj.id}`)}
                  className="px-3.5 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  title="Open Project Details"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>
                <button
                  onClick={() => handleDeleteProject(proj.id, proj.title)}
                  disabled={deletingId === proj.id}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete Project"
                >
                  {deletingId === proj.id ? <Loader2 className="w-4 h-4 animate-spin text-red-600" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
