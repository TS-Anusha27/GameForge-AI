import React, { useState } from 'react';
import { 
  Share2, 
  Download, 
  Smartphone, 
  CheckCircle2, 
  Globe, 
  FileText, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { Project, AndroidConfig } from '../types/game';
import { ExportService } from '../services/exportService';
import { StorageService } from '../services/storage';

interface ExportPublishViewProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
}

export const ExportPublishView: React.FC<ExportPublishViewProps> = ({ project, onUpdateProject }) => {
  const [config, setConfig] = useState<AndroidConfig>(project.androidConfig);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [isExportingAndroid, setIsExportingAndroid] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleConfigChange = (key: keyof AndroidConfig, val: any) => {
    const updated = { ...config, [key]: val };
    setConfig(updated);
    const updatedProject: Project = { ...project, androidConfig: updated };
    onUpdateProject(updatedProject);
    StorageService.saveProject(updatedProject);
  };

  const handleDownloadWeb = async () => {
    setIsExportingZip(true);
    try {
      await ExportService.downloadWebBundle(project);
    } finally {
      setIsExportingZip(false);
    }
  };

  const handleDownloadAndroid = async () => {
    setIsExportingAndroid(true);
    try {
      await ExportService.downloadAndroidPackage(project);
    } finally {
      setIsExportingAndroid(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', width: '100%', padding: '0 20px' }}>
      <div style={{ marginBottom: 24 }}>
        <div className="badge badge-primary" style={{ marginBottom: 6 }}>
          <Share2 size={14} />
          <span>Export & Google Play Publishing Hub</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Publish Your Creation to the World</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Generate standalone offline web bundles or complete, signed Android packages ready for Google Play Console submission.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(360px, 1fr) 380px', gap: 24 }}>
        {/* Left: Google Play Listing Metadata & Configuration */}
        <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
            Google Play Store Listing Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                APP / GAME TITLE
              </label>
              <input 
                type="text" 
                className="input-text" 
                value={config.appName} 
                onChange={(e) => handleConfigChange('appName', e.target.value)} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                PACKAGE IDENTIFIER
              </label>
              <input 
                type="text" 
                className="input-text" 
                value={config.packageName} 
                onChange={(e) => handleConfigChange('packageName', e.target.value)} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                VERSION NAME
              </label>
              <input 
                type="text" 
                className="input-text" 
                value={config.versionName} 
                onChange={(e) => handleConfigChange('versionName', e.target.value)} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                VERSION CODE
              </label>
              <input 
                type="number" 
                className="input-text" 
                value={config.versionCode} 
                onChange={(e) => handleConfigChange('versionCode', parseInt(e.target.value) || 100)} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                ORIENTATION
              </label>
              <select 
                className="input-text" 
                value={config.orientation}
                onChange={(e) => handleConfigChange('orientation', e.target.value)}
              >
                <option value="sensorLandscape">Landscape</option>
                <option value="sensorPortrait">Portrait</option>
                <option value="auto">Auto Sensor</option>
              </select>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                SHORT DESCRIPTION (Max 80 chars)
              </label>
              <button 
                className="btn btn-subtle btn-sm"
                style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                onClick={() => copyToClipboard(config.shortDescription, 'short')}
              >
                {copiedKey === 'short' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedKey === 'short' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <input 
              type="text" 
              className="input-text" 
              maxLength={80}
              value={config.shortDescription} 
              onChange={(e) => handleConfigChange('shortDescription', e.target.value)} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                FULL STORE DESCRIPTION (Max 4000 chars)
              </label>
              <button 
                className="btn btn-subtle btn-sm"
                style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                onClick={() => copyToClipboard(config.fullDescription, 'full')}
              >
                {copiedKey === 'full' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedKey === 'full' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea 
              className="textarea-field" 
              rows={4}
              value={config.fullDescription} 
              onChange={(e) => handleConfigChange('fullDescription', e.target.value)} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                CONTENT RATING
              </label>
              <input 
                type="text" 
                className="input-text" 
                value={config.contentRating} 
                onChange={(e) => handleConfigChange('contentRating', e.target.value)} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                PRIVACY POLICY URL
              </label>
              <input 
                type="text" 
                className="input-text" 
                value={config.privacyPolicyUrl} 
                onChange={(e) => handleConfigChange('privacyPolicyUrl', e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Right: Build Artifacts & Google Play Step-by-Step Workflow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Web Bundle Export Card */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <Globe size={22} color="var(--brand-primary)" />
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Offline Web Bundle (.ZIP)</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Self-contained HTML, JS, and CSS runnable anywhere offline
                </p>
              </div>
            </div>
            <button 
              className="btn btn-secondary" 
              style={{ width: '100%' }}
              onClick={handleDownloadWeb}
              disabled={isExportingZip}
            >
              <Download size={15} />
              <span>{isExportingZip ? 'Packing Bundle...' : 'Download Playable Web ZIP'}</span>
            </button>
          </div>

          {/* Android AAB Package Export Card */}
          <div className="card" style={{ padding: 20, border: '2px solid var(--brand-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <Smartphone size={22} color="var(--brand-primary)" />
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Android Project & AAB Bundle</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Includes AndroidManifest.xml, build.gradle, and Play metadata
                </p>
              </div>
            </div>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginBottom: 10 }}
              onClick={handleDownloadAndroid}
              disabled={isExportingAndroid}
            >
              <Download size={15} />
              <span>{isExportingAndroid ? 'Building Android ZIP...' : 'Download Android Release Package'}</span>
            </button>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              ✓ Target SDK 34 Verified • Manifest Permissions Configured
            </div>
          </div>

          {/* Google Play Submission Checklist */}
          <div className="card" style={{ padding: 20 }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: 12 }}>
              Google Play Console Upload Steps:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge badge-emerald" style={{ padding: '1px 6px', fontSize: '0.65rem' }}>1</span>
                <span>Extract the downloaded Android Release ZIP.</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge badge-emerald" style={{ padding: '1px 6px', fontSize: '0.65rem' }}>2</span>
                <span>Run <code>./gradlew bundleRelease</code> to build signed AAB.</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge badge-emerald" style={{ padding: '1px 6px', fontSize: '0.65rem' }}>3</span>
                <span>Open Google Play Console and upload <code>app-release.aab</code>.</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge badge-emerald" style={{ padding: '1px 6px', fontSize: '0.65rem' }}>4</span>
                <span>Copy metadata descriptions into Store Listing and submit!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
