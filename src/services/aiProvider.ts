// Real AI Model Provider Integration
// Connects to official OpenAI, Google Gemini, Anthropic, or custom endpoint APIs.

export interface AIProviderConfig {
  provider: 'openai' | 'gemini' | 'anthropic' | 'custom';
  apiKey: string;
  model: string;
  customEndpoint?: string;
}

export interface GeneratedGameProject {
  title: string;
  genre: string;
  dimension: '2D' | '3D';
  concept: string;
  coreMechanics: string[];
  controls: {
    keyboard: string[];
    touch?: string;
  };
  files: {
    'index.html': string;
    'game.js': string;
    'style.css': string;
  };
}

const STORAGE_KEY_AI_CONFIG = 'gameforge_ai_provider_config_v2';

export class AIProviderService {
  public static getConfig(): AIProviderConfig {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AI_CONFIG);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load AI config from storage:', e);
    }

    // Default configuration (checks environment or defaults to unconfigured OpenAI)
    return {
      provider: 'openai',
      apiKey: '',
      model: 'gpt-4o'
    };
  }

  public static saveConfig(cfg: AIProviderConfig): void {
    localStorage.setItem(STORAGE_KEY_AI_CONFIG, JSON.stringify(cfg));
  }

  public static hasValidKey(): boolean {
    const cfg = AIProviderService.getConfig();
    return Boolean(cfg.apiKey && cfg.apiKey.trim().length > 5);
  }

  /**
   * Calls the configured real AI model to generate a custom game based on the user's prompt.
   */
  public static async generateGameWithAI(
    userPrompt: string,
    options?: { dimension?: '2D' | '3D'; visualStyle?: string }
  ): Promise<GeneratedGameProject> {
    const config = AIProviderService.getConfig();

    if (!AIProviderService.hasValidKey()) {
      throw new Error(
        'AI_KEY_MISSING: No API key configured. Please configure your OpenAI or Gemini API key in the AI Model settings to generate custom games using live LLM models.'
      );
    }

    const systemPrompt = `You are a world-class Principal Game Architect and Senior Creative Developer.
Your task is to take any game prompt from the user and generate a REAL, complete, fully working, interactive game project tailored specifically to their request.
Do NOT output a generic platformer unless the user specifically asked for one.
If they ask for a detective game, write real investigation logic, clues, suspects, and dialogue.
If they ask for driving, write vehicle physics and roads.
If they ask for horror, write dark atmospheric 3D rooms and suspense.
If 3D, use Three.js (r128) via CDN in index.html.

Respond strictly with valid JSON conforming to this schema:
{
  "title": "String",
  "genre": "String",
  "dimension": "2D" | "3D",
  "concept": "String summary",
  "coreMechanics": ["String"],
  "controls": {
    "keyboard": ["String"]
  },
  "files": {
    "index.html": "<!DOCTYPE html><html>...</html>",
    "game.js": "// Complete runnable JavaScript...",
    "style.css": "/* Complete CSS styling */"
  }
}`;

    if (config.provider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey.trim()}`
        },
        body: JSON.stringify({
          model: config.model || 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Prompt: ${userPrompt}\nPreferred Dimension: ${options?.dimension || 'Automatic'}\nVisual Style: ${options?.visualStyle || 'Realistic / Tailored'}` }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `OpenAI API returned error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error('OpenAI returned an empty response.');

      return JSON.parse(content) as GeneratedGameProject;
    } 
    
    if (config.provider === 'gemini') {
      const model = config.model.includes('gemini') ? config.model : 'gemini-1.5-pro';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey.trim()}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: systemPrompt },
                { text: `Prompt: ${userPrompt}\nGenerate the complete game JSON.` }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7
          }
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || `Gemini API returned error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Gemini returned an empty response.');

      return JSON.parse(rawText) as GeneratedGameProject;
    }

    throw new Error(`Provider "${config.provider}" is not yet supported for direct browser execution. Please use OpenAI or Gemini.`);
  }

  /**
   * Calls the configured AI model to perform a natural language edit on an existing game project.
   */
  public static async editGameWithAI(
    currentFiles: Record<string, string>,
    userInstruction: string
  ): Promise<{ updatedFiles: Record<string, string>; explanation: string; diffSummary: string }> {
    const config = AIProviderService.getConfig();

    if (!AIProviderService.hasValidKey()) {
      throw new Error(
        'AI_KEY_MISSING: No API key configured. Please configure your OpenAI or Gemini API key in Settings to execute live AI model edits.'
      );
    }

    const systemPrompt = `You are an expert game programming copilot.
The user wants to make a modification to their existing game project.
Perform surgical, minimal edits to the code. Preserve all existing working features and mechanics.
Return strictly valid JSON:
{
  "updatedFiles": {
    "index.html": "...",
    "game.js": "...",
    "style.css": "..."
  },
  "explanation": "Short description of what was changed",
  "diffSummary": "Summary of changes made"
}`;

    const contextPayload = {
      instruction: userInstruction,
      currentFiles
    };

    if (config.provider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey.trim()}`
        },
        body: JSON.stringify({
          model: config.model || 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: JSON.stringify(contextPayload) }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.4
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `OpenAI API returned error ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      return JSON.parse(content);
    }

    throw new Error('Please configure OpenAI or Gemini in Settings for live conversational editing.');
  }
}
