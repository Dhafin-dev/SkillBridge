import React from 'react';
import { Sparkles, Target, Users, ShieldCheck, Award, ArrowRight, Building2, GraduationCap, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-28 pt-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Empowering Indonesia's Next Generation of Tech Talent</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Bridging University Theory with Real-World Industry Execution
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
          SkillBridge is engineered to democratize access to high-impact software engineering, UI/UX design, and digital marketing opportunities for Indonesian students while providing MSMEs with affordable, verified technical talent.
        </p>
      </div>

      {/* Mission & Vision Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To eliminate fragmented student project discovery and create transparent, verifiable milestone-driven partnerships between universities and small enterprises through modern AI matchmaking and collaborative workspaces.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To become Indonesia’s premier academic-industry talent ecosystem, powering thousands of micro-internships and capstone projects that launch students directly into high-growth engineering careers.
          </p>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">The SkillBridge Advantage</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Built with production-grade engineering principles to ensure trust and speed.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900">Verified Portfolios</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every completed collaboration is recorded with 2-way reviews, student portfolio score gains, and verifiable deliverables.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900">UMKM Digitization</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Local Indonesian businesses get access to high-quality websites, apps, and digital branding with milestone governance.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900">Transparent Milestones</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sprint checklists, progress tracking, and deliverables submission ensure projects are delivered on time with zero ambiguity.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-black">Ready to Start Collaborating?</h2>
        <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
          Join thousands of university talents and business leaders transforming the Indonesian digital landscape today.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 bg-white hover:bg-blue-50 text-blue-700 rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition-all"
          >
            Create Free Account
          </button>
          <button
            onClick={() => navigate('/market')}
            className="px-6 py-3 bg-blue-600/60 hover:bg-blue-600 text-white border border-white/20 rounded-2xl text-xs sm:text-sm font-bold transition-all"
          >
            Explore Projects
          </button>
        </div>
      </div>

    </div>
  );
};
