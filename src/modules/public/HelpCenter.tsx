import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageSquare, BookOpen, ShieldCheck, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Student' | 'UMKM' | 'General' | 'Security';
}

const FAQS: FAQItem[] = [
  {
    category: 'General',
    question: 'What is SkillBridge?',
    answer: 'SkillBridge is an intelligent academic & industry collaboration platform that bridges the gap between university students seeking production-grade experience and Indonesian MSMEs (UMKM) needing digital solutions like web development, mobile apps, branding, and digital marketing.'
  },
  {
    category: 'Student',
    question: 'How do students apply for UMKM projects?',
    answer: 'Browse available opportunities on the Project Market (/market), view detailed requirements and deliverables, and click "Apply for Project". Your verified skills and portfolio score will automatically be presented to the UMKM business owner.'
  },
  {
    category: 'Student',
    question: 'How does the milestone workspace work?',
    answer: 'Once accepted, a shared project workspace is provisioned. You can check off sprint tasks, track real-time progress percentages, communicate with your UMKM client via in-app chat, and submit final deliverable links (GitHub, Figma, Live Demo).'
  },
  {
    category: 'UMKM',
    question: 'How do UMKMs post a project brief?',
    answer: 'Sign in to your UMKM account, navigate to Projects, and click "+ New Project". Fill in your objectives, required skills, deliverables, duration, and stipend. You can save as a draft or publish immediately to the marketplace.'
  },
  {
    category: 'UMKM',
    question: 'How does the AI Matchmaking Engine work?',
    answer: 'SkillBridge uses Google Gemini AI to analyze applicant skills, academic background, and portfolio scores against your project requirements, generating an instant compatibility score and actionable hiring rationale.'
  },
  {
    category: 'Security',
    question: 'How is student and UMKM data protected?',
    answer: 'All sessions are secured with JWT authentication, Bcrypt password encryption, strict Zod validation schemas, and role-based access control (RBAC). Document verifications are manually reviewed by administrators.'
  }
];

export const HelpCenter: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'General' | 'Student' | 'UMKM' | 'Security'>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = !searchQuery || faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMsg.trim()) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMsg('');
      setContactSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-28 pt-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 shadow-xs">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>SkillBridge Help & Support Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          How can we help you today?
        </h1>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          Find answers to frequently asked questions about project matching, collaborative workspaces, verification, and platform guidelines.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto pt-2">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords (e.g. workspace, apply, stipend, AI match)..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {(['All', 'General', 'Student', 'UMKM', 'Security'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 max-w-3xl mx-auto">
        <h2 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="divide-y divide-slate-100">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4 space-y-2">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pt-1 pr-6 animate-fade-in">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs font-semibold">
              No matching questions found. Feel free to contact our support team below!
            </div>
          )}
        </div>
      </div>

      {/* Contact Support Form Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-blue-600/20 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Need More Assistance?</span>
            <h3 className="text-2xl font-black tracking-tight leading-snug">
              Get in Touch with SkillBridge Support
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Have questions about university accreditation, enterprise partnerships, or encountering technical issues? Our engineering team is here to assist.
            </p>
            <div className="pt-2 text-xs font-semibold flex items-center gap-2 text-blue-200">
              <Mail className="w-4 h-4" />
              <span>support@skillbridge.id</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-lg">
            {contactSubmitted ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-black text-slate-900">Message Delivered!</h4>
                <p className="text-xs text-slate-500">Thank you for reaching out. Our support team will reply to your email within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Ahmad Dhafin"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="dhafin@example.com"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="How can we assist you?"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
