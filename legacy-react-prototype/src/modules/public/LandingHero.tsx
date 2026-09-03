import React from 'react';
import { ArrowRight, Rocket } from 'lucide-react';
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

        </motion.div>



      </div>
    </div>
  );
};
