import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ProfileData } from '../types';

interface ResumeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  darkMode: boolean;
}

export const ResumeDownloadModal: React.FC<ResumeDownloadModalProps> = ({
  isOpen,
  onClose,
  profile,
  darkMode,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-4xl h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="print:hidden p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/90">
          <div>
            <h3 className="font-bold text-base">履歷表預覽 & 列印 (Resume Preview)</h3>
            <p className="text-xs text-slate-400">點擊「列印 / 另存為 PDF」即可經由瀏覽器列印出乾淨排版的個人履歷</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="print-resume-btn"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Printer className="w-4 h-4" />
              <span>列印 / 另存 PDF</span>
            </button>
            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Print-Ready Resume Page Body */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-8 bg-white text-slate-900 font-sans print:p-0 print:overflow-visible">
          
          {/* Header */}
          <div className="border-b pb-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">
                {profile.name} ({profile.englishName})
              </h1>
              <p className="text-lg font-bold text-indigo-600 mt-1">
                {profile.title}
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                {profile.tagline}
              </p>
            </div>

            <div className="text-right text-xs text-slate-600 space-y-1">
              <p className="flex items-center justify-end gap-1">
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>{profile.email}</span>
              </p>
              <p className="flex items-center justify-end gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>{profile.location}</span>
              </p>
              {profile.github && (
                <p className="text-indigo-600 underline">
                  {profile.github}
                </p>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-1 mb-2">
              專業簡介 (Professional Summary)
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Skills Grid */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-1 mb-3">
              核心專業技能 (Core Technical Stack)
            </h2>
            <div className="grid grid-cols-2 gap-4 text-xs">
              {profile.skills.map((cat, i) => (
                <div key={i} className="space-y-1">
                  <h3 className="font-bold text-slate-900">{cat.category}</h3>
                  <p className="text-slate-600">
                    {cat.items.map((item) => item.name).join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-1 mb-4">
              工作經歷 (Work Experience)
            </h2>
            <div className="space-y-5">
              {profile.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-900">
                    <span>{exp.role} @ {exp.company}</span>
                    <span className="text-slate-500 font-normal">{exp.period}</span>
                  </div>
                  <p className="text-xs text-slate-600">{exp.description}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-slate-700 pl-2 space-y-0.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-1 mb-3">
              精選專案 (Key Projects)
            </h2>
            <div className="grid grid-cols-2 gap-4 text-xs">
              {profile.projects.slice(0, 4).map((proj) => (
                <div key={proj.id} className="p-3 border rounded-xl space-y-1">
                  <h3 className="font-bold text-slate-900">{proj.title}</h3>
                  <p className="text-slate-500 text-[11px]">{proj.tagline}</p>
                  <p className="text-indigo-600 text-[11px] font-medium">
                    {proj.techStack.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
