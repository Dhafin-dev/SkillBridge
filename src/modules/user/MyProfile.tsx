import React, { useEffect } from 'react';
import {
  Edit3,
  Settings,
  Star,
  Award,
  User,
  Store,
  MapPin,
  Globe,
  Instagram,
  Phone,
  Briefcase,
  Users,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  PlusCircle,
  Building2,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/context/AuthContext';
import { userService } from '../../shared/services/api/userService';

export const MyProfile: React.FC = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    userService.getProfile().then(user => {
      if (user) setCurrentUser(user);
    }).catch(err => console.error('Failed to refresh profile:', err));
  }, []);

  const isUmkm = currentUser?.role === 'umkm';

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
          <h1 className="text-xl font-extrabold text-slate-900">
            {isUmkm ? 'Business Profile' : 'My Profile'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/settings')}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* UMKM BUSINESS PROFILE VIEW                                               */}
        {/* ========================================================================= */}
        {isUmkm ? (
          <>
            {/* UMKM Hero Card */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                {currentUser.avatar || currentUser.companyLogo ? (
                  <img
                    src={currentUser.avatar || currentUser.companyLogo}
                    alt={currentUser.companyName || currentUser.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-slate-50 shadow-md shrink-0"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border-4 border-slate-50 shadow-md shrink-0">
                    <Store className="w-12 h-12" />
                  </div>
                )}

                <div className="flex-1 w-full space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          {currentUser.companyName || currentUser.name}
                        </h1>
                        <span title="Verified Enterprise Partner">
                          <ShieldCheck className="w-6 h-6 text-blue-600 fill-blue-50 shrink-0" />
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 font-medium mt-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold">
                          {currentUser.industry || 'Food & Beverage'}
                        </span>
                        {currentUser.location && (
                          <span className="flex items-center gap-1 text-slate-600 font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {currentUser.location}
                          </span>
                        )}
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500 font-semibold">
                          {currentUser.businessScale || 'Small Enterprise'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate('/settings/edit-profile')}
                        className="h-10 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Company Profile</span>
                      </button>
                    </div>
                  </div>

                  {/* Business KPI Stats */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-base">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          ACTIVE PROJECTS
                        </span>
                        <span className="text-sm font-extrabold text-slate-900">
                          {currentUser.activeProjectsCount ?? 0} Published
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 pl-4 border-l border-slate-200">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-base">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          COMPLETED
                        </span>
                        <span className="text-sm font-extrabold text-slate-900">
                          {currentUser.completedProjectsCount ?? 0} Projects
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 pl-4 border-l border-slate-200">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-base">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          TALENTS HIRED
                        </span>
                        <span className="text-sm font-extrabold text-slate-900">
                          {currentUser.talentsCollaboratedCount ?? 0} Students
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bento Layout for UMKM */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: About Company & Projects List */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* About & Mission */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-base font-bold text-slate-900">Company Overview</h2>
                    <button 
                      onClick={() => navigate('/settings/edit-profile')}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {currentUser.bio || (
                      <span className="italic text-slate-400">
                        No company description provided yet. Click "Edit Company Profile" to tell students about your business story and mission.
                      </span>
                    )}
                  </p>

                  {/* Online Presence & Contacts */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-semibold">
                    {currentUser.website && (
                      <a
                        href={currentUser.website.startsWith('http') ? currentUser.website : `https://${currentUser.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 bg-blue-50/60 px-3 py-1.5 rounded-xl border border-blue-100"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{currentUser.website.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                      </a>
                    )}
                    {currentUser.instagram && (
                      <a
                        href={`https://instagram.com/${currentUser.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-pink-600 hover:text-pink-700 bg-pink-50/60 px-3 py-1.5 rounded-xl border border-pink-100"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span>@{currentUser.instagram.replace('@', '')}</span>
                      </a>
                    )}
                    {currentUser.phone && (
                      <span className="inline-flex items-center gap-1.5 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{currentUser.phone}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Projects Published by this UMKM */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Projects by {currentUser.companyName || currentUser.name}</h2>
                      <p className="text-xs text-slate-500">Live opportunities available for university students</p>
                    </div>
                    <button
                      onClick={() => navigate('/umkm/projects')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {currentUser.projects && currentUser.projects.length > 0 ? (
                      currentUser.projects.map((proj: any) => (
                        <div
                          key={proj.id}
                          onClick={() => navigate(`/umkm/projects/${proj.id}`)}
                          className="p-4 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                                {proj.title}
                              </h4>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                proj.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                                proj.status === 'COMPLETED' ? 'bg-slate-100 text-slate-700' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {proj.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                              <span>{proj.category}</span>
                              <span>•</span>
                              <span>{proj.appliedCount ?? 0} Applicants</span>
                              <span>•</span>
                              <span className="font-semibold text-slate-700">{proj.stipend}</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-blue-600 self-start sm:self-center">
                            Manage →
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                        <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
                        <p className="text-xs font-semibold text-slate-600">No projects published yet</p>
                        <button
                          onClick={() => navigate('/umkm/projects')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700"
                        >
                          Create Your First Project
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Student Talent Testimonials & Enterprise Info */}
              <div className="space-y-6">
                {/* Talent Feedback Card */}
                <div className="bg-amber-50/50 rounded-3xl p-6 border border-amber-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <h3 className="text-base font-bold text-slate-900">Talent Feedback</h3>
                    </div>
                    {currentUser.reviews && currentUser.reviews.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        {currentUser.reviews.length} {currentUser.reviews.length === 1 ? 'Review' : 'Reviews'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    {currentUser.reviews && currentUser.reviews.length > 0 ? (
                      currentUser.reviews.map((review) => (
                        <div key={review.id} className="bg-white p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-xs text-slate-900">{review.authorName}</h4>
                              <span className="text-[10px] text-slate-400">{review.projectName || 'Student Collaborator'}</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: review.rating || 5 }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 italic leading-relaxed">"{review.comment}"</p>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                        <p className="text-xs text-slate-400 italic">No talent reviews received yet.</p>
                        <p className="text-[11px] text-slate-400 mt-1">Feedback appears after completing project milestones with students.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Facts Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3 text-xs">
                  <h3 className="font-bold text-slate-900 text-sm">Enterprise Information</h3>
                  <div className="space-y-2 pt-1 text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Industry:</span>
                      <span className="font-bold text-slate-800">{currentUser.industry || 'Food & Beverage'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Business Scale:</span>
                      <span className="font-bold text-slate-800">{currentUser.businessScale || 'Small Enterprise'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Location:</span>
                      <span className="font-bold text-slate-800">{currentUser.location || 'Indonesia'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Verification:</span>
                      <span className="font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </>
        ) : (
          /* ========================================================================= */
          /* STUDENT PROFILE VIEW                                                      */
          /* ========================================================================= */
          <>
            {/* Student Hero Card */}
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

            {/* Bento Details for Student */}
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
                      <button
                        onClick={() => navigate('/settings/edit-profile')}
                        className="px-3 py-1 border border-dashed border-slate-300 text-slate-500 rounded-full text-xs font-semibold hover:border-slate-400 hover:text-slate-600"
                      >
                        + Add Skill
                      </button>
                    </div>
                  </div>
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
                    {currentUser.reviews && currentUser.reviews.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        {currentUser.reviews.length} {currentUser.reviews.length === 1 ? 'Review' : 'Reviews'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    {currentUser.reviews && currentUser.reviews.length > 0 ? (
                      currentUser.reviews.map((review) => (
                        <div key={review.id} className="bg-white p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-2">
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
                          <p className="text-xs text-slate-600 italic leading-relaxed">"{review.comment}"</p>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                        <p className="text-xs text-slate-400 italic">No client reviews received yet.</p>
                        <p className="text-[11px] text-slate-400 mt-1">Verified reviews appear after completing UMKM projects.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Certificates Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <h3 className="text-base font-bold text-slate-900">Certificates</h3>
                    </div>
                    <button 
                      onClick={() => navigate('/settings/edit-profile')}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Add or edit certificates"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {currentUser.certificates && currentUser.certificates.length > 0 ? (
                      currentUser.certificates.map((cert, idx) => (
                        <div key={cert.id || idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Award className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-slate-900 truncate">{cert.title}</h4>
                            <p className="text-[11px] text-slate-500">
                              {cert.issuer} {cert.date ? `• ${cert.date}` : ''}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 px-2">
                        <p className="text-xs text-slate-400 italic mb-2">No certificates added yet.</p>
                        <button
                          onClick={() => navigate('/settings/edit-profile')}
                          className="text-xs text-blue-600 font-bold hover:underline"
                        >
                          + Add Certificate
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
};


