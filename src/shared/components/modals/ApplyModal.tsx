import React, { useState } from 'react';
import { X, Send, CheckCircle2, Paperclip, FileText } from 'lucide-react';
import { Project } from '../../types/types';

interface ApplyModalProps {
  project: Project;
  onClose: () => void;
  onSubmit: (pitch: string) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ project, onClose, onSubmit }) => {
  const [pitch, setPitch] = useState(
    "Hi! I'm Alex Rivers, a senior CS student from Universitas Indonesia. I've completed 12 projects in UI design and web development and would love to collaborate on " + project.title + "."
  );
  const [hoursPerWeek, setHoursPerWeek] = useState('15');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmit(pitch);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Project Application</span>
            <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
              Apply to {project.companyName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Application Submitted!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your profile and pitch have been sent to {project.companyName}. You will be notified when they review your application.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Project Summary Box */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3">
              <img
                src={project.companyLogo}
                alt={project.companyName}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">{project.title}</h4>
                <span className="text-[11px] text-slate-500 font-medium">Stipend: {project.stipend} • Match: {project.matchScore}%</span>
              </div>
            </div>

            {/* Pitch / Cover Note */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Cover Pitch / Why You're a Great Fit</label>
              <textarea
                rows={4}
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Availability */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Available Weekly Hours</label>
              <input
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Attached Portfolio Item */}
            <div className="flex items-center gap-2 p-3 bg-blue-50/60 border border-blue-100 rounded-2xl text-xs font-semibold text-blue-800">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Attached: Verified SkillBridge Academic Portfolio (Score 94)</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Application</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
