import React from 'react';
import { ArrowLeft, Share2, MoreVertical, MessageSquare, UserPlus, Star, Award, CheckCircle2, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PublicStudentProfile: React.FC = () => {
  const navigate = useNavigate();

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
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero Card */}
        <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
              alt="Alex Rivers"
              className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-md shrink-0"
            />
            <div className="flex-1 w-full space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Alex Rivers</h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    Senior CS Student @ Tech University | Full-Stack Developer
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate('/messages/1')}
                    className="h-10 px-4 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Start Chat</span>
                  </button>
                  <button
                    onClick={() => alert('Invitation sent to student!')}
                    className="h-10 px-4 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Invite Student</span>
                  </button>
                </div>
              </div>

              {/* Stats pill */}
              <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-base">
                    94
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      PORTFOLIO SCORE
                    </span>
                    <span className="text-xs font-bold text-slate-800">Top 5% Student</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-base">
                    98%
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      MATCH SCORE
                    </span>
                    <span className="text-xs font-bold text-slate-800">Highly Compatible</span>
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
                Passionate software engineering student with a focus on scalable web architectures and user-centric design. Experienced in helping small businesses digitize their operations through custom CRM and e-commerce solutions.
              </p>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">CORE SKILLS</span>
                <div className="flex flex-wrap gap-1.5">
                  {['React & Next.js', 'Node.js / Express', 'PostgreSQL', 'UI/UX Design', 'Agile Methodology'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900">Portfolio Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80"
                    alt="Bakery POS"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-slate-900">Local Bakery Inventory POS</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Full-stack web application</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80"
                    alt="Craft E-Commerce"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-slate-900">Artisan Craft E-Commerce</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Mobile Application Design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-amber-50/50 rounded-3xl p-6 border border-amber-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="text-base font-bold text-slate-900">UMKM Reviews</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Budi Santoso</span>
                    <span className="text-[10px] text-slate-400">Owner, Kopi Kula</span>
                  </div>
                  <p className="text-slate-600 italic">"Alex transformed our manual tracking into a seamless app. Highly recommended!"</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900">Certificates</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50">
                  <Award className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900">AWS Certified Developer</h4>
                    <p className="text-[11px] text-slate-500">Amazon Web Services • 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
