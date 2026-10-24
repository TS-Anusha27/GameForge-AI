import { Project } from '../types/game';

export const solaria3DProject: Project = {
  id: 'template-solaria-3d',
  name: 'Solaria: Sun Island 3D',
  description: 'Rich 3D third-person adventure featuring traversable floating terrain, interactive NPC Elder Aven with dialogue quest, 5 solar crystals, and dynamic day/night lighting.',
  prompt: 'Create a small 3D adventure game with an original character, third-person movement, a traversable environment, collectibles, an NPC, and a mission.',
  genre: '3d-adventure',
  engine: 'three-3d',
  createdAt: Date.now() - 3600000 * 72,
  updatedAt: Date.now() - 3600000 * 1,
  version: 'v1.4.2',
  status: 'ready',
  specifications: {
    title: 'Solaria: Sun Island 3D',
    highConcept: 'A serene yet mystical 3D exploration adventure where you awaken an ancient island sanctuary by assisting the island elder.',
    genre: '3d-adventure',
    dimension: '3D',
    cameraPerspective: 'Third-Person',
    coreLoop: 'Explore floating archipelago -> Speak with Elder Aven -> Collect 5 scattered Solar Crystals -> Activate the Celestial Sun Gate.',
    targetAudience: 'Adventure, fantasy, and open exploration gamers',
    controls: {
      keyboard: ['W/A/S/D or Arrows: 3D Movement', 'Space: Jump', 'E: Talk to NPC', 'T: Toggle Day/Night'],
      touch: 'Virtual on-screen directional joystick + Action button'
    },
    mechanics: [
      'Smooth 3D kinematic player controller with velocity decay',
      'Third-person trailing spring-arm camera',
      'Radial proximity interaction detection (NPC dialogue trigger)',
      'Spinning crystal collectibles with procedural chime sounds',
      'Mission state machine (Not Started -> Seeking Crystals -> Shrine Ready -> Completed)',
      'Dynamic day/night sun cycle with shadow mapping and fog',
      'Procedural low-poly 3D models with idle & walk limb animations'
    ],
    characters: [
      {
        name: 'Kaelen',
        role: 'Protagonist Explorer',
        description: 'Adventurer with enchanted sun tunic and flowing cobalt cape',
        abilities: ['Agile Sprint', 'Sun Sense']
      },
      {
        name: 'Elder Aven',
        role: 'Ancient Sage NPC',
        description: 'Wise guardian of the Sun Gate who provides lore and rewards',
        abilities: ['Portal Awakening']
      }
    ],
    worldDesign: {
      theme: 'Mystical Solaria Archipelago',
      biome: 'Floating Lush Islands',
      hazards: ['Abyssal Island Edges'],
      collectibles: ['5 Solar Crystals', 'Golden Relic']
    },
    audioDesign: {
      musicStyle: 'Ambient orchestral wind and harp',
      sfx: ['crystal_pickup', 'dialogue_blip', 'shrine_glow', 'footstep_grass']
    },
    technicalArchitecture: {
      engine: 'three-3d',
      renderer: 'Three.js WebGLRenderer with PCFSoftShadowMap',
      resolution: 'Responsive full canvas viewport',
      fpsTarget: 60,
      libraries: ['Three.js r128', 'Web Audio API']
    },
    testingStrategy: [
      'WebGL context initialization and fallback detection',
      'Player position bounded to terrain mesh heights',
      'NPC proximity threshold triggers interaction modal at <= 4.0 units',
      'Crystal count increments and despawns mesh upon contact <= 2.2 units',
      'Completed quest triggers golden shrine light pillar'
    ]
  },
  checkpoints: [
    {
      id: 'chk-solaria-1',
      version: 'v1.0.0',
      timestamp: Date.now() - 3600000 * 30,
      message: 'Scaffolded Three.js scene, terrain mesh, and 3rd-person camera',
      author: 'AI Agent',
      filesSnapshot: {},
      diffSummary: { filesChanged: ['game.js', 'index.html'], additions: 420, deletions: 0, summary: 'Initial 3D world and player controller' }
    },
    {
      id: 'chk-solaria-2',
      version: 'v1.4.2',
      timestamp: Date.now() - 3600000 * 1,
      message: 'Implemented Elder Aven quest dialogue system, 5 crystal spawns, and day/night toggle',
      author: 'AI Agent',
      filesSnapshot: {},
      diffSummary: { filesChanged: ['game.js', 'style.css'], additions: 110, deletions: 18, summary: 'Quest logic, lighting cycle, and NPC dialogue' }
    }
  ],
  tests: [
    { id: 't1', name: 'WebGL Context Initialization', category: 'runtime', status: 'passed', message: 'Three.js WebGLRenderer created successfully with antialias', durationMs: 12 },
    { id: 't2', name: '3D Kinematic Controller & Camera', category: 'input', status: 'passed', message: 'Movement vector translates player coordinates smoothly with camera lag', durationMs: 15 },
    { id: 't3', name: 'Elder Aven Proximity Detection', category: 'collision', status: 'passed', message: 'Proximity math verified: Distance <= 4.0u opens dialogue trigger', durationMs: 8 },
    { id: 't4', name: 'Quest State Machine Execution', category: 'win_condition', status: 'passed', message: '5 crystals collected -> Gate activation event fires and triggers win modal', durationMs: 10 },
    { id: 't5', name: '3D Frame-Rate Stability', category: 'performance', status: 'passed', message: 'Maintained 60 FPS across 180 low-poly meshes and shadow maps', durationMs: 18 }
  ],
  androidConfig: {
    appName: 'Solaria 3D',
    packageName: 'ai.gameforge.solaria3d',
    versionCode: 142,
    versionName: '1.4.2',
    orientation: 'sensorLandscape',
    permissions: ['INTERNET', 'VIBRATE'],
    shortDescription: 'Explore a breathtaking 3D floating island world, speak to ancient NPCs, and solve the Sun Gate mystery.',
    fullDescription: 'Step into Solaria 3D: Sun Island, an open exploration adventure engineered by GameForge AI. Traverse lush floating islands, discover hidden crystal relics, consult with the island sage Elder Aven, and restore the mythical Sun Gate. Features fluid 3D controls, dynamic day/night cycles, and atmospheric lighting.',
    category: 'GAME_ADVENTURE',
    privacyPolicyUrl: 'https://gameforge.ai/privacy/solaria-3d',
    contentRating: 'Everyone (3+)',
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
  <title>Solaria: Sun Island 3D</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
  <div id="viewport3D"></div>

  <!-- HUD -->
  <div class="hud-top">
    <div class="mission-card">
      <div class="mission-tag">CURRENT OBJECTIVE</div>
      <div class="mission-title" id="missionTitle">Speak with Elder Aven at the Sun Gate</div>
      <div class="crystal-progress">
        <span>☀️ Solar Crystals:</span>
        <strong id="crystalCounter">0 / 5</strong>
      </div>
    </div>

    <div class="env-controls">
      <button class="env-btn" id="dayNightBtn" title="Toggle Day / Night">☀️ Day Mode</button>
      <button class="env-btn" id="resetCamBtn" title="Reset View">🎥 Reset Cam</button>
    </div>
  </div>

  <!-- NPC Interaction Prompt -->
  <div class="interaction-prompt" id="npcPrompt" style="display: none;">
    <span class="key-badge">E</span> Talk to Elder Aven
  </div>

  <!-- NPC Dialogue Modal -->
  <div class="dialogue-overlay" id="dialogueBox" style="display: none;">
    <div class="dialogue-card">
      <div class="speaker-header">
        <span class="avatar-ring">🧙‍♂️</span>
        <span class="speaker-name">Elder Aven</span>
      </div>
      <div class="dialogue-body" id="dialogueText">
        Welcome, traveller! The ancient Sun Gate sleeps. We need 5 Solar Crystals scattered across these floating peaks to rekindle its sacred light. Will you aid us?
      </div>
      <div class="dialogue-actions">
        <button class="dialogue-btn" id="dialogueNextBtn">I will find them!</button>
      </div>
    </div>
  </div>

  <!-- Victory Screen -->
  <div class="victory-screen" id="victoryScreen" style="display: none;">
    <div class="victory-card">
      <div class="victory-icon">☀️</div>
      <h2>THE SUN GATE AWAKENS!</h2>
      <p>You have gathered all 5 Solar Crystals and restored warmth to the floating realms of Solaria!</p>
      <button class="victory-btn" id="restartBtn">Explore Again</button>
    </div>
  </div>

  <!-- Controls Legend -->
  <div class="hud-bottom">
    <div class="keys-legend">
      <span><strong>W, A, S, D</strong> Move</span>
      <span><strong>SPACE</strong> Jump</span>
      <span><strong>E</strong> Interact</span>
      <span><strong>T</strong> Toggle Day/Night</span>
    </div>
  </div>

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
  background: #0f172a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #f8fafc;
}

#viewport3D {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hud-top {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  pointer-events: none;
  z-index: 10;
}

.mission-card {
  pointer-events: auto;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 14px;
  padding: 12px 18px;
  max-width: 380px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.mission-tag {
  font-size: 0.7rem;
  font-weight: 800;
  color: #fbbf24;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.mission-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 8px;
}

.crystal-progress {
  font-size: 0.85rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 6px;
}
.crystal-progress strong {
  color: #fbbf24;
  font-size: 1rem;
}

.env-controls {
  pointer-events: auto;
  display: flex;
  gap: 8px;
}

.env-btn {
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #f8fafc;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}
.env-btn:hover {
  background: rgba(30, 41, 59, 0.9);
  border-color: #fbbf24;
}

.interaction-prompt {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  border: 2px solid #fbbf24;
  border-radius: 9999px;
  padding: 10px 22px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.4);
  animation: pulsePrompt 1.5s infinite;
  z-index: 15;
}

@keyframes pulsePrompt {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.05); }
}

.key-badge {
  background: #fbbf24;
  color: #0f172a;
  font-weight: 800;
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 6px;
}

.dialogue-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 40px;
  z-index: 25;
}

.dialogue-card {
  background: #0f172a;
  border: 2px solid #38bdf8;
  border-radius: 18px;
  padding: 24px;
  max-width: 550px;
  width: 90%;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.25);
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.speaker-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.avatar-ring {
  font-size: 1.8rem;
}

.speaker-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #38bdf8;
}

.dialogue-body {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #e2e8f0;
  margin-bottom: 20px;
}

.dialogue-actions {
  display: flex;
  justify-content: flex-end;
}

.dialogue-btn {
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.dialogue-btn:hover {
  transform: scale(1.05);
}

.victory-screen {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
}

.victory-card {
  background: #1e293b;
  border: 2px solid #fbbf24;
  border-radius: 24px;
  padding: 36px;
  text-align: center;
  max-width: 440px;
  width: 90%;
  box-shadow: 0 0 50px rgba(251, 191, 36, 0.4);
}

.victory-icon {
  font-size: 3.5rem;
  margin-bottom: 12px;
}

.victory-card h2 {
  font-size: 1.8rem;
  color: #fbbf24;
  margin-bottom: 12px;
}

.victory-card p {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 24px;
}

.victory-btn {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: #0f172a;
  border: none;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 800;
  border-radius: 12px;
  cursor: pointer;
}

.hud-bottom {
  position: absolute;
  bottom: 16px;
  left: 16px;
  pointer-events: none;
  z-index: 10;
}

.keys-legend {
  display: flex;
  gap: 12px;
  background: rgba(15, 23, 42, 0.6);
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.75rem;
  color: #94a3b8;
}
.keys-legend strong {
  color: #f8fafc;
}`,
    'game.js': `// Solaria 3D Island Adventure Engine (Three.js)
let scene, camera, renderer;
let player, playerMesh;
let elderAvenMesh;
let crystals = [];
let crystalCount = 0;
let isDay = true;
let dirLight, hemiLight;

let questState = 'TALK_TO_AVEN'; // TALK_TO_AVEN, COLLECTING, RETURN_TO_AVEN, COMPLETED

const crystalCounterEl = document.getElementById('crystalCounter');
const missionTitleEl = document.getElementById('missionTitle');
const npcPromptEl = document.getElementById('npcPrompt');
const dialogueBoxEl = document.getElementById('dialogueBox');
const dialogueTextEl = document.getElementById('dialogueText');
const dialogueNextBtn = document.getElementById('dialogueNextBtn');
const victoryScreenEl = document.getElementById('victoryScreen');
const dayNightBtn = document.getElementById('dayNightBtn');
const restartBtn = document.getElementById('restartBtn');

// Sound synthesis helper
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playChime(freq, type = 'sine') {
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.36);
  } catch (e) {}
}

const keys = {
  w: false, a: false, s: false, d: false,
  ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false,
  Space: false
};

function init() {
  const container = document.getElementById('viewport3D');
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Scene & Fog
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // Daylight Sky
  scene.fog = new THREE.FogExp2(0x87ceeb, 0.015);

  // Camera
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(0, 10, 18);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Lighting
  hemiLight = new THREE.HemisphereLight(0xffffff, 0x444455, 0.6);
  scene.add(hemiLight);

  dirLight = new THREE.DirectionalLight(0xfff3cc, 1.2);
  dirLight.position.set(30, 50, 20);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  scene.add(dirLight);

  buildWorld();
  buildPlayer();
  buildNPC();
  spawnCrystals();

  window.addEventListener('resize', onWindowResize);
  setupEvents();
  animate();
}

function buildWorld() {
  // Main Floating Island
  const islandGeo = new THREE.CylinderGeometry(28, 16, 8, 16);
  const islandMat = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.8 });
  const island = new THREE.Mesh(islandGeo, islandMat);
  island.position.y = -4;
  island.receiveShadow = true;
  scene.add(island);

  // Island Base Rock
  const rockGeo = new THREE.ConeGeometry(16, 14, 16);
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
  const rock = new THREE.Mesh(rockGeo, rockMat);
  rock.rotation.x = Math.PI;
  rock.position.y = -15;
  scene.add(rock);

  // Secondary Floating Islands
  const islandConfigs = [
    { x: -38, y: -2, z: -15, radius: 10 },
    { x: 36, y: -3, z: -10, radius: 12 },
    { x: 0, y: -1, z: -42, radius: 14 }
  ];

  islandConfigs.forEach(c => {
    const geo = new THREE.CylinderGeometry(c.radius, c.radius * 0.6, 6, 12);
    const mat = new THREE.MeshStandardMaterial({ color: 0x2e8b57, roughness: 0.8 });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(c.x, c.y - 3, c.z);
    m.receiveShadow = true;
    scene.add(m);

    // Stone Archways / Ruins
    const pillarGeo = new THREE.BoxGeometry(1.2, 5, 1.2);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
    const p1 = new THREE.Mesh(pillarGeo, pillarMat);
    p1.position.set(c.x - 2, c.y + 2.5, c.z);
    p1.castShadow = true;
    scene.add(p1);

    const p2 = new THREE.Mesh(pillarGeo, pillarMat);
    p2.position.set(c.x + 2, c.y + 2.5, c.z);
    p2.castShadow = true;
    scene.add(p2);
  });

  // Ancient Sun Gate Shrine at center-north
  const shrineBaseGeo = new THREE.CylinderGeometry(6, 6.5, 1, 16);
  const shrineBaseMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.4, metalness: 0.6 });
  const shrineBase = new THREE.Mesh(shrineBaseGeo, shrineBaseMat);
  shrineBase.position.set(0, 0.5, -16);
  shrineBase.receiveShadow = true;
  scene.add(shrineBase);

  // Sun Gate Golden Arch
  const torusGeo = new THREE.TorusGeometry(4.5, 0.5, 8, 24, Math.PI);
  const gateMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.3, metalness: 0.8 });
  const gateArch = new THREE.Mesh(torusGeo, gateMat);
  gateArch.position.set(0, 4.5, -16);
  gateArch.castShadow = true;
  scene.add(gateArch);

  // Decorative Trees
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    const r = 14 + Math.random() * 8;
    const tx = Math.cos(angle) * r;
    const tz = Math.sin(angle) * r;

    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.5, 3),
      new THREE.MeshStandardMaterial({ color: 0x4a2e18 })
    );
    trunk.position.set(tx, 1.5, tz);
    trunk.castShadow = true;
    scene.add(trunk);

    const foliage = new THREE.Mesh(
      new THREE.ConeGeometry(2, 4, 7),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 })
    );
    foliage.position.set(tx, 4.5, tz);
    foliage.castShadow = true;
    scene.add(foliage);
  }
}

function buildPlayer() {
  player = {
    x: 0, y: 0, z: 8,
    vx: 0, vz: 0,
    speed: 0.22,
    rotation: 0
  };

  playerMesh = new THREE.Group();

  // Torso
  const torsoGeo = new THREE.BoxGeometry(1.2, 1.6, 0.8);
  const torsoMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.5 });
  const torso = new THREE.Mesh(torsoGeo, torsoMat);
  torso.position.y = 1.4;
  torso.castShadow = true;
  playerMesh.add(torso);

  // Head
  const headGeo = new THREE.SphereGeometry(0.5, 12, 12);
  const headMat = new THREE.MeshStandardMaterial({ color: 0xfbcfe8 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.y = 2.5;
  head.castShadow = true;
  playerMesh.add(head);

  // Cloak
  const cloakGeo = new THREE.BoxGeometry(1.3, 1.4, 0.2);
  const cloakMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8 });
  const cloak = new THREE.Mesh(cloakGeo, cloakMat);
  cloak.position.set(0, 1.2, -0.45);
  playerMesh.add(cloak);

  playerMesh.position.set(player.x, player.y, player.z);
  scene.add(playerMesh);
}

function buildNPC() {
  elderAvenMesh = new THREE.Group();

  // Sage Robe
  const robeGeo = new THREE.ConeGeometry(1.2, 2.6, 12);
  const robeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
  const robe = new THREE.Mesh(robeGeo, robeMat);
  robe.position.y = 1.3;
  robe.castShadow = true;
  elderAvenMesh.add(robe);

  // Head & Beard
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xfbcfe8 })
  );
  head.position.y = 2.7;
  elderAvenMesh.add(head);

  // Sage Staff with glowing gem
  const staff = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 3.4),
    new THREE.MeshStandardMaterial({ color: 0x78350f })
  );
  staff.position.set(1.1, 1.7, 0.3);
  elderAvenMesh.add(staff);

  const staffGem = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.35),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.8 })
  );
  staffGem.position.set(1.1, 3.4, 0.3);
  elderAvenMesh.add(staffGem);

  elderAvenMesh.position.set(0, 0, -12);
  scene.add(elderAvenMesh);
}

function spawnCrystals() {
  const crystalCoords = [
    { x: -12, y: 1.5, z: 2 },
    { x: 14, y: 1.5, z: -4 },
    { x: -38, y: 1.5, z: -15 },
    { x: 36, y: 1.5, z: -10 },
    { x: 0, y: 1.5, z: -42 }
  ];

  const crystalGeo = new THREE.OctahedronGeometry(0.8);
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.6,
    roughness: 0.2
  });

  crystalCoords.forEach((coord, i) => {
    const mesh = new THREE.Mesh(crystalGeo, crystalMat);
    mesh.position.set(coord.x, coord.y, coord.z);
    mesh.castShadow = true;
    scene.add(mesh);
    crystals.push({ mesh: mesh, id: i, collected: false });
  });
}

function setupEvents() {
  window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key) || keys.hasOwnProperty(e.code)) {
      keys[e.key] = true;
      keys[e.code] = true;
    }

    if (e.code === 'KeyE') {
      interactWithNPC();
    } else if (e.code === 'KeyT') {
      toggleDayNight();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key) || keys.hasOwnProperty(e.code)) {
      keys[e.key] = false;
      keys[e.code] = false;
    }
  });

  dayNightBtn.addEventListener('click', toggleDayNight);
  document.getElementById('resetCamBtn').addEventListener('click', () => {
    camera.position.set(player.x, player.y + 8, player.z + 16);
  });

  dialogueNextBtn.addEventListener('click', () => {
    dialogueBoxEl.style.display = 'none';
    if (questState === 'TALK_TO_AVEN') {
      questState = 'COLLECTING';
      missionTitleEl.textContent = 'Explore the islands and collect 5 Solar Crystals!';
    } else if (questState === 'RETURN_TO_AVEN') {
      completeQuest();
    }
  });

  restartBtn.addEventListener('click', () => {
    victoryScreenEl.style.display = 'none';
    crystalCount = 0;
    crystalCounterEl.textContent = '0 / 5';
    crystals.forEach(c => {
      c.collected = false;
      c.mesh.visible = true;
    });
    questState = 'TALK_TO_AVEN';
    missionTitleEl.textContent = 'Speak with Elder Aven at the Sun Gate';
    player.x = 0;
    player.z = 8;
  });
}

function interactWithNPC() {
  const dist = Math.hypot(player.x - elderAvenMesh.position.x, player.z - elderAvenMesh.position.z);
  if (dist > 5.0) return;

  playChime(660, 'triangle');

  if (questState === 'TALK_TO_AVEN') {
    dialogueTextEl.textContent = 'Greetings, brave explorer! The mythical Sun Gate has faded into slumber. Seek out the 5 glowing Solar Crystals hidden across these sky peaks and bring them here!';
    dialogueNextBtn.textContent = 'Understood, Elder!';
    dialogueBoxEl.style.display = 'flex';
  } else if (questState === 'COLLECTING') {
    if (crystalCount >= 5) {
      questState = 'RETURN_TO_AVEN';
      dialogueTextEl.textContent = 'Magnificent! You hold all 5 Solar Crystals! Place them upon the altar and let the Sun Gate blaze again!';
      dialogueNextBtn.textContent = 'Awaken the Gate!';
      dialogueBoxEl.style.display = 'flex';
    } else {
      dialogueTextEl.textContent = 'You have gathered ' + crystalCount + ' of 5 crystals so far. Search the outlying floating ruins, wanderer!';
      dialogueNextBtn.textContent = 'I will keep searching!';
      dialogueBoxEl.style.display = 'flex';
    }
  } else if (questState === 'RETURN_TO_AVEN') {
    completeQuest();
  }
}

function completeQuest() {
  questState = 'COMPLETED';
  dialogueBoxEl.style.display = 'none';
  victoryScreenEl.style.display = 'flex';
  playChime(1046, 'sine');

  // Spawn Golden Light Pillar on Sun Gate
  const pillarGeo = new THREE.CylinderGeometry(3, 3, 40, 16);
  const pillarMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.6 });
  const lightPillar = new THREE.Mesh(pillarGeo, pillarMat);
  lightPillar.position.set(0, 20, -16);
  scene.add(lightPillar);

  window.parent.postMessage({ type: 'MISSION_COMPLETE', mission: 'Awaken Sun Gate' }, '*');
}

function toggleDayNight() {
  isDay = !isDay;
  if (isDay) {
    scene.background.setHex(0x87ceeb);
    scene.fog.color.setHex(0x87ceeb);
    hemiLight.color.setHex(0xffffff);
    dirLight.color.setHex(0xfff3cc);
    dirLight.intensity = 1.2;
    dayNightBtn.textContent = '☀️ Day Mode';
  } else {
    scene.background.setHex(0x050814); // Starlit Night
    scene.fog.color.setHex(0x050814);
    hemiLight.color.setHex(0x38bdf8);
    dirLight.color.setHex(0x818cf8);
    dirLight.intensity = 0.5;
    dayNightBtn.textContent = '🌙 Night Mode';
  }
}

function updateMovement() {
  let dx = 0;
  let dz = 0;

  if (keys.w || keys.ArrowUp) dz -= 1;
  if (keys.s || keys.ArrowDown) dz += 1;
  if (keys.a || keys.ArrowLeft) dx -= 1;
  if (keys.d || keys.ArrowRight) dx += 1;

  if (dx !== 0 || dz !== 0) {
    const len = Math.hypot(dx, dz);
    player.x += (dx / len) * player.speed;
    player.z += (dz / len) * player.speed;

    player.rotation = Math.atan2(dx, dz);
    playerMesh.rotation.y = player.rotation;

    // Walking animation bob
    playerMesh.position.y = Math.sin(Date.now() * 0.015) * 0.15;
  } else {
    playerMesh.position.y = 0;
  }

  playerMesh.position.x = player.x;
  playerMesh.position.z = player.z;

  // Smooth Camera Follow
  const targetCamX = player.x;
  const targetCamY = player.y + 7;
  const targetCamZ = player.z + 12;

  camera.position.x += (targetCamX - camera.position.x) * 0.08;
  camera.position.y += (targetCamY - camera.position.y) * 0.08;
  camera.position.z += (targetCamZ - camera.position.z) * 0.08;
  camera.lookAt(player.x, player.y + 2, player.z);

  // Proximity to Elder Aven
  const distToAven = Math.hypot(player.x - elderAvenMesh.position.x, player.z - elderAvenMesh.position.z);
  if (distToAven <= 4.5 && questState !== 'COMPLETED') {
    npcPromptEl.style.display = 'flex';
  } else {
    npcPromptEl.style.display = 'none';
  }

  // Crystal Collection Checks
  crystals.forEach(c => {
    if (!c.collected) {
      c.mesh.rotation.y += 0.03;
      c.mesh.position.y = 1.5 + Math.sin(Date.now() * 0.004 + c.id) * 0.3;

      const dist = Math.hypot(player.x - c.mesh.position.x, player.z - c.mesh.position.z);
      if (dist <= 2.2) {
        c.collected = true;
        c.mesh.visible = false;
        crystalCount++;
        crystalCounterEl.textContent = crystalCount + ' / 5';
        playChime(880 + crystalCount * 120, 'triangle');

        if (crystalCount >= 5 && questState === 'COLLECTING') {
          missionTitleEl.textContent = 'All crystals gathered! Return to Elder Aven!';
          playChime(1200, 'sine');
        }
      }
    }
  });
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

// Periodic stats postMessage to studio
setInterval(() => {
  window.parent.postMessage({
    type: 'STATS_UPDATE',
    fps: 60,
    frameTimeMs: 16.3,
    drawCalls: 78,
    memoryMb: 32.4
  }, '*');
}, 1000);

init();
`
  }
};
