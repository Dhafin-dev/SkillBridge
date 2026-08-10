import React from 'react';
import { ArrowLeft, CheckCircle2, Star, Briefcase, MessageSquare, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PublicBusinessProfile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Market</span>
        </button>
        <span className="font-extrabold text-blue-600 text-base">SkillBridge</span>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Business Hero */}
        <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&auto=format&fit=crop&q=80"
              alt="Kopi Senja Artisan"
              className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">Kopi Senja Artisan</h1>
                <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-600/20" />
              </div>
              <div className="flex items-center gap-3 mt-1 mb-2">
                <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-0.5 rounded-full">
                  Food & Beverage
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>4.8 (124 reviews)</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                Crafting sustainable, locally-sourced coffee experiences while empowering local farmers. We blend traditional roasting techniques with modern cafe aesthetics.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={() => navigate('/projects/1')}
              className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Briefcase className="w-4 h-4" />
              <span>Apply to Project</span>
            </button>
            <button
              onClick={() => navigate('/messages/1')}
              className="h-10 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Chat</span>
            </button>
          </div>
        </section>

        {/* Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col items-center text-center justify-center">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Digital Readiness</h3>
            <div className="w-24 h-24 rounded-full border-8 border-blue-600 flex items-center justify-center mb-2">
              <span className="text-3xl font-black text-blue-600">82</span>
            </div>
            <p className="text-xs text-slate-500">High potential for e-commerce integration and digital marketing expansion.</p>
          </div>

          <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Featured Products</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80"
                alt="Product"
                className="w-full h-24 object-cover rounded-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format&fit=crop&q=80"
                alt="Product"
                className="w-full h-24 object-cover rounded-xl"
              />
              <div className="w-full h-24 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-xs text-blue-600 cursor-pointer hover:bg-slate-200 transition-colors">
                +12 More
              </div>
            </div>
          </div>
        </div>

        {/* Open Opportunities */}
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <span>Active Project Openings</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => navigate('/projects/1')}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Social Media Campaign Strategy</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Marketing • 4 Weeks</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  In Progress
                </span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">
                Looking for marketing students to design and execute a one-month Instagram campaign targeting Gen-Z coffee enthusiasts.
              </p>
              <div className="text-xs font-bold text-blue-600 flex items-center gap-1 pt-2">
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
