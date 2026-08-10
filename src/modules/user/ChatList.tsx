import React, { useState } from 'react';
import { Search, Pin, MessageSquare, Plus, Store, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../../shared/components/ui/EmptyState';

export const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Projects' | 'UMKM' | 'Students'>('All');

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] text-slate-900 pb-24 max-w-3xl mx-auto">
      {/* Top Header */}
      <div className="px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Messages</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/profile')}
            className="w-8 h-8 rounded-full overflow-hidden border border-slate-200"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      <main className="px-4 py-4 space-y-5">
        {/* Search & Tabs */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by project or user..."
              className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 shadow-xs"
            />
          </div>

          <div className="flex overflow-x-auto gap-2 pb-1 text-xs font-semibold">
            {(['All', 'Projects', 'UMKM', 'Students'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* All Conversations */}
        <div className="space-y-2 mt-4 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
          <EmptyState 
            icon={<MessageSquare className="w-6 h-6" />}
            title="No Messages"
            description="You don't have any active conversations yet. Reach out to someone to start chatting!"
          />
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/messages/new')}
        className="fixed bottom-20 right-4 w-12 h-12 bg-blue-600 text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all z-40"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
