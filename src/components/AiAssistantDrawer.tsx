import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, RefreshCw, MessageSquare, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileData, ChatMessage } from '../types';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  darkMode: boolean;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  darkMode,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `你好！我是 ${profile.name} 的 AI 履歷問答助理 🤖✨\n您可以向我打聽任何關於哲遠的專案經驗、技術特長、團隊協作方式或求職合作細節。請問今天想了解些什麼呢？`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    `請介紹 ${profile.name} 的核心優勢`,
    '推薦最出色的 AI / LLM 作品集專案',
    '他在過去工作中有哪些具體亮點？',
    '如何與他取得聯繫或安排面試？',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          profileContext: profile,
          history: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'AI 服務發生錯誤');
      }

      const aiReplyMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReplyMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'err-' + Date.now(),
        sender: 'ai',
        text: `⚠️ 抱歉，AI 助理目前連線稍有延遲（${err.message || '請確認 API Key 設定'}）。您可以直接發送 Email 給哲遠：${profile.email}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'ai',
        text: `對話紀錄已重置。我是 ${profile.name} 的 AI 履歷助理，請問您有什麼想知道的呢？`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`w-full max-w-md h-full flex flex-col shadow-2xl ${
            darkMode ? 'bg-slate-900 border-l border-slate-800 text-white' : 'bg-white border-l border-slate-200 text-slate-900'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/20 text-white">
                <Sparkles className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  AI 履歷互動助理
                </h3>
                <p className="text-xs text-indigo-100">
                  Powered by Gemini 2.5 Flash
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                id="clear-ai-chat-btn"
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-indigo-100"
                title="清除聊天紀錄"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                id="close-ai-drawer-btn"
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className={`p-3 border-b text-xs space-y-1.5 ${
            darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="font-bold text-slate-400 block mb-1">
              💡 熱門提問建議：
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sampleQuestions.map((q, i) => (
                <button
                  key={i}
                  id={`ai-chip-${i}`}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className={`px-2.5 py-1 rounded-lg text-left transition-all font-medium border ${
                    darkMode
                      ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-indigo-300'
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-indigo-700 shadow-xs'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Message Stream Box */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : darkMode
                      ? 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
                      : 'bg-slate-100 border border-slate-200/80 text-slate-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                  <span className="block text-[10px] opacity-60 text-right mt-1.5">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 items-center text-slate-400">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-800 text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  <span>AI 正在整合思考陳哲遠的履歷資料...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Drawer Input Form */}
          <div className={`p-4 border-t ${
            darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
          }`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                id="ai-assistant-input"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="請輸入您想了解的提問..."
                disabled={isLoading}
                className={`flex-1 px-4 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-colors ${
                  darkMode
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                }`}
              />
              <button
                id="send-ai-message-btn"
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm disabled:opacity-50 transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
