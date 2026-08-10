import React, { useState, useEffect } from 'react';
import { Search, Plus, CheckCircle, Clock, Hourglass, ShieldCheck, Calendar, ExternalLink, Edit2, Archive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService, AdminProject } from '../../shared/services/api/adminService';

export const AdminProjectManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'In Progress' | 'Pending' | 'Completed'>('All');

  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getAllProjects().then(data => {
      setProjects(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">


      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Project Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Oversee UMKM projects and student assignments.</p>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
            />
          </div>
          <button
            onClick={() => navigate('/admin/projects/new')}
            className="w-full sm:w-auto h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Published</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{projects.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending Review</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{projects.filter(p => p.status === 'Pending').length}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Hourglass className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider">In Progress</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{projects.filter(p => p.status === 'Active' || p.status === 'In Progress').length}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Completed</span>
          </div>
          <div className="text-3xl font-black text-slate-900">{projects.filter(p => p.status === 'Completed').length}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 border-b border-slate-200/80 pb-3">
        {(['All', 'In Progress', 'Pending', 'Completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Project Cards List */}
      <div className="space-y-3">
        {isLoading && <div className="text-center py-10 text-slate-500 font-semibold">Loading projects...</div>}
        {!isLoading && projects.length === 0 && (
          <div className="text-center py-10 text-slate-500 font-semibold">No projects found.</div>
        )}
        {!isLoading && projects.filter(p => filterStatus === 'All' || p.status === filterStatus || (filterStatus === 'In Progress' && p.status === 'Active')).map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
          >
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  proj.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : proj.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {proj.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                UMKM: <span className="font-semibold text-slate-700">{proj.umkm}</span> • Student: <span className="font-semibold text-slate-700">{proj.student}</span>
              </p>
              <div className="w-full max-w-md">
                <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                  <span>Progress</span>
                  <span>{proj.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${proj.status === 'Completed' ? 'bg-emerald-600' : 'bg-blue-600'}`}
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row md:flex-col lg:flex-row gap-3 items-center w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{proj.date}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => navigate(`/admin/projects/${proj.id}`)}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
                  title="Open Details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-colors"
                  title="Archive"
                >
                  <Archive className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
