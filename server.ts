import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Resume Assistant endpoint
  app.post('/api/ai-chat', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY 未設定，請於 Secrets 中配置 API 金鑰。'
        });
      }

      const { message, profileContext, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: '請提供訊息內容 (message)' });
      }

      // Clean profileContext copy so base64 avatar strings don't bloat prompt text
      const cleanContext = profileContext ? { ...profileContext } : {};
      if (cleanContext.avatarUrl && cleanContext.avatarUrl.startsWith('data:image/')) {
        cleanContext.avatarUrl = '[User Uploaded Custom Avatar Image]';
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemPrompt = `你是一位親切、專業的 AI 個人履歷與作品集助理。
你的任務是代表個人網頁的主人（${cleanContext?.name || '陳哲遠 Alex Chen'}）回答訪客、招募人員或合作夥伴的提問。

【個人檔案背景資料】：
姓名：${cleanContext?.name || '陳哲遠 (Alex Chen)'}
頭銜：${cleanContext?.title || '資深全棧工程師 & UI/UX 設計師'}
一句話簡介：${cleanContext?.tagline || '專注於高軟體品質、AI 應用整合與極致使用者體驗的產品工程師'}
主要地點：${cleanContext?.location || '台北, 台灣 (接受 Remote)'}
工作狀態：${cleanContext?.status || '🟢 尋找新機會中 / 接受專案顧問'}

關於我：
${cleanContext?.bio || '擁有 5+ 年全棧開發經驗，精通 React/TypeScript/Node.js/Python 與 Cloud 雲端架構。熱愛極簡美學與順暢的操作體驗，擅長將複雜的業務需求轉化為優雅高效的產品。'}

核心技能：
${JSON.stringify(cleanContext?.skills || [], null, 2)}

工作經歷摘要：
${JSON.stringify(cleanContext?.experiences || [], null, 2)}

精選作品集：
${JSON.stringify(cleanContext?.projects || [], null, 2)}

聯絡方式：
- Email: ${cleanContext?.email || 'alex.chen.dev@example.com'}
- GitHub: ${cleanContext?.github || 'https://github.com'}
- LinkedIn: ${cleanContext?.linkedin || 'https://linkedin.com'}

【回答原則】：
1. 請以禮貌、專業且誠懇的語氣回答訪客。
2. 根據上述提供的個人資料來回答，若問及未提及之資訊，可客氣說明並建議直接透過 Email 或聯絡表單與主人聯繫。
3. 請使用 Traditional Chinese (繁體中文) 回答，除非訪客以其他語言提問。
4. 保持回答條理分明、重點突出，可適當使用 Markdown (如粗體、條列點)。
5. 若訪客表達求職邀約或合作意願，熱情感謝並導引他們留下聯絡方式。`;

      // Build context messages
      const contents = [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: '好的！我已完全掌握陳哲遠 Alex Chen 的個人檔案與作品集資訊。我是他的 AI 履歷助理，請隨時向我提問！' }] }
      ];

      if (Array.isArray(history)) {
        history.forEach((item: any) => {
          if (item.sender === 'user' || item.sender === 'ai') {
            contents.push({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }]
            });
          }
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
      });

      const responseText = response.text || '抱歉，目前無法取得回覆，請稍後再試。';

      return res.json({ reply: responseText });
    } catch (err: any) {
      console.error('Error in /api/ai-chat:', err);
      return res.status(500).json({
        error: 'AI 服務處理失敗：' + (err.message || '未知錯誤')
      });
    }
  });

  // Vite development middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
