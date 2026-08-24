import React, { useState } from 'react';
import { X } from 'lucide-react';
import { projectService } from '../../shared/services/api/projectService';

interface NewProjectModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    level: 'Beginner',
    duration: '',
    stipend: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await projectService.createProject(formData);
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-slate-900">Create New Project</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Project Title</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" placeholder="E.g. E-Commerce Website Redesign" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" placeholder="E.g. Web Development" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Level</label>
                <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Duration</label>
                <input type="text" required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" placeholder="E.g. 2 Months" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Budget / Stipend (Optional)</label>
                <input type="text" value={formData.stipend} onChange={e => setFormData({...formData, stipend: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" placeholder="E.g. Rp 1.000.000 or Unpaid" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none" placeholder="Describe the project requirements and goals..."></textarea>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all disabled:opacity-50">
              {isSubmitting ? 'Publishing...' : 'Publish Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
