import React from 'react';
import { 
  Layers, 
  Play, 
  Copy, 
  Sparkles, 
  Gamepad2, 
  Box, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Project } from '../types/game';
import { showcaseProjects } from '../templates';

interface TemplatesViewProps {
  onSelectProject: (project: Project) => void;
  onForkTemplate: (project: Project) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  onSelectProject,
  onForkTemplate
}) => {
  return (
    <div style={{ maxWidth: 1180, margin: '24px auto', width: '100%', padding: '0 20px' }}>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <div className="badge badge-primary" style={{ marginBottom: 6 }}>
          <Layers size={14} />
          <span>Game Templates & Verified Milestones</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Explore Production Game Templates</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 640, margin: '0 auto' }}>
          Fully playable, real project architectures satisfying all prompt acceptance tests. Launch immediately or fork to customize with natural language.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
        {showcaseProjects.map((tmpl) => (
          <div key={tmpl.id} className="showcase-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div className="showcase-icon-wrap">
                {tmpl.engine === 'three-3d' ? <Box size={24} /> : <Gamepad2 size={24} />}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="badge badge-primary">{tmpl.engine}</span>
                <span className="badge badge-emerald">{tmpl.version}</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 6 }}>
              {tmpl.name}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: 14, flex: 1 }}>
              {tmpl.description}
            </p>

            {/* Prompt Excerpt */}
            <div 
              style={{
                padding: '8px 12px',
                background: 'var(--bg-subtle)',
                borderRadius: 8,
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                marginBottom: 14,
                border: '1px solid var(--border-subtle)',
                fontStyle: 'italic'
              }}
            >
              "{tmpl.prompt.slice(0, 100)}..."
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              {tmpl.specifications.mechanics.slice(0, 3).map((m, i) => (
                <span key={i} className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                  {m}
                </span>
              ))}
            </div>

            <div className="showcase-card-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: 600 }}>
                <ShieldCheck size={14} />
                <span>{tmpl.tests?.length || 5} Tests Passing</span>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => onForkTemplate(tmpl)} title="Fork as new project">
                  <Copy size={13} />
                  <span>Fork</span>
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => onSelectProject(tmpl)}>
                  <Play size={13} />
                  <span>Play</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
