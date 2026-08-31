import React, { useState, useEffect } from 'react';
import { ArrowLeft, MoreVertical, Calendar, Users, Layers, Zap, BookOpen, Target, CheckCircle, Bookmark, Navigation, ClipboardList } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { projectService } from '../../shared/services/api/projectService';
import { Project } from '../../shared/types/types';
import { EmptyState } from '../../shared/components/ui/EmptyState';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const currentUserRole = currentUser?.role || 'guest';
  const [isSaved, setIsSaved] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);

  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApply = async () => {
    if (currentUserRole === 'guest') {
      navigate('/login');
      return;
    }
    if (!project) return;

    setIsApplying(true);
    try {
      await projectService.applyToProject(project.id);
      setHasApplied(true);
      showToast('Application submitted successfully! Track your status in My Projects.');
    } catch (error: any) {
      const serverMsg = error.response?.data?.error || error.response?.data?.message;
      if (serverMsg && serverMsg.toLowerCase().includes('already')) {
        setHasApplied(true);
      }
      showToast(serverMsg || 'Failed to submit application. You might have already applied.', 'error');
    } finally {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const data = await projectService.getProjectById(id || '');
        setProject(data);
        if (data?.hasApplied) {
          setHasApplied(true);
        }
      } catch (error) {
        console.error('Failed to fetch project details', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProject();
  }, [id]);


  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-slate-900">Loading Project...</h2>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Project Not Found</h2>
          <button onClick={() => navigate('/market')} className="text-blue-600 font-medium">Return to Market</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] pb-40 pt-3 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-4">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between py-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200 shadow-xs"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Project Details
          </h1>
          <div className="w-9" />
        </div>

        {/* Toast Alert Banner */}
        {toastMessage && (
          <div className={`p-4 rounded-2xl text-xs font-bold shadow-md flex items-center gap-2 animate-fade-in ${
            toastMessage.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
          }`}>
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        )}

        {/* Top Hero Card matching Screenshot 2 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5 relative overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-teal-400 to-emerald-400 absolute top-0 left-0 right-0"></div>

          <div className="flex items-start gap-4 pt-1">
            <img
              src={project.companyLogo}
              alt={project.companyName}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs flex-shrink-0"
            />
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {project.title}
              </h2>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                <span className="w-4 h-4 rounded-sm bg-slate-100 flex items-center justify-center text-xs">🏢</span>
                <span>{project.companyName}</span>
              </div>
            </div>
          </div>


          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Deadline: <strong className="text-slate-800">{project.deadline || 'Oct 24, 2024'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span>Team Size: <strong className="text-slate-800">{project.teamSize || '2-3 Students'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Category: <strong className="text-slate-800">{project.category}</strong></span>
            </div>
          </div>
        </div>

        {/* Project Overview Section */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3>Project Overview</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {project.overview || project.description}
          </p>
        </div>

        {/* Project Objectives Section */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-lg">
            <Target className="w-5 h-5 text-blue-600" />
            <h3>Project Objectives</h3>
          </div>
          {project.objectives && project.objectives.length > 0 ? (
            <ul className="space-y-3">
              {project.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0"></span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={<Target className="w-6 h-6" />}
              title="No Objectives Defined"
              description="This project does not have specific objectives listed yet."
            />
          )}
        </div>

        {/* Required Skills Section */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Required Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(skill => (
              <span
                key={skill}
                className="px-4 py-2 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Deliverables
          </h3>
          {project.deliverables && project.deliverables.length > 0 ? (
            <ul className="space-y-2.5">
              {project.deliverables.map((del, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-slate-800 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon={<ClipboardList className="w-6 h-6" />}
              title="No Deliverables Defined"
              description="This project does not have specific deliverables listed yet."
            />
          )}
        </div>

        {/* About the UMKM Section */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            About the UMKM
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            {project.aboutUmkm || `${project.companyName} is a growing local enterprise focused on delivering premium consumer products and digital innovation.`}
          </p>
          <div className="pt-1">
            <button
              onClick={() => navigate(`/umkm/profile/${encodeURIComponent(project.companyName)}`)}
              className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              <span>View Profile</span>
              <Navigation className="w-3.5 h-3.5 rotate-90" />
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-4 mt-8">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 rounded-2xl border font-bold text-sm transition-all ${isSaved
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save Project'}</span>
          </button>

          {/* Role-Aware Actions */}
          {(currentUser?.id && (project.ownerId === currentUser.id || currentUser.role === 'umkm')) ? (
            <div className="flex-1 w-full flex flex-col sm:flex-row gap-3">
              {project.status === 'DRAFT' ? (
                <button
                  onClick={async () => {
                    await projectService.updateProject(project.id, { status: 'PUBLISHED' });
                    navigate(`/umkm/projects/${project.id}`);
                  }}
                  className="flex-1 flex justify-center items-center gap-2 py-3.5 px-6 rounded-2xl text-white font-extrabold text-sm shadow-md bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  <span>Publish to Marketplace</span>
                  <span className="text-base font-normal">▷</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/umkm/workspace/${project.id}`)}
                  className="flex-1 flex justify-center items-center gap-2 py-3.5 px-6 rounded-2xl text-white font-extrabold text-sm shadow-md bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  <span>Open Collaboration Workspace</span>
                  <span className="text-base font-normal">▷</span>
                </button>
              )}
              <button
                onClick={() => navigate(`/umkm/projects/${project.id}`)}
                className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
              >
                Manage in Portal
              </button>
            </div>
          ) : project.applicationStatus === 'ACCEPTED' ? (
            <button
              onClick={() => navigate(`/student/workspace/${project.id}`)}
              className="w-full sm:flex-1 flex justify-center items-center gap-2 py-3.5 px-6 rounded-2xl text-white font-extrabold text-sm shadow-md bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 transition-all"
            >
              <CheckCircle className="w-5 h-5 text-white" />
              <span>Open Project Workspace</span>
              <span className="text-base font-normal">▷</span>
            </button>
          ) : hasApplied ? (
            <button
              onClick={() => navigate('/student/my-projects?tab=Pending')}
              className="w-full sm:flex-1 flex justify-center items-center gap-2 py-3.5 px-6 rounded-2xl text-white font-extrabold text-sm shadow-md bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25 transition-all"
            >
              <CheckCircle className="w-5 h-5 text-white" />
              <span>Applied • View in My Projects</span>
            </button>
          ) : (
            <button
              onClick={handleApply}
              disabled={isApplying}
              className={`w-full sm:flex-1 flex justify-center items-center gap-2 py-3.5 px-6 rounded-2xl text-white font-extrabold text-sm shadow-md transition-all ${
                isApplying
                  ? 'bg-blue-400 cursor-not-allowed shadow-none'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-blue-600/25'
              }`}
            >
              <span>{isApplying ? 'Applying...' : 'Apply Now'}</span>
              {!isApplying && <span className="text-base font-normal">▷</span>}
            </button>
          )}
        </div>


      </div>
    </div>
  );
};

