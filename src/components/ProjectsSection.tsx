import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Search, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProfileData, ProjectItem } from '../types';

interface ProjectsSectionProps {
  profile: ProfileData;
  darkMode: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ profile, darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  const categories = ['全部', 'AI 應用', '全棧開發', '開源工具', '前端視覺'];

  const filteredProjects = profile.projects.filter((proj) => {
    const matchesCategory =
      selectedCategory === '全部' || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            精選專案作品集
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
            包含全棧 Web 應用、AI LLM 工具整合與開源組件庫
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`project-category-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : darkMode
                    ? 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="project-search-input"
              type="text"
              placeholder="搜尋作品名稱或技術..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border transition-colors outline-none ${
                darkMode
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-indigo-500'
                  : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-500'
              }`}
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-sm">沒有找到符合條件的作品專案。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`group rounded-3xl border overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl ${
                  darkMode
                    ? 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                    : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {/* Thumbnail Image Box */}
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-900">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://picsum.photos/seed/projectfallback/800/600';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600/90 text-white backdrop-blur-md shadow-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Featured Star Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md">
                        <Sparkles className="w-3 h-3 fill-slate-950" />
                        <span>精選</span>
                      </div>
                    )}

                    {/* Metrics Tag */}
                    {project.metrics && (
                      <div className="absolute bottom-3 left-4 right-4 text-xs font-semibold text-slate-200 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 truncate">
                        ⚡ {project.metrics}
                      </div>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-3">
                    <h3 className={`text-xl font-bold group-hover:text-indigo-500 transition-colors ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-indigo-500 dark:text-indigo-400">
                      {project.tagline}
                    </p>
                    <p className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${
                      darkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Tech Stack & Buttons */}
                <div className="p-6 pt-0 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2.5 py-0.5 rounded-md font-medium ${
                          darkMode
                            ? 'bg-slate-900 text-slate-300 border border-slate-700'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                    <button
                      id={`project-details-btn-${project.id}`}
                      onClick={() => setActiveProjectModal(project)}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>查看詳細專案報告</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg text-xs font-semibold transition-colors border ${
                            darkMode
                              ? 'border-slate-700 bg-slate-900 text-slate-300 hover:text-white'
                              : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                          title="GitHub Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        <AnimatePresence>
          {activeProjectModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-500">
                      {activeProjectModal.category}
                    </span>
                    <h3 className="text-2xl font-bold mt-2">
                      {activeProjectModal.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-indigo-500 font-medium">
                      {activeProjectModal.tagline}
                    </p>
                  </div>
                  <button
                    id="close-project-modal-btn"
                    onClick={() => setActiveProjectModal(null)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Image */}
                <div className="rounded-2xl overflow-hidden h-60 bg-slate-900">
                  <img
                    src={activeProjectModal.imageUrl}
                    alt={activeProjectModal.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description & Highlights */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-2">
                      專案背景與需求 (Overview)
                    </h4>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {activeProjectModal.description}
                    </p>
                  </div>

                  {activeProjectModal.highlights && activeProjectModal.highlights.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-2">
                        核心功能與技術亮點 (Highlights)
                      </h4>
                      <div className="space-y-2">
                        {activeProjectModal.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack pill row */}
                  <div>
                    <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-2">
                      使用的技術棧 (Tech Stack)
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProjectModal.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-lg bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 font-semibold border border-indigo-100 dark:border-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer Links */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                  {activeProjectModal.githubUrl && (
                    <a
                      href={activeProjectModal.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                    >
                      <Github className="w-4 h-4" />
                      <span>查看原始碼</span>
                    </a>
                  )}
                  {activeProjectModal.demoUrl && (
                    <a
                      href={activeProjectModal.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                    >
                      <span>開啟線上 Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
