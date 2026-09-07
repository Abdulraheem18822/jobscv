import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized GenAI client
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
});

// AI Polish & Enhance endpoint
app.post('/api/ai/enhance', async (req: Request, res: Response) => {
  try {
    const { text, mode, language = 'en', candidateName, facility } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for AI enhancement' });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. You can edit the text directly in the editor.',
      });
    }

    let instruction = '';
    if (mode === 'amazon_tone') {
      instruction = `You are an expert career consultant specializing in Amazon logistics and fulfillment center jobs in Poland. Rewrite the following cover letter content to highlight Amazon Leadership Principles (Safety, Quality, Bias for Action, Deliver Results, Customer Obsession) and emphasize reliability for a 4x10h shift warehouse environment. Keep the tone professional, direct, and enthusiastic. Output only the improved text with no conversational preamble or markdown code fences. Language: ${language === 'pl' ? 'Polish' : 'English'}. Candidate: ${candidateName || 'Candidate'}. Target facility: ${facility || 'Amazon Poland'}.`;
    } else if (mode === 'shorten') {
      instruction = `Condense the following cover letter text so it is punchy, high-impact, and fits strictly onto a single standard page while preserving key qualifications for Amazon warehouse work in Poland. Output only the rewritten text. Language: ${language === 'pl' ? 'Polish' : 'English'}.`;
    } else if (mode === 'fix_grammar') {
      instruction = `Proofread and polish the grammar, vocabulary, and flow of the following cover letter for an Amazon warehouse position in Poland. Maintain natural, formal professional phrasing. Output only the corrected text. Language: ${language === 'pl' ? 'Polish' : 'English'}.`;
    } else {
      instruction = `Enhance and polish the following cover letter text for an Amazon warehouse associate job application in Poland. Ensure it sounds confident, hardworking, and attentive to warehouse safety. Output only the improved text. Language: ${language === 'pl' ? 'Polish' : 'English'}.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `${instruction}\n\nOriginal Text:\n"""\n${text}\n"""`,
    });

    const enhancedText = response.text ? response.text.trim() : text;
    res.json({ result: enhancedText });
  } catch (error: any) {
    console.error('Gemini enhance error:', error);
    res.status(500).json({
      error: error.message || 'Failed to enhance cover letter text with AI.',
    });
  }
});

// AI Translation endpoint (English <-> Polish tailored for Amazon Logistics)
app.post('/api/ai/translate', async (req: Request, res: Response) => {
  try {
    const { letterContent, targetLanguage } = req.body;

    if (!letterContent) {
      return res.status(400).json({ error: 'Letter content is required' });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured.',
      });
    }

    const targetLangName = targetLanguage === 'pl' ? 'Polish (Polski)' : 'English';
    const prompt = `You are an expert translator specializing in Polish employment documents and Amazon fulfillment center terminology (e.g. Operator Magazynowy, skaner RF, kompletowanie zamówień, przepisy BHP, praca zmianowa 4x10h, legalne zatrudnienie).

Translate the following cover letter paragraphs into natural, highly professional, formal ${targetLangName}.
Return valid JSON matching this exact structure:
{
  "salutation": "...",
  "paragraph1_intro": "...",
  "paragraph2_experience": "...",
  "paragraph3_skills_safety": "...",
  "paragraph4_eligibility_shifts": "...",
  "paragraph5_closing": "...",
  "signOff": "..."
}

Original letter sections:
${JSON.stringify(letterContent, null, 2)}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const rawJson = response.text ? response.text.trim() : '{}';
    const translated = JSON.parse(rawJson);
    res.json({ result: translated });
  } catch (error: any) {
    console.error('Gemini translate error:', error);
    res.status(500).json({
      error: error.message || 'Failed to translate cover letter.',
    });
  }
});

// Vite middleware & Production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
