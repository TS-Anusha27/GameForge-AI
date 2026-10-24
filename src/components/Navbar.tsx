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
  ChevronDown
} from 'lucide-react';
import { Project } from '../types/game';

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

  const navLinks: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Sparkles size={16} /> },
    { id: 'create', label: 'Create Game', icon: <Sparkles size={16} /> },
    { id: 'studio', label: 'Playable Studio', icon: <Play size={16} /> },
    { id: 'templates', label: 'Templates', icon: <Layers size={16} /> },
    { id: 'character-studio', label: 'Character Studio', icon: <UserPlus size={16} /> },
    { id: 'level-editor', label: 'World Editor', icon: <MapPin size={16} /> },
    { id: 'testing-qa', label: 'Testing & QA', icon: <CheckCircle2 size={16} /> },
    { id: 'export-publish', label: 'Export & Android', icon: <Share2 size={16} /> },
    { id: 'projects', label: 'My Projects', icon: <FolderGit2 size={16} /> },
    { id: 'docs', label: 'Docs', icon: <HelpCircle size={16} /> }
  ];

  return (
    <nav className="app-navbar">
      {/* Brand Logo */}
      <div className="nav-brand" onClick={() => onSelectTab('home')}>
        <div className="brand-logo-icon">
          <Gamepad2 size={20} />
        </div>
        <div className="brand-text-wrap">
          <span className="brand-name">GameForge AI</span>
          <span className="brand-tagline">Your Imagination. A Playable Reality.</span>
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
        {/* Active Project Dropdown */}
        {activeProject && (
          <div style={{ position: 'relative' }}>
            <button 
              className="project-quick-selector"
              onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
              title="Switch Active Project"
            >
              <Gamepad2 size={14} color="#4f46e5" />
              <span style={{ maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activeProject.name}
              </span>
              <span className="badge badge-primary" style={{ padding: '1px 5px', fontSize: '0.65rem' }}>
                {activeProject.version}
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
                  width: 260,
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
                <div style={{ padding: '6px 8px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
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
                      {p.version}
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
          title="Studio Settings & Compute Quota"
        >
          <Settings size={16} />
        </button>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="btn btn-secondary btn-sm" 
          style={{ display: 'none' }}
          id="mobileMenuToggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </nav>
  );
};
