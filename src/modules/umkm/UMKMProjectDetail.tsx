import React, { useState, useEffect } from 'react';
import { ChevronLeft, MoreVertical, Search, CheckCircle, Clock, Calendar, DollarSign, Users, Briefcase, Activity, MessageSquare, ChevronRight, Check, X, Shield } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService } from '../../shared/services/api/projectService';

export const UMKMProjectDetail: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'applicants' | 'timeline'>('applicants');

  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const timelineEvents = [
    { title: 'Project Created', date: 'Oct 1, 2023', status: 'completed', icon: CheckCircle },
    { title: 'AI Matching Started', date: 'Oct 2, 2023', status: 'completed', icon: Users },
    { title: 'First Application Received', date: 'Oct 3, 2023', status: 'completed', icon: Briefcase },
    { title: 'Student Selected', date: 'Pending', status: 'pending', icon: Activity }
  ];

  useEffect(() => {
    if (id) {
      projectService.getProjectById(id).then(data => {
        setProject(data);
        setIsLoading(false);
      }).catch(err => {
        console.error(err);
        setIsLoading(false);
      });
    }
  }, [id]);

  if (isLoading) return <div className="p-8 text-center text-slate-500 font-semibold">Loading project details...</div>;
  if (!project) return <div className="p-8 text-center text-red-500 font-semibold">Project not found.</div>;

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24">
      {/* Header Bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/umkm/projects')}
              className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-slate-900">Project Details</h1>
          </div>
          <button className="p-2 -mr-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Project Summary Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 z-10 relative">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                  {project.categoryId || 'General'}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {project.status || 'Active'}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                {project.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 mt-4">
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400"/> {project.duration || 'Flexible'}</div>
                <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-slate-400"/> {project.budget || 'Negotiable'}</div>
                <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400"/> {project.maxStudents || 1} spots left</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {project.requiredSkills?.split(',').map((skill: string, idx: number) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Project Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Applicants</span>
            <span className="text-2xl font-black text-slate-900">{project._count?.applications || 0}</span>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Accepted</span>
            <span className="text-2xl font-black text-emerald-600">0</span>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Open Spots</span>
            <span className="text-2xl font-black text-blue-600">{project.maxStudents || 1}</span>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Progress</span>
              <span className="text-xs font-bold text-slate-900">0%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `0%` }}></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('applicants')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'applicants' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Applicants ({project._count?.applications || 0})
          </button>
          <button 
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'timeline' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Project Timeline
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'applicants' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search applicants by name or skill..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {project.applications?.map((app: any) => {
                const student = app.student;
                return (
                  <div key={app.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                        <div>
                          <h4 className="font-bold text-slate-900 cursor-pointer hover:text-blue-600 transition" onClick={() => navigate(`/students/${student.id}`)}>{student.name}</h4>
                          <p className="text-[11px] font-semibold text-slate-500">{student.institution}</p>
                        </div>
                      </div>
                      
                      {/* AI Match Score highlighted */}
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 border border-indigo-100">
                          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                          <span className="text-[11px] font-black text-indigo-700">95% AI Match</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {student.skills?.slice(0, 3).map((skill: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-semibold text-slate-600">
                          {skill}
                        </span>
                      ))}
                      {student.skills?.length > 3 && (
                        <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-semibold text-slate-600">+{student.skills.length - 3}</span>
                      )}
                    </div>
                    
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button onClick={() => navigate(`/students/${student.id}`)} className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition">View Profile</button>
                      <div className="flex items-center gap-2">
                        <button onClick={() => alert('Applicant Rejected')} className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition"><X className="w-4 h-4" /></button>
                        <button onClick={() => navigate(`/chat/${student.id}`)} className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition"><MessageSquare className="w-4 h-4" /></button>
                        <button onClick={() => alert('Application Accepted!')} className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-sm flex items-center gap-1.5"><Check className="w-3.5 h-3.5"/> Accept</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${
                    event.status === 'completed' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <event.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="pt-1">
                    <h4 className={`text-sm font-bold ${event.status === 'completed' ? 'text-slate-900' : 'text-slate-500'}`}>{event.title}</h4>
                    <span className="text-xs font-semibold text-slate-400">{event.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
