import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Calendar, Copy, ExternalLink } from 'lucide-react';
import { ProfileData } from '../types';

interface ContactSectionProps {
  profile: ProfileData;
  darkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Job Opportunity',
    subject: '',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10">
            <Mail className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            取得聯繫與合作洽談
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
            無論是全職職缺、自由接案顧問或是技術交流，都非常歡迎隨時聯繫！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side Contact Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              darkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                聯絡管道資訊
              </h3>

              <div className="space-y-4">
                {/* Email Box */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-indigo-50/60 dark:bg-slate-900/60 border border-indigo-100 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-indigo-600 text-white flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-slate-400 block">電子郵件 (Email)</span>
                    <p className={`text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {profile.email}
                    </p>
                  </div>
                  <button
                    id="copy-email-btn"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-xs font-semibold text-indigo-600 hover:bg-indigo-100 dark:hover:bg-slate-800 transition-colors"
                    title="複製 Email"
                  >
                    {copiedEmail ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Box */}
                {profile.phone && (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <div className="p-2.5 rounded-xl bg-sky-500 text-white flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-400 block">電話聯繫</span>
                      <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        {profile.phone}
                      </p>
                    </div>
                  </div>
                )}

                {/* Location Box */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-amber-500 text-white flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 block">主要居住地 / 時區</span>
                    <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {profile.location} (GMT+8)
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-400 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>通常在 24 小時內親自回覆來信。</span>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border ${
              darkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    訊息已成功傳送！
                  </h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    感謝您的來信，{formData.name}！我已收到您的訊息，會盡快與您聯繫。
                  </p>
                  <button
                    id="reset-contact-form-btn"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        inquiryType: 'Job Opportunity',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700"
                  >
                    發送另一則訊息
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    發送訊息表單
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        您的姓名 (Name) *
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        placeholder="請輸入姓名"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        聯絡 Email *
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none ${
                          darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      洽談類別 (Inquiry Type)
                    </label>
                    <select
                      id="contact-inquiry-select"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    >
                      <option value="Job Opportunity">正職職缺邀約 (Full-time Role)</option>
                      <option value="Freelance Project">專案自由接案 (Freelance Project)</option>
                      <option value="Consultation">技術顧問與交流 (Consultation & Coffee Chat)</option>
                      <option value="Other">其他事項 (Other)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      訊息主旨 (Subject)
                    </label>
                    <input
                      id="contact-subject-input"
                      type="text"
                      placeholder="例：全棧工程師職缺討論 / 網頁重構需求"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      詳細內容 (Message) *
                    </label>
                    <textarea
                      id="contact-message-textarea"
                      required
                      rows={4}
                      placeholder="請簡單說明團隊背景、需求細節或合作預算規劃..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none ${
                        darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>傳送送出訊息</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
