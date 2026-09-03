import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Users, GraduationCap, Store, Shield, CheckCircle, Clock, Eye, Trash2, CheckCircle2, AlertCircle, Loader2, X, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService, AdminUser } from '../../shared/services/api/adminService';

export const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'STUDENT' | 'UMKM' | 'ADMIN'>('ALL');

  const [usersList, setUsersList] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Invite Modal State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'STUDENT' | 'UMKM'>('STUDENT');
  const [inviteSent, setInviteSent] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getAllUsers();
      setUsersList(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete user "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingId(id);
      await adminService.deleteUser(id);
      setUsersList(prev => prev.filter(u => u.id !== id));
      showToast(`User "${name}" has been removed.`);
    } catch (err: any) {
      showToast(err.response?.data?.message || err.response?.data?.error || 'Failed to delete user.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleVerification = async (user: AdminUser) => {
    try {
      setTogglingId(user.id);
      const nextStatus = !user.verified;
      await adminService.toggleUserStatus(user.id, nextStatus);
      setUsersList(prev => prev.map(u => u.id === user.id ? { ...u, verified: nextStatus } : u));
      showToast(`Verification status for ${user.name} updated to ${nextStatus ? 'Verified' : 'Pending'}.`);
    } catch (err: any) {
      showToast('Failed to update verification status.', 'error');
    } finally {
      setTogglingId(null);
    }
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviteSent(true);
    setTimeout(() => {
      setShowInviteModal(false);
      setInviteSent(false);
      setInviteEmail('');
      showToast(`Invitation successfully dispatched to ${inviteEmail}.`);
    }, 1500);
  };

  const filteredUsers = usersList.filter(u => {
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesSearch = !searchTerm || u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

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

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Oversee platform members, university students, and verified business clients.</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 h-11 rounded-2xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Users</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{usersList.length}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Students</span>
            <GraduationCap className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{usersList.filter(u => u.role === 'STUDENT').length}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">UMKM Clients</span>
            <Store className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{usersList.filter(u => u.role === 'UMKM').length}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Verified Accounts</span>
            <Shield className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">{usersList.filter(u => u.verified).length}</div>
        </div>
      </div>

      {/* Search & Role Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full bg-white border border-slate-200 rounded-2xl h-11 pl-10 pr-4 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {(['ALL', 'STUDENT', 'UMKM', 'ADMIN'] as const).map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                roleFilter === role
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {role === 'ALL' ? 'All Roles' : role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-2 p-4 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-5">Member Info</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-3">Verification Toggle</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* User Rows */}
        <div className="divide-y divide-slate-100">
          {isLoading && (
            <div className="text-center py-16 text-slate-500 font-semibold space-y-2">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
              <p className="text-xs">Loading platform users...</p>
            </div>
          )}

          {!isLoading && filteredUsers.length === 0 && (
            <div className="text-center py-16 text-slate-400 font-semibold">
              No matching users found.
            </div>
          )}

          {!isLoading && filteredUsers.map((user) => (
            <div key={user.id} className="p-4 hover:bg-slate-50/70 transition-colors">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                
                {/* User Name & Avatar */}
                <div className="col-span-1 sm:col-span-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 overflow-hidden border border-blue-200">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-black">{user.name.substring(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-xs font-bold text-slate-900 truncate">{user.name}</h3>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Role Badge */}
                <div className="col-span-1 sm:col-span-2 mt-1 sm:mt-0">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    user.role === 'STUDENT'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : user.role === 'UMKM'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}>
                    {user.role}
                  </span>
                </div>

                {/* Verification Status Toggle */}
                <div className="col-span-1 sm:col-span-3 mt-1 sm:mt-0">
                  <button
                    onClick={() => handleToggleVerification(user)}
                    disabled={togglingId === user.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                      user.verified
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    {togglingId === user.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : user.verified ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                    )}
                    <span>{user.verified ? 'Verified (Click to Revoke)' : 'Pending (Click to Verify)'}</span>
                  </button>
                </div>

                {/* Actions */}
                <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-end gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => {
                      if (user.role === 'STUDENT') navigate(`/students/${user.id}`);
                      else if (user.role === 'UMKM') navigate(`/umkm/${user.id}`);
                    }}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    title="View Public Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id, user.name)}
                    disabled={deletingId === user.id}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete User"
                  >
                    {deletingId === user.id ? <Loader2 className="w-4 h-4 animate-spin text-red-600" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Invite Platform Member</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Email</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="student@university.ac.id or business@umkm.id"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Account Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
                >
                  <option value="STUDENT">Student / Talent</option>
                  <option value="UMKM">UMKM / Business Client</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inviteSent}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2"
                >
                  {inviteSent ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>{inviteSent ? 'Dispatching...' : 'Send Invitation'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
