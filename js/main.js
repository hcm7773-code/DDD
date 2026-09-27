/**
 * Vanilla JavaScript for Academic & AI Portfolio
 * Features: Mobile drawer, copy email, interactive tabs, simulation widgets
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCopyEmail();
  initTabs();
  initWidgets();
  highlightActiveNav();
});

// 1. Mobile Navigation
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      drawer.classList.toggle('open', !isOpen);
      toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close when clicking any nav link
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// 2. Active Nav Link Highlighter
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const fileName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Normalize links
    const targetFile = href.split('#')[0].replace(/^\.\//, '');
    const cleanFileName = fileName === '' ? 'index.html' : fileName;

    if (targetFile === cleanFileName || (cleanFileName === 'index.html' && (targetFile === '' || targetFile === 'index.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 3. Copy Email with Toast Feedback
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toastNotice');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'cmhou777@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`已複製電子郵件：${email}`);
      }).catch(() => {
        showToast(`電子郵件：${email}`);
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// 4. Interactive Tabs
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tab-container]');

  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.filter-tab-btn');
    const targetSelector = container.getAttribute('data-tab-container');
    const items = document.querySelectorAll(targetSelector);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        items.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });
}

// 5. Interactive Simulation Widgets
function initWidgets() {
  // A. GAEC Interactive Scoring Simulator
  const gaecCalcBtn = document.getElementById('gaecCalcBtn');
  if (gaecCalcBtn) {
    gaecCalcBtn.addEventListener('click', () => {
      const fluency = parseInt(document.getElementById('gaecFluency')?.value || '85', 10);
      const vocab = parseInt(document.getElementById('gaecVocab')?.value || '80', 10);
      const grammar = parseInt(document.getElementById('gaecGrammar')?.value || '82', 10);
      const pronunciation = parseInt(document.getElementById('gaecPronunciation')?.value || '88', 10);

      const avg = Math.round((fluency + vocab + grammar + pronunciation) / 4);
      let cefr = 'B2';
      let title = 'Independent User (High)';
      let feedback = '展現良好的語流連貫性與專業詞彙運用，在複合句型結構中偶有微小語法修正空間。';

      if (avg >= 90) {
        cefr = 'C1';
        title = 'Proficient User (Operational Proficiency)';
        feedback = '表現出卓越的論辯邏輯與精準學術修辭，能自如應對高階跨學科主題。';
      } else if (avg >= 80) {
        cefr = 'B2+';
        title = 'Independent User (Advanced Vantage)';
        feedback = '語流自然流暢，跨主題表達清晰且具說服力，評測模型給予高度肯定。';
      } else if (avg >= 70) {
        cefr = 'B1+';
        title = 'Independent User (Threshold)';
        feedback = '日常與學術基礎溝通完整，建議加強抽象概念之詞彙深度與從屬子句運用。';
      } else {
        cefr = 'A2';
        title = 'Basic User (Waystage)';
        feedback = '具備基礎句型掌握度，建議持續累積特定學科之核心語彙。';
      }

      const output = document.getElementById('gaecResultOutput');
      if (output) {
        output.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <strong style="color:#fff; font-size:16px;">CEFR 評定等級：<span style="color:#38bdf8;">${cefr}</span> (${title})</strong>
            <span style="font-family:monospace; color:#818cf8; font-weight:700;">綜合成績：${avg} / 100</span>
          </div>
          <p style="color:#cbd5e1; margin-bottom:8px;">${feedback}</p>
          <div style="font-size:12px; color:#94a3b8; border-top:1px solid rgba(255,255,255,0.08); padding-top:8px;">
            多模態分析維度：語音流暢度 ${fluency}% · 詞彙多樣性 ${vocab}% · 句構準確度 ${grammar}% · 發音聲學特徵 ${pronunciation}%
          </div>
        `;
      }
    });
  }

  // B. VELS Moral Dilemma Simulation
  const velsDecisionSelect = document.getElementById('velsDilemmaSelect');
  const velsEvaluateBtn = document.getElementById('velsEvaluateBtn');
  if (velsEvaluateBtn && velsDecisionSelect) {
    velsEvaluateBtn.addEventListener('click', () => {
      const choice = velsDecisionSelect.value;
      const output = document.getElementById('velsResultOutput');
      if (!output) return;

      const responses = {
        'choice_a': {
          stage: 'Kohlberg 第 5 階段：社會契約與人權導向',
          sel: '同理心 (88%) · 公平正義意識 (92%)',
          reflection: '您選擇了基於制度透明與長期公共利益的判斷。AI 導師引導：「在維護規則的同時，如何為處於弱勢的個體提供過渡性補償機制？」'
        },
        'choice_b': {
          stage: 'Kohlberg 第 3-4 階段：人際和諧與關懷倫理導向',
          sel: '利他關懷 (95%) · 衝突協商能力 (84%)',
          reflection: '您優先考量群體情感凝聚與個體心理支持。AI 導師引導：「這種立即的同理關懷，是否可能在未來衍生規則一致性的爭議？該如何取得動態平衡？」'
        },
        'choice_c': {
          stage: 'Kohlberg 第 6 階段：普世倫理原則導向',
          sel: '系統性思維 (90%) · 道德反思深度 (96%)',
          reflection: '您嘗試超越二元對立，尋求更高層次的價值共融與制度創新。AI 導師引導：「這體現了教育科技在品格塑造上的核心價值——激發高階批判反思。」'
        }
      };

      const res = responses[choice] || responses['choice_a'];
      output.innerHTML = `
        <div style="margin-bottom:8px;">
          <span style="color:#c084fc; font-weight:700;">道德發展評估：</span>
          <span style="color:#fff;">${res.stage}</span>
        </div>
        <div style="font-size:12px; color:#38bdf8; margin-bottom:10px;">
          素養指標分析：${res.sel}
        </div>
        <p style="color:#cbd5e1; font-size:13px; line-height:1.6; background:rgba(255,255,255,0.03); padding:10px; border-radius:6px;">
          ${res.reflection}
        </p>
      `;
    });
  }

  // C. AI Agent Ecosystem Collaborative Simulation
  const agentTriggerBtn = document.getElementById('agentSimulateBtn');
  if (agentTriggerBtn) {
    agentTriggerBtn.addEventListener('click', () => {
      const topic = document.getElementById('agentTopicSelect')?.value || 'math_fractions';
      const output = document.getElementById('agentSimulationLog');
      if (!output) return;

      output.innerHTML = `<div style="color:#94a3b8; font-style:italic;">多代理人工作流啟動中...</div>`;

      setTimeout(() => {
        let conversation = '';
        if (topic === 'math_fractions') {
          conversation = `
            <div style="margin-bottom:8px; border-left:3px solid #38bdf8; padding-left:10px;">
              <span style="color:#38bdf8; font-weight:700; font-size:12px;">[認知診斷代理人 · Diagnostician]</span><br>
              <span style="color:#e2e8f0; font-size:13px;">檢測到學習者在「分數除法」混淆倒數概念，直覺認為除法結果必然變小。</span>
            </div>
            <div style="margin-bottom:8px; border-left:3px solid #a855f7; padding-left:10px;">
              <span style="color:#a855f7; font-weight:700; font-size:12px;">[蘇格拉底引導代理人 · Socratic Tutor]</span><br>
              <span style="color:#e2e8f0; font-size:13px;">「如果我們有 2 塊披薩，每個人分半塊（1/2 塊），總共可以分給幾個人吃呢？」</span>
            </div>
            <div style="margin-bottom:8px; border-left:3px solid #34d399; padding-left:10px;">
              <span style="color:#34d399; font-weight:700; font-size:12px;">[形成性評量代理人 · Evaluator]</span><br>
              <span style="color:#e2e8f0; font-size:13px;">學習者回應：「4 個人！」——概念轉變確認，幾何視覺化支架已生效。</span>
            </div>
          `;
        } else {
          conversation = `
            <div style="margin-bottom:8px; border-left:3px solid #38bdf8; padding-left:10px;">
              <span style="color:#38bdf8; font-weight:700; font-size:12px;">[人類學文化情境代理人 · Anthropological Context]</span><br>
              <span style="color:#e2e8f0; font-size:13px;">載入社群協作背景：將環境保育議題置於在地原住民族水資源共享智慧中。</span>
            </div>
            <div style="margin-bottom:8px; border-left:3px solid #818cf8; padding-left:10px;">
              <span style="color:#818cf8; font-weight:700; font-size:12px;">[課程規劃代理人 · Curriculum Planner]</span><br>
              <span style="color:#e2e8f0; font-size:13px;">調配跨學科探究任務：結合水質科學檢測與部族習慣法口述歷史對話。</span>
            </div>
            <div style="margin-bottom:8px; border-left:3px solid #f472b6; padding-left:10px;">
              <span style="color:#f472b6; font-weight:700; font-size:12px;">[倫理安全護衛代理人 · Guardian]</span><br>
              <span style="color:#e2e8f0; font-size:13px;">驗證文化敏感度無偏誤，對話內容符合多元文化教育指標。</span>
            </div>
          `;
        }
        output.innerHTML = conversation;
      }, 350);
    });
  }
}
