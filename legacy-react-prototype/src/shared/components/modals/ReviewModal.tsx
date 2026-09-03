import React, { useState } from 'react';
import { X, Star, Sparkles, CheckCircle2, Award, AlertCircle, Loader2 } from 'lucide-react';
import { projectService } from '../../services/api/projectService';

interface ReviewModalProps {
  projectId: string;
  projectTitle: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  projectId,
  projectTitle,
  studentId,
  studentName,
  studentAvatar,
  onClose,
  onSuccess
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Great Communication', 'High Quality Work']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const praiseTags = [
    'Fast Delivery',
    'Clean Code',
    'Great Communication',
    'Creative UI/UX',
    'High Quality Work',
    'Highly Recommended',
    'Proactive Problem Solver'
  ];

  const ratingDescriptions: Record<number, string> = {
    5: 'Outstanding — Exceeded all expectations! (5/5)',
    4: 'Very Good — High quality and delivered well. (4/5)',
    3: 'Good — Met project requirements satisfactorily. (3/5)',
    2: 'Fair — Some areas needed improvement. (2/5)',
    1: 'Needs Improvement — Failed key requirements. (1/5)',
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || comment.trim().length < 5) {
      setErrorMsg('Please write a brief feedback comment (at least 5 characters).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const fullComment = selectedTags.length > 0
      ? `${comment.trim()} [Highlights: ${selectedTags.join(', ')}]`
      : comment.trim();

    try {
      await projectService.completeProject(projectId, {
        studentId,
        rating,
        comment: fullComment,
        feedbackTags: selectedTags
      });
      onSuccess();
    } catch (err: any) {
      console.error('Failed to submit review:', err);
      setErrorMsg(err.response?.data?.error || 'Failed to complete project and submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-6 relative max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Project Milestone Finish</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              Complete Project & Review
            </h3>
            <p className="text-xs text-slate-500 font-medium truncate max-w-xs mt-0.5">
              {projectTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs font-semibold text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Student Profile Card */}
          <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
            {studentAvatar ? (
              <img
                src={studentAvatar}
                alt={studentName}
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center border-2 border-white shadow-xs shrink-0">
                {studentName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-extrabold text-slate-900 truncate">{studentName}</h4>
              <p className="text-xs text-slate-500 font-medium">Student Collaborator</p>
            </div>
            <Award className="w-5 h-5 text-amber-500 shrink-0" />
          </div>

          {/* Star Rating Selector */}
          <div className="text-center space-y-2 py-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Overall Performance Rating
            </label>
            
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-slate-200 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        isFilled
                          ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-bold text-amber-600 h-4">
              {ratingDescriptions[hoverRating || rating]}
            </p>
          </div>

          {/* Praise Tags */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              What went especially well? (Praise Badges)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {praiseTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Testimonial */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Testimonial / Review Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              maxLength={600}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder={`Describe ${studentName}'s dedication, technical skill, and collaboration quality. This review will be proudly displayed on their public university portfolio...`}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Public testimonial visible on student profile</span>
              <span>{comment.length}/600</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Finalizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Complete Project & Award Review</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
