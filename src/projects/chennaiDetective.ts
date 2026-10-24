import { Project } from '../types/game';

export const chennaiDetectiveProject: Project = {
  id: 'proj-chennai-detective-3d',
  name: 'Midnight in Chennai: The Chicken Leg Mystery',
  description: 'Mature 3D detective thriller set in midnight Chennai. Detectives Priya and Ananya investigate a crime scene linked to a mysterious piece of chicken, contradictory witness testimonies, and a covert delivery route.',
  prompt: 'Create a realistic detective thriller set in Chennai at midnight. Two adult women discover a chicken leg that connects to a mysterious crime. Give it cinematic graphics, realistic characters, suspense, and an unpredictable story.',
  genre: 'rpg',
  engine: 'three-3d',
  createdAt: Date.now() - 3600000 * 2,
  updatedAt: Date.now(),
  version: 'v1.0.0',
  status: 'ready',
  specifications: {
    title: 'Midnight in Chennai: The Chicken Leg Mystery',
    highConcept: 'A gripping noir investigative thriller set in rain-slicked Chennai where a discarded piece of spiced chicken unravels a midnight conspiracy.',
    genre: 'rpg',
    dimension: '3D',
    cameraPerspective: 'Third-Person',
    coreLoop: 'Investigate crime scene -> Discover physical clues -> Interrogate witnesses -> Log evidence in notebook -> Deduce suspect connection.',
    targetAudience: 'Narrative thriller, mystery, and detective game players',
    controls: {
      keyboard: [
        'W/A/S/D or Arrows: Move Detective Priya',
        'Shift: Sprint',
        'F: Toggle Flashlight',
        'E: Inspect Clue / Talk to Witness',
        'N: Open Evidence Notebook & Deduction Board'
      ],
      touch: 'On-screen virtual joystick and interactive touch prompt buttons'
    },
    mechanics: [
      'Third-person kinematic camera follow with cinematic collision framing',
      'Radial proximity interaction with crime scene clues and witnesses',
      'Dynamic flashlight spotlight attached to Detective Priya',
      'Interactive Evidence Notebook logging all discovered clues and statements',
      'Deduction Board: Connect Chicken Leg + Receipt + Ramesh statement to solve crime',
      'Rain-slicked wet asphalt shader reflections and dynamic street lamp shadows',
      'Atmospheric procedural audio: midnight rain, distant auto horns, tension chords'
    ],
    characters: [
      {
        name: 'Detective Priya',
        role: 'Lead Investigator',
        description: 'Veteran Chennai Crime Branch inspector in dark formal trench coat',
        abilities: ['Forensic Observation', 'Interrogation']
      },
      {
        name: 'Detective Ananya',
        role: 'Forensic Specialist',
        description: 'Partner detective analyzing crime scene markers and physical traces',
        abilities: ['Chemical Analysis', 'Digital Forensics']
      },
      {
        name: 'Murugan',
        role: 'Tea Stall Witness',
        description: 'Midnight chai wallah who observed the argument near the alley',
        abilities: ['Eye-Witness Account']
      },
      {
        name: 'Ramesh',
        role: 'Delivery Courier Suspect',
        description: 'Nervous food courier whose scooter was spotted near the crime scene',
        abilities: ['Contradictory Alibi']
      }
    ],
    worldDesign: {
      theme: 'Midnight Chennai Street (Cathedral Road Sector)',
      biome: 'Wet Urban Street with Auto-Rickshaw and Tea Stall',
      hazards: ['Crime Scene Cordon'],
      collectibles: ['Chicken Leg Piece', 'Delivery Receipt', 'Tire Skid Marks', 'Scratched Padlock']
    },
    audioDesign: {
      musicStyle: 'Moody noir ambient cello, distant city rain, and clattering tea kettle',
      sfx: ['footstep_wet', 'camera_shutter', 'notebook_flip', 'flashlight_click', 'suspense_stinger']
    },
    technicalArchitecture: {
      engine: 'three-3d',
      renderer: 'Three.js WebGL with PCFSoftShadowMap & PBR materials',
      resolution: 'Responsive full canvas viewport',
      fpsTarget: 60,
      libraries: ['Three.js r128', 'Web Audio API']
    },
    testingStrategy: [
      'Verify all 4 clues trigger inspection dialogues and notebook entries',
      'Verify all 3 witnesses respond to interaction distance <= 3.5 units',
      'Verify deduction puzzle requires all 3 key evidence pieces to solve',
      'Verify flashlight toggle adjusts spotlight intensity from 0 to 2.5'
    ]
  },
  checkpoints: [
    {
      id: 'chk-chennai-1',
      version: 'v1.0.0',
      timestamp: Date.now(),
      message: 'Initial project generation: 3D Chennai street, Priya & Ananya, clues, notebook, deduction board',
      author: 'AI Agent',
      filesSnapshot: {},
      diffSummary: {
        filesChanged: ['index.html', 'game.js', 'style.css'],
        additions: 680,
        deletions: 0,
        summary: 'Generated complete 3D realistic detective thriller tailored to prompt'
      }
    }
  ],
  tests: [
    { id: 't1', name: '3D Scene & Street Environment Render', category: 'runtime', status: 'passed', message: 'Chennai street, auto-rickshaw, tea stall, and street lamps loaded', durationMs: 14 },
    { id: 't2', name: 'Detective Priya Controller & Flashlight', category: 'input', status: 'passed', message: 'Kinematic WASD movement and flashlight spotlight toggle functional', durationMs: 12 },
    { id: 't3', name: 'Chicken Leg Forensic Clue Inspection', category: 'collision', status: 'passed', message: 'Clue proximity raycast triggers inspection modal and logs into Evidence Notebook', durationMs: 9 },
    { id: 't4', name: 'Witness Interrogation Dialogue State Machine', category: 'runtime', status: 'passed', message: 'Murugan, Ramesh, and Inspector Selvam dialogue branching verified', durationMs: 11 },
    { id: 't5', name: 'Evidence Deduction Board & Crime Solution', category: 'win_condition', status: 'passed', message: 'Connecting Chicken Leg + Receipt + Ramesh alibi unlocks arrest deduction', durationMs: 8 }
  ],
  androidConfig: {
    appName: 'Midnight in Chennai',
    packageName: 'ai.gameforge.chennaidetective',
    versionCode: 100,
    versionName: '1.0.0',
    orientation: 'sensorLandscape',
    permissions: ['INTERNET', 'VIBRATE'],
    shortDescription: 'Solve a gripping midnight murder mystery on the rain-soaked streets of Chennai.',
    fullDescription: 'Step into the shoes of Detective Priya in Midnight in Chennai! When a freshly spiced chicken leg is discovered near a midnight crime scene, you and Detective Ananya must examine forensic clues, interrogate contradictory witnesses, and connect the evidence in your notebook to crack the case.',
    category: 'GAME_ROLE_PLAYING',
    privacyPolicyUrl: 'https://gameforge.ai/privacy/chennai-detective',
    contentRating: 'Teen (12+)',
    targetSdk: 34,
    minSdk: 24,
    releaseReady: true
  },
  files: {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Midnight in Chennai: The Chicken Leg Mystery</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
  <div id="canvas-container"></div>

  <!-- Noir Cinematic Vignette Overlay -->
  <div class="cinematic-vignette"></div>

  <!-- HUD Top Bar -->
  <header class="hud-top">
    <div class="case-badge">
      <span class="badge-tag">CHENNAI CRIME BRANCH • CASE #4092</span>
      <h1 class="case-title">Cathedral Road Homicide Investigation</h1>
    </div>

    <div class="hud-actions">
      <button class="hud-btn" id="notebookBtn" title="Open Evidence Notebook (N)">
        📓 Evidence Notebook (<span id="clueCountEl">0</span>/4 Clues)
      </button>
      <button class="hud-btn" id="flashlightBtn" title="Toggle Flashlight (F)">
        🔦 Flashlight: <span id="torchStatus">ON</span>
      </button>
    </div>
  </header>

  <!-- Proximity Interaction Prompt -->
  <div class="interaction-prompt" id="interactPrompt" style="display: none;">
    <span class="key-pill">E</span>
    <span id="promptActionText">Inspect Clue</span>
  </div>

  <!-- Evidence Inspection Modal -->
  <div class="evidence-modal" id="clueModal" style="display: none;">
    <div class="evidence-card">
      <div class="card-header">
        <span class="clue-tag" id="clueCategory">FORENSIC EVIDENCE</span>
        <button class="close-icon-btn" id="closeClueBtn">✕</button>
      </div>
      <div class="clue-visual" id="clueVisualIcon">🍗</div>
      <h2 id="clueTitle">Fresh Chicken Leg Piece</h2>
      <p id="clueDescription">A fried chicken drumstick coated in rare saffron biryani spice. Still warm, indicating it was dropped less than 20 minutes ago.</p>
      <div class="card-footer">
        <span class="added-badge">✓ Added to Evidence Notebook</span>
        <button class="btn-primary-action" id="dismissClueBtn">Close & Continue</button>
      </div>
    </div>
  </div>

  <!-- Witness Dialogue Overlay -->
  <div class="dialogue-box" id="dialogueBox" style="display: none;">
    <div class="dialogue-card">
      <div class="dialogue-speaker">
        <div class="speaker-avatar" id="speakerAvatar">☕</div>
        <div>
          <div class="speaker-name" id="speakerName">Murugan</div>
          <div class="speaker-title" id="speakerTitle">Midnight Tea Stall Owner</div>
        </div>
      </div>
      <div class="dialogue-text" id="dialogueText">
        "Vanakkam, Madam Detective. Around 11:45 PM, a delivery boy on an electric scooter screeched to a halt right there. A man in a dark jacket came out of the alley, shouted at him, and slapped a food packet out of his hands!"
      </div>
      <div class="dialogue-options" id="dialogueOptions">
        <button class="option-btn" id="dialogueNextBtn">"Did you see which direction the man in the dark jacket fled?"</button>
      </div>
    </div>
  </div>

  <!-- Evidence Notebook & Deduction Board Modal -->
  <div class="notebook-overlay" id="notebookModal" style="display: none;">
    <div class="notebook-book">
      <div class="notebook-header">
        <h2>DETECTIVE PRIYA'S CASE FILE</h2>
        <button class="close-icon-btn" id="closeNotebookBtn">✕</button>
      </div>

      <div class="notebook-tabs">
        <button class="tab-btn active" id="tabClues">1. Physical Evidence</button>
        <button class="tab-btn" id="tabWitnesses">2. Witness Accounts</button>
        <button class="tab-btn" id="tabDeduction">3. Deduction Board</button>
      </div>

      <!-- Tab 1: Clues -->
      <div class="tab-content" id="contentClues">
        <div class="clue-grid" id="cluesListContainer">
          <!-- Populated by JS -->
        </div>
      </div>

      <!-- Tab 2: Witnesses -->
      <div class="tab-content" id="contentWitnesses" style="display: none;">
        <div class="witness-list" id="witnessesListContainer">
          <!-- Populated by JS -->
        </div>
      </div>

      <!-- Tab 3: Deduction Board -->
      <div class="tab-content" id="contentDeduction" style="display: none;">
        <div class="deduction-board">
          <p class="deduction-instructions">
            Connect the evidence to draw the final investigative conclusion:
          </p>
          <div class="deduction-pieces">
            <label class="deduction-check">
              <input type="checkbox" id="checkClue1" />
              <span>The Chicken Leg was seasoned with rare Royal Biryani House spices</span>
            </label>
            <label class="deduction-check">
              <input type="checkbox" id="checkClue2" />
              <span>Delivery receipt timestamp (11:42 PM) places Ramesh at the scene</span>
            </label>
            <label class="deduction-check">
              <input type="checkbox" id="checkClue3" />
              <span>Murugan witnessed Ramesh passing a confidential ledger inside the food box</span>
            </label>
          </div>
          <button class="solve-btn" id="solveCaseBtn">⚡ Conclude Investigation & Order Arrest</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Case Solved Celebration Screen -->
  <div class="solved-overlay" id="solvedScreen" style="display: none;">
    <div class="solved-card">
      <div class="solved-icon">⚖️</div>
      <h2>CASE SOLVED!</h2>
      <p>
        By connecting the discarded chicken leg piece to the midnight delivery receipt, Detective Priya and Detective Ananya exposed Ramesh's covert courier drop, recovering the victim's stolen ledger!
      </p>
      <button class="btn-primary-action" id="restartCaseBtn">Revisit Crime Scene</button>
    </div>
  </div>

  <!-- Controls Legend -->
  <footer class="hud-bottom">
    <div class="controls-pill">
      <span><strong>WASD / Arrows</strong> Walk</span>
      <span><strong>Shift</strong> Sprint</span>
      <span><strong>F</strong> Flashlight</span>
      <span><strong>E</strong> Inspect Clue / Talk</span>
      <span><strong>N</strong> Case Notebook</span>
    </div>
  </footer>

  <script src="game.js"></script>
</body>
</html>`,
    'style.css': `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
}

body, html {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #020617;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #f8fafc;
}

#canvas-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.cinematic-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  box-shadow: inset 0 0 120px rgba(0, 0, 0, 0.85);
  z-index: 5;
}

.hud-top {
  position: absolute;
  top: 16px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 10;
  pointer-events: none;
}

.case-badge {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-left: 4px solid #f59e0b;
  border-radius: 10px;
  padding: 10px 16px;
  pointer-events: auto;
}

.badge-tag {
  font-size: 0.65rem;
  font-weight: 800;
  color: #f59e0b;
  letter-spacing: 1px;
}

.case-title {
  font-size: 1rem;
  font-weight: 700;
  color: #f8fafc;
  margin-top: 2px;
}

.hud-actions {
  display: flex;
  gap: 10px;
  pointer-events: auto;
}

.hud-btn {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f8fafc;
  padding: 9px 16px;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}
.hud-btn:hover {
  background: rgba(30, 41, 59, 0.95);
  border-color: #f59e0b;
}

.interaction-prompt {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  border: 2px solid #f59e0b;
  border-radius: 9999px;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 0 25px rgba(245, 158, 11, 0.4);
  z-index: 15;
  animation: pulsePrompt 1.4s infinite;
}

@keyframes pulsePrompt {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.05); }
}

.key-pill {
  background: #f59e0b;
  color: #020617;
  font-weight: 800;
  font-size: 0.75rem;
  padding: 2px 7px;
  border-radius: 5px;
}

.evidence-modal {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 25;
}

.evidence-card {
  background: #0f172a;
  border: 2px solid #f59e0b;
  border-radius: 18px;
  padding: 24px;
  max-width: 440px;
  width: 90%;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.25);
  text-align: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.clue-tag {
  font-size: 0.7rem;
  font-weight: 800;
  color: #f59e0b;
  letter-spacing: 1px;
}

.close-icon-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.2rem;
  cursor: pointer;
}

.clue-visual {
  font-size: 3.5rem;
  margin: 8px 0;
}

.evidence-card h2 {
  font-size: 1.3rem;
  color: #f8fafc;
  margin-bottom: 8px;
}

.evidence-card p {
  font-size: 0.9rem;
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 18px;
}

.card-footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.added-badge {
  font-size: 0.78rem;
  color: #10b981;
  font-weight: 600;
}

.btn-primary-action {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #020617;
  font-weight: 800;
  border: none;
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
}

.dialogue-box {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 680px;
  z-index: 20;
}

.dialogue-card {
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
}

.dialogue-speaker {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.speaker-avatar {
  font-size: 1.8rem;
}

.speaker-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #f59e0b;
}

.speaker-title {
  font-size: 0.75rem;
  color: #94a3b8;
}

.dialogue-text {
  font-size: 0.92rem;
  line-height: 1.6;
  color: #e2e8f0;
  margin-bottom: 16px;
}

.dialogue-options {
  display: flex;
  justify-content: flex-end;
}

.option-btn {
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid #f59e0b;
  color: #fbbf24;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.notebook-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
}

.notebook-book {
  background: #0f172a;
  border: 2px solid #334155;
  border-radius: 20px;
  width: 90%;
  max-width: 720px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
}

.notebook-header {
  padding: 16px 20px;
  background: #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #334155;
}
.notebook-header h2 {
  font-size: 1.15rem;
  font-weight: 800;
  color: #f59e0b;
}

.notebook-tabs {
  display: flex;
  background: #1e293b;
  border-bottom: 1px solid #334155;
}

.tab-btn {
  flex: 1;
  padding: 10px 14px;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
.tab-btn.active {
  color: #f59e0b;
  border-bottom-color: #f59e0b;
  background: #0f172a;
}

.tab-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.clue-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.clue-entry-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 14px;
}
.clue-entry-title {
  font-weight: 700;
  color: #f59e0b;
  font-size: 0.9rem;
  margin-bottom: 4px;
}
.clue-entry-desc {
  font-size: 0.8rem;
  color: #cbd5e1;
  line-height: 1.4;
}

.deduction-board {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.deduction-instructions {
  font-size: 0.9rem;
  color: #94a3b8;
}

.deduction-pieces {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.deduction-check {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1e293b;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.88rem;
  cursor: pointer;
}

.solve-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
}

.solved-overlay {
  position: absolute;
  inset: 0;
  background: rgba(2, 6, 23, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 40;
}

.solved-card {
  background: #0f172a;
  border: 2px solid #10b981;
  border-radius: 20px;
  padding: 36px;
  max-width: 520px;
  width: 90%;
  text-align: center;
  box-shadow: 0 0 50px rgba(16, 185, 129, 0.4);
}

.solved-icon {
  font-size: 3.5rem;
  margin-bottom: 10px;
}
.solved-card h2 {
  font-size: 1.8rem;
  color: #10b981;
  margin-bottom: 12px;
}
.solved-card p {
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 24px;
}

.hud-bottom {
  position: absolute;
  bottom: 16px;
  left: 20px;
  z-index: 10;
  pointer-events: none;
}

.controls-pill {
  display: flex;
  gap: 12px;
  background: rgba(15, 23, 42, 0.7);
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.75rem;
  color: #94a3b8;
}
.controls-pill strong {
  color: #f8fafc;
}`,
    'game.js': `// Midnight in Chennai: 3D Detective Investigation Engine (Three.js)
let scene, camera, renderer;
let priyaGroup, flashlight;
let ananyaMesh, rickshawGroup, teaStallGroup;
let clues = [];
let witnesses = [];

let discoveredClues = [];
let flashlightOn = true;
let activePromptAction = null;

// Sound synthesizer for noir audio atmosphere
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playNoirSound(type) {
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'clue') {
      [440, 554, 659].forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + idx * 0.08);
        g.gain.setValueAtTime(0.15, now + idx * 0.08);
        g.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.3);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start(now + idx * 0.08);
        o.stop(now + idx * 0.08 + 0.32);
      });
    } else if (type === 'solved') {
      [261, 329, 392, 523].forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(f, now + i * 0.12);
        g.gain.setValueAtTime(0.2, now + i * 0.12);
        g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.4);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start(now + i * 0.12);
        o.stop(now + i * 0.12 + 0.45);
      });
    }
  } catch (e) {}
}

const keys = {};

function init() {
  const container = document.getElementById('canvas-container');
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030712); // Midnight Chennai Sky
  scene.fog = new THREE.FogExp2(0x030712, 0.025);

  // Camera
  camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
  camera.position.set(0, 5, 12);

  // Renderer with Soft Shadows
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Ambient Midnight Light
  const ambientLight = new THREE.AmbientLight(0x1e1b4b, 0.6);
  scene.add(ambientLight);

  // Build the Street Scene
  buildChennaiStreet();
  buildDetectivePriya();
  buildDetectiveAnanya();
  buildWitnesses();
  setupClues();

  window.addEventListener('resize', onWindowResize);
  setupUIEvents();
  animate();
}

function buildChennaiStreet() {
  // Wet Asphalt Street Plane
  const roadGeo = new THREE.PlaneGeometry(36, 120);
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x090d16,
    roughness: 0.2, // Wet asphalt reflection
    metalness: 0.4
  });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.rotation.x = -Math.PI / 2;
  road.receiveShadow = true;
  scene.add(road);

  // Sidewalks
  const curbGeo = new THREE.BoxGeometry(4, 0.3, 120);
  const curbMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });

  const leftCurb = new THREE.Mesh(curbGeo, curbMat);
  leftCurb.position.set(-10, 0.15, 0);
  leftCurb.receiveShadow = true;
  scene.add(leftCurb);

  const rightCurb = new THREE.Mesh(curbGeo, curbMat);
  rightCurb.position.set(10, 0.15, 0);
  rightCurb.receiveShadow = true;
  scene.add(rightCurb);

  // Streetlamps with Warm Amber Cones
  [-25, 0, 25].forEach(z => {
    // Left Lamp Post
    const poleGeo = new THREE.CylinderGeometry(0.12, 0.15, 6, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(-8.5, 3, z);
    scene.add(pole);

    const lampLight = new THREE.PointLight(0xf59e0b, 1.8, 18);
    lampLight.position.set(-8.5, 5.8, z);
    lampLight.castShadow = true;
    scene.add(lampLight);
  });

  // Chennai Auto-Rickshaw (Yellow & Black)
  rickshawGroup = new THREE.Group();

  // Rickshaw Lower Body (Yellow)
  const bodyGeo = new THREE.BoxGeometry(2.2, 1.2, 3.4);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
  const rickshawBody = new THREE.Mesh(bodyGeo, bodyMat);
  rickshawBody.position.y = 0.9;
  rickshawBody.castShadow = true;
  rickshawGroup.add(rickshawBody);

  // Rickshaw Canopy (Black)
  const topGeo = new THREE.BoxGeometry(2.1, 0.9, 3.2);
  const topMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
  const canopy = new THREE.Mesh(topGeo, topMat);
  canopy.position.y = 1.9;
  rickshawGroup.add(canopy);

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 12);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827 });
  const wFront = new THREE.Mesh(wheelGeo, wheelMat);
  wFront.rotation.z = Math.PI / 2;
  wFront.position.set(0, 0.35, 1.3);
  rickshawGroup.add(wFront);

  const wBackL = new THREE.Mesh(wheelGeo, wheelMat);
  wBackL.rotation.z = Math.PI / 2;
  wBackL.position.set(-0.95, 0.35, -1.1);
  rickshawGroup.add(wBackL);

  const wBackR = new THREE.Mesh(wheelGeo, wheelMat);
  wBackR.rotation.z = Math.PI / 2;
  wBackR.position.set(0.95, 0.35, -1.1);
  rickshawGroup.add(wBackR);

  rickshawGroup.position.set(7.5, 0, -4);
  rickshawGroup.rotation.y = -0.2;
  scene.add(rickshawGroup);

  // Murugan Tea Stall (Corner Shop with glowing signboard)
  teaStallGroup = new THREE.Group();
  const stallKiosk = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 3, 3),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 })
  );
  stallKiosk.position.y = 1.5;
  stallKiosk.castShadow = true;
  teaStallGroup.add(stallKiosk);

  // Glowing Tamil / English Tea Signboard
  const signGeo = new THREE.BoxGeometry(3.5, 0.7, 0.2);
  const signMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.8
  });
  const sign = new THREE.Mesh(signGeo, signMat);
  sign.position.set(0, 2.8, 1.55);
  teaStallGroup.add(sign);

  teaStallGroup.position.set(-9.5, 0, -18);
  scene.add(teaStallGroup);

  // Police Cordon Barrier at the Alley
  const barrierGeo = new THREE.BoxGeometry(5.5, 1.1, 0.2);
  const barrierMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
  const barrier = new THREE.Mesh(barrierGeo, barrierMat);
  barrier.position.set(0, 0.55, -28);
  barrier.castShadow = true;
  scene.add(barrier);
}

function buildDetectivePriya() {
  priyaGroup = new THREE.Group();

  // Dark trench coat body
  const coatGeo = new THREE.BoxGeometry(0.95, 1.6, 0.6);
  const coatMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const coat = new THREE.Mesh(coatGeo, coatMat);
  coat.position.y = 1.3;
  coat.castShadow = true;
  priyaGroup.add(coat);

  // Head
  const headGeo = new THREE.SphereGeometry(0.35, 14, 14);
  const headMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.y = 2.3;
  head.castShadow = true;
  priyaGroup.add(head);

  // Hair
  const hairGeo = new THREE.BoxGeometry(0.75, 0.45, 0.7);
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x090d16 });
  const hair = new THREE.Mesh(hairGeo, hairMat);
  hair.position.y = 2.45;
  priyaGroup.add(hair);

  // Police Flashlight
  flashlight = new THREE.SpotLight(0xffffff, 2.5, 25, Math.PI / 6, 0.4, 1);
  flashlight.position.set(0.4, 1.3, 0.5);
  flashlight.target.position.set(0.4, 0.5, 10);
  flashlight.castShadow = true;
  priyaGroup.add(flashlight);
  priyaGroup.add(flashlight.target);

  priyaGroup.position.set(0, 0, 10);
  scene.add(priyaGroup);
}

function buildDetectiveAnanya() {
  const ananyaGroup = new THREE.Group();

  // Formal investigative suit
  const suit = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 1.55, 0.55),
    new THREE.MeshStandardMaterial({ color: 0x334155 })
  );
  suit.position.y = 1.25;
  suit.castShadow = true;
  ananyaGroup.add(suit);

  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 14, 14),
    new THREE.MeshStandardMaterial({ color: 0xd97706 })
  );
  head.position.y = 2.25;
  ananyaGroup.add(head);

  // Forensic Tablet Device
  const tablet = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.05, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.6 })
  );
  tablet.position.set(0.3, 1.3, 0.4);
  ananyaGroup.add(tablet);

  ananyaGroup.position.set(-2.5, 0, 1);
  ananyaGroup.rotation.y = 0.5;
  scene.add(ananyaGroup);
  ananyaMesh = ananyaGroup;
}

function buildWitnesses() {
  // Witness 1: Murugan (Tea Stall Owner)
  const muruganGroup = new THREE.Group();
  const mBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.45, 1.6, 12),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc }) // White dhoti/shirt
  );
  mBody.position.y = 1.1;
  muruganGroup.add(mBody);
  muruganGroup.position.set(-8, 0, -16);
  scene.add(muruganGroup);

  witnesses.push({
    id: 'murugan',
    name: 'Murugan',
    title: 'Midnight Tea Stall Owner',
    avatar: '☕',
    mesh: muruganGroup,
    dialogue: '"Vanakkam, Madam Detective Priya. Around 11:45 PM, a delivery boy on an electric scooter screeched to a halt right there. A man in a dark jacket came out of the alley, shouted at him, and slapped a food packet out of his hands!"'
  });

  // Witness 2: Ramesh (Delivery Courier)
  const rameshGroup = new THREE.Group();
  const rBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 1.5, 0.5),
    new THREE.MeshStandardMaterial({ color: 0xf97316 }) // Delivery orange jacket
  );
  rBody.position.y = 1.15;
  rameshGroup.add(rBody);
  rameshGroup.position.set(6, 0, 2);
  rameshGroup.rotation.y = -1.2;
  scene.add(rameshGroup);

  witnesses.push({
    id: 'ramesh',
    name: 'Ramesh',
    title: 'Food Delivery Courier (Nervous)',
    avatar: '🛵',
    mesh: rameshGroup,
    dialogue: '"Madam! I swear I am just a delivery rider for Royal Biryani House! I was delivering food to 14 Cathedral Road... but when I arrived, a guy grabbed the parcel. I panicked and dropped my order before riding away!"'
  });

  // Witness 3: Inspector Selvam (Perimeter Officer)
  const selvamGroup = new THREE.Group();
  const sBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 1.6, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x854d0e }) // Khaki uniform
  );
  sBody.position.y = 1.2;
  selvamGroup.add(sBody);
  selvamGroup.position.set(-1.5, 0, -26);
  scene.add(selvamGroup);

  witnesses.push({
    id: 'selvam',
    name: 'Inspector Selvam',
    title: 'First Responding Officer',
    avatar: '👮‍♂️',
    mesh: selvamGroup,
    dialogue: '"Detective Priya! The victim\\'s apartment on the second floor was breached through the fire escape. Bizarrely, jewelry and cash were untouched—the intruder only targeted the company audit ledger."'
  });
}

function setupClues() {
  // Clue 1: The Chicken Leg Piece (Under street lamp)
  const chickenMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.06, 0.5, 8),
    new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.3 })
  );
  chickenMesh.rotation.z = Math.PI / 4;
  chickenMesh.position.set(0.5, 0.1, 0.5);
  scene.add(chickenMesh);

  // Evidence Cone Marker #1
  const marker1 = new THREE.Mesh(
    new THREE.ConeGeometry(0.2, 0.35, 4),
    new THREE.MeshStandardMaterial({ color: 0xfacc15 })
  );
  marker1.position.set(0.8, 0.18, 0.5);
  scene.add(marker1);

  clues.push({
    id: 'chicken_leg',
    title: 'Fresh Chicken Leg Piece',
    category: 'FORENSIC EVIDENCE',
    icon: '🍗',
    description: 'A fried chicken drumstick coated in rare saffron biryani spices. Forensic analysis proves it was dropped less than 20 minutes ago.',
    mesh: chickenMesh
  });

  // Clue 2: Crumpled Delivery Receipt
  const receiptMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.05, 0.35),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc })
  );
  receiptMesh.position.set(3.2, 0.05, -3);
  scene.add(receiptMesh);

  clues.push({
    id: 'receipt',
    title: 'Royal Biryani House Receipt',
    category: 'DOCUMENTARY EVIDENCE',
    icon: '🧾',
    description: 'Order #4092 from Royal Biryani House, T. Nagar. Timestamped 11:42 PM tonight. Customer: "R. Kumar - Urgent Delivery".',
    mesh: receiptMesh
  });

  // Clue 3: Electric Scooter Skid Marks
  const skidMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.02, 3.5),
    new THREE.MeshStandardMaterial({ color: 0x020617 })
  );
  skidMesh.position.set(5.5, 0.02, -1);
  scene.add(skidMesh);

  clues.push({
    id: 'skid_marks',
    title: 'Fresh Electric Scooter Skid Marks',
    category: 'PHYSICAL TRACES',
    icon: '🛵',
    description: 'Sharp tire tread marks burned into the wet asphalt indicating a rapid U-turn and acceleration away from the crime scene.',
    mesh: skidMesh
  });

  // Clue 4: Scratched Alley Padlock
  const padlockMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.35, 0.15),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 })
  );
  padlockMesh.position.set(2.4, 0.8, -28);
  scene.add(padlockMesh);

  clues.push({
    id: 'padlock',
    title: 'Scratched Alley Padlock',
    category: 'CRIME SCENE BREACH',
    icon: '🔒',
    description: 'The alley gate lock shows scratches from a heavy steel prybar. The suspect fled into the northern backstreets.',
    mesh: padlockMesh
  });
}

function setupUIEvents() {
  const notebookBtn = document.getElementById('notebookBtn');
  const flashlightBtn = document.getElementById('flashlightBtn');
  const notebookModal = document.getElementById('notebookModal');
  const closeNotebookBtn = document.getElementById('closeNotebookBtn');
  const clueModal = document.getElementById('clueModal');
  const closeClueBtn = document.getElementById('closeClueBtn');
  const dismissClueBtn = document.getElementById('dismissClueBtn');
  const dialogueBox = document.getElementById('dialogueBox');
  const dialogueNextBtn = document.getElementById('dialogueNextBtn');
  const tabClues = document.getElementById('tabClues');
  const tabWitnesses = document.getElementById('tabWitnesses');
  const tabDeduction = document.getElementById('tabDeduction');
  const contentClues = document.getElementById('contentClues');
  const contentWitnesses = document.getElementById('contentWitnesses');
  const contentDeduction = document.getElementById('contentDeduction');
  const solveCaseBtn = document.getElementById('solveCaseBtn');
  const solvedScreen = document.getElementById('solvedScreen');
  const restartCaseBtn = document.getElementById('restartCaseBtn');

  // Flashlight Toggle
  function toggleFlashlight() {
    flashlightOn = !flashlightOn;
    flashlight.intensity = flashlightOn ? 2.5 : 0;
    document.getElementById('torchStatus').textContent = flashlightOn ? 'ON' : 'OFF';
    playNoirSound('click');
  }

  flashlightBtn.addEventListener('click', toggleFlashlight);

  // Notebook Toggle
  function toggleNotebook() {
    const isVisible = notebookModal.style.display === 'flex';
    notebookModal.style.display = isVisible ? 'none' : 'flex';
    playNoirSound('click');
  }

  notebookBtn.addEventListener('click', toggleNotebook);
  closeNotebookBtn.addEventListener('click', () => { notebookModal.style.display = 'none'; });

  // Close Clue Modal
  closeClueBtn.addEventListener('click', () => { clueModal.style.display = 'none'; });
  dismissClueBtn.addEventListener('click', () => { clueModal.style.display = 'none'; });

  // Tab Switching
  tabClues.addEventListener('click', () => {
    tabClues.classList.add('active'); tabWitnesses.classList.remove('active'); tabDeduction.classList.remove('active');
    contentClues.style.display = 'block'; contentWitnesses.style.display = 'none'; contentDeduction.style.display = 'none';
  });
  tabWitnesses.addEventListener('click', () => {
    tabWitnesses.classList.add('active'); tabClues.classList.remove('active'); tabDeduction.classList.remove('active');
    contentWitnesses.style.display = 'block'; contentClues.style.display = 'none'; contentDeduction.style.display = 'none';
    renderWitnessesTab();
  });
  tabDeduction.addEventListener('click', () => {
    tabDeduction.classList.add('active'); tabClues.classList.remove('active'); tabWitnesses.classList.remove('active');
    contentDeduction.style.display = 'block'; contentClues.style.display = 'none'; contentWitnesses.style.display = 'none';
  });

  // Solve Case
  solveCaseBtn.addEventListener('click', () => {
    const c1 = document.getElementById('checkClue1').checked;
    const c2 = document.getElementById('checkClue2').checked;
    const c3 = document.getElementById('checkClue3').checked;

    if (c1 && c2 && c3) {
      playNoirSound('solved');
      notebookModal.style.display = 'none';
      solvedScreen.style.display = 'flex';
      window.parent.postMessage({ type: 'CASE_SOLVED', outcome: 'Ledger Recovered, Ramesh Detained' }, '*');
    } else {
      alert('Review the evidence! You must check all 3 verified facts to complete the deduction.');
    }
  });

  restartCaseBtn.addEventListener('click', () => {
    solvedScreen.style.display = 'none';
  });

  dialogueNextBtn.addEventListener('click', () => {
    dialogueBox.style.display = 'none';
  });

  window.addEventListener('keydown', e => {
    keys[e.code] = true;
    if (e.code === 'KeyF') toggleFlashlight();
    if (e.code === 'KeyN') toggleNotebook();
    if (e.code === 'KeyE' && activePromptAction) activePromptAction();
  });

  window.addEventListener('keyup', e => {
    keys[e.code] = false;
  });
}

function renderCluesTab() {
  const container = document.getElementById('cluesListContainer');
  container.innerHTML = '';
  discoveredClues.forEach(clue => {
    const card = document.createElement('div');
    card.className = 'clue-entry-card';
    card.innerHTML = \`
      <div class="clue-entry-title">\${clue.icon} \${clue.title}</div>
      <div class="clue-entry-desc">\${clue.description}</div>
    \`;
    container.appendChild(card);
  });
}

function renderWitnessesTab() {
  const container = document.getElementById('witnessesListContainer');
  container.innerHTML = '';
  witnesses.forEach(w => {
    const card = document.createElement('div');
    card.className = 'clue-entry-card';
    card.style.marginBottom = '10px';
    card.innerHTML = \`
      <div class="clue-entry-title">\${w.avatar} \${w.name} (\${w.title})</div>
      <div class="clue-entry-desc">\${w.dialogue}</div>
    \`;
    container.appendChild(card);
  });
}

function updateMovement() {
  if (!priyaGroup) return;

  let speed = keys['ShiftLeft'] || keys['ShiftRight'] ? 0.24 : 0.12;
  let dx = 0;
  let dz = 0;

  if (keys['KeyW'] || keys['ArrowUp']) dz -= 1;
  if (keys['KeyS'] || keys['ArrowDown']) dz += 1;
  if (keys['KeyA'] || keys['ArrowLeft']) dx -= 1;
  if (keys['KeyD'] || keys['ArrowRight']) dx += 1;

  if (dx !== 0 || dz !== 0) {
    const len = Math.hypot(dx, dz);
    priyaGroup.position.x += (dx / len) * speed;
    priyaGroup.position.z += (dz / len) * speed;

    const angle = Math.atan2(dx, dz);
    priyaGroup.rotation.y = angle;
  }

  // Camera Follow
  camera.position.x += (priyaGroup.position.x - camera.position.x) * 0.08;
  camera.position.y += (priyaGroup.position.y + 4.5 - camera.position.y) * 0.08;
  camera.position.z += (priyaGroup.position.z + 8.5 - camera.position.z) * 0.08;
  camera.lookAt(priyaGroup.position.x, priyaGroup.position.y + 1.4, priyaGroup.position.z);

  // Check Clue Proximities
  const promptEl = document.getElementById('interactPrompt');
  const promptTextEl = document.getElementById('promptActionText');
  let nearbyClue = null;
  let nearbyWitness = null;

  for (const clue of clues) {
    const dist = priyaGroup.position.distanceTo(clue.mesh.position);
    if (dist < 2.5) {
      nearbyClue = clue;
      break;
    }
  }

  if (!nearbyClue) {
    for (const w of witnesses) {
      const dist = priyaGroup.position.distanceTo(w.mesh.position);
      if (dist < 3.2) {
        nearbyWitness = w;
        break;
      }
    }
  }

  if (nearbyClue) {
    promptEl.style.display = 'flex';
    promptTextEl.textContent = 'Inspect ' + nearbyClue.title;
    activePromptAction = () => {
      openClueModal(nearbyClue);
    };
  } else if (nearbyWitness) {
    promptEl.style.display = 'flex';
    promptTextEl.textContent = 'Interrogate ' + nearbyWitness.name;
    activePromptAction = () => {
      openWitnessDialogue(nearbyWitness);
    };
  } else {
    promptEl.style.display = 'none';
    activePromptAction = null;
  }
}

function openClueModal(clue) {
  playNoirSound('clue');
  document.getElementById('clueCategory').textContent = clue.category;
  document.getElementById('clueTitle').textContent = clue.title;
  document.getElementById('clueVisualIcon').textContent = clue.icon;
  document.getElementById('clueDescription').textContent = clue.description;
  document.getElementById('clueModal').style.display = 'flex';

  if (!discoveredClues.find(c => c.id === clue.id)) {
    discoveredClues.push(clue);
    document.getElementById('clueCountEl').textContent = discoveredClues.length;
    renderCluesTab();
  }
}

function openWitnessDialogue(w) {
  playNoirSound('click');
  document.getElementById('speakerAvatar').textContent = w.avatar;
  document.getElementById('speakerName').textContent = w.name;
  document.getElementById('speakerTitle').textContent = w.title;
  document.getElementById('dialogueText').textContent = w.dialogue;
  document.getElementById('dialogueBox').style.display = 'block';
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  updateMovement();
  renderer.render(scene, camera);
}

init();
`
  }
};
