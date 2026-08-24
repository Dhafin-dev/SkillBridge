import React, { useState, useEffect } from 'react';
import { School, Store, CheckCircle, XCircle, RotateCcw, ZoomIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService, VerificationRequest } from '../../shared/services/api/adminService';

export const VerificationCenter: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveFilter] = useState<'student' | 'umkm'>('student');
  const [students, setStudents] = useState<VerificationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getVerifications().then(data => {
      setStudents(data);
      setIsLoading(false);
    });
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await adminService.approveVerification(id);
      setStudents(prev => prev.filter(s => s.id !== id));
      alert('Verification approved successfully!');
    } catch (err) {
      alert('Failed to approve verification.');
    }
  };

  const handleReject = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    alert('Verification rejected.');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Verification Center</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Review and approve incoming registration documents.</p>
        </div>

        <div className="inline-flex bg-slate-100 p-1 rounded-2xl border border-slate-200/60 shadow-xs text-xs font-semibold">
          <button
            onClick={() => setActiveFilter('student')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'student' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
              }`}
          >
            <School className="w-4 h-4" />
            <span>Student Verification</span>
          </button>
          <button
            onClick={() => setActiveFilter('umkm')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${activeTab === 'umkm' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
              }`}
          >
            <Store className="w-4 h-4" />
            <span>UMKM Verification</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && <div className="text-center py-10 text-slate-500 font-semibold col-span-full">Loading verifications...</div>}
        {!isLoading && students.filter(s => s.role === activeTab).length === 0 && (
          <div className="text-center py-10 text-slate-500 font-semibold col-span-full">No pending verifications.</div>
        )}
        {!isLoading && students.filter(s => s.role === activeTab).map((st) => (
          <div key={st.id} className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
                <img src={st.photo} alt={st.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{st.name}</h3>
                  <p className="text-xs text-slate-500">{st.institution}</p>
                </div>
                <span className="ml-auto bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">New</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Document Type</span>
                  <span className="font-semibold text-slate-800">{st.docType}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Submission Date</span>
                  <span className="font-semibold text-slate-800">{st.date}</span>
                </div>
              </div>

              <div className="w-full h-40 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group cursor-pointer mb-4">
                <img src={st.docScan} alt="Document Scan" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleApprove(st.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-10 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleReject(st.id)}
                className="flex-1 bg-white border border-slate-200 text-red-600 hover:bg-red-50 font-semibold text-xs h-10 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
