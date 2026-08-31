import React, { useState, useEffect } from 'react';
import { School, Store, CheckCircle, XCircle, ZoomIn, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { adminService, VerificationRequest } from '../../shared/services/api/adminService';

export const VerificationCenter: React.FC = () => {
  const [activeTab, setActiveFilter] = useState<'student' | 'umkm'>('student');
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Reject Modal State
  const [rejectingRequest, setRejectingRequest] = useState<VerificationRequest | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  // Document Zoom Modal State
  const [zoomScanUrl, setZoomScanUrl] = useState<string | null>(null);

  const fetchVerifications = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getVerifications();
      setRequests(data);
    } catch (err) {
      console.error('Failed to load verifications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = async (id: string, name: string) => {
    try {
      setActionLoadingId(id);
      await adminService.approveVerification(id);
      setRequests(prev => prev.filter(s => s.id !== id));
      showToast(`Verification for ${name} approved successfully!`);
    } catch (err) {
      showToast('Failed to approve verification.', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleOpenRejectModal = (request: VerificationRequest) => {
    setRejectingRequest(request);
    setRejectReason('Uploaded verification document is blurry or does not match profile details.');
  };

  const handleConfirmReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingRequest) return;

    try {
      setIsRejecting(true);
      await adminService.rejectVerification(rejectingRequest.id, rejectReason.trim());
      setRequests(prev => prev.filter(s => s.id !== rejectingRequest.id));
      showToast(`Verification for ${rejectingRequest.name} rejected and user notified.`);
      setRejectingRequest(null);
    } catch (err) {
      showToast('Failed to reject verification.', 'error');
    } finally {
      setIsRejecting(false);
    }
  };

  const filteredRequests = requests.filter(s => s.role === activeTab);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`p-4 rounded-2xl text-xs font-bold shadow-md flex items-center gap-2 animate-fade-in ${
          toastMessage.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toastMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Verification Center</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Review student identification cards and enterprise business licenses.</p>
        </div>

        <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-xs text-xs font-bold">
          <button
            onClick={() => setActiveFilter('student')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'student' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <School className="w-4 h-4" />
            <span>Student IDs ({requests.filter(r => r.role === 'student').length})</span>
          </button>
          <button
            onClick={() => setActiveFilter('umkm')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'umkm' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>UMKM Licenses ({requests.filter(r => r.role === 'umkm').length})</span>
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          <div className="text-center py-16 text-slate-500 font-semibold col-span-full space-y-2">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
            <p className="text-xs">Loading verifications...</p>
          </div>
        )}

        {!isLoading && filteredRequests.length === 0 && (
          <div className="text-center py-16 text-slate-400 font-semibold col-span-full bg-white rounded-3xl border border-slate-200">
            No pending verification requests in this queue.
          </div>
        )}

        {!isLoading && filteredRequests.map((st) => (
          <div key={st.id} className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
                <img src={st.photo} alt={st.name} className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-slate-100" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{st.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{st.institution}</p>
                </div>
                <span className="ml-auto bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
                  New Request
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Document Type</span>
                  <span className="font-semibold text-slate-800">{st.docType}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Submitted Date</span>
                  <span className="font-semibold text-slate-800">{st.date}</span>
                </div>
              </div>

              {/* Document Preview Box */}
              <div
                onClick={() => setZoomScanUrl(st.docScan)}
                className="w-full h-40 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative group cursor-pointer"
              >
                <img src={st.docScan} alt="Document Scan" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <ZoomIn className="w-6 h-6 text-white" />
                  <span className="text-xs font-bold text-white ml-1.5">Click to Preview</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleApprove(st.id, st.name)}
                disabled={actionLoadingId === st.id}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-11 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                {actionLoadingId === st.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleOpenRejectModal(st)}
                className="flex-1 bg-white border border-slate-200 text-red-600 hover:bg-red-50 font-bold text-xs h-11 rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reject Modal Dialog */}
      {rejectingRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Reject Verification Request</h3>
              <button
                onClick={() => setRejectingRequest(null)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmReject} className="space-y-4">
              <p className="text-xs text-slate-600">
                Provide a helpful reason so <strong>{rejectingRequest.name}</strong> can fix and re-submit their verification document.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Feedback Reason</label>
                <textarea
                  rows={4}
                  required
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingRequest(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRejecting}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-600/20 transition flex items-center justify-center gap-2"
                >
                  {isRejecting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Confirm Rejection</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Zoom Modal */}
      {zoomScanUrl && (
        <div
          onClick={() => setZoomScanUrl(null)}
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="max-w-2xl w-full bg-white rounded-3xl p-4 overflow-hidden space-y-3">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-bold text-slate-700">Document Scan Fullview</span>
              <button onClick={() => setZoomScanUrl(null)} className="p-1 text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={zoomScanUrl} alt="Zoomed Scan" className="w-full h-auto max-h-[75vh] object-contain rounded-2xl" />
          </div>
        </div>
      )}

    </div>
  );
};
