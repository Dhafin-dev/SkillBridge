import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle2,
  Tag,
  Users,
  Layers,
  FileText,
  AlertCircle
} from 'lucide-react';
import { projectService } from '../../shared/services/api/projectService';

interface NewProjectModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ onClose, onSuccess }) => {
  // Basic Info
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Website/App Development');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  
  // Duration Parameters
  const [durationValue, setDurationValue] = useState<number>(2);
  const [durationUnit, setDurationUnit] = useState<'Weeks' | 'Months'>('Months');

  // Compensation
  const [isUnpaid, setIsUnpaid] = useState(false);
  const [stipendAmount, setStipendAmount] = useState('1.500.000');

  // Team & Deadline
  const [teamSize, setTeamSize] = useState('1 Student');
  const [deadline, setDeadline] = useState('');

  // Details
  const [description, setDescription] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([
    'Responsive and modern user interface',
    'Source code repository and documentation'
  ]);
  const [newDeliverable, setNewDeliverable] = useState('');

  // Skill Tags
  const [tags, setTags] = useState<string[]>(['React', 'UI/UX']);
  const [newTagInput, setNewTagInput] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = [
    'Website/App Development',
    'Branding & Design',
    'UI/UX Design',
    'Digital Marketing & Social Media',
    'Data Analytics & Research',
    'Mobile Development',
    'Content Creation & Copywriting',
    'Other',
  ];

  const durationPresets = [
    { label: '2 Weeks', value: 2, unit: 'Weeks' as const },
    { label: '1 Month', value: 1, unit: 'Months' as const },
    { label: '2 Months', value: 2, unit: 'Months' as const },
    { label: '3 Months', value: 3, unit: 'Months' as const },
    { label: '6 Months', value: 6, unit: 'Months' as const },
  ];

  const stipendPresets = ['500.000', '1.000.000', '1.500.000', '2.500.000', '3.500.000'];

  const suggestedTags = [
    'React', 'Next.js', 'Figma', 'UI/UX', 'SEO', 'Social Media',
    'Copywriting', 'Graphic Design', 'Flutter', 'Python', 'Node.js'
  ];

  const handleAddDeliverable = () => {
    if (newDeliverable.trim() && !deliverables.includes(newDeliverable.trim())) {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable('');
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, idx) => idx !== index));
  };

  const handleAddTag = (tagToAdd?: string) => {
    const val = (tagToAdd || newTagInput).trim();
    if (val && !tags.includes(val)) {
      setTags([...tags, val]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const formatRupiahInput = (val: string) => {
    const numbersOnly = val.replace(/\D/g, '');
    if (!numbersOnly) return '';
    return Number(numbersOnly).toLocaleString('id-ID');
  };

  const handleSubmit = async (e: React.FormEvent, status: 'PUBLISHED' | 'DRAFT' = 'PUBLISHED') => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Please fill in both the project title and description.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const formattedDuration = `${durationValue} ${durationUnit}`;
    const formattedStipend = isUnpaid ? 'Unpaid / Experience' : (stipendAmount ? `Rp ${stipendAmount}` : 'Unpaid');

    const payload = {
      title: title.trim(),
      category,
      level,
      duration: formattedDuration,
      stipend: formattedStipend,
      description: description.trim(),
      deliverables,
      tags,
      teamSize,
      status,
      deadline: deadline || undefined,
    };

    try {
      await projectService.createProject(payload);
      onSuccess();
    } catch (err: any) {
      console.error('Failed to create project:', err);
      setErrorMsg(err.response?.data?.error || 'Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Min date for deadline picker is tomorrow
  const tomorrowStr = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl relative border border-slate-100 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10 shrink-0">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Create New Project</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Post an industry collaboration opportunity for university talents
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={(e) => handleSubmit(e, 'PUBLISHED')} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs font-semibold text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Core Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Basic Information</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="E.g. E-Commerce Redesign & Payment Gateway Integration"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-slate-900 font-medium transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Market-Aligned Category Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-slate-900 font-semibold bg-white cursor-pointer transition-all appearance-none pr-10"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Target Experience Level
                </label>
                <div className="relative">
                  <select
                    value={level}
                    onChange={e => setLevel(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-slate-900 font-semibold bg-white cursor-pointer transition-all appearance-none pr-10"
                  >
                    <option value="Beginner">Beginner (Foundational)</option>
                    <option value="Intermediate">Intermediate (Hands-on)</option>
                    <option value="Advanced">Advanced (High Complexity)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Duration Parameter & Compensation */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Timeline & Compensation</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Structured Duration Parameter */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Estimated Duration <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    max={52}
                    value={durationValue}
                    onChange={e => setDurationValue(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm font-bold text-slate-900 text-center"
                  />
                  <select
                    value={durationUnit}
                    onChange={e => setDurationUnit(e.target.value as any)}
                    className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm font-semibold text-slate-900 bg-white cursor-pointer"
                  >
                    <option value="Weeks">Weeks</option>
                    <option value="Months">Months</option>
                  </select>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {durationPresets.map((preset) => {
                    const isSelected = durationValue === preset.value && durationUnit === preset.unit;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setDurationValue(preset.value);
                          setDurationUnit(preset.unit);
                        }}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stipend / Compensation */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800">
                    Budget / Stipend
                  </label>
                  <label className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isUnpaid}
                      onChange={e => setIsUnpaid(e.target.checked)}
                      className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span>Unpaid / Credit</span>
                  </label>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    Rp
                  </span>
                  <input
                    type="text"
                    disabled={isUnpaid}
                    value={isUnpaid ? 'Unpaid / Experience' : stipendAmount}
                    onChange={e => setStipendAmount(formatRupiahInput(e.target.value))}
                    placeholder="1.500.000"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm font-bold text-slate-900 transition-all disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>

                {/* Stipend Presets */}
                {!isUnpaid && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {stipendPresets.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setStipendAmount(amt)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-colors ${
                          stipendAmount === amt
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        Rp {amt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Team Size & Application Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Talents Needed (Team Size)
                </label>
                <div className="relative">
                  <select
                    value={teamSize}
                    onChange={e => setTeamSize(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-slate-900 font-semibold bg-white cursor-pointer transition-all"
                  >
                    <option value="1 Student">1 Student (Individual)</option>
                    <option value="2 Students">2 Students (Pair)</option>
                    <option value="Small Team (3-4)">Small Team (3-4 Students)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Application Deadline (Optional)
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={tomorrowStr}
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-slate-900 font-medium bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Description & Key Deliverables */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Project Scope & Deliverables</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Project Description & Goals <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                maxLength={1000}
                placeholder="Explain the background of your business, what problem this project solves, and what you expect from student collaborators..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-slate-900 font-normal transition-all resize-none"
              />
              <p className="text-right text-[11px] text-slate-400 mt-1 font-medium">
                {description.length}/1000
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Key Deliverables & Milestones
              </label>
              
              <div className="space-y-2">
                {deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveDeliverable(idx)}
                      className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={e => setNewDeliverable(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddDeliverable();
                    }
                  }}
                  placeholder="Add a key deliverable (e.g. Figma Prototype, Final PDF Report)"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Skill Tags */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-slate-800">
                Required Skills & Technologies (Tags)
              </label>

              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-semibold"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={e => setNewTagInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Add skill tag (e.g. React, SEO, UI Design)"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag()}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold transition-colors shrink-0"
                >
                  Add Tag
                </button>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-400">Popular:</span>
                {suggestedTags.filter(t => !tags.includes(t)).slice(0, 6).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleAddTag(t)}
                    className="px-2 py-0.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-600 hover:text-blue-600 rounded-lg text-[10px] font-semibold transition-colors"
                  >
                    + {t}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer Actions */}
          <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 bg-white z-10 pb-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl font-bold text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e as any, 'DRAFT')}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                Save as Draft
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-2xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Publish Project</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
