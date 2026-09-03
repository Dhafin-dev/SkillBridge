import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor?: string; // e.g., 'bg-slate-100' or transparent if not provided
  iconColor?: string;   // e.g., 'text-blue-500'
  tag?: string;
  tagColorClass?: string; // e.g., 'bg-emerald-100 text-emerald-800'
  layout?: 'compact' | 'spacious'; // spacious for Student, compact for UMKM
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconBgColor = '',
  iconColor = 'text-slate-500',
  tag,
  tagColorClass = 'bg-emerald-100 text-emerald-800',
  layout = 'spacious'
}) => {
  if (layout === 'compact') {
    return (
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs transition-shadow hover:shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className={`${iconColor}`}>
            {icon}
          </div>
          <span className="text-xs font-semibold text-slate-500">{title}</span>
        </div>
        <div className="text-2xl font-black text-slate-900">{value}</div>
      </div>
    );
  }

  // Spacious layout
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2 relative transition-shadow hover:shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">{title}</span>
        <div className={`p-2 rounded-xl ${iconBgColor || 'bg-slate-100'} ${iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black text-slate-900 leading-none">{value}</span>
        {tag && (
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tagColorClass}`}>
            {tag}
          </span>
        )}
      </div>
    </div>
  );
};
