import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  MoreVertical,
  Search,
  CheckCircle,
  Clock,
  Calendar,
  DollarSign,
  Users,
  Briefcase,
  Activity,
  MessageSquare,
  ChevronRight,
  Check,
  X,
  Shield,
  Star,
  Award,
  Sparkles,
  Send,
  AlertCircle,
  FolderKanban,
  ExternalLink
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectService } from '../../shared/services/api/projectService';
import { ReviewModal } from '../../shared/components/modals/ReviewModal';

export const UMKMProjectDetail: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'applicants' | 'timeline'>('applicants');

  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [reviewingStudent, setReviewingStudent] = useState<{ id: string; name: string; avatar?: string } | null>(null);

  const fetchProject = async () => {
    if (!id) return;
    try {
      const data = await projectService.getProjectById(id);
      setProject(data);
    } catch (err) {
      console.error('Failed to fetch project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleRespondApplicant = async (studentId: string, action: 'accept' | 'reject') => {
    if (!id) return;
    setActionLoadingId(studentId);
    try {
      if (action === 'accept') {
        await projectService.acceptApplicant(id, studentId);
      } else {
        await projectService.rejectApplicant(id, studentId);
      }
      await fetchProject();
    } catch (err) {
      console.error(`Failed to ${action} applicant`, err);
      alert('Action failed. Please try again.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handlePublishDraft = async () => {
    if (!id) return;
    try {
      setIsPublishing(true);
      await projectService.updateProject(id, { status: 'PUBLISHED' });
      await fetchProject();
    } catch (err) {
      console.error('Failed to publish draft:', err);
      alert('Failed to publish project.');
    } finally {
      setIsPublishing(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/umkm/projects');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (isLoading) return <div className="p-8 text-center text-slate-500 font-semibold">Loading project details...</div>;
  if (!project) return <div className="p-8 text-center text-red-500 font-semibold">Project not found.</div>;

  const acceptedApplicant = project.applications?.find((app: any) => app.status === 'ACCEPTED');
  const isDraft = project.status === 'DRAFT';
  const isCompleted = project.status === 'COMPLETED';
  const isActive = project.status === 'ACTIVE' || (acceptedApplicant && !isCompleted);

  const timelineEvents = [
    {
      title: 'Project Created',
      date: new Date(project.createdAt).toLocaleDateString('en-ID', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'completed',
      icon: CheckCircle
    },
    {
      title: isDraft ? 'Draft Status (Unpublished)' : 'Published to Marketplace',
      date: isDraft ? 'Draft' : 'Live in Market',
      status: isDraft ? 'pending' : 'completed',
      icon: Briefcase
    },
    {
      title: 'First Application Received',
      date: project.applications?.length > 0 ? 'Received' : 'Pending',
      status: project.applications?.length > 0 ? 'completed' : 'pending',
      icon: Users
    },
    {
      title: 'Student Selected',
      date: acceptedApplicant ? 'Selected' : 'Pending',
      status: acceptedApplicant ? 'completed' : 'pending',
      icon: Activity
    },
    {
      title: 'Project Completed & Reviewed',
      date: isCompleted ? 'Completed' : 'In Progress',
      status: isCompleted ? 'completed' : 'pending',
      icon: Star
    }
  ];

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
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">Project Details</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Manage applicants, workspace, and milestones</p>
            </div>
          </div>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-2">
            {isDraft && (
              <button
                onClick={handlePublishDraft}
                disabled={isPublishing}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isPublishing ? 'Publishing...' : 'Publish to Market'}</span>
              </button>
            )}

            {isActive && acceptedApplicant && (
              <>
                <button
                  onClick={() => navigate(`/umkm/workspace/${project.id}`)}
                  className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <FolderKanban className="w-3.5 h-3.5" />
                  <span>Open Workspace</span>
                </button>
                <button
                  onClick={() => setReviewingStudent({
                    id: acceptedApplicant.student.id,
                    name: acceptedApplicant.student.name,
                    avatar: acceptedApplicant.student.avatar
                  })}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Complete & Review</span>
                </button>
              </>
            )}

            {isCompleted && (
              <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Completed</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Draft Notice Banner */}
        {isDraft && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-amber-950">This project is currently in Draft mode</h4>
                <p className="text-xs text-amber-800 font-medium">Students cannot discover or apply for this project until it is published to the marketplace.</p>
              </div>
            </div>
            <button
              onClick={handlePublishDraft}
              disabled={isPublishing}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish to Market Now</span>
            </button>
          </div>
        )}

        {/* Project Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 z-10 relative">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                  {project.category?.name || project.categoryId || 'General'}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  isDraft
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isDraft ? 'bg-amber-500' : isCompleted ? 'bg-emerald-500' : isActive ? 'bg-blue-500 animate-pulse' : 'bg-slate-400'
                  }`} />
                  <span>{project.status || 'PUBLISHED'}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {project.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-2">
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {project.duration || 'Flexible'}</div>
                <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-slate-400" /> {project.stipend || project.budget || 'Negotiable'}</div>
                <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-slate-400" /> {project.teamSize || '1 Student'}</div>
              </div>
            </div>

            {/* Complete Project CTA inside Card */}
            {isActive && acceptedApplicant && (
              <div className="bg-emerald-50/80 border border-emerald-200/70 rounded-2xl p-4 w-full sm:w-64 space-y-3 shrink-0">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Project Ready to Finish?</span>
                </div>
                <p className="text-[11px] text-emerald-700/90 leading-tight">
                  Mark this collaboration as completed and leave a star rating for {acceptedApplicant.student?.name}.
                </p>
                <div className="space-y-1.5">
                  <button
                    onClick={() => navigate(`/umkm/workspace/${project.id}`)}
                    className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                  >
                    <FolderKanban className="w-3.5 h-3.5" />
                    <span>View Workspace</span>
                  </button>
                  <button
                    onClick={() => setReviewingStudent({
                      id: acceptedApplicant.student.id,
                      name: acceptedApplicant.student.name,
                      avatar: acceptedApplicant.student.avatar
                    })}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Complete & Review</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Applicants</span>
            <span className="text-2xl font-black text-slate-900">{project.applications?.length || 0}</span>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Accepted</span>
            <span className="text-2xl font-black text-emerald-600">{acceptedApplicant ? 1 : 0}</span>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Project Status</span>
            <span className="text-base font-black text-blue-600">{project.status || 'PUBLISHED'}</span>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Progress</span>
              <span className="text-xs font-bold text-slate-900">{isCompleted ? '100%' : isActive ? '60%' : '0%'}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-blue-600'}`}
                style={{ width: isCompleted ? '100%' : isActive ? '60%' : '0%' }}
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('applicants')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'applicants' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            Applicants ({project.applications?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'timeline' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
          >
            Project Timeline
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'applicants' && (
          <div className="space-y-4">
            {(!project.applications || project.applications.length === 0) ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {isDraft ? 'Project is in Draft' : 'No applicants yet'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {isDraft
                    ? 'Publish this project to the marketplace to start receiving applications from university talents.'
                    : 'Your project is published in the marketplace. Qualified students will review the scope and submit applications soon.'}
                </p>
                {isDraft && (
                  <button
                    onClick={handlePublishDraft}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-blue-700 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Project Now</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {project.applications?.map((app: any) => {
                  const student = app.student;
                  const isAccepted = app.status === 'ACCEPTED';
                  const isRejected = app.status === 'REJECTED';
                  const skills = student.studentProfile?.skills ? (typeof student.studentProfile.skills === 'string' ? JSON.parse(student.studentProfile.skills) : student.studentProfile.skills) : [];

                  return (
                    <div key={app.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 border border-blue-200 overflow-hidden shadow-xs">
                            {student.avatar ? (
                              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xs font-black">
                                {student.name ? student.name.substring(0, 2).toUpperCase() : 'ST'}
                              </span>
                            )}
                          </div>
                          <div>
                            <h4
                              className="font-bold text-slate-900 cursor-pointer hover:text-blue-600 transition"
                              onClick={() => navigate(`/students/${student.id}`)}
                            >
                              {student.name}
                            </h4>
                            <p className="text-[11px] font-semibold text-slate-500">
                              {student.studentProfile?.institution || 'University Student'}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          isAccepted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isRejected
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {skills.slice(0, 4).map((skill: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-semibold text-slate-600">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Pitch */}
                      {app.pitch && (
                        <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                          "{app.pitch}"
                        </p>
                      )}

                      {/* Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => navigate(`/students/${student.id}`)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                        >
                          View Profile
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/chat/${student.id}`)}
                            className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                            title="Chat with student"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>

                          {app.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleRespondApplicant(student.id, 'reject')}
                                disabled={actionLoadingId !== null}
                                className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition disabled:opacity-50"
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRespondApplicant(student.id, 'accept')}
                                disabled={actionLoadingId !== null}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                              >
                                {actionLoadingId === student.id ? (
                                  <span className="animate-spin w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full" />
                                ) : (
                                  <Check className="w-3.5 h-3.5" />
                                )}
                                <span>Accept</span>
                              </button>
                            </>
                          )}

                          {isAccepted && !isCompleted && (
                            <button
                              onClick={() => setReviewingStudent({
                                id: student.id,
                                name: student.name,
                                avatar: student.avatar
                              })}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-xs flex items-center gap-1"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Review</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">Project Milestone Timeline</h3>
                <p className="text-xs text-slate-500">Track stage progression and completion milestones</p>
              </div>
              {isActive && (
                <button
                  onClick={() => navigate(`/umkm/workspace/${project.id}`)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5"
                >
                  <FolderKanban className="w-3.5 h-3.5" />
                  <span>Go to Workspace</span>
                </button>
              )}
            </div>

            <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${event.status === 'completed' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-400'
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

      {/* Review Modal Dialog */}
      {reviewingStudent && (
        <ReviewModal
          projectId={project.id}
          projectTitle={project.title}
          studentId={reviewingStudent.id}
          studentName={reviewingStudent.name}
          studentAvatar={reviewingStudent.avatar}
          onClose={() => setReviewingStudent(null)}
          onSuccess={async () => {
            setReviewingStudent(null);
            await fetchProject();
          }}
        />
      )}
    </div>
  );
};
