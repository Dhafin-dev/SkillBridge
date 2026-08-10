import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SuccessStateProps {
  title?: string;
  message?: string;
  primaryActionLabel?: string;
  primaryActionPath?: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title = 'Success!',
  message = 'Your action has been completed successfully. Everything is set and ready to go.',
  primaryActionLabel = 'Return to Dashboard',
  primaryActionPath = '/'
}) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col items-center justify-center p-4 sm:px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      <main className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center">
        <div className="bg-white/80 backdrop-blur-md w-full rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80 flex flex-col items-center">
          {/* Animated Icon Illustration */}
          <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
            {/* Outer pulse circle */}
            <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-30" />
            {/* Inner green circle */}
            <div className="relative w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <Check className="w-10 h-10 text-white stroke-[3]" />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{title}</h1>
          <p className="text-sm text-slate-500 mb-8 max-w-sm leading-relaxed">
            {message}
          </p>

          <div className="w-full space-y-3">
            <button
              onClick={() => navigate(primaryActionPath)}
              className="w-full h-12 bg-blue-600 text-white font-semibold text-xs rounded-2xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <span>{primaryActionLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="w-full h-12 bg-transparent border border-slate-200 text-slate-700 font-semibold text-xs rounded-2xl hover:bg-slate-50 transition-colors"
            >
              View Settings
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <span className="text-xs font-bold text-slate-400 tracking-wider">SkillBridge Platform</span>
        </div>
      </main>
    </div>
  );
};
