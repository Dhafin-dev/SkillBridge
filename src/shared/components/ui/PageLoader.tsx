import React from 'react';
import { Loader2 } from 'lucide-react';

export const PageLoader: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      <span className="text-sm font-medium text-slate-500">Loading module...</span>
    </div>
  );
};
