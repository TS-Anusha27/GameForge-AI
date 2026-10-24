import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Play, 
  Copy, 
  Trash2, 
  Download, 
  Search, 
  Filter, 
  Clock, 
  Smartphone,
  Box,
  Gamepad2
} from 'lucide-react';
import { Project } from '../types/game';
import { StorageService } from '../services/storage';
import { ExportService } from '../services/exportService';

interface ProjectsLibraryViewProps {
  projects: Project[];
  activeProjectId: string;
  onOpenProject: (projectId: string) => void;
  onCreateNew: () => void;
  onProjectsChange: () => void;
}

export const ProjectsLibraryView: React.FC<ProjectsLibraryViewProps> = ({
  projects,
  activeProjectId,
  onOpenProject,
  onCreateNew,
  onProjectsChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEngine, setFilterEngine] = useState<string>('all');

  const filtered = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEngine = filterEngine === 'all' || p.engine === filterEngine;
    return matchesSearch && matchesEngine;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete project "${name}"? This action cannot be undone.`)) {
      StorageService.deleteProject(id);
      onProjectsChange();
    }
  };

  const handleDuplicate = (id: string) => {
    StorageService.duplicateProject(id);
    onProjectsChange();
  };

  return (
    <div style={{ maxWidth: 1180, margin: '24px auto', width: '100%', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div className="badge badge-primary" style={{ marginBottom: 6 }}>
            <FolderGit2 size={14} />
            <span>Workspace Library</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>My Saved Game Projects</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Persistent project store with version histories, checkpoints, and export artifacts.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onCreateNew}>
          <Plus size={16} />
          <span>New Game Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          marginBottom: 24,
          flexWrap: 'wrap'
        }}
      >
        <div style={{ position: 'relative', flex: 1, maxWidth: 380 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="input-text" 
            style={{ paddingLeft: 36 }}
            placeholder="Search projects by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Filter size={15} color="var(--text-muted)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>Engine:</span>
          <select 
            className="input-text" 
            style={{ width: 170 }}
            value={filterEngine}
            onChange={(e) => setFilterEngine(e.target.value)}
          >
            <option value="all">All Engines</option>
            <option value="canvas-2d">HTML5 Canvas 2D</option>
            <option value="three-3d">Three.js WebGL 3D</option>
            <option value="board-engine">Board Game Engine</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        {filtered.map(p => {
          const isActive = p.id === activeProjectId;
          return (
            <div 
              key={p.id} 
              className="card" 
              style={{
                border: isActive ? '2px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {isActive && (
                <div 
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'var(--brand-primary)',
                    color: 'white',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 9999
                  }}
                >
                  ACTIVE IN STUDIO
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div className="showcase-icon-wrap" style={{ width: 40, height: 40, marginBottom: 0 }}>
                  {p.engine === 'three-3d' ? <Box size={20} /> : <Gamepad2 size={20} />}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{p.name}</h3>
                  <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{p.engine}</span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>{p.version}</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 14, flex: 1 }}>
                {p.description}
              </p>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 14, display: 'flex', justifyContent: 'space-between' }}>
                <span>Updated: {new Date(p.updatedAt).toLocaleDateString()}</span>
                <span>{p.checkpoints?.length || 1} Checkpoints</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button 
                    className="btn btn-subtle btn-sm"
                    onClick={() => handleDuplicate(p.id)}
                    title="Duplicate Project"
                  >
                    <Copy size={14} />
                  </button>
                  <button 
                    className="btn btn-subtle btn-sm"
                    onClick={() => ExportService.downloadWebBundle(p)}
                    title="Export Web ZIP"
                  >
                    <Download size={14} />
                  </button>
                  <button 
                    className="btn btn-subtle btn-sm"
                    onClick={() => handleDelete(p.id, p.name)}
                    title="Delete Project"
                    style={{ color: '#ef4444' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => onOpenProject(p.id)}
                >
                  <Play size={13} />
                  <span>Open in Studio</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
