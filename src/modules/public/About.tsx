import React from 'react';
import { Target, Lightbulb, TrendingUp, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50/40 via-white to-blue-50/20 px-4 py-8 md:py-16">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Bridging the Gap Between <span className="text-blue-600">Academia</span> & <span className="text-emerald-600">Enterprise</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            SkillBridge was founded on a simple premise: Students need real-world experience, and local businesses (UMKM) need skilled talent to thrive in the digital economy.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/20 space-y-5 group hover:border-blue-200 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To empower the next generation of professionals by connecting university students with meaningful, impactful projects from local enterprises. We aim to accelerate UMKM digitization while building robust student portfolios.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/20 space-y-5 group hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Lightbulb className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              Creating a collaborative ecosystem where educational institutions and local businesses grow together, fostering innovation and driving sustainable economic impact across the nation.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="py-8">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-10">Why SkillBridge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-3">
              <div className="mx-auto w-14 h-14 bg-indigo-50 flex items-center justify-center rounded-2xl text-indigo-600">
                <Users className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Collaboration</h4>
              <p className="text-sm text-slate-500">Uniting theoretical knowledge with practical industry needs.</p>
            </div>
            <div className="space-y-3">
              <div className="mx-auto w-14 h-14 bg-amber-50 flex items-center justify-center rounded-2xl text-amber-600">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Growth</h4>
              <p className="text-sm text-slate-500">Accelerating business growth while advancing student careers.</p>
            </div>
            <div className="space-y-3">
              <div className="mx-auto w-14 h-14 bg-blue-50 flex items-center justify-center rounded-2xl text-blue-600">
                <Target className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Real Impact</h4>
              <p className="text-sm text-slate-500">Every project translates to tangible results for local businesses.</p>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};
