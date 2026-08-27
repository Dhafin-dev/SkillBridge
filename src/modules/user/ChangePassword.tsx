import React, { useState } from 'react';
import { Eye, EyeOff, Save, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../shared/services/api/userService';

export const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength calculation
  const getStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthScore = getStrength(newPassword);

  const getStrengthLabel = () => {
    if (!newPassword) return { text: 'Weak', color: 'text-slate-400', barCount: 1, barBg: 'bg-slate-200' };
    if (strengthScore <= 1) return { text: 'Weak', color: 'text-red-600', barCount: 1, barBg: 'bg-red-500' };
    if (strengthScore === 2 || strengthScore === 3) return { text: 'Medium', color: 'text-amber-600', barCount: 2, barBg: 'bg-amber-500' };
    return { text: 'Strong', color: 'text-emerald-600', barCount: 3, barBg: 'bg-emerald-500' };
  };

  const strengthInfo = getStrengthLabel();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!currentPassword) {
      setErrorMsg('Please enter your current password.');
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await userService.changePassword(currentPassword, newPassword);
      setSuccessMsg('Your password has been changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigate('/settings');
      }, 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to change password. Please check your current password.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#f8f9ff] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header navigation */}
        <button
          onClick={() => navigate('/settings')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Settings</span>
        </button>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Security Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Update your password and secure your account.</p>
        </div>

        {/* Card for Form */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8 relative overflow-hidden">
          {/* Accent glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-medium text-red-600">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-emerald-700 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}


            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl h-12 px-4 pr-12 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showCurrent ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                New Password
              </label>
              <div className="relative mb-2">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Create new password"
                  required
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl h-12 px-4 pr-12 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showNew ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>

              {/* Strength Indicator */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${strengthInfo.color}`}>
                    Strength: {strengthInfo.text}
                  </span>
                </div>
                <div className="flex gap-1.5 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full w-1/3 transition-all duration-300 ${strengthInfo.barCount >= 1 ? strengthInfo.barBg : 'bg-slate-200'}`} />
                  <div className={`h-full w-1/3 transition-all duration-300 ${strengthInfo.barCount >= 2 ? strengthInfo.barBg : 'bg-slate-200'}`} />
                  <div className={`h-full w-1/3 transition-all duration-300 ${strengthInfo.barCount >= 3 ? strengthInfo.barBg : 'bg-slate-200'}`} />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Must be at least 8 characters, include uppercase, lowercase, a number, and a symbol.
                </p>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl h-12 px-4 pr-12 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showConfirm ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/settings')}
                className="bg-transparent border border-slate-200 text-slate-700 rounded-2xl h-12 px-6 text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white rounded-2xl h-12 px-6 text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
