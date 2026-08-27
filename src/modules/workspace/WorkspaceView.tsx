import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  CheckCircle2,
  Circle,
  Clock,
  Calendar,
  DollarSign,
  Users,
  Plus,
  Trash2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Link2,
  FileCode,
  Layers,
  ArrowRight,
  Award,
  CheckSquare,
  AlertCircle,
  Building2,
  GraduationCap
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { workspaceService, WorkspaceData, WorkspaceTask } from '../../shared/services/api/workspaceService';
import { useAuth } from '../../shared/context/AuthContext';
import { ReviewModal } from '../../shared/components/modals/ReviewModal';

export const WorkspaceView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // projectId or workspaceId
  const { currentUser } = useAuth();

  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // New task inputs
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Deliverables link submissions (local state + persisted in local storage per project)
  const [workLinks, setWorkLinks] = useState<{ id: string; title: string; url: string; submittedBy: string; date: string }[]>([]);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [showAddLink, setShowAddLink] = useState(false);

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);

  const fetchWorkspace = async () => {
    if (!id) return;
    try {
      setErrorMsg(null);
      const data = await workspaceService.getWorkspaceByProjectId(id);
      setWorkspace(data);

      // Load saved links from localStorage
      const storageKey = `skillbridge_work_links_${id}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setWorkLinks(JSON.parse(saved));
        } catch {
          // ignore
        }
      }
    } catch (err: any) {
      console.error('Failed to load workspace:', err);
      setErrorMsg(err.response?.data?.error || 'Failed to load project workspace.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspace();
  }, [id]);

  const handleToggleTask = async (task: WorkspaceTask) => {
    if (!workspace) return;
    const previousState = task.completed;
    const newCompleted = !previousState;

    // Optimistic UI update
    setWorkspace(prev => {
      if (!prev) return null;
      const updatedTasks = prev.tasks.map(t => t.id === task.id ? { ...t, completed: newCompleted } : t);
      const completedCount = updatedTasks.filter(t => t.completed).length;
      const progress = updatedTasks.length > 0 ? Math.round((completedCount / updatedTasks.length) * 100) : 0;
      return { ...prev, tasks: updatedTasks, progressPercent: progress };
    });

    try {
      await workspaceService.toggleTask(workspace.id, task.id, newCompleted);
    } catch (err) {
      console.error('Failed to toggle task:', err);
      // Rollback
      fetchWorkspace();
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspace || !newTaskTitle.trim()) return;

    try {
      setIsAddingTask(true);
      await workspaceService.addTask(workspace.id, {
        title: newTaskTitle.trim(),
        dueDate: newTaskDueDate || undefined,
        assignedTo: currentUser?.name || 'Student Collaborator'
      });
      setNewTaskTitle('');
      setNewTaskDueDate('');
      await fetchWorkspace();
    } catch (err) {
      console.error('Failed to add task:', err);
    } finally {
      setIsAddingTask(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!workspace) return;
    try {
      await workspaceService.deleteTask(workspace.id, taskId);
      await fetchWorkspace();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle.trim() || !newLinkUrl.trim() || !id) return;

    let formattedUrl = newLinkUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const updated = [
      ...workLinks,
      {
        id: 'link_' + Date.now(),
        title: newLinkTitle.trim(),
        url: formattedUrl,
        submittedBy: currentUser?.name || 'Collaborator',
        date: new Date().toLocaleDateString('en-ID', { month: 'short', day: 'numeric' })
      }
    ];

    setWorkLinks(updated);
    localStorage.setItem(`skillbridge_work_links_${id}`, JSON.stringify(updated));
    setNewLinkTitle('');
    setNewLinkUrl('');
    setShowAddLink(false);
  };

  const handleDeleteLink = (linkId: string) => {
    if (!id) return;
    const updated = workLinks.filter(l => l.id !== linkId);
    setWorkLinks(updated);
    localStorage.setItem(`skillbridge_work_links_${id}`, JSON.stringify(updated));
  };

  const phases = [
    { name: 'Sprint 1: Planning & Setup', minPct: 0 },
    { name: 'Sprint 2: UI Design & Prototyping', minPct: 25 },
    { name: 'Sprint 3: Core Implementation', minPct: 50 },
    { name: 'Sprint 4: Final QA & Hand-off', minPct: 75 },
    { name: 'Completed & Reviewed', minPct: 100 }
  ];

  const handleSetPhase = async (minPct: number) => {
    if (!workspace) return;
    try {
      await workspaceService.updateProgress(workspace.id, minPct);
      await fetchWorkspace();
    } catch (err) {
      console.error('Failed to update phase progress:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-700">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !workspace) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-slate-900">Workspace Unavailable</h2>
          <p className="text-xs text-slate-500">{errorMsg || 'Project workspace not found or pending applicant approval.'}</p>
          <button
            onClick={() => navigate(currentUser?.role === 'umkm' ? '/umkm/projects' : '/student/my-projects')}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700 transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const isUMKM = currentUser?.role === 'umkm' || currentUser?.id === workspace.project.owner?.id;
  const isCompleted = workspace.status === 'COMPLETED';
  const partnerId = isUMKM ? (workspace.student?.id || '') : (workspace.umkm?.id || workspace.project.owner?.id || '');

  return (
    <div className="min-h-screen bg-[#f8f9ff] pb-28">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate(isUMKM ? `/umkm/projects/${workspace.projectId}` : '/student/my-projects')}
              className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider block leading-none">
                Collaboration Workspace
              </span>
              <h1 className="text-base sm:text-lg font-black text-slate-900 truncate">
                {workspace.project.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {partnerId && (
              <button
                onClick={() => navigate(`/chat/${partnerId}`)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold border border-blue-200 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open Chat</span>
              </button>
            )}

            {isUMKM && !isCompleted && workspace.student && (
              <button
                onClick={() => setShowReviewModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complete Project</span>
              </button>
            )}

            {isCompleted && (
              <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Finished & Reviewed</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Hero Collaboration Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* UMKM Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Business Client</span>
                <h3 className="text-sm font-extrabold text-slate-900">
                  {workspace.umkm?.umkmProfile?.companyName || workspace.project.owner?.name}
                </h3>
                <p className="text-xs text-slate-500">{workspace.umkm?.umkmProfile?.location || 'Indonesia'}</p>
              </div>
            </div>

            {/* Student Info */}
            {workspace.student ? (
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                  {workspace.student.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Talent</span>
                  <h4 className="text-xs font-extrabold text-slate-900">{workspace.student.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{workspace.student.studentProfile?.institution || 'University Talent'}</p>
                </div>
              </div>
            ) : (
              <span className="text-xs text-slate-400 font-semibold italic">Waiting for talent acceptance</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-1 border-t border-slate-100">
            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {workspace.project.duration}</div>
            <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-slate-400" /> {workspace.project.stipend}</div>
            <div className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-slate-400" /> {workspace.project.category}</div>
          </div>
        </div>

        {/* Interactive Timeline Stepper */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Timeline Stages & Milestones</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Current Stage: <span className="font-bold text-blue-700">{workspace.currentPhase}</span>
              </p>
            </div>

            <div className="text-right">
              <span className="text-lg font-black text-slate-900">{workspace.progressPercent}%</span>
              <span className="text-[11px] text-slate-400 font-bold block">Overall Completion</span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-blue-600'}`}
              style={{ width: `${workspace.progressPercent}%` }}
            />
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {phases.slice(0, 4).map((phase, idx) => {
              const isCurrent = workspace.progressPercent >= phase.minPct && (idx === 3 || workspace.progressPercent < phases[idx + 1].minPct);
              const isPassed = workspace.progressPercent >= (phases[idx + 1]?.minPct || 100);

              return (
                <button
                  key={phase.name}
                  type="button"
                  onClick={() => handleSetPhase(phase.minPct + 20)}
                  className={`p-3 rounded-2xl border text-left transition-all text-xs ${
                    isCurrent
                      ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-xs font-bold'
                      : isPassed
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800 font-semibold'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">Step {idx + 1}</span>
                    {isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    ) : (
                      <Circle className="w-3 h-3 text-slate-300" />
                    )}
                  </div>
                  <div className="truncate text-[11px] leading-snug">{phase.name.split(':')[1]?.trim() || phase.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tasks Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Task List (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-black text-slate-900">Sprint Tasks & Deliverables</h3>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {workspace.tasks.filter(t => t.completed).length} of {workspace.tasks.length} finished
                </span>
              </div>

              {/* Task Items */}
              <div className="space-y-2.5">
                {workspace.tasks.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No tasks added yet. Add project tasks below.</p>
                ) : (
                  workspace.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        task.completed
                          ? 'bg-slate-50/70 border-slate-200/60 text-slate-500'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900 shadow-xs'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleToggleTask(task)}
                        className="flex items-center gap-3 text-left flex-1 min-w-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 shrink-0 hover:text-blue-500 transition-colors" />
                        )}
                        <span className={`text-xs font-bold truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {task.title}
                        </span>
                      </button>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          Due {task.dueDate}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-slate-300 hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Task Form */}
              <form onSubmit={handleAddTask} className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="Add a new milestone or action task..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={e => setNewTaskDueDate(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white"
                />
                <button
                  type="submit"
                  disabled={isAddingTask}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              </form>
            </div>
          </div>

          {/* Deliverables & Work Links Submissions (1 Col) */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-black text-slate-900">Work Links & Assets</h3>
                </div>
                <button
                  onClick={() => setShowAddLink(!showAddLink)}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  {showAddLink ? 'Cancel' : '+ Add Link'}
                </button>
              </div>

              {showAddLink && (
                <form onSubmit={handleAddLink} className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2.5 animate-fade-in">
                  <input
                    type="text"
                    required
                    value={newLinkTitle}
                    onChange={e => setNewLinkTitle(e.target.value)}
                    placeholder="Link Name (e.g. Figma Prototype, GitHub Repo)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  />
                  <input
                    type="text"
                    required
                    value={newLinkUrl}
                    onChange={e => setNewLinkUrl(e.target.value)}
                    placeholder="URL (e.g. figma.com/... or github.com/...)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                  >
                    Submit Link
                  </button>
                </form>
              )}

              {/* Links List */}
              <div className="space-y-2">
                {workLinks.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No project links submitted yet.</p>
                ) : (
                  workLinks.map((link) => (
                    <div
                      key={link.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{link.title}</h5>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-blue-600 hover:underline truncate block"
                        >
                          {link.url}
                        </a>
                      </div>
                      <div className="flex items-center gap-1">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-white transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDeleteLink(link.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-white transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Review Modal Dialog */}
      {showReviewModal && workspace.student && (
        <ReviewModal
          projectId={workspace.projectId}
          projectTitle={workspace.project.title}
          studentId={workspace.student.id}
          studentName={workspace.student.name}
          studentAvatar={workspace.student.avatar}
          onClose={() => setShowReviewModal(false)}
          onSuccess={async () => {
            setShowReviewModal(false);
            await fetchWorkspace();
          }}
        />
      )}
    </div>
  );
};
