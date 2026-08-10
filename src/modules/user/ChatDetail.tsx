import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, Paperclip, Send, CheckCheck, FileText, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { EmptyState } from '../../shared/components/ui/EmptyState';

export const ChatDetail: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: 'm' + Date.now(),
        sender: 'me',
        text: input,
        time: 'Just now',
        type: 'text'
      }
    ]);
    setInput('');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f9ff] text-slate-900 flex flex-col justify-between max-w-3xl mx-auto">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/messages')}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Alex Rivers"
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div>
              <h1 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Alex Rivers</h1>
              <p className="text-[10px] text-slate-500">E-Commerce App Redesign</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => alert('Starting voice call...')}
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert('Starting video call...')}
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages Stream */}
      <main className="flex-1 p-4 pb-20 space-y-4 overflow-y-auto">
        <div className="flex justify-center my-2">
          <span className="bg-slate-200/60 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full">
            Today, 9:41 AM
          </span>
        </div>

        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <EmptyState 
              icon={<MessageSquare className="w-6 h-6" />}
              title="No messages yet"
              description="Send a message to start the conversation."
            />
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
            >
              {msg.type === 'text' && (
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    msg.sender === 'me'
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-white text-slate-900 border border-slate-200/80 rounded-tl-xs'
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {msg.type === 'file' && (
                <div className="max-w-[240px] bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-900 truncate">{msg.fileName}</p>
                    <p className="text-[10px] text-slate-500">{msg.fileSize} • PDF</p>
                  </div>
                </div>
              )}

              <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                {msg.time}
                {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-blue-600" />}
              </span>
            </div>
          ))
        )}
      </main>

      {/* Composer Input Bar - positioned above BottomNav */}
      <footer className="fixed bottom-[56px] left-0 right-0 z-30 bg-white border-t border-slate-200/80 p-3 flex items-center gap-2 max-w-3xl mx-auto">
        <button
          onClick={() => alert('Attach file selected')}
          className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Message Alex..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl h-10 px-4 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
        />
        <button
          onClick={handleSend}
          className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
