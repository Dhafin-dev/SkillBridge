import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../shared/services/api/authService';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setErrorMsg('');
    setIsSubmitting(true);
    try {
      const res = await authService.forgotPassword(email.trim());
      setSubmitted(true);
      if (res.resetToken) {
        setResetToken(res.resetToken);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to request password reset.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-md mx-auto">
        {/* Back Button Header */}
        <div className="mb-4 flex items-center justify-start">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-xs border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            aria-label="Back to Login"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-slate-200/80">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
              <Lock className="w-8 h-8" />
            </div>
          </div>

          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password?</h1>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter your email address and we'll send you a secure link to reset your password.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs font-medium text-red-600 mb-4">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative rounded-2xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs text-slate-900 font-medium transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-sm bg-blue-600 text-white hover:bg-blue-700 font-semibold text-xs transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4 py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Reset Link Sent!</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                We've sent a password reset email to <span className="font-bold text-slate-800">{email}</span>. Please check your inbox.
              </p>

              {resetToken && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-800 text-left space-y-2">
                  <p className="font-semibold">Development Mode Token:</p>
                  <code className="block bg-white p-2 rounded-xl border border-blue-100 font-mono text-[11px] break-all">
                    {resetToken}
                  </code>
                  <Link
                    to={`/reset-password?token=${resetToken}`}
                    className="inline-block font-semibold text-blue-600 underline hover:text-blue-800"
                  >
                    Click here to reset password directly &rarr;
                  </Link>
                </div>
              )}

              <Link
                to="/login"
                className="block text-center w-full mt-4 py-3 px-4 rounded-2xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors"
              >
                Return to Login
              </Link>
            </div>
          )}


          {/* Footer Link */}
          <div className="mt-6 text-center border-t border-slate-100 pt-4">
            <Link
              to="/login"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
