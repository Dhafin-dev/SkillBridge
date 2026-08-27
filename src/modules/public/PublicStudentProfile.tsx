import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, MoreVertical, MessageSquare, UserPlus, Star, Award, CheckCircle2, FileText, Download, User as UserIcon, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../../shared/services/api/userService';
import { UserProfile } from '../../shared/types/types';

export const PublicStudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInvited, setIsInvited] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await userService.getProfile(id);
        setStudent(data);
      } catch (err: any) {
        console.error('Failed to load student profile', err);
        setError(err.response?.data?.error || 'Student profile not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleStartChat = () => {
    if (!id) return;
    navigate(`/messages/${id}`);
  };

  const handleInvite = async () => {
    if (!id) return;
    setIsInvited(true);
    try {
      await userService.inviteStudent(id, { projectName: 'Academic Collaboration Project' });
    } catch (error) {
      console.error('Failed to send invitation:', error);
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-slate-500">Loading student profile...</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">{error || 'Student Not Found'}</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const portfolioScore = student.portfolioScore ?? 0;
  const rankLabel = portfolioScore >= 90 ? 'Top 5% Student' : portfolioScore >= 75 ? 'Top 15% Student' : portfolioScore > 0 ? 'Rising Talent' : 'New Member';
  const matchScore = portfolioScore > 0 ? Math.min(99, portfolioScore + 4) : 90;

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-blue-600 text-base">SkillBridge</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: student.name, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Profile link copied to clipboard!');
              }
            }}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero Card */}
        <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={student.name}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-md shrink-0"
              />
            ) : (
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center shrink-0 text-slate-400">
                <UserIcon className="w-14 h-14" />
              </div>
            )}
            
            <div className="flex-1 w-full space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{student.name}</h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    {student.institution || 'SkillBridge Student Candidate'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleStartChat}
                    className="h-10 px-4 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Start Chat</span>
                  </button>
                  <button
                    onClick={handleInvite}
                    disabled={isInvited}
                    className={`h-10 px-4 rounded-xl font-semibold text-xs transition-colors shadow-xs flex items-center gap-1.5 ${
                      isInvited ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isInvited ? 'Invited' : 'Invite Student'}</span>
                  </button>
                </div>
              </div>

              {/* Stats pill */}
              <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-base">
                    {portfolioScore}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PORTFOLIO SCORE
                    </span>
                    <span className="text-xs font-bold text-slate-800">{rankLabel}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-base">
                    {matchScore}%
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      MATCH SCORE
                    </span>
                    <span className="text-xs font-bold text-slate-800">Highly Compatible</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-black text-base">
                    {student.projectsCompleted ?? 0}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PROJECTS
                    </span>
                    <span className="text-xs font-bold text-slate-800">Completed</span>
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
              <h2 className="text-base font-bold text-slate-900">About & Expertise</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {student.bio || 'No bio provided yet. Student profile will be enriched as projects are completed.'}
              </p>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">CORE SKILLS</span>
                <div className="flex flex-wrap gap-1.5">
                  {student.skills && student.skills.length > 0 ? (
                    student.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-semibold">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 font-medium italic">No core skills added yet.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Portfolio Highlights */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900">Portfolio Highlights</h2>
              {student.projectsCompleted && student.projectsCompleted > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80"
                      alt="Project"
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h4 className="text-xs font-bold text-slate-900">Industry Web Solution</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Full-stack web application</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs font-medium text-slate-400 bg-slate-50 rounded-2xl border border-slate-100">
                  Portfolio deliverables and verified case studies will be showcased here once projects are finished.
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* UMKM Reviews Card */}
            <div className="bg-amber-50/50 rounded-3xl p-6 border border-amber-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <h3 className="text-base font-bold text-slate-900">UMKM Reviews</h3>
                </div>
                {student.reviews && student.reviews.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    {student.reviews.length} {student.reviews.length === 1 ? 'Review' : 'Reviews'}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {student.reviews && student.reviews.length > 0 ? (
                  student.reviews.map((review) => (
                    <div key={review.id} className="bg-white p-3.5 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{review.companyName || review.authorName}</h4>
                          <span className="text-[10px] text-slate-400">{review.projectName || 'Project Client'}</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: review.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs italic leading-relaxed">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-100 text-center text-xs space-y-1">
                    <p className="text-slate-500 italic">No client reviews received yet.</p>
                    <p className="text-[11px] text-slate-400">Verified reviews appear after completing UMKM projects.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Certificates Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Certificates</h3>
              </div>

              <div className="space-y-2 text-xs">
                {student.certificates && student.certificates.length > 0 ? (
                  student.certificates.map((cert, idx) => (
                    <div key={cert.id || idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                      <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 truncate">{cert.title}</h4>
                        <p className="text-[11px] text-slate-500">
                          {cert.issuer} {cert.date ? `• ${cert.date}` : ''}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 px-2">
                    <p className="text-slate-400 italic text-xs">No certificates published yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

