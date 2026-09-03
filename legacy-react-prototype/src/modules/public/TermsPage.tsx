import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-28 pt-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Privacy Policy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Terms of Service & Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Last Updated: August 2026 • Effective for all SkillBridge users and partners.
        </p>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>1. Acceptance of Terms</span>
          </h2>
          <p>
            By accessing or registering an account on SkillBridge ("the Platform"), you agree to abide by these Terms of Service. If you are a university student, you confirm that your submitted academic credentials and portfolio links are accurate. If you represent an enterprise (UMKM), you confirm your legal capacity to publish project briefs and engage collaborators.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>2. Data Privacy & Confidentiality</span>
          </h2>
          <p>
            We take your privacy seriously. Personal information (passwords, email addresses, student IDs) is encrypted using industry-standard hashing and JWT encryption. Project briefs and deliverable links shared within active workspaces are confidential between the assigned student and the project owner.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span>3. Deliverables & Intellectual Property</span>
          </h2>
          <p>
            Upon successful project completion, deliverable approval, and disbursement of agreed stipends, the intellectual property rights to the final deliverables transfer to the UMKM client, while the student retains the right to display the completed work as a verified case study in their SkillBridge portfolio.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>4. Community Code of Conduct</span>
          </h2>
          <p>
            SkillBridge maintains a strict zero-tolerance policy against fraudulent portfolio submissions, plagiarism, harassment, and non-delivery of agreed project milestones. Accounts found violating community guidelines may be suspended by platform administrators.
          </p>
        </section>

        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>Questions regarding our terms?</span>
          <button
            onClick={() => navigate('/help')}
            className="text-blue-600 hover:underline font-bold"
          >
            Contact Support & FAQ
          </button>
        </div>

      </div>

    </div>
  );
};
