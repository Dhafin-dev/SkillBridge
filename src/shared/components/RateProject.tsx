import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RateProjectProps {
  onSubmitReview?: (reviewData: any) => void;
  projectTitle?: string;
  studentName?: string;
}

export const RateProject: React.FC<RateProjectProps> = ({
  onSubmitReview,
  projectTitle = 'E-commerce Platform Redesign',
  studentName = 'Alex Rivers'
}) => {
  const navigate = useNavigate();
  const [overallRating, setOverallRating] = useState(5);
  const [hoverOverall, setHoverOverall] = useState(0);

  const [commRating, setCommRating] = useState(5);
  const [techRating, setTechRating] = useState(5);
  const [timeRating, setTimeRating] = useState(5);

  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitReview) {
      onSubmitReview({
        overallRating,
        commRating,
        techRating,
        timeRating,
        reviewText
      });
    }
    navigate('/success-state');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden relative">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h1 className="text-lg font-bold text-slate-900">Rate Project</h1>
          <button
            onClick={() => navigate('/student/my-projects')}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* Project Context */}
          <section className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt={studentName}
              className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                Completed Project
              </span>
              <p className="text-base font-bold text-slate-900 leading-tight">{projectTitle}</p>
              <p className="text-xs text-slate-500 mt-1">
                Collaborated with <span className="font-semibold text-blue-600">{studentName}</span>
              </p>
            </div>
          </section>

          {/* Overall Rating */}
          <section className="flex flex-col items-center text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-1">How was your experience?</h3>
            <p className="text-xs text-slate-500 mb-4">Your feedback helps build trust and improve future collaborations.</p>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setOverallRating(star)}
                  onMouseEnter={() => setHoverOverall(star)}
                  onMouseLeave={() => setHoverOverall(0)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-9 h-9 ${
                      (hoverOverall || overallRating) >= star
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200 fill-slate-100'
                    }`}
                  />
                </button>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Detailed Category Ratings */}
          <section className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detailed Feedback</h4>

            {/* Communication */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Communication</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setCommRating(star)}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        commRating >= star ? 'text-blue-600 fill-blue-600' : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Skill */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Technical Skill</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setTechRating(star)}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        techRating >= star ? 'text-blue-600 fill-blue-600' : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Timeliness */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Timeliness</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setTimeRating(star)}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        timeRating >= star ? 'text-blue-600 fill-blue-600' : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Text Review */}
          <section className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Share your experience</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What went well? What could be improved?"
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </section>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row-reverse gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white font-semibold text-xs py-3 px-6 rounded-2xl shadow-sm hover:bg-blue-700 transition-colors"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => navigate('/student/my-projects')}
              className="w-full sm:w-auto bg-transparent text-slate-600 font-semibold text-xs py-3 px-6 rounded-2xl hover:bg-slate-100 transition-colors"
            >
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
