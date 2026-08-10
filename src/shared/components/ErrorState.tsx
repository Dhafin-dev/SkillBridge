import React from 'react';
import { RefreshCw, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  errorCode?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "We've lost the connection or the page you're looking for doesn't exist in our ecosystem.",
  onRetry,
  errorCode = '404_NOT_FOUND',
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80">
        {/* Graphic / Icon Container */}
        <div className="relative w-48 h-48 mx-auto mb-4 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden relative">
            <div className="w-24 h-24 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
              <AlertCircle className="w-12 h-12 text-blue-600 animate-bounce" />
            </div>
          </div>
          {/* Floating decorative light pulses */}
          <div className="absolute top-2 -right-2 w-12 h-12 bg-blue-400 rounded-full opacity-20 blur-xl animate-pulse" />
          <div className="absolute bottom-4 -left-2 w-16 h-16 bg-indigo-400 rounded-full opacity-30 blur-xl animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Something went wrong
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white text-xs font-semibold px-6 h-12 rounded-2xl shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>
          <button
            onClick={() => navigate('/market')}
            className="bg-slate-100 text-slate-800 text-xs font-semibold px-6 h-12 rounded-2xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back Home</span>
          </button>
        </div>

        <div className="pt-6 border-t border-slate-100 mt-6">
          <p className="text-[11px] font-mono font-medium text-slate-400">
            Error Code: {errorCode}
          </p>
        </div>
      </div>
    </div>
  );
};
