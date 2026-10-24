import React, { useState } from 'react';
import { 
  Sparkles, 
  Gamepad2, 
  Layers, 
  FolderGit2, 
  UserPlus, 
  MapPin, 
  CheckCircle2, 
  Share2, 
  HelpCircle, 
  Settings, 
  Menu, 
  X,
  Play,
  ChevronDown,
  Cpu,
  Key
} from 'lucide-react';
import { Project } from '../types/game';
import { AIProviderService } from '../services/aiProvider';

export type NavigationTab = 
  | 'home' 
  | 'create' 
  | 'studio' 
  | 'projects' 
  | 'templates' 
  | 'character-studio' 
  | 'level-editor' 
  | 'testing-qa' 
  | 'export-publish' 
  | 'docs';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  activeProject: Project | null;
  allProjects: Project[];
  onSelectProject: (id: string) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  activeProject,
  allProjects,
  onSelectProject,
  onOpenSettings
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);

  const hasKey = AIProviderService.hasValidKey();
  const aiConfig = AIProviderService.getConfig();

  const navLinks: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Create', icon: <Sparkles size={15} /> },
    { id: 'studio', label: 'Playable Studio', icon: <Play size={15} /> },
    { id: 'templates', label: 'Showcase', icon: <Layers size={15} /> },
    { id: 'level-editor', label: 'World Editor', icon: <MapPin size={15} /> },
    { id: 'character-studio', label: 'Characters', icon: <UserPlus size={15} /> },
    { id: 'testing-qa', label: 'Testing & QA', icon: <CheckCircle2 size={15} /> },
    { id: 'export-publish', label: 'Export & Android', icon: <Share2 size={15} /> },
    { id: 'projects', label: 'Library', icon: <FolderGit2 size={15} /> },
    { id: 'docs', label: 'Docs', icon: <HelpCircle size={15} /> }
  ];

  return (
    <nav className="app-navbar">
      {/* Brand Logo */}
      <div className="nav-brand" onClick={() => onSelectTab('home')}>
        <div className="brand-logo-icon">
          <Gamepad2 size={18} />
        </div>
        <div className="brand-text-wrap">
          <span className="brand-name">GameForge AI</span>
          <span className="brand-tagline">Playable Reality Studio</span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="nav-links">
        {navLinks.map(link => (
          <button
            key={link.id}
            className={`nav-item ${activeTab === link.id ? 'active' : ''}`}
            onClick={() => {
              onSelectTab(link.id);
              setMobileMenuOpen(false);
            }}
          >
            {link.icon}
            <span>{link.label}</span>
          </button>
        ))}
      </div>

      {/* Right Actions */}
      <div className="nav-actions">
        {/* Real AI Model Status Badge */}
        <button
          onClick={onOpenSettings}
          className={`model-status-pill ${hasKey ? 'active' : 'local'}`}
          title={hasKey ? `Connected to ${aiConfig.provider.toUpperCase()} (${aiConfig.model})` : 'Running in local mode. Click to configure API key.'}
        >
          {hasKey ? (
            <>
              <span className="status-dot green" />
              <span className="model-label">{aiConfig.model}</span>
            </>
          ) : (
            <>
              <span className="status-dot amber" />
              <span className="model-label">Local Engine</span>
            </>
          )}
        </button>

        {/* Active Project Dropdown */}
        {activeProject && (
          <div style={{ position: 'relative' }}>
            <button 
              className="project-quick-selector"
              onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
              title="Switch Active Project"
            >
              <Gamepad2 size={14} color="var(--brand-primary)" />
              <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activeProject.name}
              </span>
              <span className="badge badge-primary" style={{ padding: '1px 5px', fontSize: '0.65rem' }}>
                {activeProject.engine}
              </span>
              <ChevronDown size={14} />
            </button>

            {projectDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: 6,
                  width: 280,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 12,
                  boxShadow: 'var(--shadow-xl)',
                  zIndex: 200,
                  padding: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4
                }}
              >
                <div style={{ padding: '6px 8px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  ACTIVE PROJECTS
                </div>
                {allProjects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectProject(p.id);
                      setProjectDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      background: p.id === activeProject.id ? 'var(--brand-primary-light)' : 'transparent',
                      color: p.id === activeProject.id ? 'var(--brand-primary)' : 'var(--text-main)',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: '0.82rem',
                      fontWeight: p.id === activeProject.id ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.name}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {p.engine}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Button */}
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={onOpenSettings}
          title="Studio Settings & AI Keys"
        >
          <Settings size={16} />
        </button>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="btn btn-secondary btn-sm" 
          id="mobileMenuToggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
