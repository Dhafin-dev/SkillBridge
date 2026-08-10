import React, { useState } from 'react';
import { X, Plus, Sparkles, Building } from 'lucide-react';
import { Project } from '../../types/types';

interface CreateProjectModalProps {
  onClose: () => void;
  onCreate: (newProject: Partial<Project>) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Web Development' | 'UI/UX Design' | 'Marketing' | 'Software Development' | 'Data Science' | 'Mobile App'>('UI/UX Design');
  const [stipend, setStipend] = useState('$250');
  const [duration, setDuration] = useState('2 Months');
  const [tagsInput, setTagsInput] = useState('Figma, Branding, UI/UX');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    onCreate({
      title,
      companyName: 'Lumina Beans Roastery',
      companyLogo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=120&auto=format&fit=crop&q=80',
      matchScore: 94,
      stipend,
      description,
      tags,
      level: 'Intermediate',
      duration,
      appliedCount: 0,
      category,
      deadline: 'Nov 30, 2024',
      teamSize: '2 Students'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">UMKM Client Portal</span>
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">Post New Project Request</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Project Title</label>
            <input
              type="text"
              placeholder="e.g. Mobile POS System Redesign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Marketing">Marketing</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Stipend / Honorarium</label>
              <input
                type="text"
                placeholder="$200"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Required Skills (Comma separated)</label>
            <input
              type="text"
              placeholder="React, Figma, Firebase"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Detailed Description & Deliverables</label>
            <textarea
              rows={4}
              placeholder="Describe what your UMKM needs and what student skillsets you are looking for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
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
              <Plus className="w-4 h-4" />
              <span>Publish Request</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
