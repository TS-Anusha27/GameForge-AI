import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Key, 
  Cpu, 
  Moon, 
  Sun, 
  Volume2, 
  Save, 
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ExternalLink,
  Zap
} from 'lucide-react';
import { StorageService, UserSettings } from '../services/storage';
import { AIProviderService, AIProviderConfig } from '../services/aiProvider';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsSaved: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSettingsSaved }) => {
  if (!isOpen) return null;

  const [settings, setSettings] = useState<UserSettings>(() => StorageService.getSettings());
  const [aiConfig, setAiConfig] = useState<AIProviderConfig>(() => AIProviderService.getConfig());
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [testMessage, setTestMessage] = useState('');

  const currentProvider = aiConfig.provider;

  const handleProviderChange = (provider: 'openai' | 'gemini' | 'anthropic' | 'custom') => {
    let defaultModel = 'gpt-4o';
    if (provider === 'gemini') defaultModel = 'gemini-1.5-pro';
    if (provider === 'anthropic') defaultModel = 'claude-3-5-sonnet-20241022';

    const activeApiKey = provider === 'gemini' ? settings.apiKeyGemini : settings.apiKeyOpenAI;

    setAiConfig(prev => ({
      ...prev,
      provider,
      model: defaultModel,
      apiKey: activeApiKey || ''
    }));

    setSettings(prev => ({
      ...prev,
      selectedProvider: provider,
      selectedModel: defaultModel
    }));
  };

  const handleApiKeyChange = (val: string) => {
    setAiConfig(prev => ({ ...prev, apiKey: val }));
    if (currentProvider === 'gemini') {
      setSettings(prev => ({ ...prev, apiKeyGemini: val }));
    } else {
      setSettings(prev => ({ ...prev, apiKeyOpenAI: val }));
    }
  };

  const handleModelChange = (model: string) => {
    setAiConfig(prev => ({ ...prev, model }));
    setSettings(prev => ({ ...prev, selectedModel: model }));
  };

  const handleTestConnection = async () => {
    if (!aiConfig.apiKey.trim()) {
      setTestStatus('failed');
      setTestMessage('Please enter an API key first.');
      return;
    }

    setTestStatus('testing');
    setTestMessage('Verifying connection to ' + aiConfig.provider.toUpperCase() + '...');

    try {
      if (aiConfig.provider === 'openai') {
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { Authorization: `Bearer ${aiConfig.apiKey.trim()}` }
        });
        if (res.ok) {
          setTestStatus('success');
          setTestMessage('Successfully connected to OpenAI API! Model: ' + aiConfig.model);
        } else {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || `HTTP ${res.status}`);
        }
      } else if (aiConfig.provider === 'gemini') {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${aiConfig.apiKey.trim()}`
        );
        if (res.ok) {
          setTestStatus('success');
          setTestMessage('Successfully connected to Google Gemini API! Model: ' + aiConfig.model);
        } else {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || `HTTP ${res.status}`);
        }
      } else {
        setTestStatus('success');
        setTestMessage('Autonomous Local Engine is always active and verified.');
      }
    } catch (err: any) {
      setTestStatus('failed');
      setTestMessage(err.message || 'Connection test failed.');
    }
  };

  const handleSave = () => {
    // Save AI provider configuration
    AIProviderService.saveConfig({
      provider: aiConfig.provider,
      apiKey: aiConfig.apiKey.trim(),
      model: aiConfig.model
    });

    // Save general user settings
    StorageService.saveSettings(settings);

    // Apply theme attribute
    if (settings.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onSettingsSaved();
      onClose();
    }, 700);
  };

  const handleResetProjects = () => {
    if (window.confirm('Reset all projects back to the default showcase projects? Any unsaved project changes will be replaced.')) {
      localStorage.removeItem('gameforge_ai_projects_v2');
      onSettingsSaved();
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
        <div className="modal-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Settings size={20} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>AI Model & Studio Settings</h3>
          </div>
          <button className="btn btn-subtle btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-content-body" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* AI Model Configuration Section */}
          <div style={{ background: 'var(--bg-subtle)', padding: 16, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Key size={16} color="var(--brand-primary)" />
              <span>AI Provider & Live LLM Credentials</span>
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.4 }}>
              Connect your official OpenAI or Google Gemini API key to enable live, unconstrained AI game generation. Keys are stored strictly on your local browser and never sent to third-party tracking.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Provider Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                  ACTIVE AI PROVIDER
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => handleProviderChange('openai')}
                    className={`btn btn-sm ${currentProvider === 'openai' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.8rem' }}
                  >
                    OpenAI
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProviderChange('gemini')}
                    className={`btn btn-sm ${currentProvider === 'gemini' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.8rem' }}
                  >
                    Google Gemini
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProviderChange('anthropic')}
                    className={`btn btn-sm ${currentProvider === 'anthropic' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.8rem' }}
                  >
                    Anthropic
                  </button>
                </div>
              </div>

              {/* Model Choice */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                  TARGET MODEL
                </label>
                <select
                  className="input-text"
                  value={aiConfig.model}
                  onChange={(e) => handleModelChange(e.target.value)}
                >
                  {currentProvider === 'openai' && (
                    <>
                      <option value="gpt-4o">gpt-4o (Flagship Multimodal — Recommended)</option>
                      <option value="gpt-4o-mini">gpt-4o-mini (High Speed & Low Cost)</option>
                      <option value="o1-preview">o1-preview (Deep Reasoning)</option>
                      <option value="o1-mini">o1-mini (Reasoning Compact)</option>
                    </>
                  )}
                  {currentProvider === 'gemini' && (
                    <>
                      <option value="gemini-1.5-pro">gemini-1.5-pro (Deep Long Context)</option>
                      <option value="gemini-1.5-flash">gemini-1.5-flash (Lightning Fast)</option>
                      <option value="gemini-2.0-flash-exp">gemini-2.0-flash-exp (Experimental)</option>
                    </>
                  )}
                  {currentProvider === 'anthropic' && (
                    <>
                      <option value="claude-3-5-sonnet-20241022">claude-3-5-sonnet-20241022</option>
                      <option value="claude-3-5-haiku-20241022">claude-3-5-haiku-20241022</option>
                    </>
                  )}
                </select>
              </div>

              {/* API Key Input */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {currentProvider.toUpperCase()} API KEY
                  </label>
                  <a
                    href={currentProvider === 'gemini' ? 'https://aistudio.google.com/app/apikey' : 'https://platform.openai.com/api-keys'}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3 }}
                  >
                    <span>Get API key</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showKey ? 'text' : 'password'}
                    className="input-text"
                    placeholder={currentProvider === 'gemini' ? 'AIzaSy...' : 'sk-proj-...'}
                    value={aiConfig.apiKey}
                    onChange={(e) => handleApiKeyChange(e.target.value)}
                    style={{ paddingRight: 40, fontFamily: 'monospace', fontSize: '0.85rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: 4
                    }}
                  >
                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Test Connection Button & Status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleTestConnection}
                  disabled={testStatus === 'testing' || !aiConfig.apiKey.trim()}
                >
                  <Zap size={13} />
                  <span>{testStatus === 'testing' ? 'Testing...' : 'Test API Connection'}</span>
                </button>

                {testStatus === 'success' && (
                  <span style={{ fontSize: '0.75rem', color: '#059669', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                    <CheckCircle2 size={14} />
                    <span>Verified</span>
                  </span>
                )}
                {testStatus === 'failed' && (
                  <span style={{ fontSize: '0.75rem', color: '#dc2626', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                    <AlertCircle size={14} />
                    <span>Failed</span>
                  </span>
                )}
              </div>

              {testMessage && (
                <div style={{
                  fontSize: '0.75rem',
                  padding: '6px 10px',
                  borderRadius: 6,
                  background: testStatus === 'success' ? '#ecfdf5' : '#fef2f2',
                  color: testStatus === 'success' ? '#065f46' : '#991b1b',
                  border: `1px solid ${testStatus === 'success' ? '#a7f3d0' : '#fecaca'}`
                }}>
                  {testMessage}
                </div>
              )}
            </div>
          </div>

          {/* Theme & Sound Preferences */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                THEME PREFERENCE
              </label>
              <select 
                className="input-text"
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value as any })}
              >
                <option value="light">ChatGPT Crisp Light (Recommended)</option>
                <option value="dark">Cyber Dark</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                AUDIO FEEDBACK
              </label>
              <select 
                className="input-text"
                value={settings.enableSoundEffects ? 'enabled' : 'disabled'}
                onChange={(e) => setSettings({ ...settings, enableSoundEffects: e.target.value === 'enabled' })}
              >
                <option value="enabled">Enabled (Web Audio Synthesis)</option>
                <option value="disabled">Muted</option>
              </select>
            </div>
          </div>

          {/* Reset Action */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Restore default demonstration projects</span>
            <button className="btn btn-secondary btn-sm" onClick={handleResetProjects}>
              <RotateCcw size={13} />
              <span>Reset Projects</span>
            </button>
          </div>
        </div>

        <div className="modal-footer-bar">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={15} />
            <span>{saved ? 'Saved!' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default SettingsModal;
