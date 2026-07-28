import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Briefcase, 
  Code, 
  Star, 
  Smile,
  Download,
  Camera
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProfileData } from '../types';

interface HeroSectionProps {
  profile: ProfileData;
  darkMode: boolean;
  onOpenAiAssistant: () => void;
  onOpenResumeModal: () => void;
  onOpenEditModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  darkMode,
  onOpenAiAssistant,
  onOpenResumeModal,
  onOpenEditModal,
}) => {
  const getStatIcon = (name: string) => {
    switch (name) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-indigo-500" />;
      case 'Code':
        return <Code className="w-5 h-5 text-sky-500" />;
      case 'Star':
        return <Star className="w-5 h-5 text-amber-500" />;
      default:
        return <Smile className="w-5 h-5 text-emerald-500" />;
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* Background ambient decorative shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-purple-500/10 dark:bg-purple-600/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{profile.status}</span>
            </div>

            {/* Name & Title Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className={darkMode ? 'text-white' : 'text-slate-900'}>
                  {profile.name}
                </span>{' '}
                <span className="text-indigo-600 dark:text-indigo-400 font-medium text-2xl sm:text-3xl lg:text-4xl block sm:inline">
                  ({profile.englishName})
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {profile.title}
              </p>
            </div>

            {/* Location & Tagline */}
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span>{profile.location}</span>
            </div>

            <p className={`text-base sm:text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {profile.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-view-projects-btn"
                onClick={() => scrollToSection('projects')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>檢視精選作品集</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-ai-chat-btn"
                onClick={onOpenAiAssistant}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-md hover:opacity-95 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>諮詢 AI 履歷助理</span>
              </button>

              <button
                id="hero-download-resume-btn"
                onClick={onOpenResumeModal}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${
                  darkMode
                    ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                    : 'border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Download className="w-4 h-4 text-indigo-500" />
                <span>下載 / 列印履歷</span>
              </button>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                社群與社群連結
              </span>
              <div className="flex items-center gap-2">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-lg transition-colors ${
                      darkMode ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-lg transition-colors ${
                      darkMode ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.twitter && (
                  <a
                    href={profile.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-lg transition-colors ${
                      darkMode ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title="X (Twitter)"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {profile.email && (
                  <button
                    onClick={() => scrollToSection('contact')}
                    className={`p-2.5 rounded-lg transition-colors ${
                      darkMode ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title="Email 直接聯繫"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Avatar Profile Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative group">
              {/* Decorative Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-60 group-hover:opacity-90 transition duration-500" />

              {/* Avatar Box */}
              <div className={`relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-2 shadow-2xl ${
                darkMode ? 'border-slate-700 bg-slate-800' : 'border-white bg-slate-100'
              }`}>
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder image if avatar fails
                    (e.target as HTMLImageElement).src =
                      'https://picsum.photos/seed/alexavatar/600/600';
                  }}
                />

                {/* Edit Photo Overlay Button */}
                {onOpenEditModal && (
                  <button
                    onClick={onOpenEditModal}
                    className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white font-bold text-sm backdrop-blur-xs cursor-pointer"
                    title="點擊更換照片"
                  >
                    <div className="p-3 rounded-full bg-indigo-600/90 text-white shadow-lg transform group-hover:scale-110 transition-transform">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span>更換大頭貼照片</span>
                  </button>
                )}
              </div>

              {/* Float Badge 1: AI & Fullstack */}
              <div className={`absolute -bottom-4 -left-4 px-4 py-2 rounded-xl shadow-xl border flex items-center gap-2 backdrop-blur-md ${
                darkMode ? 'bg-slate-900/90 border-slate-700 text-slate-200' : 'bg-white/90 border-slate-200 text-slate-800'
              }`}>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold">AI & Full-Stack</span>
              </div>

              {/* Float Badge 2: Open for Opportunity */}
              <div className={`absolute -top-3 -right-3 px-3 py-1.5 rounded-full shadow-lg border flex items-center gap-1.5 text-xs font-semibold ${
                darkMode ? 'bg-slate-900/90 border-slate-700 text-indigo-400' : 'bg-white/90 border-slate-200 text-indigo-600'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Taipei, Taiwan</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
                darkMode
                  ? 'bg-slate-800/60 border-slate-800/80 hover:border-slate-700'
                  : 'bg-slate-50/80 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-indigo-500/10">
                  {getStatIcon(stat.iconName)}
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {stat.value}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
