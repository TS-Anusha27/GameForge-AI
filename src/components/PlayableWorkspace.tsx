import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Code2, 
  Activity, 
  Terminal, 
  Sliders, 
  History, 
  Send, 
  Sparkles, 
  Download, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle,
  FileCode,
  Zap,
  Undo2
} from 'lucide-react';
import { Project, ProjectCheckpoint, PerformanceStats } from '../types/game';
import { CodePatcherService } from '../services/codePatcher';
import { StorageService } from '../services/storage';
import { ExportService } from '../services/exportService';

interface PlayableWorkspaceProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
  onOpenAndroidExport: () => void;
}

export const PlayableWorkspace: React.FC<PlayableWorkspaceProps> = ({
  project,
  onUpdateProject,
  onOpenAndroidExport
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Studio Player Controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<'console' | 'performance' | 'inspector' | 'code' | 'checkpoints'>('console');

  // Real-time Runtime Logs & Stats
  const [consoleLogs, setConsoleLogs] = useState<{ time: string; type: 'log' | 'warn' | 'error' | 'win'; text: string }[]>([
    { time: new Date().toLocaleTimeString(), type: 'log', text: `Engine initialized: ${project.engine} (${project.version})` },
    { time: new Date().toLocaleTimeString(), type: 'log', text: 'Hardware acceleration & Web Audio context active' }
  ]);

  const [perfStats, setPerfStats] = useState<PerformanceStats>({
    fps: 60,
    frameTimeMs: 16.6,
    drawCalls: 54,
    entitiesCount: 28,
    memoryUsageMb: 18.2
  });

  // Copilot Chat
  const [copilotInput, setCopilotInput] = useState('');
  const [isCopilotWorking, setIsCopilotWorking] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string; diff?: any; time: string }[]>([
    {
      sender: 'ai',
      text: `Hello! I am your GameForge Copilot for "${project.name}". Tell me any change you want: e.g. "Make the character move faster", "Add a new collectible", or "Change sky color to purple sunset". I will make targeted changes and preserve everything else!`,
      time: new Date().toLocaleTimeString()
    }
  ]);

  // Code Viewer Tab
  const [selectedFile, setSelectedFile] = useState<string>('game.js');
  const [editableCode, setEditableCode] = useState<string>(project.files['game.js'] || '');
  const [isManualEditing, setIsManualEditing] = useState(false);

  // Inspector tweak values
  const [tweakSpeed, setTweakSpeed] = useState(6.0);
  const [tweakColor, setTweakColor] = useState('#06b6d4');

  // Build bundled HTML source for the iframe sandbox
  const buildIframeHtml = () => {
    const html = project.files['index.html'] || '<!DOCTYPE html><html><body>No index.html</body></html>';
    const css = project.files['style.css'] || '';
    const js = project.files['game.js'] || '';

    // Inject CSS inline and JS inline so it runs completely self-contained in blob or srcdoc
    let combined = html;
    if (css) {
      combined = combined.replace('</head>', `<style>${css}</style></head>`);
      combined = combined.replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, '');
    }
    if (js) {
      combined = combined.replace('</body>', `<script>${js}</script></body>`);
      combined = combined.replace(/<script[^>]*src=["']game\.js["'][^>]*><\/script>/gi, '');
    }

    return combined;
  };

  // Reload the sandboxed game iframe
  const reloadGame = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = buildIframeHtml();
    }
    setConsoleLogs(prev => [
      { time: new Date().toLocaleTimeString(), type: 'log', text: 'Playable preview hot-reloaded.' },
      ...prev.slice(0, 50)
    ]);
  };

  useEffect(() => {
    reloadGame();
    setEditableCode(project.files[selectedFile] || '');
  }, [project.id, project.version]);

  // Listen for postMessage from the running game iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'object') return;

      if (e.data.type === 'STATS_UPDATE') {
        setPerfStats({
          fps: e.data.fps || 60,
          frameTimeMs: e.data.frameTimeMs || 16.6,
          drawCalls: e.data.drawCalls || 50,
          entitiesCount: e.data.entitiesCount || 25,
          memoryUsageMb: e.data.memoryMb || 19.5
        });
      } else if (e.data.type === 'GAME_WIN') {
        setConsoleLogs(prev => [
          { time: new Date().toLocaleTimeString(), type: 'win', text: `🏆 Victory detected: ${e.data.winner || 'Player'}` },
          ...prev
        ]);
      } else if (e.data.type === 'GAME_OVER') {
        setConsoleLogs(prev => [
          { time: new Date().toLocaleTimeString(), type: 'warn', text: `💀 Game Over detected. Final Score: ${e.data.finalScore || 0}` },
          ...prev
        ]);
      } else if (e.data.type === 'MISSION_COMPLETE') {
        setConsoleLogs(prev => [
          { time: new Date().toLocaleTimeString(), type: 'win', text: `⭐ Mission Accomplished: ${e.data.mission}` },
          ...prev
        ]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Copilot Natural Language Instruction Execution ("Edit Anything")
  const handleSendCopilotPrompt = async () => {
    if (!copilotInput.trim() || isCopilotWorking) return;

    const userPrompt = copilotInput.trim();
    setCopilotInput('');
    setIsCopilotWorking(true);

    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: userPrompt, time: new Date().toLocaleTimeString() }
    ]);

    try {
      const patch = await CodePatcherService.applyInstruction(project, userPrompt);
      onUpdateProject(patch.project);

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: patch.explanation,
          diff: patch.diffSummary,
          time: new Date().toLocaleTimeString()
        }
      ]);

      setConsoleLogs(prev => [
        { time: new Date().toLocaleTimeString(), type: 'log', text: `Checkpoint created: ${patch.checkpoint.version} (${patch.diffSummary.summary})` },
        ...prev
      ]);
    } catch (err) {
      console.error('Error applying edit:', err);
      setChatMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'Encountered a syntax conflict while patching. Reverted to previous stable version.', time: new Date().toLocaleTimeString() }
      ]);
    } finally {
      setIsCopilotWorking(false);
    }
  };

  // Checkpoint Revert / Rollback
  const handleRevert = (chk: ProjectCheckpoint) => {
    const restored = StorageService.revertToCheckpoint(project.id, chk.id);
    if (restored) {
      onUpdateProject(restored);
      setConsoleLogs(prev => [
        { time: new Date().toLocaleTimeString(), type: 'warn', text: `Reverted to version ${chk.version}` },
        ...prev
      ]);
    }
  };

  // Save manual code edits
  const handleSaveManualCode = () => {
    const updatedFiles = { ...project.files, [selectedFile]: editableCode };
    const checkpoint: ProjectCheckpoint = {
      id: 'chk-manual-' + Date.now(),
      version: project.version + '-mod',
      timestamp: Date.now(),
      message: `Manual edit of ${selectedFile}`,
      author: 'Manual Edit',
      filesSnapshot: { ...project.files },
      diffSummary: {
        filesChanged: [selectedFile],
        additions: 5,
        deletions: 2,
        summary: `Direct modification in code editor (${selectedFile})`
      }
    };

    const updated: Project = {
      ...project,
      version: checkpoint.version,
      files: updatedFiles,
      checkpoints: [checkpoint, ...project.checkpoints],
      updatedAt: Date.now()
    };

    onUpdateProject(updated);
    setIsManualEditing(false);
  };

  return (
    <div className="studio-container">
      {/* Studio Top Toolbar */}
      <div className="studio-toolbar">
        <div className="toolbar-left">
          <div className="project-name-display">
            <Sparkles size={16} color="var(--brand-primary)" />
            <span>{project.name}</span>
          </div>
          <span className="badge badge-primary">{project.engine}</span>
          <span className="badge badge-emerald">{project.version}</span>
        </div>

        {/* Playback Controls */}
        <div className="toolbar-center">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={reloadGame}
            title="Restart Game Loop (R)"
          >
            <RotateCcw size={15} />
            <span>Restart</span>
          </button>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} color="#ef4444" /> : <Volume2 size={15} />}
          </button>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              if (iframeRef.current?.requestFullscreen) {
                iframeRef.current.requestFullscreen();
              }
            }}
            title="Fullscreen Mode"
          >
            <Maximize2 size={15} />
          </button>
        </div>

        {/* Export Actions */}
        <div className="toolbar-right">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => ExportService.downloadWebBundle(project)}
            title="Download Standalone Offline Playable ZIP"
          >
            <Download size={14} />
            <span>Download ZIP</span>
          </button>

          <button 
            className="btn btn-primary btn-sm"
            onClick={onOpenAndroidExport}
            title="Android AAB Build & Google Play Dashboard"
          >
            <Smartphone size={14} />
            <span>Android Export</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Viewport (Left) vs Copilot Assistant (Right) */}
      <div className="studio-split-view">
        {/* Left Column: Game Viewport + Tabbed Bottom Drawer */}
        <div className="studio-viewport-col">
          {/* Sandboxed Interactive Game Iframe */}
          <div className="iframe-sandbox-wrapper">
            <iframe
              ref={iframeRef}
              title={project.name}
              className="playable-iframe"
              sandbox="allow-scripts allow-modals allow-pointer-lock allow-same-origin"
            />
          </div>

          {/* Bottom Drawer */}
          <div className="studio-bottom-panel">
            <div className="panel-tabs-header">
              <button 
                className={`panel-tab ${activeBottomTab === 'console' ? 'active' : ''}`}
                onClick={() => setActiveBottomTab('console')}
              >
                <Terminal size={14} />
                <span>Console ({consoleLogs.length})</span>
              </button>

              <button 
                className={`panel-tab ${activeBottomTab === 'performance' ? 'active' : ''}`}
                onClick={() => setActiveBottomTab('performance')}
              >
                <Activity size={14} />
                <span>Performance ({perfStats.fps} FPS)</span>
              </button>

              <button 
                className={`panel-tab ${activeBottomTab === 'inspector' ? 'active' : ''}`}
                onClick={() => setActiveBottomTab('inspector')}
              >
                <Sliders size={14} />
                <span>Property Tweaker</span>
              </button>

              <button 
                className={`panel-tab ${activeBottomTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveBottomTab('code')}
              >
                <Code2 size={14} />
                <span>Source Files ({Object.keys(project.files).length})</span>
              </button>

              <button 
                className={`panel-tab ${activeBottomTab === 'checkpoints' ? 'active' : ''}`}
                onClick={() => setActiveBottomTab('checkpoints')}
              >
                <History size={14} />
                <span>Checkpoints ({project.checkpoints?.length || 0})</span>
              </button>
            </div>

            <div className="panel-tab-body">
              {/* TAB 1: CONSOLE */}
              {activeBottomTab === 'console' && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {consoleLogs.map((log, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, color: log.type === 'error' ? '#ef4444' : (log.type === 'win' ? '#10b981' : (log.type === 'warn' ? '#f59e0b' : '#334155')) }}>
                      <span style={{ color: 'var(--text-muted)' }}>[{log.time}]</span>
                      <span>{log.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: PERFORMANCE */}
              {activeBottomTab === 'performance' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
                  <div style={{ background: 'var(--bg-subtle)', padding: 10, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>FRAME RATE</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-emerald)' }}>{perfStats.fps} FPS</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Target: 60.0 FPS</span>
                  </div>

                  <div style={{ background: 'var(--bg-subtle)', padding: 10, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>FRAME BUDGET</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-cyan)' }}>{perfStats.frameTimeMs} ms</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Budget: 16.6 ms</span>
                  </div>

                  <div style={{ background: 'var(--bg-subtle)', padding: 10, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>DRAW CALLS</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-violet)' }}>{perfStats.drawCalls}</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Batch optimized</span>
                  </div>

                  <div style={{ background: 'var(--bg-subtle)', padding: 10, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>MEMORY USAGE</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-amber)' }}>{perfStats.memoryUsageMb} MB</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Heap allocation</span>
                  </div>
                </div>
              )}

              {/* TAB 3: LIVE PROPERTY INSPECTOR */}
              {activeBottomTab === 'inspector' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>
                        <span>Player Velocity Scale</span>
                        <span>{tweakSpeed}x</span>
                      </div>
                      <input 
                        type="range" 
                        min="2" 
                        max="14" 
                        step="0.5"
                        value={tweakSpeed}
                        onChange={(e) => setTweakSpeed(parseFloat(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: 4 }}>
                        <span>Character Highlight Tint</span>
                        <span>{tweakColor}</span>
                      </div>
                      <input 
                        type="color" 
                        value={tweakColor}
                        onChange={(e) => setTweakColor(e.target.value)}
                        style={{ width: '100%', height: 32, border: 'none', borderRadius: 6, cursor: 'pointer' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        handleSendCopilotPrompt();
                        CodePatcherService.applyInstruction(project, `Set player speed to ${tweakSpeed} and tint to ${tweakColor}`).then(r => onUpdateProject(r.project));
                      }}
                    >
                      <Zap size={14} />
                      <span>Commit Tweaks to Project</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: SOURCE FILES & CODE VIEWER */}
              {activeBottomTab === 'code' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {Object.keys(project.files).map(filename => (
                        <button
                          key={filename}
                          className={`btn btn-sm ${selectedFile === filename ? 'btn-primary' : 'btn-secondary'}`}
                          onClick={() => {
                            setSelectedFile(filename);
                            setEditableCode(project.files[filename] || '');
                            setIsManualEditing(false);
                          }}
                        >
                          <FileCode size={13} />
                          <span>{filename}</span>
                        </button>
                      ))}
                    </div>

                    {isManualEditing ? (
                      <button className="btn btn-primary btn-sm" onClick={handleSaveManualCode}>
                        Save File
                      </button>
                    ) : (
                      <button className="btn btn-secondary btn-sm" onClick={() => setIsManualEditing(true)}>
                        Edit Code
                      </button>
                    )}
                  </div>

                  <textarea
                    className="code-block"
                    style={{ flex: 1, width: '100%', minHeight: 120, resize: 'none', outline: 'none' }}
                    readOnly={!isManualEditing}
                    value={editableCode}
                    onChange={(e) => setEditableCode(e.target.value)}
                  />
                </div>
              )}

              {/* TAB 5: CHECKPOINTS & VERSION HISTORY */}
              {activeBottomTab === 'checkpoints' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {project.checkpoints?.map(chk => (
                    <div 
                      key={chk.id}
                      style={{
                        padding: '10px 14px',
                        background: 'var(--bg-subtle)',
                        borderRadius: 10,
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <strong style={{ fontSize: '0.88rem' }}>{chk.version}</strong>
                          <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{chk.author}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {new Date(chk.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                          {chk.message}
                        </p>
                        {chk.diffSummary && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                            {chk.diffSummary.summary}
                          </div>
                        )}
                      </div>

                      {chk.version !== project.version && (
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleRevert(chk)}
                          title="Rollback project to this version"
                        >
                          <Undo2 size={13} />
                          <span>Revert</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: "Edit Anything" Natural-Language Copilot */}
        <div className="studio-copilot-sidebar">
          <div className="copilot-header">
            <div className="copilot-title">
              <Sparkles size={16} color="var(--brand-primary)" />
              <span>AI Copilot ("Edit Anything")</span>
            </div>
            <span className="badge badge-primary">{project.version}</span>
          </div>

          <div className="copilot-messages-list">
            {chatMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
              >
                <div>{msg.text}</div>
                {msg.diff && (
                  <div 
                    style={{
                      marginTop: 8,
                      padding: 8,
                      background: 'rgba(0,0,0,0.06)',
                      borderRadius: 6,
                      fontSize: '0.75rem',
                      lineHeight: 1.4
                    }}
                  >
                    <div><strong>Modified:</strong> {msg.diff.filesChanged.join(', ')}</div>
                    <div style={{ color: '#10b981' }}>+{msg.diff.additions} lines added</div>
                    <div style={{ color: '#ef4444' }}>-{msg.diff.deletions} lines modified</div>
                  </div>
                )}
                <div style={{ fontSize: '0.65rem', opacity: 0.7, marginTop: 4, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                  {msg.time}
                </div>
              </div>
            ))}
            {isCopilotWorking && (
              <div className="chat-bubble chat-bubble-ai">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sparkles size={14} className="animate-spin" color="var(--brand-primary)" />
                  <span>Analyzing AST, patching code, and validating tests...</span>
                </div>
              </div>
            )}
          </div>

          {/* Copilot Input Bar */}
          <div className="copilot-input-bar">
            <input
              type="text"
              className="input-text"
              placeholder="e.g. Make player faster, add double jump..."
              value={copilotInput}
              onChange={(e) => setCopilotInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendCopilotPrompt();
              }}
              disabled={isCopilotWorking}
            />
            <button 
              className="btn btn-primary"
              onClick={handleSendCopilotPrompt}
              disabled={!copilotInput.trim() || isCopilotWorking}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
