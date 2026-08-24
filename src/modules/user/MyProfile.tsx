import React from 'react';
import { ArrowLeft, Edit3, Settings, Star, Award, MessageSquare, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';

export const MyProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const getRank = (score: number) => {
    if (score >= 90) return 'Top 5% Student';
    if (score >= 80) return 'Top 15% Student';
    if (score >= 60) return 'Top 30% Student';
    if (score > 0) return 'Rising Talent';
    return 'New Member';
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] text-slate-900 pb-24">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-extrabold text-slate-900">My Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero Card */}
        <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-md shrink-0"
              />
            ) : (
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-4 border-white shadow-md shrink-0">
                <User className="w-12 h-12" />
              </div>
            )}
            <div className="flex-1 w-full space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{currentUser.name}</h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    {currentUser.institution || 'No professional headline provided yet'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate('/settings/edit-profile')}
                    className="h-10 px-4 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>

              {/* Stats pill */}
              <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-base">
                    {currentUser.portfolioScore ?? 0}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PORTFOLIO SCORE
                    </span>
                    <span className="text-xs font-bold text-slate-800">{getRank(currentUser.portfolioScore ?? 0)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-base">
                    {currentUser.completedProjectsCount ?? 0}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PROJECTS
                    </span>
                    <span className="text-xs font-bold text-slate-800">Successfully Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* About & Skills */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-slate-900">About & Expertise</h2>
                <button 
                  onClick={() => navigate('/settings/edit-profile')}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentUser.bio || <span className="italic text-slate-400">No bio provided yet.</span>}
              </p>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">CORE SKILLS</span>
                <div className="flex flex-wrap gap-1.5">
                  {(currentUser.skills || []).length > 0 ? (
                    (currentUser.skills || []).map(skill => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-semibold">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No skills added yet.</span>
                  )}
                  <button className="px-3 py-1 border border-dashed border-slate-300 text-slate-500 rounded-full text-xs font-semibold hover:border-slate-400 hover:text-slate-600">
                    + Add Skill
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900">Certificates</h3>
                <button 
                  onClick={() => navigate('/settings/edit-profile')}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="text-slate-400 italic text-xs py-2">No certificates added yet.</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
