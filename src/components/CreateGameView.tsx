import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Layers, 
  Cpu, 
  Gamepad2, 
  Sliders, 
  Play,
  RotateCcw
} from 'lucide-react';
import { Project, AgentTask, GameGenre, EngineType } from '../types/game';
import { AIAgentOrchestrator } from '../services/aiAgents';
import confetti from 'canvas-confetti';

interface CreateGameViewProps {
  initialPrompt?: string;
  onGameCreated: (project: Project) => void;
  onOpenStudio: () => void;
}

export const CreateGameView: React.FC<CreateGameViewProps> = ({
  initialPrompt = '',
  onGameCreated,
  onOpenStudio
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [selectedGenre, setSelectedGenre] = useState<GameGenre>('arcade');
  const [selectedDim, setSelectedDim] = useState<'2D' | '3D'>('2D');
  const [selectedEngine, setSelectedEngine] = useState<EngineType>('canvas-2d');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [createdProject, setCreatedProject] = useState<Project | null>(null);

  const handleStartGeneration = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setCreatedProject(null);

    try {
      const project = await AIAgentOrchestrator.generateGame(
        prompt.trim(),
        {
          genre: selectedGenre,
          dimension: selectedDim,
          engine: selectedEngine
        },
        (_task, allTasks) => {
          setTasks([...allTasks]);
        }
      );

      setCreatedProject(project);
      onGameCreated(project);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Error during generation:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ maxWidth: 1080, margin: '24px auto', width: '100%', padding: '0 20px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <div className="badge badge-primary" style={{ marginBottom: 8 }}>
          <Sparkles size={14} />
          <span>Autonomous AI Game Creation Workspace</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: 8 }}>
          Turn Any Game Idea Into Playable Reality
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 640, margin: '0 auto' }}>
          Describe gameplay mechanics, characters, rules, and art styles. The specialized agent team designs, codes, tests, and packages your real game project.
        </p>
      </div>

      {!isGenerating && !createdProject && (
        <div className="card" style={{ padding: 28, boxShadow: 'var(--shadow-md)' }}>
          <label style={{ display: 'block', fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>
            Describe your game concept in natural language:
          </label>
          <textarea
            className="textarea-field"
            style={{ minHeight: 120, fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 16 }}
            placeholder="e.g. Create a fast-paced 2D arcade platformer with double jump, laser barriers, collectible plasma gems, and 3 progressive difficulty levels..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          {/* Advanced Fine-Tuning Toggle */}
          <div style={{ marginBottom: 20 }}>
            <button
              type="button"
              className="btn btn-subtle btn-sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              style={{ fontWeight: 600 }}
            >
              <Sliders size={15} />
              <span>{showAdvanced ? 'Hide Engine Preferences' : 'Customize Engine & Genre Preferences'}</span>
            </button>

            {showAdvanced && (
              <div 
                style={{
                  marginTop: 14,
                  padding: 16,
                  background: 'var(--bg-subtle)',
                  borderRadius: 12,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 16,
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: 'var(--text-secondary)' }}>
                    GAME GENRE
                  </label>
                  <select
                    className="input-text"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value as GameGenre)}
                  >
                    <option value="arcade">2D Arcade / Platformer</option>
                    <option value="board">Turn-Based Board Game</option>
                    <option value="3d-adventure">3D Island Adventure</option>
                    <option value="shooter">Space Combat Shooter</option>
                    <option value="open-world">Open-World City</option>
                    <option value="puzzle">Physics & Logic Puzzle</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: 'var(--text-secondary)' }}>
                    DIMENSION & VIEWPORT
                  </label>
                  <select
                    className="input-text"
                    value={selectedDim}
                    onChange={(e) => {
                      const val = e.target.value as '2D' | '3D';
                      setSelectedDim(val);
                      if (val === '3D') setSelectedEngine('three-3d');
                      else setSelectedEngine('canvas-2d');
                    }}
                  >
                    <option value="2D">2D Canvas (Optimal for 60 FPS mobile)</option>
                    <option value="3D">3D WebGL (Three.js Accelerated)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: 'var(--text-secondary)' }}>
                    TARGET PLATFORM
                  </label>
                  <select className="input-text" defaultValue="web_android">
                    <option value="web_android">Web Browser + Android Bundle (.AAB)</option>
                    <option value="web_only">Standalone Offline Web Only</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button
              className="btn btn-primary btn-lg"
              disabled={!prompt.trim()}
              onClick={handleStartGeneration}
            >
              <Wand2 size={18} />
              <span>Begin Autonomous Generation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Multi-Agent Orchestration Live Pipeline */}
      {(isGenerating || (tasks.length > 0 && !createdProject)) && (
        <div className="card" style={{ padding: 28, boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>AI Agent Orchestration Pipeline</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                10 specialized autonomous agents cooperating through a shared project architecture
              </p>
            </div>
            <div className="badge badge-primary">
              <Sparkles size={14} className="animate-spin" />
              <span>Generating Project Files</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {tasks.map((task, idx) => (
              <div 
                key={task.id}
                style={{
                  padding: '14px 18px',
                  borderRadius: 12,
                  background: task.status === 'running' 
                    ? 'rgba(79, 70, 229, 0.05)' 
                    : (task.status === 'completed' ? 'var(--bg-subtle)' : 'var(--bg-surface)'),
                  border: task.status === 'running' 
                    ? '1.5px solid var(--brand-primary)' 
                    : '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {task.status === 'completed' && <CheckCircle2 size={18} color="#10b981" />}
                    {task.status === 'running' && <Cpu size={18} color="#4f46e5" className="animate-spin" />}
                    {task.status === 'queued' && <Clock size={18} color="#94a3b8" />}
                    {task.status === 'failed' && <AlertCircle size={18} color="#ef4444" />}
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {idx + 1}. {task.agentName}
                      </strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 8 }}>
                        — {task.title}
                      </span>
                    </div>
                  </div>

                  <span 
                    className={`badge ${task.status === 'completed' ? 'badge-emerald' : (task.status === 'running' ? 'badge-primary' : '')}`}
                    style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}
                  >
                    {task.status}
                  </span>
                </div>

                {/* Live Logs from Agent */}
                {task.logs.length > 0 && (
                  <div 
                    style={{
                      marginTop: 6,
                      padding: '8px 12px',
                      background: '#090d16',
                      color: '#a5b4fc',
                      borderRadius: 8,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      lineHeight: 1.5,
                      maxHeight: 90,
                      overflowY: 'auto'
                    }}
                  >
                    {task.logs.map((log, lIdx) => (
                      <div key={lIdx}>❯ {log}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Project Summary & Launch Card */}
      {createdProject && (
        <div className="card" style={{ padding: 28, boxShadow: 'var(--shadow-xl)', border: '2px solid var(--brand-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
            <div>
              <div className="badge badge-emerald" style={{ marginBottom: 6 }}>
                <CheckCircle2 size={14} />
                <span>Project Generated & Verified</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{createdProject.name}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{createdProject.description}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="badge badge-primary">{createdProject.engine}</span>
              <span className="badge badge-cyan">{createdProject.version}</span>
            </div>
          </div>

          {/* Project Specification Grid */}
          <div 
            style={{
              padding: 16,
              background: 'var(--bg-subtle)',
              borderRadius: 12,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
              marginBottom: 20
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CORE GAMEPLAY LOOP</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: 4 }}>
                {createdProject.specifications.coreLoop}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CONTROLS</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: 4 }}>
                {createdProject.specifications.controls.keyboard.join(', ')}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>VERIFIED QA TESTS</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--brand-emerald)', fontWeight: 700, marginTop: 4 }}>
                {createdProject.tests?.filter(t => t.status === 'passed').length} / {createdProject.tests?.length} Automated Tests Passed
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ANDROID PLAY STORE PACKAGE</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: 4 }}>
                {createdProject.androidConfig.packageName}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => { setCreatedProject(null); setPrompt(''); }}
            >
              <RotateCcw size={14} />
              <span>Create Another Game</span>
            </button>

            <button className="btn btn-primary btn-lg" onClick={onOpenStudio}>
              <Play size={18} />
              <span>Launch Playable Studio</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
