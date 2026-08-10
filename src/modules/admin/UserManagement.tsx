import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Users, GraduationCap, Store, Shield, CheckCircle, Clock, Eye, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService, AdminUser } from '../../shared/services/api/adminService';

export const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [usersList, setUsersList] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getAllUsers().then(data => {
      setUsersList(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Oversee and manage platform users, roles, and verification status.</p>
        </div>
        <button
          onClick={() => {
            const name = prompt('Enter new user full name:');
            if (name) alert(`User ${name} invited.`);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 h-10 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">Total Users</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{usersList.length}</div>
          <p className="text-[11px] font-bold text-emerald-600 mt-1">+12% this month</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">Students</span>
            <GraduationCap className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{usersList.filter(u => u.role === 'STUDENT').length}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">UMKM</span>
            <Store className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{usersList.filter(u => u.role === 'UMKM').length}</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold">Admins</span>
            <Shield className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{usersList.filter(u => u.role === 'ADMIN').length}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users by name, email, or role..."
            className="w-full bg-white border border-slate-200 rounded-2xl h-11 pl-9 pr-4 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
          />
        </div>
        <button className="bg-white border border-slate-200 rounded-2xl h-11 px-4 flex items-center justify-center font-semibold text-xs text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4 mr-1.5" />
          <span>Filter</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-2 p-4 bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-5">User</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Verification</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* User Rows */}
        <div className="divide-y divide-slate-100">
          {isLoading && <div className="text-center py-10 text-slate-500 font-semibold text-sm">Loading users...</div>}
          {!isLoading && usersList.map((user) => (
            <div key={user.id} className="p-4 hover:bg-slate-50/60 transition-colors">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <div className="col-span-1 sm:col-span-5 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h3 className="text-xs font-bold text-slate-900 truncate">{user.name}</h3>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2 mt-1 sm:mt-0">
                  <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                    {user.role}
                  </span>
                </div>

                <div className="col-span-1 sm:col-span-2 mt-1 sm:mt-0">
                  {user.verified ? (
                    <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Verified
                    </span>
                  ) : (
                    <span className="text-amber-600 text-xs font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Pending
                    </span>
                  )}
                </div>

                <div className="col-span-1 sm:col-span-2 mt-1 sm:mt-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-slate-800">{user.status}</span>
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-1 flex justify-end gap-1 mt-2 sm:mt-0">
                  <button
                    onClick={() => {
                      if (user.role === 'STUDENT') navigate(`/students/${user.id}`);
                      else if (user.role === 'UMKM') navigate(`/umkm/${user.id}`);
                    }}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Showing 1 to {usersList.length} of {usersList.length} users</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">1</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">2</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
