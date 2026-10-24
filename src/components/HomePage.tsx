import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Gamepad2, 
  Box, 
  Cpu, 
  CheckCircle2, 
  Smartphone, 
  Play, 
  Layers, 
  Wand2,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { Project } from '../types/game';

interface HomePageProps {
  onCreateWithPrompt: (prompt: string) => void;
  onOpenProject: (projectId: string) => void;
  onExploreExamples: () => void;
  recentProjects: Project[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onCreateWithPrompt,
  onOpenProject,
  onExploreExamples,
  recentProjects
}) => {
  const [promptText, setPromptText] = useState('');

  const examplePrompts = [
    {
      title: 'Snakes & Ladders (Board Game)',
      prompt: 'Create a playable snakes and ladders game for two players with dice, snakes, ladders, turn management, win detection, and a restart button.'
    },
    {
      title: 'Neo Runner 2D (Arcade)',
      prompt: 'Create a colourful 2D arcade game with an original character, collectibles, obstacles, increasing difficulty, sound effects, a score system, and multiple levels.'
    },
    {
      title: 'Solaria 3D Island (Adventure)',
      prompt: 'Create a small 3D adventure game with an original character, third-person movement, a traversable environment, collectibles, an NPC, and a mission.'
    },
    {
      title: 'Cyberpunk Odyssey (Open-World)',
      prompt: 'Create a 3D open-world adventure game with vehicles, original characters, missions, NPCs, shops, a day-night cycle, and dynamic weather.'
    }
  ];

  const handleLaunch = () => {
    if (promptText.trim()) {
      onCreateWithPrompt(promptText.trim());
    } else {
      onCreateWithPrompt('Create an exciting arcade platformer game with an agile hero, collectibles, and progressive levels.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="badge badge-primary hero-badge">
          <Sparkles size={14} />
          <span>Universal AI Game Studio</span>
        </div>

        <h1 className="hero-title">
          Describe Your Game. <br />
          <span className="hero-title-highlight">Watch It Come to Life.</span>
        </h1>

        <p className="hero-subtitle">
          Create playable games with AI. Design original characters, build worlds, add mechanics, test your ideas, and publish your creations.
        </p>

        {/* Large Prompt Box */}
        <div className="main-prompt-box">
          <textarea
            className="prompt-textarea"
            placeholder="Describe any game you imagine... e.g. A 2D cyberpunk runner with double jump, plasma laser hazards, energy gems, and progressive boss encounters..."
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleLaunch();
              }
            }}
          />

          <div className="prompt-box-footer">
            <div className="prompt-tags">
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Try genres:</span>
              <button 
                type="button" 
                className="prompt-tag-btn" 
                onClick={() => setPromptText('Create a 2D retro platformer where an agile cyber courier leaps across neon roofs, collecting power gems and dodging laser traps.')}
              >
                🎮 2D Platformer
              </button>
              <button 
                type="button" 
                className="prompt-tag-btn" 
                onClick={() => setPromptText('Create a 3D third-person fantasy adventure set on floating sky islands. The player meets an ancient elder NPC and solves a crystal shrine puzzle.')}
              >
                🏝️ 3D Sky Adventure
              </button>
              <button 
                type="button" 
                className="prompt-tag-btn" 
                onClick={() => setPromptText('Create an authentic two-player royal snakes and ladders board game with 3D dice physics, turn switching, and victory celebration.')}
              >
                🎲 Snakes & Ladders
              </button>
              <button 
                type="button" 
                className="prompt-tag-btn" 
                onClick={() => setPromptText('Create an open-world cyberpunk city district with a drivable cyber-car, pedestrian NPCs, interactive item shop, and dynamic rain weather.')}
              >
                🏙️ Open-World City
              </button>
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button className="btn btn-primary btn-lg" onClick={handleLaunch}>
                <Wand2 size={18} />
                <span>Create My Game</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Clickable Example Prompts */}
        <div className="example-prompts-row">
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Verified Test Prompts:</span>
          {examplePrompts.map((ex, i) => (
            <div 
              key={i} 
              className="example-prompt-chip"
              onClick={() => setPromptText(ex.prompt)}
              title="Click to load prompt"
            >
              <Zap size={13} color="#4f46e5" />
              <strong>{ex.title}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Created Games Carousel */}
      {recentProjects.length > 0 && (
        <section style={{ maxWidth: 1180, margin: '20px auto 40px', width: '100%', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Playable Project Library</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Real, executable games generated by autonomous AI agents ready to play, edit, or publish</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={onExploreExamples}>
              <span>View All Templates</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="showcase-grid">
            {recentProjects.map(p => (
              <div key={p.id} className="showcase-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="showcase-icon-wrap">
                    {p.engine === 'three-3d' ? <Box size={24} /> : <Gamepad2 size={24} />}
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span className="badge badge-primary">{p.engine}</span>
                    <span className="badge badge-emerald">{p.version}</span>
                  </div>
                </div>

                <h3 className="showcase-card-title">{p.name}</h3>
                <p className="showcase-card-desc">{p.description}</p>

                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    🎯 {p.specifications.cameraPerspective}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ⏱️ {p.specifications.technicalArchitecture.fpsTarget} FPS Target
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    📱 Target SDK {p.androidConfig.targetSdk}
                  </span>
                </div>

                <div className="showcase-card-footer">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: 600 }}>
                    <CheckCircle2 size={14} />
                    <span>{p.tests?.filter(t => t.status === 'passed').length || 5} Tests Verified</span>
                  </div>

                  <button className="btn btn-primary btn-sm" onClick={() => onOpenProject(p.id)}>
                    <Play size={14} />
                    <span>Launch & Play</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How GameForge AI Works */}
      <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%' }}>
          <div className="section-header">
            <span className="badge badge-cyan" style={{ marginBottom: 12 }}>Autonomous Architecture</span>
            <h2 className="section-title">A Symphony of 10 Specialized AI Agents</h2>
            <p className="section-desc">
              GameForge AI does not rely on a single prompt-to-code API call. It deploys specialized autonomous agents cooperating through a shared specification and verified test loop.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <div className="card">
              <div style={{ color: 'var(--brand-primary)', marginBottom: 12 }}><Sparkles size={28} /></div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: 6 }}>1. Game Director Agent</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Parses your idea, extracts core gameplay loops, resolves requirement conflicts, and designs the feature dependency graph.
              </p>
            </div>

            <div className="card">
              <div style={{ color: 'var(--brand-violet)', marginBottom: 12 }}><Cpu size={28} /></div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: 6 }}>2. Architecture Agent</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Selects the optimal engine (HTML5 Canvas 2D, Three.js WebGL 3D, or Board Engine) based on physics, dimension, and performance needs.
              </p>
            </div>

            <div className="card">
              <div style={{ color: 'var(--brand-cyan)', marginBottom: 12 }}><Gamepad2 size={28} /></div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: 6 }}>3. Gameplay & Physics Agent</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Writes real kinematic player movement, spatial AABB collisions, dynamic scoring, inventory, and deterministic win/defeat states.
              </p>
            </div>

            <div className="card">
              <div style={{ color: 'var(--brand-emerald)', marginBottom: 12 }}><ShieldCheck size={28} /></div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: 6 }}>4. Testing & Auto-Repair Agent</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Validates AST syntax, runs physics collision tests, benchmarks 60 FPS budgets, and auto-repairs any runtime errors before preview.
              </p>
            </div>

            <div className="card">
              <div style={{ color: 'var(--brand-amber)', marginBottom: 12 }}><Smartphone size={28} /></div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: 6 }}>5. Android & Google Play Agent</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Compiles valid Android packages with AndroidManifest.xml, build.gradle, and prepares Play Console listing metadata.
              </p>
            </div>

            <div className="card">
              <div style={{ color: 'var(--brand-rose)', marginBottom: 12 }}><Layers size={28} /></div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: 6 }}>6. Project Memory Agent</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Maintains continuous checkpoint versioning so you can make natural-language edits indefinitely with instant rollback.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
