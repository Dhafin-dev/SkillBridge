import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Clock,
  XCircle,
  Sparkles,
  Filter,
  Users,
  Check,
  X,
  SlidersHorizontal,
  Search,
  ArrowLeft,
  UserCheck,
  Building2,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService, MatchRecommendation } from '../../shared/services/api/adminService';

export const MatchingManagement: React.FC = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<MatchRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getMatchRecommendations().then(data => {
      setRecommendations(data);
      setIsLoading(false);
    });
  }, []);

  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'medium'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleApprove = (id: string, name: string) => {
    setRecommendations(prev =>
      prev.map(item => item.id === id ? { ...item, status: 'approved' as const } : item)
    );
    showToast(`Approved match for ${name}`);
  };

  const handleReject = (id: string, name: string) => {
    setRecommendations(prev =>
      prev.map(item => item.id === id ? { ...item, status: 'rejected' as const } : item)
    );
    showToast(`Rejected match proposal for ${name}`);
  };

  const handleManualAssign = (id: string, name: string) => {
    const newStudent = prompt('Enter student name or ID for manual override:', name);
    if (newStudent) {
      setRecommendations(prev =>
        prev.map(item => item.id === id ? { ...item, studentName: newStudent, status: 'manual' as const } : item)
      );
      showToast(`Reassigned project to ${newStudent}`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const filteredRecs = recommendations.filter(rec => {
    if (activeFilter === 'high') return rec.compatibility >= 90;
    if (activeFilter === 'medium') return rec.compatibility < 90;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Matching Overview</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">AI-driven UMKM & Student compatibility analysis.</p>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="mb-4 p-3 bg-blue-600 text-white text-xs font-semibold rounded-2xl shadow-md flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Successful Match Rate */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <CheckCircle className="w-7 h-7 text-emerald-600" />
            <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              +4% this week
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">92%</div>
            <div className="text-xs font-medium text-slate-500">Successful Match Rate</div>
          </div>
        </div>

        {/* Pending Matches */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <Clock className="w-7 h-7 text-blue-600" />
            <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
              Requires Attention
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">
              {recommendations.filter(r => r.status === 'pending').length}
            </div>
            <div className="text-xs font-medium text-slate-500">Pending Recommendations</div>
          </div>
        </div>

        {/* Rejected Matches */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <XCircle className="w-7 h-7 text-red-600" />
            <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
              Past 7 Days
            </span>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">3</div>
            <div className="text-xs font-medium text-slate-500">Rejected Proposals</div>
          </div>
        </div>
      </div>

      {/* AI Recommendations Title & Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span>AI Recommendations</span>
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            All ({recommendations.length})
          </button>
          <button
            onClick={() => setActiveFilter('high')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
              activeFilter === 'high'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            90%+ Match
          </button>
          <button
            onClick={() => setActiveFilter('medium')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
              activeFilter === 'medium'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            &lt; 90% Match
          </button>
        </div>
      </div>

      {/* Recommendation Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading && <div className="text-center py-10 text-slate-500 font-semibold col-span-full">Generating AI Recommendations...</div>}
        {!isLoading && filteredRecs.length === 0 && (
          <div className="text-center py-10 text-slate-500 font-semibold col-span-full">No recommendations found.</div>
        )}
        {!isLoading && filteredRecs.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6">
              {/* Project Header & Compatibility */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                    PROJECT
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{rec.projectTitle}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{rec.companyName}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-600">{rec.compatibility}%</div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    COMPATIBILITY
                  </span>
                </div>
              </div>

              <hr className="border-slate-100 my-4" />

              {/* Recommended Student */}
              <div className="mb-4">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-2">
                  RECOMMENDED STUDENT
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={rec.studentAvatar}
                    alt={rec.studentName}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{rec.studentName}</h4>
                    <p className="text-xs text-slate-500">{rec.studentInfo}</p>
                  </div>
                </div>
              </div>

              {/* Matching Reason Box */}
              <div className="bg-blue-50/60 border border-blue-100 p-3.5 rounded-xl flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 mb-0.5">Matching Reason</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rec.reason}</p>
                </div>
              </div>
            </div>

            {/* Status or Action Buttons */}
            <div className="bg-slate-50/80 p-4 border-t border-slate-100 flex flex-wrap gap-2 justify-end items-center">
              {rec.status === 'approved' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl">
                  <Check className="w-4 h-4" /> Match Approved
                </span>
              ) : rec.status === 'rejected' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-800 text-xs font-bold rounded-xl">
                  <X className="w-4 h-4" /> Match Rejected
                </span>
              ) : (
                <>
                  <button
                    onClick={() => handleManualAssign(rec.id, rec.studentName)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl px-4 py-2 transition-colors"
                  >
                    Manual Assignment
                  </button>
                  <button
                    onClick={() => handleReject(rec.id, rec.studentName)}
                    className="bg-white border border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-600 font-semibold text-xs rounded-xl px-4 py-2 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(rec.id, rec.studentName)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl px-4 py-2 transition-colors shadow-xs"
                  >
                    Approve Match
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
