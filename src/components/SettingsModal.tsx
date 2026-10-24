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
  CheckCircle2
} from 'lucide-react';
import { StorageService, UserSettings } from '../services/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsSaved: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSettingsSaved }) => {
  if (!isOpen) return null;

  const [settings, setSettings] = useState<UserSettings>(() => StorageService.getSettings());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    StorageService.saveSettings(settings);
    // Apply theme attribute to document
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
    }, 1000);
  };

  const handleResetProjects = () => {
    if (window.confirm('Reset all projects back to the default verified showcase templates? Any unsaved project changes will be replaced.')) {
      localStorage.removeItem('gameforge_ai_projects_v1');
      onSettingsSaved();
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Settings size={20} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Account & Studio Settings</h3>
          </div>
          <button className="btn btn-subtle btn-sm" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-content-body">
          {/* AI Provider Configuration */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Key size={16} />
              <span>AI Provider & Model Credentials</span>
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 10 }}>
              GameForge AI runs autonomous local client agents with optional Gemini/OpenAI API acceleration. Keys are securely kept in local client storage and never exposed.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                  PRIMARY AI ENGINE
                </label>
                <select 
                  className="input-text"
                  value={settings.selectedProvider}
                  onChange={(e) => setSettings({ ...settings, selectedProvider: e.target.value as any })}
                >
                  <option value="auto">Autonomous Hybrid (Local Agent + Fast Synthesis)</option>
                  <option value="gemini">Google Gemini Pro / Flash</option>
                  <option value="openai">OpenAI GPT-4o / Codex</option>
                  <option value="local_agent">Pure Local Offline Autonomous Mode</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                  GEMINI API KEY (OPTIONAL)
                </label>
                <input 
                  type="password" 
                  className="input-text"
                  placeholder="AIzaSy..."
                  value={settings.apiKeyGemini}
                  onChange={(e) => setSettings({ ...settings, apiKeyGemini: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Compute & Resource Quota */}
          <div style={{ padding: 14, background: 'var(--bg-subtle)', borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Cpu size={15} color="var(--brand-primary)" />
                <span>Compute Quota Tier</span>
              </span>
              <span className="badge badge-emerald">PRO COMPUTE</span>
            </div>
            <div style={{ height: 8, background: 'var(--border-subtle)', borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${(settings.computeQuotaUsed / settings.computeQuotaMax) * 100}%`,
                  background: 'linear-gradient(90deg, #10b981, #06b6d4)'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Used: {settings.computeQuotaUsed} build minutes</span>
              <span>Available: {settings.computeQuotaMax} min/month</span>
            </div>
          </div>

          {/* Theme & Sound Preferences */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                THEME PREFERENCE
              </label>
              <select 
                className="input-text"
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value as any })}
              >
                <option value="light">Premium Light (Recommended)</option>
                <option value="dark">Cyber Dark</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                STUDIO SOUND EFFECTS
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

          {/* Factory Reset Action */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Restore default verified project showcase</span>
            <button className="btn btn-secondary btn-sm" onClick={handleResetProjects}>
              <RotateCcw size={13} />
              <span>Reset Showcase Projects</span>
            </button>
          </div>
        </div>

        <div className="modal-footer-bar">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={15} />
            <span>{saved ? 'Saved!' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
