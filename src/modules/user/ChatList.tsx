import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, ChevronRight } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../../shared/components/ui/EmptyState';
import { chatService, ConversationItem } from '../../shared/services/api/chatService';
import { projectService } from '../../shared/services/api/projectService';
import { useAuth } from '../../shared/context/AuthContext';

export const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const loadConversations = async () => {
      try {
        const convs = await chatService.getConversations();
        if (convs && convs.length > 0) {
          setConversations(convs);
        } else {
          // Fallback to project channels if no direct messages yet
          if (currentUser?.role === 'umkm') {
            const umkmProjects = await projectService.getMyProjectsUMKM();
            setConversations(
              umkmProjects.map(p => ({
                id: p.id,
                title: p.title,
                subtitle: `${p.applicantsCount} Applicants • ${p.status}`,
                status: p.status,
                role: 'umkm'
              }))
            );
          } else {
            const studentProjects = await projectService.getMyProjectsStudent();
            setConversations(
              studentProjects.map(p => ({
                id: p.id,
                title: p.title,
                subtitle: p.companyName,
                status: p.status,
                role: 'student'
              }))
            );
          }
        }
      } catch (err) {
        console.error('Failed to load chat channels', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, [currentUser]);


  const filteredConversations = conversations.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] text-slate-900 pb-24 max-w-3xl mx-auto">
      {/* Top Header */}
      <div className="px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Messages</h1>
      </div>

      <main className="px-4 py-2 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversations by project or company..."
            className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 shadow-xs"
          />
        </div>

        {/* Conversations List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="p-8 text-center text-slate-400 font-semibold text-xs">
              Loading conversations...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
              <EmptyState
                icon={<MessageSquare className="w-6 h-6" />}
                title="No Active Conversations"
                description={currentUser?.role === 'umkm' ? "Publish a project or review applicants to start messaging." : "Apply to projects to connect with UMKM partners."}
              />
            </div>
          ) : (
            filteredConversations.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/messages/${item.id}`)}
                className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-sm flex items-center justify-center border border-blue-100 shadow-2xs overflow-hidden">
                      {item.avatar ? (
                        <img src={item.avatar} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <span>{item.title ? item.title.substring(0, 2).toUpperCase() : 'SB'}</span>
                      )}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5 truncate max-w-xs sm:max-w-md">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    item.status === 'Active' || item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
                </div>
              </div>
            ))

          )}
        </div>
      </main>
    </div>
  );
};
