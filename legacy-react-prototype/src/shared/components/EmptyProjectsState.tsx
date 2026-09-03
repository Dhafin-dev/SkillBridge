import React from 'react';
import { Briefcase, ArrowRight, Sparkles, FolderOpen, Compass, GraduationCap, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmptyProjectsState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 min-h-[80vh] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center opacity-30">
        <div className="w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl absolute top-1/4 left-1/4" />
        <div className="w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-3xl absolute bottom-1/4 right-1/4" />
      </div>

      {/* Main Empty State Content Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-xs border border-slate-200/80 p-8 sm:p-12 flex flex-col items-center text-center">
        {/* Graphic Illustration */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 mb-6 relative flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-inner">
              <FolderOpen className="w-16 h-16 text-blue-600 stroke-[1.5]" />
            </div>
            {/* Sparkles overlay */}
            <div className="absolute top-4 right-4">
              <Sparkles className="w-7 h-7 text-amber-400 animate-bounce" />
            </div>
            <div className="absolute bottom-6 left-6">
              <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-md mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Your Canvas is Clear</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            It looks like you haven't taken on any projects yet. Ready to bridge the gap and start applying your academic skills to real-world UMKM challenges?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate('/market')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-8 h-12 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
          >
            <Compass className="w-4 h-4" />
            <span>Browse Marketplace</span>
          </button>
          <button
            onClick={() => navigate('/settings/edit-profile')}
            className="bg-transparent border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs px-8 h-12 rounded-2xl flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Update Portfolio</span>
          </button>
        </div>

        {/* Helper Hint */}
        <div className="mt-10 pt-6 border-t border-slate-100 w-full flex items-center justify-center gap-2 text-slate-500">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="text-xs font-medium">Tip: Completing your portfolio profile increases your match score with UMKMs by 40%.</span>
        </div>
      </div>
    </div>
  );
};
