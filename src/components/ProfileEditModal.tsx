import React, { useState } from 'react';
import { X, Save, Download, Upload, RotateCcw, Plus, Trash2, Edit, Camera, Image } from 'lucide-react';
import { motion } from 'motion/react';
import { ProfileData } from '../types';
import { defaultProfile } from '../data/defaultProfile';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (newProfile: ProfileData) => void;
  darkMode: boolean;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  darkMode,
}) => {
  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);
  const [activeTab, setActiveTab] = useState<'basic' | 'experiences' | 'projects' | 'json'>('basic');

  if (!isOpen) return null;

  const avatarPresets = [
    { label: '預設頭像', url: defaultProfile.avatarUrl },
    { label: '專業男士', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800' },
    { label: '專業女士', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' },
    { label: '軟體工程師', url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=800' },
    { label: '質感寫真', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800' },
  ];

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('圖片檔案請小於 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleBasicChange('avatarUrl', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBasicChange = (field: keyof ProfileData, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editedProfile);
    onClose();
  };

  const handleResetDefault = () => {
    if (confirm('確定要恢復為初始預設資料嗎？自訂的修改將會被覆蓋。')) {
      setEditedProfile(defaultProfile);
      onSave(defaultProfile);
      onClose();
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(editedProfile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${editedProfile.englishName.toLowerCase().replace(/\s+/g, '_')}_profile.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.name && parsed.title) {
            setEditedProfile(parsed);
            alert('成功匯入個人 Profile JSON！');
          } else {
            alert('JSON 檔案格式不符合 ProfileData 規範。');
          }
        } catch (err) {
          alert('解析 JSON 檔案失敗，請檢查檔案格式。');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-4xl h-[85vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Edit className="w-5 h-5 text-indigo-500" />
              <span>編輯個人網頁資料 (Edit Profile)</span>
            </h3>
            <p className="text-xs text-slate-400">
              修改即時反映於網站視覺，支援 LocalStorage 儲存與 JSON 匯出匯入
            </p>
          </div>

          <button
            id="close-edit-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector Row */}
        <div className="px-6 pt-3 flex border-b border-slate-200 dark:border-slate-800 gap-2 text-xs font-bold">
          {[
            { id: 'basic', label: '基本資料 (Bio & Social)' },
            { id: 'experiences', label: '工作學歷經歷' },
            { id: 'projects', label: '作品集管理' },
            { id: 'json', label: 'JSON 匯出匯入' },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`edit-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Form Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'basic' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">中文姓名</label>
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => handleBasicChange('name', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1">英文姓名</label>
                  <input
                    type="text"
                    value={editedProfile.englishName}
                    onChange={(e) => handleBasicChange('englishName', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">職稱 / 頭銜</label>
                  <input
                    type="text"
                    value={editedProfile.title}
                    onChange={(e) => handleBasicChange('title', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1">求職/工作狀態 (Status Badge)</label>
                  <input
                    type="text"
                    value={editedProfile.status}
                    onChange={(e) => handleBasicChange('status', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">一句話標語 (Tagline)</label>
                <input
                  type="text"
                  value={editedProfile.tagline}
                  onChange={(e) => handleBasicChange('tagline', e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">完整關於我 (Bio)</label>
                <textarea
                  rows={4}
                  value={editedProfile.bio}
                  onChange={(e) => handleBasicChange('bio', e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border ${
                    darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleBasicChange('email', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1">居住地點 / 時區</label>
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => handleBasicChange('location', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">GitHub 網址</label>
                  <input
                    type="text"
                    value={editedProfile.github}
                    onChange={(e) => handleBasicChange('github', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1">LinkedIn 網址</label>
                  <input
                    type="text"
                    value={editedProfile.linkedin}
                    onChange={(e) => handleBasicChange('linkedin', e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              {/* Avatar Image Upload & Preset Section */}
              <div className={`p-4 rounded-2xl border ${
                darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-100/70 border-slate-200'
              } space-y-4`}>
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-indigo-500" />
                    <span>個人大頭貼照片設定</span>
                  </label>
                  <span className="text-xs text-slate-400">支援上傳本地圖片或貼上網址</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Avatar Preview */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-md flex-shrink-0 bg-slate-200 dark:bg-slate-900 group">
                    <img
                      src={editedProfile.avatarUrl}
                      alt="Avatar Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultProfile.avatarUrl;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold pointer-events-none">
                      預覽照片
                    </div>
                  </div>

                  {/* Actions & Inputs */}
                  <div className="flex-1 space-y-3 w-full">
                    {/* Buttons: Upload & Presets */}
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs cursor-pointer shadow-sm transition-all active:scale-95">
                        <Upload className="w-3.5 h-3.5" />
                        <span>從電腦選擇照片上傳</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                      </label>

                      <div className="text-xs text-slate-400 font-medium">或快速套用預設照片：</div>
                    </div>

                    {/* Presets Row */}
                    <div className="flex flex-wrap items-center gap-2">
                      {avatarPresets.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleBasicChange('avatarUrl', preset.url)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                            editedProfile.avatarUrl === preset.url
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                              : darkMode
                              ? 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Manual URL Input */}
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">圖片網址 (URL)</label>
                      <input
                        type="text"
                        value={editedProfile.avatarUrl}
                        onChange={(e) => handleBasicChange('avatarUrl', e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className={`w-full px-3 py-2 rounded-xl text-xs border ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          )}

          {activeTab === 'experiences' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">目前已有 {editedProfile.experiences.length} 筆經歷</span>
                <button
                  onClick={() => {
                    const newExp = {
                      id: 'exp-' + Date.now(),
                      company: '新公司 / 學校',
                      role: '職位名稱',
                      period: '2024 - 至今',
                      location: '台北',
                      description: '請填寫工作內容說明...',
                      highlights: ['成果亮點 1', '成果亮點 2'],
                      techStack: ['React', 'TypeScript'],
                      type: 'work' as const,
                    };
                    setEditedProfile((prev) => ({
                      ...prev,
                      experiences: [newExp, ...prev.experiences],
                    }));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>新增經歷</span>
                </button>
              </div>

              <div className="space-y-4">
                {editedProfile.experiences.map((exp, i) => (
                  <div key={exp.id} className="p-4 rounded-xl border border-slate-700 space-y-3 bg-slate-800/30">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-indigo-400">經歷 #{i + 1} ({exp.type})</span>
                      <button
                        onClick={() => {
                          setEditedProfile((prev) => ({
                            ...prev,
                            experiences: prev.experiences.filter((e) => e.id !== exp.id),
                          }));
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-400 mb-1">公司/單位名稱</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditedProfile((prev) => ({
                              ...prev,
                              experiences: prev.experiences.map((item) =>
                                item.id === exp.id ? { ...item, company: val } : item
                              ),
                            }));
                          }}
                          className={`w-full px-2.5 py-1.5 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-400 mb-1">職稱名稱</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditedProfile((prev) => ({
                              ...prev,
                              experiences: prev.experiences.map((item) =>
                                item.id === exp.id ? { ...item, role: val } : item
                              ),
                            }));
                          }}
                          className={`w-full px-2.5 py-1.5 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">目前已有 {editedProfile.projects.length} 個作品專案</span>
                <button
                  onClick={() => {
                    const newProj = {
                      id: 'proj-' + Date.now(),
                      title: '新作品專案',
                      category: 'AI 應用',
                      tagline: '一句話作品描述',
                      description: '詳細專案介紹...',
                      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
                      techStack: ['React', 'TypeScript', 'Node.js'],
                      featured: true,
                      highlights: ['功能特色 1', '功能特色 2'],
                    };
                    setEditedProfile((prev) => ({
                      ...prev,
                      projects: [newProj, ...prev.projects],
                    }));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>新增作品</span>
                </button>
              </div>

              <div className="space-y-4">
                {editedProfile.projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl border border-slate-700 space-y-3 bg-slate-800/30">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-indigo-400">{proj.title} ({proj.category})</span>
                      <button
                        onClick={() => {
                          setEditedProfile((prev) => ({
                            ...prev,
                            projects: prev.projects.filter((p) => p.id !== proj.id),
                          }));
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-400 mb-1">專案標題</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditedProfile((prev) => ({
                              ...prev,
                              projects: prev.projects.map((p) =>
                                p.id === proj.id ? { ...p, title: val } : p
                              ),
                            }));
                          }}
                          className={`w-full px-2.5 py-1.5 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-400 mb-1">分類 Tag</label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditedProfile((prev) => ({
                              ...prev,
                              projects: prev.projects.map((p) =>
                                p.id === proj.id ? { ...p, category: val } : p
                              ),
                            }));
                          }}
                          className={`w-full px-2.5 py-1.5 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-6 text-xs sm:text-sm">
              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <h4 className="font-bold mb-2">匯出個人 Profile 檔案 (.json)</h4>
                <p className="text-slate-400 mb-4">
                  您可以將目前修改好的所有經歷、作品集與簡介打包下載為 `.json` 檔案備份。
                </p>
                <button
                  onClick={handleExportJson}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>下載 profile.json 檔案</span>
                </button>
              </div>

              <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <h4 className="font-bold mb-2">匯入已有的 JSON 設定檔</h4>
                <p className="text-slate-400 mb-4">
                  選擇先前匯出的 JSON 檔案即可一次恢復所有個人資料與作品集。
                </p>
                <label className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold flex items-center gap-2 w-fit cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>上傳並匯入 .json</span>
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            id="reset-profile-default-btn"
            onClick={handleResetDefault}
            className="px-4 py-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-xs font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>恢復為初始預設值</span>
          </button>

          <div className="flex gap-2">
            <button
              id="cancel-edit-profile-btn"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'
              }`}
            >
              取消
            </button>

            <button
              id="save-edit-profile-btn"
              onClick={handleSave}
              className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Save className="w-4 h-4" />
              <span>儲存並更新網站</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
