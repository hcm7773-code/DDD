import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Zap, 
  HeartHandshake, 
  Compass, 
  Award 
} from 'lucide-react';
import { motion } from 'motion/react';
import { ProfileData } from '../types';

interface AboutSectionProps {
  profile: ProfileData;
  darkMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, darkMode }) => {
  const pillars = [
    {
      title: '使用者體驗優先 (UX First)',
      desc: '好的產品不只功能強大，更要好用且直覺。我極度重視操作手感、畫面轉場與響應式微互動。',
      icon: HeartHandshake,
      color: 'text-indigo-500 bg-indigo-500/10',
    },
    {
      title: '乾淨可維護架構 (Clean Architecture)',
      desc: '嚴格遵循 TypeScript 型別安全與模組化架構，撰寫高可讀性、易於維護與擴充的程式碼。',
      icon: Layers,
      color: 'text-sky-500 bg-sky-500/10',
    },
    {
      title: 'AI 賦能與效能最佳化',
      desc: '擅長將 Gemini / OpenAI 等大語言模型與 RAG 技術落地至實際業務情境，提升產品競爭力。',
      icon: Zap,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      title: '敏捷溝通與夥伴心態',
      desc: '具備良好的跨團隊溝通能力，能與 PM、設計師及業務夥伴緊密配合，共同驅動業務成長。',
      icon: Compass,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
  ];

  return (
    <section id="about" className="py-20 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT ME</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            關於我與開發理念
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
            結合理性工程思維與感性視覺設計，持續打造讓使用者喜愛的軟體體驗
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Full Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border ${
              darkMode
                ? 'bg-slate-800/60 border-slate-700/80'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              個人簡介與專業背景
            </h3>

            <p className={`leading-relaxed text-base mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {profile.bio}
            </p>

            {/* Key Quick Bullet Highlights */}
            <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  精通 React 19, Next.js App Router, TypeScript & Node.js 全棧開發
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  具備 Gemini API, LLM Agent, RAG 知識庫與向量資料庫落地經驗
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  熟悉 UI/UX 規範、Figma 稿組件化、Tailwind CSS 及視覺微互動
                </span>
              </div>
            </div>

            {/* Certifications Badge row */}
            {profile.certifications && profile.certifications.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-700/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>專業認證 / Certifications</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.certifications.map((cert) => (
                    <span
                      key={cert.id}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${
                        darkMode
                          ? 'bg-slate-900/80 border-slate-700 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {cert.title} ({cert.year})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: 4 Value Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                    darkMode
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200/80 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className={`p-3 rounded-xl w-fit mb-4 ${pillar.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-base font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {pillar.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
