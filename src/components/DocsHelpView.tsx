import React from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Code2, 
  Layers 
} from 'lucide-react';

export const DocsHelpView: React.FC = () => {
  return (
    <div style={{ maxWidth: 960, margin: '24px auto', width: '100%', padding: '0 20px' }}>
      <div style={{ marginBottom: 24 }}>
        <div className="badge badge-primary" style={{ marginBottom: 6 }}>
          <BookOpen size={14} />
          <span>Documentation & Architecture Guide</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>GameForge AI Documentation</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Comprehensive guide to the universal game development pipeline, agent architecture, and deployment targets.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Section 1: The Core Philosophy */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={20} color="var(--brand-primary)" />
            <span>1. Core Philosophy: Real Games, Not Mockups</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
            GameForge AI is built on non-negotiable engineering principles:
          </p>
          <ul style={{ paddingLeft: 20, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li><strong>Every button performs its stated action:</strong> Code is executed, not simulated.</li>
            <li><strong>True Multi-Stage Agents:</strong> Rather than a single black-box prompt-to-code call, 10 specialized agents cooperate across design, architecture, gameplay, testing, and deployment.</li>
            <li><strong>Edit Anything Indefinitely:</strong> Post-generation natural language instructions perform surgical code diffs while preserving all unrelated features.</li>
            <li><strong>No Fake Progress:</strong> Test statuses, build logs, and Google Play compliance checks report verified evidence.</li>
          </ul>
        </div>

        {/* Section 2: Agent Architecture */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Cpu size={20} color="var(--brand-violet)" />
            <span>2. Autonomous Agent Architecture</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ padding: 12, background: 'var(--bg-subtle)', borderRadius: 8 }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>A. Game Director Agent</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Interprets user intent, creates feature dependency graphs, and designs the core gameplay loop.
              </p>
            </div>
            <div style={{ padding: 12, background: 'var(--bg-subtle)', borderRadius: 8 }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>B. Architecture Agent</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Selects the appropriate engine adapter (Canvas 2D, Three.js WebGL, Board Engine) and viewport constraints.
              </p>
            </div>
            <div style={{ padding: 12, background: 'var(--bg-subtle)', borderRadius: 8 }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>C. Gameplay & Physics Agent</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Implements kinematic movement, AABB collisions, scoring, state machines, and win/defeat triggers.
              </p>
            </div>
            <div style={{ padding: 12, background: 'var(--bg-subtle)', borderRadius: 8 }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>D. Character & World Agents</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Synthesizes original character models, animation states (idle, walk, jump, attack), biomes, and weather.
              </p>
            </div>
            <div style={{ padding: 12, background: 'var(--bg-subtle)', borderRadius: 8 }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>E. Testing & Repair Agent</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Runs AST syntax parsing, collision math benchmarks, and auto-repairs any detected defects.
              </p>
            </div>
            <div style={{ padding: 12, background: 'var(--bg-subtle)', borderRadius: 8 }}>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>F. Build & Deployment Agent</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Packages offline runnable ZIPs and valid Android packages with AndroidManifest.xml and Play metadata.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Prompt Engineering Best Practices */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={20} color="var(--brand-amber)" />
            <span>3. How to Prompt for Best Results</span>
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
            You can describe any genre or invent entirely new mechanics. For optimal results, include:
          </p>
          <div className="code-block" style={{ marginBottom: 12 }}>
            {`// Great prompt example:
"Create a 2D arcade game with an agile cyber hero named Echo.
Mechanics: Double jump, plasma laser obstacles, energy gem collectibles.
Progression: Score multiplier and 3 distinct difficulty levels.
Audio: Procedural sound effects on jump and gem pickup."`}
          </div>
        </div>

        {/* Section 4: Android & Google Play Publishing */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Smartphone size={20} color="var(--brand-emerald)" />
            <span>4. Android & Google Play Publishing Guide</span>
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
            Every game generated in GameForge AI is automatically packaged with Android App Bundle (.AAB) build scripts and Google Play Store metadata:
          </p>
          <ol style={{ paddingLeft: 20, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <li>Navigate to <strong>Export & Android</strong> in the navigation bar.</li>
            <li>Verify your Application ID (e.g. <code>ai.gameforge.mygame</code>) and descriptions.</li>
            <li>Click <strong>Download Android Release Package</strong> to get the complete project ZIP.</li>
            <li>Build the signed AAB using <code>./gradlew bundleRelease</code>.</li>
            <li>Upload to the Google Play Console under Closed Testing or Production track.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
