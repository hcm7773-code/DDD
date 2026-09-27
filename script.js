/**
 * Vanilla JavaScript for 3-Page Personal Resume Website MVP
 * Centralized Profile Data, Dark/Light Theme Switching, Navigation, Micro-animations
 */

// ============================================================================
// 【八、資料結構 Centralized Profile Data】
// ============================================================================
export const profile = {
  name: "Cmei C.",
  title: "AI & Educational Technology Specialist",
  tagline: "AI × Education × Technology",
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScResumeContactFormSample/viewform",
  positioning: "Bridging human-centered anthropology, mathematics & science pedagogy, and generative AI systems to build transformative educational platforms.",
  bio: "Cross-disciplinary researcher and software engineer specializing in adaptive assessment engines, multi-agent pedagogical ecosystems, and cognitive scaffolding architectures.",
  careerDirection: "AIED Architecture · Cognitive Scaffolding · Adaptive Rubrics",
  interests: "Multi-Agent Systems · Human-AI Co-learning · Anthropological Ethics · Learning Analytics",
  location: "Taipei, Taiwan / Global Remote"
};

// Current theme state
let currentTheme = localStorage.getItem('resume_theme') || 'dark';

document.addEventListener('DOMContentLoaded', () => {
  bindProfileData();
  initTheme();
  initNavigation();
  initSkillBars();
  initProjectDemos();
});

/**
 * Bind profile data to elements with [data-profile]
 */
function bindProfileData() {
  const profileElements = document.querySelectorAll('[data-profile]');
  profileElements.forEach(el => {
    const key = el.getAttribute('data-profile');
    if (profile[key]) {
      if (el.tagName === 'A' && key === 'googleFormUrl') {
        el.href = profile[key];
      } else {
        el.textContent = profile[key];
      }
    }
  });
}

/**
 * Theme Toggle: Dark / Light Mode
 */
function initTheme() {
  applyTheme(currentTheme);

  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('resume_theme', currentTheme);
      applyTheme(currentTheme);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateThemeButtons();
}

/**
 * Update Labels & Icons on Theme Toggle Buttons
 */
function updateThemeButtons() {
  const isLight = currentTheme === 'light';
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    const label = btn.querySelector('.toggle-label');
    const icon = btn.querySelector('.toggle-icon');
    if (isLight) {
      if (icon) icon.innerHTML = '🌙';
      if (label) label.textContent = 'Dark Mode';
    } else {
      if (icon) icon.innerHTML = '☀️';
      if (label) label.textContent = 'Light Mode';
    }
  });
}

/**
 * Handles Active Nav States, Top Bar, Bottom Bar, and Mobile Drawer
 */
function initNavigation() {
  const currentPath = window.location.pathname;
  const fileName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  const cleanName = fileName === '' ? 'index.html' : fileName;

  const links = document.querySelectorAll('.nav-item, .mobile-link, .bottom-tab-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const targetFile = href.split('#')[0].replace(/^\.\//, '');
    if (targetFile === cleanName || (cleanName === 'index.html' && (targetFile === '' || targetFile === 'index.html'))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // Mobile Toggle Drawer
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      drawer.classList.toggle('open', !isOpen);
      toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * Animated Skills Progress Bars on portfolio.html
 */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-fill');
  if (skillBars.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width') || '85%';
        entry.target.style.width = targetWidth;
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => observer.observe(bar));
}

/**
 * Interactive Widgets on Project Pages (GAEC, VELS, Agents)
 */
function initProjectDemos() {
  // 1. GAEC CEFR Estimator Demo
  const gaecBtn = document.getElementById('gaecRunBtn');
  if (gaecBtn) {
    gaecBtn.addEventListener('click', () => {
      const fluency = parseInt(document.getElementById('gaecFluencyInput')?.value || '86', 10);
      const vocab = parseInt(document.getElementById('gaecVocabInput')?.value || '84', 10);
      const grammar = parseInt(document.getElementById('gaecGrammarInput')?.value || '88', 10);
      const pron = parseInt(document.getElementById('gaecPronInput')?.value || '90', 10);

      const avg = Math.round((fluency + vocab + grammar + pron) / 4);
      let cefr = 'B2+ (Independent Vantage)';
      let text = 'Strong speech flow with diverse academic phraseology. Minor syntactic adjustments suggested in complex conditional clauses.';

      if (avg >= 90) {
        cefr = 'C1 (Effective Operational Proficiency)';
        text = 'Exceptional argumentation coherence, wide lexical repertoire, and native-like prosodic rhythm.';
      } else if (avg >= 80) {
        cefr = 'B2+ (Independent Vantage)';
        text = 'Solid spontaneous discourse, highly intelligible acoustic parameters, and structured evidence delivery.';
      } else if (avg >= 70) {
        cefr = 'B1+ (Threshold Proficiency)';
        text = 'Adequate communicative capability. Recommended focus: academic transition markers and reduced pause frequency.';
      }

      const out = document.getElementById('gaecResultBox');
      if (out) {
        out.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="color:#38bdf8; font-size:15px;">CEFR Rating: ${cefr}</strong>
            <span style="font-family:monospace; color:#c084fc; font-weight:700;">Score: ${avg} / 100</span>
          </div>
          <p style="color:var(--text-light); font-size:13px; line-height:1.5;">${text}</p>
        `;
      }
    });
  }

  // 2. VELS Moral Dilemma Simulation
  const velsBtn = document.getElementById('velsRunBtn');
  if (velsBtn) {
    velsBtn.addEventListener('click', () => {
      const select = document.getElementById('velsSelect');
      const val = select ? select.value : 'a';
      const out = document.getElementById('velsResultBox');
      if (!out) return;

      const outcomes = {
        'a': {
          stage: 'Kohlberg Stage 5: Social Contract & Institutional Integrity',
          sel: 'Fairness (92%) · Empathy Balance (88%)',
          feedback: 'You upheld systemic fairness while seeking constructive support. The Socratic Mentor prompts: "How can systemic rules accommodate vulnerable individuals without compromising institutional equity?"'
        },
        'b': {
          stage: 'Kohlberg Stage 3: Interpersonal Concordance & Care Ethics',
          sel: 'Direct Altruism (94%) · System Awareness (78%)',
          feedback: 'You prioritized personal compassion and immediate distress relief. The Socratic Mentor prompts: "Does prioritizing immediate solidarity create long-term precedent challenges for collective fairness?"'
        },
        'c': {
          stage: 'Kohlberg Stage 6: Universal Ethical Principles',
          sel: 'Systemic Reform (95%) · Deep Metacognition (96%)',
          feedback: 'You sought dialectical synthesis transcending binary constraints. This embodies the transformative pedagogical goal of VELS.'
        }
      };

      const res = outcomes[val] || outcomes['a'];
      out.innerHTML = `
        <div style="margin-bottom:6px; color:#c084fc; font-weight:700; font-size:14px;">${res.stage}</div>
        <div style="font-size:12px; color:#38bdf8; margin-bottom:8px;">Metrics: ${res.sel}</div>
        <p style="color:var(--text-light); font-size:13px; line-height:1.6; background:rgba(255,255,255,0.04); padding:10px; border-radius:6px;">${res.feedback}</p>
      `;
    });
  }

  // 3. AI Agents Multi-Agent Simulation
  const agentBtn = document.getElementById('agentRunBtn');
  if (agentBtn) {
    agentBtn.addEventListener('click', () => {
      const log = document.getElementById('agentLogBox');
      if (!log) return;
      log.innerHTML = `<span style="color:var(--text-muted); font-style:italic;">Initializing multi-agent workflow negotiation...</span>`;

      setTimeout(() => {
        log.innerHTML = `
          <div style="margin-bottom:8px; border-left:3px solid #38bdf8; padding-left:10px;">
            <span style="color:#38bdf8; font-weight:700; font-size:11.5px;">[Cognitive Diagnostician Agent]</span><br>
            <span style="color:var(--text-light); font-size:12.5px;">Detected learner misconception in fraction division: assumes dividing always yields smaller quotients.</span>
          </div>
          <div style="margin-bottom:8px; border-left:3px solid #a855f7; padding-left:10px;">
            <span style="color:#a855f7; font-weight:700; font-size:11.5px;">[Socratic Tutor Agent]</span><br>
            <span style="color:var(--text-light); font-size:12.5px;">"If you have 2 whole pizzas and share half (1/2) a pizza per friend, how many friends can eat?"</span>
          </div>
          <div style="border-left:3px solid #34d399; padding-left:10px;">
            <span style="color:#34d399; font-weight:700; font-size:11.5px;">[Formative Evaluator Agent]</span><br>
            <span style="color:var(--text-light); font-size:12.5px;">Student responds: "4 friends!" — Conceptual shift verified via geometric scaffolding.</span>
          </div>
        `;
      }, 300);
    });
  }
}
