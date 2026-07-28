import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
  darkMode: boolean;
  onOpenAiAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, darkMode, onOpenAiAssistant }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`py-12 border-t ${
      darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-slate-900 dark:text-white">
              {profile.name}
            </span>
            <span className="text-xs text-indigo-500 font-medium">
              ({profile.englishName})
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {profile.title} • 專注極致使用者體驗與 AI 應用開發
          </p>
        </div>

        {/* Center Quick AI Trigger */}
        <button
          onClick={onOpenAiAssistant}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:scale-105 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>有任何疑問？問問 24/7 在線的 AI 履歷助理</span>
        </button>

        {/* Right Actions & Back to top */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> & React
          </span>
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className={`p-2.5 rounded-xl border transition-all hover:scale-110 ${
              darkMode
                ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
            title="回到頂部"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
