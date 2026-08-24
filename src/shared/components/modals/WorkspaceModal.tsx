import React, { useState } from 'react';
import { X, CheckSquare, Square, Upload, FileCheck, ExternalLink, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ActiveStudentProject, ProjectTask } from '../../types/types';

interface WorkspaceModalProps {
  project: ActiveStudentProject;
  onClose: () => void;
}

export const WorkspaceModal: React.FC<WorkspaceModalProps> = ({ project, onClose }) => {
  const [tasks, setTasks] = useState<ProjectTask[]>([
    { id: 't1', title: 'Complete mobile user journey map & wireframes', completed: true, dueDate: 'Oct 10', assignedTo: 'Alex Rivers' },
    { id: 't2', title: 'Design high-fidelity UI Figma prototype & component tokens', completed: true, dueDate: 'Oct 14', assignedTo: 'Alex Rivers' },
    { id: 't3', title: 'Review cart & checkout micro-interactions with UMKM team', completed: false, dueDate: 'Oct 15', assignedTo: 'Alex Rivers' },
    { id: 't4', title: 'Hand off developer specifications & design assets', completed: false, dueDate: 'Oct 18', assignedTo: 'Alex Rivers' },
  ]);

  const [files, setFiles] = useState<string[]>([
    'SkillBridge_UI_Design_System_v2.fig',
    'Checkout_Flow_Prototype_Specs.pdf'
  ]);
  const [newFileName, setNewFileName] = useState('');

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressCalc = Math.round((completedCount / tasks.length) * 100);

  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    setFiles(prev => [...prev, newFileName.trim()]);
    setNewFileName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col space-y-5 animate-in fade-in zoom-in-95 duration-150 overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">Project Workspace</span>
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              {project.title}
            </h3>
            <p className="text-xs text-slate-500 font-semibold">{project.companyName} • {project.phaseName}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Phase Progress Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Overall Task Completion</span>
            <span className="text-blue-600 font-extrabold">{progressCalc}% Complete</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progressCalc}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span>{completedCount} of {tasks.length} tasks finished</span>
            <span className="text-amber-700 font-bold">{project.dueDate}</span>
          </div>
        </div>

        {/* Task Checklist Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-blue-600" />
            <span>Interactive Deliverable Tasks</span>
          </h4>

          <div className="space-y-2">
            {tasks.map(t => (
              <div
                key={t.id}
                onClick={() => toggleTask(t.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${t.completed ? 'bg-emerald-50/60 border-emerald-200/80 text-slate-600' : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
                  }`}
              >
                <div className="flex items-center gap-3">
                  {t.completed ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 flex-shrink-0" />
                  )}
                  <span className={`text-xs font-semibold ${t.completed ? 'line-through text-slate-400' : ''}`}>
                    {t.title}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  {t.dueDate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Files Section */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-600" />
            <span>Uploaded Workspace Files</span>
          </h4>

          <div className="space-y-2">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs font-medium text-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">📄</span>
                  <span>{file}</span>
                </div>
                <span className="text-[10px] text-blue-600 font-bold">Verified File</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleUploadFile} className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="Attach new file name or Figma link..."
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload</span>
            </button>
          </form>
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
