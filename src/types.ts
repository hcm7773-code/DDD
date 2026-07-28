export interface StatItem {
  label: string;
  value: string;
  iconName: string;
}

export interface SkillItem {
  name: string;
  level: number; // 1 - 100
  tags?: string[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  logo?: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  techStack: string[];
  type: 'work' | 'education' | 'freelance';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  title: string;
  avatar: string;
  relation: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  link?: string;
}

export interface ProfileData {
  name: string;
  englishName: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  status: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  medium: string;
  avatarUrl: string;
  stats: StatItem[];
  skills: SkillCategory[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  certifications: CertificationItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
