import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Edit3, 
  FileText, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  User, 
  Briefcase, 
  FolderGit2, 
  Cpu, 
  Mail 
} from 'lucide-react';
import { ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAiAssistant: () => void;
  onOpenEditModal: () => void;
  onOpenResumeModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  darkMode,
  setDarkMode,
  onOpenAiAssistant,
  onOpenEditModal,
  onOpenResumeModal,
  activeSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: '關於我', icon: User },
    { id: 'experience', label: '經歷時間軸', icon: Briefcase },
    { id: 'projects', label: '精選作品集', icon: FolderGit2 },
    { id: 'skills', label: '專業技能', icon: Cpu },
    { id: 'contact', label: '聯絡方式', icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-slate-900/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            {profile.englishName.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-base leading-tight ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              {profile.name}
            </span>
            <span className="text-xs text-indigo-500 font-medium tracking-wide">
              {profile.englishName}
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => scrollToSection(link.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? darkMode
                      ? 'bg-indigo-500/15 text-indigo-400 font-semibold'
                      : 'bg-indigo-50 text-indigo-600 font-semibold'
                    : darkMode
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls & AI Assistant Button */}
        <div className="flex items-center gap-2">
          {/* AI Assistant Button */}
          <button
            id="open-ai-assistant-btn"
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-indigo-500/20 hover:opacity-95 hover:scale-105 transition-all active:scale-95"
            title="開啟 AI 履歷助手"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">AI 履歷問答</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Edit Profile Button */}
          <button
            id="open-edit-modal-btn"
            onClick={onOpenEditModal}
            className={`p-2 rounded-lg text-xs font-medium transition-colors border ${
              darkMode
                ? 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
            title="編輯個人資料"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Resume PDF Export */}
          <button
            id="open-resume-modal-btn"
            onClick={onOpenResumeModal}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              darkMode
                ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title="檢視/下載履歷"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>履歷預覽</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="toggle-dark-mode-btn"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg text-xs font-medium transition-colors ${
              darkMode
                ? 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title={darkMode ? '切換為明亮模式' : '切換為暗黑模式'}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            id="toggle-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className={`md:hidden border-b px-4 py-3 space-y-1 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => scrollToSection(link.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  darkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 text-indigo-500" />
                <span>{link.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <button
              id="mobile-resume-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
            >
              <FileText className="w-4 h-4" />
              <span>檢視/列印履歷</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
