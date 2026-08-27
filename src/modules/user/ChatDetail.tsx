import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Paperclip,
  Send,
  CheckCheck,
  MessageSquare,
  AlertCircle,
  RefreshCw,
  Briefcase,
  Sparkles,
  Smile,
  ShieldCheck,
  Info
} from 'lucide-react';

import { EmptyState } from '../../shared/components/ui/EmptyState';
import { chatService, ChatContextData } from '../../shared/services/api/chatService';
import { useAuth } from '../../shared/context/AuthContext';

export const ChatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [chatData, setChatData] = useState<ChatContextData | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChat = async (manual = false) => {
    if (!id) return;
    try {
      setError(null);
      if (manual) setIsRefreshing(true);
      const data = await chatService.getChatContext(id);
      setChatData(data);
      setMessages(data.messages || []);
    } catch (err: any) {
      console.error('Failed to load chat context', err);
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to load conversation');
    } finally {
      setIsLoading(false);
      if (manual) {
        setTimeout(() => setIsRefreshing(false), 600);
      }
    }
  };


  useEffect(() => {
    loadChat();

    // Auto-polling for new incoming messages every 3 seconds
    const interval = setInterval(() => {
      if (id) {
        chatService.getChatContext(id).then(data => {
          if (data && data.messages) {
            setMessages(data.messages);
            setChatData(data);
          }
        }).catch(() => {});
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const handleSend = async () => {
    if (!input.trim() || !id || isSending) return;
    const textToSend = input.trim();
    setInput('');
    setIsSending(true);

    // Optimistic UI update
    const tempId = 'temp-' + Date.now();
    const optimisticMessage = {
      id: tempId,
      sender: currentUser?.name || 'me',
      senderId: currentUser?.id,
      senderAvatar: currentUser?.avatar || '',
      isMe: true,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMessage]);

    try {
      await chatService.sendMessage(id, textToSend);
      const updated = await chatService.getChatContext(id);
      setChatData(updated);
      setMessages(updated.messages || []);
    } catch (err: any) {
      console.error('Failed to send message', err);
      setMessages(prev => prev.filter(m => m.id !== tempId));
      alert(err.response?.data?.error || 'Failed to deliver message.');
    } finally {
      setIsSending(false);
    }
  };

  const partnerName = chatData?.partner?.name || 'Workspace Member';
  const partnerRole = chatData?.partner?.role === 'umkm' ? 'UMKM Business Partner' : 'Student Talent';
  const projectTitle = chatData?.project?.title || 'SkillBridge Workspace Collaboration';

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#f8f9ff] py-3 px-2 sm:px-4 lg:px-6 flex flex-col justify-center">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col h-[calc(100vh-100px)] overflow-hidden">
        
        {/* Top Chat Header */}
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-3.5 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Partner Profile Badge */}
            <div
              onClick={() => chatData?.partner?.id && navigate(chatData.partner.role === 'student' ? `/candidates/${chatData.partner.id}` : `/umkm/${chatData.partner.id}`)}
              className="flex items-center gap-3 cursor-pointer group min-w-0"
            >
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-sm flex items-center justify-center border border-blue-200 overflow-hidden shadow-xs">
                  {chatData?.partner?.avatar ? (
                    <img src={chatData.partner.avatar} alt={partnerName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{partnerName.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
                {/* Active Indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    {partnerName}
                  </h1>
                  <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-blue-600 truncate">{partnerRole}</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => loadChat(true)}
              disabled={isRefreshing}
              title="Refresh conversation"
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 transition-transform duration-500 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>
        </header>



        {/* Project Association Sub-Bar */}
        <div className="bg-slate-50/80 border-b border-slate-100 px-6 py-2 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-600 font-medium truncate">
            <Briefcase className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="text-slate-400">Project:</span>
            <span className="font-semibold text-slate-800 truncate">{projectTitle}</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-blue-100/80 text-blue-700 text-[10px] font-bold shrink-0">
            Workspace Chat
          </span>
        </div>

        {/* Main Chat Stream */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-slate-50/40 via-white to-slate-50/20">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl text-xs font-semibold flex items-center gap-2 border border-red-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Session Timeline Divider */}
          <div className="flex items-center justify-center my-3">
            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              Today • SkillBridge Verified Channel
            </span>
          </div>

          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center space-y-3 text-slate-400">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-xs font-semibold">Loading conversation...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <EmptyState
                icon={<MessageSquare className="w-8 h-8 text-blue-500" />}
                title="No messages yet"
                description={`Send a greeting to start collaborating with ${partnerName}.`}
              />
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.isMe || msg.sender === 'me' || msg.senderId === currentUser?.id;
              const formattedTime = msg.time || (msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now');

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Incoming Avatar */}
                  {!isMe && (
                    <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0 border border-blue-200 overflow-hidden shadow-2xs mb-1">
                      {chatData?.partner?.avatar ? (
                        <img src={chatData.partner.avatar} alt={partnerName} className="w-full h-full object-cover" />
                      ) : (
                        <span>{partnerName.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                  )}

                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[80%] sm:max-w-[70%]`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isMe
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-xs shadow-blue-500/10'
                          : 'bg-white text-slate-900 border border-slate-200/90 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>

                    <div className={`flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <span>{formattedTime}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </main>

        {/* Composer Footer Bar */}
        <footer className="bg-white border-t border-slate-100 p-3 sm:p-4 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-2xs"
          >
            <button
              type="button"
              onClick={() => alert('Deliverable and file attachments supported for active projects.')}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shrink-0"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${partnerName}...`}
              disabled={isLoading || isSending}
              className="flex-1 bg-transparent px-2 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className="w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center shrink-0 shadow-xs hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </footer>

      </div>
    </div>
  );
};

