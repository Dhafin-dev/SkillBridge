import React, { useState } from 'react';
import { GraduationCap, Store, User, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Role } from '../../shared/types/types';
import { useAuth } from '../../shared/context/AuthContext';
import { authService } from '../../shared/services/api/authService';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }


    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.register({ name: fullName, email, password, role: selectedRole });
      login(response.token, response.user);
      
      if (response.user.role === 'umkm') navigate('/umkm/dashboard');
      else navigate('/student/dashboard');
    } catch (err: any) {
      const serverMsg = err.response?.data?.error || err.response?.data?.message || err.message;
      setError(serverMsg || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
        
        {/* Top Logo Container matching Screenshot 8 */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Create your account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xs">
            Join SkillBridge to connect academia with enterprise.
          </p>
        </div>

        {/* Role Selector Cards matching Screenshot 8 */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 block">I am a...</label>
          <div className="space-y-2.5">
            {/* Student Role Card */}
            <div
              onClick={() => setSelectedRole('student')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedRole === 'student'
                  ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-600/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl ${selectedRole === 'student' ? 'text-blue-600' : 'text-slate-400'}`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Student</h3>
                  <p className="text-xs font-medium text-slate-500">Looking for projects</p>
                </div>
              </div>
              {selectedRole === 'student' && (
                <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-50" />
              )}
            </div>

            {/* UMKM Role Card */}
            <div
              onClick={() => setSelectedRole('umkm')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedRole === 'umkm'
                  ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-600/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl ${selectedRole === 'umkm' ? 'text-blue-600' : 'text-slate-400'}`}>
                  <Store className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">UMKM</h3>
                  <p className="text-xs font-medium text-slate-500">Looking for talent</p>
                </div>
              </div>
              {selectedRole === 'umkm' && (
                <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-50" />
              )}
            </div>
          </div>
        </div>

        {/* Form Fields matching Screenshot 10 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl font-medium border border-red-100">
              {error}
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Confirm Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm shadow-lg shadow-blue-600/20 transition-all mt-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-500 font-medium">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-blue-600 hover:underline"
          >
            Log in
          </Link>
        </div>

      </div>
    </div>
  );
};
