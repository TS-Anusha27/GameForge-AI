import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Paperclip, 
  Settings, 
  Play, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  AlertCircle,
  Clock,
  Key
} from 'lucide-react';
import { Project } from '../types/game';
import { AIProviderService } from '../services/aiProvider';

interface HomePageProps {
  onCreateWithPrompt: (prompt: string, options?: { dimension: '2D' | '3D'; visualStyle: string }) => void;
  onOpenProject: (projectId: string) => void;
  onOpenSettings: () => void;
  recentProjects: Project[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onCreateWithPrompt,
  onOpenProject,
  onOpenSettings,
  recentProjects
}) => {
  const [promptText, setPromptText] = useState('');
  const [dimensionPref, setDimensionPref] = useState<'3D' | '2D'>('3D');
  const [visualStyle, setVisualStyle] = useState<'Realistic' | 'Stylized'>('Realistic');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);

  const hasKey = AIProviderService.hasValidKey();
  const config = AIProviderService.getConfig();

  const realisticExamples = [
    {
      title: 'Midnight in Chennai (Detective Thriller)',
      prompt: 'Create a realistic detective thriller set in Chennai at midnight. Two adult women discover a chicken leg that connects to a mysterious crime. Give it cinematic graphics, realistic characters, suspense, and an unpredictable story.'
    },
    {
      title: 'Metropolis Crime & Driving (Open-World)',
      prompt: 'Create an open-world crime game with realistic driving, a large city, pedestrians, missions, and cinematic cutscenes.'
    },
    {
      title: 'Shadows of the Abandoned Hospital (Horror)',
      prompt: 'Create an atmospheric horror game set inside an abandoned hospital with flickering lights, flashlight battery mechanics, and suspense.'
    },
    {
      title: 'Apex Urban Drift (Realistic Racing)',
      prompt: 'Create a multiplayer racing game with realistic vehicle physics, tire friction, drifting, and high-speed urban tracks.'
    }
  ];

  const handleLaunch = () => {
    if (!promptText.trim()) return;
    onCreateWithPrompt(promptText.trim(), { dimension: dimensionPref, visualStyle });
  };

  return (
    <div className="chatgpt-home-wrapper">
      {/* Top Notification: Real AI Engine Status */}
      {!hasKey ? (
        <div className="api-notice-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Key size={16} color="#d97706" />
            <span>
              <strong>AI Model Unconfigured:</strong> Running in local semantic reasoning mode. Add an OpenAI or Gemini API key in Settings to enable live LLM game compilation.
            </span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onOpenSettings}>
            Configure API Key
          </button>
        </div>
      ) : (
        <div className="api-notice-banner active-provider">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Cpu size={15} color="#10b981" />
            <span>Connected to <strong>{config.provider.toUpperCase()} ({config.model})</strong> for live game generation.</span>
          </div>
          <button className="btn btn-subtle btn-sm" onClick={onOpenSettings}>
            Manage Model
          </button>
        </div>
      )}

      {/* Main Central ChatGPT-Style Prompt Hub */}
      <div className="chatgpt-hero-center">
        <div className="studio-brand-mark">
          <div className="studio-logo-icon">
            <Sparkles size={24} />
          </div>
          <span className="studio-brand-title">GameForge AI</span>
        </div>

        <h1 className="chatgpt-question-headline">
          What do you want to create?
        </h1>
        <p className="chatgpt-sub-question">
          Describe any game concept in ordinary language. The AI will interpret your intent, design the mechanics, assemble realistic 3D/2D environments, and build a real playable project.
        </p>

        {/* The Central Chat Prompt Box */}
        <div className="chatgpt-prompt-card">
          <textarea
            className="chatgpt-textarea"
            placeholder="e.g. Create a realistic detective thriller set in Chennai at midnight. Two adult women discover a chicken leg that connects to a mysterious crime..."
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleLaunch();
              }
            }}
          />

          {attachedFile && (
            <div className="attachment-chip">
              <Paperclip size={13} />
              <span>{attachedFile}</span>
              <button onClick={() => setAttachedFile(null)} className="remove-attach-btn">✕</button>
            </div>
          )}

          {/* Prompt Controls Footer */}
          <div className="chatgpt-prompt-footer">
            <div className="prompt-left-options">
              {/* Attachment option */}
              <label className="attach-button" title="Attach design doc or concept image">
                <Paperclip size={16} />
                <input 
                  type="file" 
                  style={{ display: 'none' }} 
                  onChange={(e) => {
                    if (e.target.files?.[0]) setAttachedFile(e.target.files[0].name);
                  }} 
                />
              </label>

              {/* Dimension Preference */}
              <div className="toggle-group">
                <button 
                  type="button"
                  className={`toggle-option ${dimensionPref === '3D' ? 'active' : ''}`}
                  onClick={() => setDimensionPref('3D')}
                >
                  3D Engine
                </button>
                <button 
                  type="button"
                  className={`toggle-option ${dimensionPref === '2D' ? 'active' : ''}`}
                  onClick={() => setDimensionPref('2D')}
                >
                  2D Engine
                </button>
              </div>

              {/* Visual Style */}
              <div className="toggle-group">
                <button 
                  type="button"
                  className={`toggle-option ${visualStyle === 'Realistic' ? 'active' : ''}`}
                  onClick={() => setVisualStyle('Realistic')}
                >
                  Realistic
                </button>
                <button 
                  type="button"
                  className={`toggle-option ${visualStyle === 'Stylized' ? 'active' : ''}`}
                  onClick={() => setVisualStyle('Stylized')}
                >
                  Stylized
                </button>
              </div>
            </div>

            <button 
              className="chatgpt-submit-btn"
              onClick={handleLaunch}
              disabled={!promptText.trim()}
              title="Generate Game (Enter)"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Optional Example Prompts Grid */}
        <div className="example-prompts-grid">
          {realisticExamples.map((item, idx) => (
            <button
              key={idx}
              className="example-prompt-card"
              onClick={() => setPromptText(item.prompt)}
              title="Click to load prompt"
            >
              <div className="example-card-title">{item.title}</div>
              <div className="example-card-text">"{item.prompt}"</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Projects Drawer */}
      {recentProjects.length > 0 && (
        <div className="recent-projects-section">
          <div className="recent-header">
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>
              Your Created Game Projects
            </span>
          </div>

          <div className="recent-grid">
            {recentProjects.slice(0, 4).map(p => (
              <div key={p.id} className="recent-card" onClick={() => onOpenProject(p.id)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <strong style={{ fontSize: '0.92rem', color: '#111827' }}>{p.name}</strong>
                  <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{p.engine}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.4, margin: '4px 0 10px', maxHeight: 42, overflow: 'hidden' }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#4f46e5', fontWeight: 600 }}>
                  <span>Open in Studio →</span>
                  <span style={{ color: '#9ca3af' }}>{p.version}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
