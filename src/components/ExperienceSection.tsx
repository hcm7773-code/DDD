import React, { useState } from 'react';
import { Briefcase, GraduationCap, Laptop, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileData, ExperienceItem } from '../types';

interface ExperienceSectionProps {
  profile: ProfileData;
  darkMode: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ profile, darkMode }) => {
  const [filter, setFilter] = useState<'all' | 'work' | 'freelance' | 'education'>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'exp-1': true, // default first expanded
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredExperiences = profile.experiences.filter((exp) => {
    if (filter === 'all') return true;
    return exp.type === filter;
  });

  const getTypeIcon = (type: ExperienceItem['type']) => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-4 h-4 text-indigo-500" />;
      case 'freelance':
        return <Laptop className="w-4 h-4 text-emerald-500" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <section id="experience" className="py-20 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER PATH</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            工作經歷與學歷背景
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
            記錄職涯發展關鍵里程碑與所積累的技術能力
          </p>
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', label: '全部經歷' },
            { id: 'work', label: '正職職涯' },
            { id: 'freelance', label: '自由接案' },
            { id: 'education', label: '學歷背景' },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`exp-filter-${tab.id}`}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : darkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto relative pl-4 sm:pl-8 border-l-2 border-indigo-500/30 dark:border-indigo-500/20 space-y-8">
          <AnimatePresence>
            {filteredExperiences.map((exp, index) => {
              const isExpanded = !!expandedIds[exp.id];
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[25px] sm:-left-[41px] top-6 w-5 h-5 rounded-full border-4 ${
                    darkMode ? 'bg-slate-900 border-indigo-500' : 'bg-white border-indigo-600'
                  } flex items-center justify-center shadow-md`} />

                  {/* Experience Card */}
                  <div className={`p-6 rounded-2xl border transition-all ${
                    darkMode
                      ? 'bg-slate-800/70 border-slate-700/80 hover:border-slate-600'
                      : 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                  }`}>
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-lg bg-indigo-500/10">
                            {getTypeIcon(exp.type)}
                          </span>
                          <h3 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                            {exp.role}
                          </h3>
                        </div>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {exp.description}
                    </p>

                    {/* Toggle Details Accordion */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="pt-2">
                        <button
                          id={`toggle-exp-details-${exp.id}`}
                          onClick={() => toggleExpand(exp.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <span>{isExpanded ? '收起成果亮點' : '檢視專案成果亮點'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isExpanded && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc list-inside pl-2 border-l-2 border-indigo-500/20"
                          >
                            {exp.highlights.map((item, i) => (
                              <li key={i} className="leading-relaxed">
                                {item}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap gap-1.5">
                        {exp.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                              darkMode
                                ? 'bg-slate-900/80 text-indigo-300 border border-slate-700'
                                : 'bg-slate-100 text-indigo-700 border border-slate-200'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
