import React, { useState, useEffect } from 'react';
import { X, Send, User, Check, Image, Paperclip } from 'lucide-react';
import { ChatMessage, UserProfile } from '../../types/types';
import { chatService } from '../../services/api/chatService';

interface ChatModalProps {
  projectTitle: string;
  partnerName: string;
  partnerAvatar: string;
  currentUser: UserProfile;
  projectId?: string;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  projectTitle,
  partnerName,
  partnerAvatar,
  currentUser,
  projectId = 'act-1',
  onClose
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    try {
      chatService.getChatMessages(projectId).then(history => {
        setMessages(history);
      });
    } catch (e) {
      console.error(e);
    }
  }, [projectId]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: currentUser.name,
      senderAvatar: currentUser.avatar,
      isMe: true,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    const sentText = inputText;
    setInputText('');

    // Simulate instant friendly reply from partner after 1 second
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: 'reply-' + Date.now(),
        sender: partnerName,
        senderAvatar: partnerAvatar,
        isMe: false,
        text: `Got your message regarding "${sentText.slice(0, 30)}..."! Thanks for keeping us updated.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-xl h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
        
        {/* Chat Header matching Screenshot 4 & 5 */}
        <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <img
              src={partnerAvatar}
              alt={partnerName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
            />
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                {partnerName}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-[200px]">
                {projectTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <img
                src={msg.senderAvatar}
                alt={msg.sender}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div className={`max-w-[80%] space-y-1 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed font-medium shadow-xs ${
                    msg.isMe
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 font-semibold px-1 block">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Footer */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white transition-all shadow-md shadow-blue-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
