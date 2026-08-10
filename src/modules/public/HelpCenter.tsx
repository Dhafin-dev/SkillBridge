import React, { useState } from 'react';
import { Search, HelpCircle, BookOpen, Headphones, AlertTriangle, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HelpCenter: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const faqs = [
    { q: 'How do students apply for UMKM projects?', a: 'Students browse open projects in the Market, select a project, and submit a brief proposal pitch along with their portfolio link.' },
    { q: 'How are stipends or certificates disbursed?', a: 'Upon project completion verification by the UMKM client, funds and verified digital credentials are issued automatically.' },
    { q: 'Can UMKMs invite specific students?', a: 'Yes! UMKMs can use the "Find Students" tab to view top-matched student candidates and send direct project invitations.' },
    { q: 'What happens if a project deadline is missed?', a: 'Workspace milestone alerts notify both parties, and our academic support team can assist in extending project timelines if necessary.' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-20 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top back navigation */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Hero Section & Search */}
      <div className="relative rounded-3xl overflow-hidden mb-12 p-8 sm:p-12 min-h-[280px] flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg">
        {/* Decorative background light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How can we help you today?</h1>
          <p className="text-sm sm:text-base text-blue-100/90 max-w-xl mx-auto font-normal">
            Search our knowledge base or browse categories below to find instant answers to your questions.
          </p>
          <div className="relative mt-6 w-full max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, guides, or topics..."
              className="w-full pl-12 pr-4 py-3.5 bg-white text-slate-900 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-400/30 shadow-md transition-shadow"
            />
          </div>
        </div>
      </div>

      {/* Category Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* FAQ Category */}
        <div
          onClick={() => setActiveCategory('faq')}
          className="cursor-pointer group rounded-2xl p-6 transition-all duration-300 flex flex-col h-full border border-slate-200/80 shadow-xs bg-white hover:shadow-md hover:border-blue-200"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">FAQ</h3>
          <p className="text-xs text-slate-500 leading-relaxed flex-grow">
            Find quick answers to the most commonly asked questions about student applications, client requests, and workspace collaboration.
          </p>
          <div className="mt-4 flex items-center text-blue-600 text-xs font-bold group-hover:translate-x-1 transition-transform">
            <span>View Articles</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Documentation Category (Spans 2 cols on lg) */}
        <div
          onClick={() => setActiveCategory('docs')}
          className="cursor-pointer group rounded-2xl p-6 transition-all duration-300 flex flex-col h-full border border-slate-200/80 shadow-xs bg-white hover:shadow-md hover:border-blue-200 lg:col-span-2"
        >
          <div className="flex items-start gap-5 h-full">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Documentation</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-grow">
                In-depth guides, API references, and step-by-step tutorials for mastering the SkillBridge platform. Ideal for complex multi-student project setups and enterprise workflows.
              </p>
              <div className="mt-auto flex items-center text-indigo-600 text-xs font-bold group-hover:translate-x-1 transition-transform">
                <span>Browse Docs</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div
          onClick={() => setActiveCategory('support')}
          className="cursor-pointer group rounded-2xl p-6 transition-all duration-300 flex flex-col h-full border border-slate-200/80 shadow-xs bg-white hover:shadow-md hover:border-blue-200"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Headphones className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Contact Support</h3>
          <p className="text-xs text-slate-500 leading-relaxed flex-grow">
            Need personalized assistance? Reach out to our dedicated academic & enterprise support team for direct guidance.
          </p>
          <div className="mt-4 flex items-center text-emerald-600 text-xs font-bold group-hover:translate-x-1 transition-transform">
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Report Problem */}
        <div
          onClick={() => setActiveCategory('report')}
          className="cursor-pointer group rounded-2xl p-6 transition-all duration-300 flex flex-col h-full border border-slate-200/80 shadow-xs bg-white hover:shadow-md hover:border-red-200"
        >
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Report a Problem</h3>
          <p className="text-xs text-slate-500 leading-relaxed flex-grow">
            Found a bug or experiencing technical issues with milestone submissions? Let us know so we can resolve it promptly.
          </p>
          <div className="mt-4 flex items-center text-red-600 text-xs font-bold group-hover:translate-x-1 transition-transform">
            <span>Report Issue</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Feedback Category */}
        <div
          onClick={() => setActiveCategory('feedback')}
          className="cursor-pointer group rounded-2xl p-6 transition-all duration-300 flex flex-col h-full border border-slate-200/80 shadow-xs bg-white hover:shadow-md hover:border-amber-200"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Feedback</h3>
          <p className="text-xs text-slate-500 leading-relaxed flex-grow">
            Have a suggestion or idea to improve the SkillBridge platform? We value your input to bridge education and commerce.
          </p>
          <div className="mt-4 flex items-center text-amber-600 text-xs font-bold group-hover:translate-x-1 transition-transform">
            <span>Share Ideas</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 mb-1">{faq.q}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
