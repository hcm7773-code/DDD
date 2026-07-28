import React, { useState } from 'react';
import { Cpu, Layout, Server, Sparkles, PenTool, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ProfileData } from '../types';

interface SkillsSectionProps {
  profile: ProfileData;
  darkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ profile, darkMode }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5 text-indigo-500" />;
      case 'Server':
        return <Server className="w-5 h-5 text-sky-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      default:
        return <PenTool className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <section id="skills" className="py-20 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10">
            <Cpu className="w-3.5 h-3.5" />
            <span>SKILLS & TECH STACK</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            專業技能與工具箱
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
            具備涵蓋前端、後端、資料庫與 AI 應用的全面技術視野
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {profile.skills.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={idx}
                id={`skill-cat-btn-${idx}`}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/25 scale-[1.02]'
                    : darkMode
                    ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <div className={`p-2 rounded-xl ${
                  isActive ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-500'
                }`}>
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm leading-tight">
                    {cat.category}
                  </h3>
                  <span className={`text-[11px] ${
                    isActive ? 'text-indigo-100' : 'text-slate-400'
                  }`}>
                    {cat.items.length} 項核心能力
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Skill Matrix */}
        {profile.skills[activeCategoryIndex] && (
          <motion.div
            key={activeCategoryIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 sm:p-8 rounded-3xl border ${
              darkMode
                ? 'bg-slate-800/70 border-slate-700/80'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.skills[activeCategoryIndex].items.map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {skill.name}
                    </span>
                    <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 dark:bg-slate-900 px-2 py-0.5 rounded-md">
                      {skill.level}% 掌握度
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600"
                    />
                  </div>

                  {/* Skill Subtags */}
                  {skill.tags && skill.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skill.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[11px] px-2 py-0.5 rounded font-medium flex items-center gap-1 ${
                            darkMode
                              ? 'bg-slate-900 text-slate-300 border border-slate-700'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-indigo-500" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
