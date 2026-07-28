import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { ProfileEditModal } from './components/ProfileEditModal';
import { ResumeDownloadModal } from './components/ResumeDownloadModal';
import { Footer } from './components/Footer';
import { defaultProfile } from './data/defaultProfile';
import { ProfileData } from './types';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('user_portfolio_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved profile:', e);
      }
    }
    return defaultProfile;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    localStorage.setItem('user_portfolio_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('portfolio_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Intersection observer to track active section
  useEffect(() => {
    const sections = ['about', 'experience', 'projects', 'skills', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Navigation Header */}
      <Navbar
        profile={profile}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
        onOpenEditModal={() => setEditModalOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="relative">
        <HeroSection
          profile={profile}
          darkMode={darkMode}
          onOpenAiAssistant={() => setAiAssistantOpen(true)}
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onOpenEditModal={() => setEditModalOpen(true)}
        />

        <AboutSection profile={profile} darkMode={darkMode} />

        <ExperienceSection profile={profile} darkMode={darkMode} />

        <ProjectsSection profile={profile} darkMode={darkMode} />

        <SkillsSection profile={profile} darkMode={darkMode} />

        <ContactSection profile={profile} darkMode={darkMode} />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        darkMode={darkMode}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Modals & Drawers */}
      <AiAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        profile={profile}
        darkMode={darkMode}
      />

      <ProfileEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        profile={profile}
        onSave={(newProf) => setProfile(newProf)}
        darkMode={darkMode}
      />

      <ResumeDownloadModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        profile={profile}
        darkMode={darkMode}
      />
    </div>
  );
}
