import React from 'react';
import { ArrowRight, TrendingUp, Rocket, ShieldCheck, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const LandingHero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50/40 via-white to-blue-50/20 px-4 py-8 md:py-16 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-6 shadow-xs border border-blue-200/50 animate-bounce-subtle"
        >
          <Rocket className="w-4 h-4 text-blue-600" />
          <span>Empowering Future Leaders</span>
        </motion.div>

        {/* Hero Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6"
        >
          Bridge Your Skills, <br className="hidden sm:inline" />
          <span className="text-blue-600 bg-clip-text">Empower Local Businesses</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-8"
        >
          A collaborative platform where academic rigor meets entrepreneurial agility. Students gain real-world portfolio experience, while UMKM secure high-tier professional services to grow.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-10"
        >
          <button
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/market')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-sm transition-all hover:border-slate-300"
          >
            <span>Explore Projects</span>
          </button>
        </motion.div>

        {/* Active Collaborators Avatar Row */}
        <div className="flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full border border-slate-200/80 shadow-xs mb-12">
          <div className="flex -space-x-2.5 overflow-hidden">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Avatar" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Avatar" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" alt="Avatar" />
          </div>
          <div className="text-left text-xs">
            <p className="font-bold text-slate-900">Join 5,000+ Collaborators</p>
            <p className="text-slate-500 font-medium">Active across 12 cities</p>
          </div>
        </div>

        {/* Hero Card Visual Container matching Screenshot 7 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-teal-500/5"></div>
          
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80"
            alt="Students collaborating with UMKM business"
            className="w-full h-56 sm:h-72 object-cover rounded-2xl shadow-inner group-hover:scale-[1.01] transition-transform duration-500"
          />

          {/* Floating Metric Badge - Now using glass class */}
          <div className="absolute bottom-6 left-6 glass p-3.5 rounded-2xl shadow-xl flex items-center gap-3.5 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Project Success Rate</span>
              <span className="text-2xl font-black text-slate-900 leading-none">98.5%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding Notice */}
      <footer className="mt-12 text-center text-xs text-slate-400 font-medium">
        <p>© 2024 SkillBridge. Bridging Academia & Enterprise.</p>
      </footer>
    </div>
  );
};
