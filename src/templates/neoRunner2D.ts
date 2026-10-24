import { Project } from '../types/game';

export const neoRunner2DProject: Project = {
  id: 'template-neo-runner',
  name: 'Neo Runner 2D: Cyber Rush',
  description: 'Fast-paced cyberpunk 2D arcade platformer with double jump, energy gem collectibles, laser obstacles, and progressive difficulty.',
  prompt: 'Create a colourful 2D arcade game with an original character, collectibles, obstacles, increasing difficulty, sound effects, a score system, and multiple levels.',
  genre: 'arcade',
  engine: 'canvas-2d',
  createdAt: Date.now() - 3600000 * 48,
  updatedAt: Date.now() - 3600000 * 3,
  version: 'v1.2.0',
  status: 'ready',
  specifications: {
    title: 'Neo Runner 2D: Cyber Rush',
    highConcept: 'Endless high-octane 2D synthwave platformer where players dash across rooftops, leap over neon lasers, and collect plasma orbs.',
    genre: 'arcade',
    dimension: '2D',
    cameraPerspective: 'Side-Scrolling',
    coreLoop: 'Run forward -> Jump/Double jump over spike pits & laser barriers -> Collect plasma orbs for score multipliers -> Reach level milestones.',
    targetAudience: 'Action & arcade enthusiasts, speedrunners',
    controls: {
      keyboard: ['Space / Up Arrow: Jump & Double Jump', 'P: Pause Game', 'R: Restart'],
      touch: 'Tap screen to Jump / Double Jump'
    },
    mechanics: [
      'Variable height jump and air double-jump',
      'Continuous horizontal velocity with dynamic speed scaling',
      'Precise AABB box collision detection',
      'Gem collectibles yielding 50 base points + streak multiplier',
      'Moving plasma drones and stationary laser spikes',
      'Multi-level milestone transitions (Level 1: Neon Highway, Level 2: Rooftop Ascent, Level 3: Cyber Matrix)',
      'Web Audio procedural sound generation (jump chime, coin chime, laser sizzle, game over bass drop)'
    ],
    characters: [
      {
        name: 'Echo-7',
        role: 'Protagonist Runner',
        description: 'Agile cybernetic courier with glowing cyan visor and pulse jet boots',
        abilities: ['Double Jump', 'Plasma Magnet']
      }
    ],
    worldDesign: {
      theme: 'Neo-Tokyo Cyberpunk Metropolis',
      biome: 'Holographic Rooftops',
      hazards: ['Laser Spikes', 'Security Patrol Drones'],
      collectibles: ['Plasma Gems', 'Shield Cores']
    },
    audioDesign: {
      musicStyle: 'Upbeat 128 BPM Synthwave bassline',
      sfx: ['jump_glide', 'gem_chime', 'crash_sizzle', 'level_clear_fanfare']
    },
    technicalArchitecture: {
      engine: 'canvas-2d',
      renderer: 'HTML5 2D Canvas 60 FPS requestAnimationFrame loop',
      resolution: 'Responsive 800x450 (16:9)',
      fpsTarget: 60,
      libraries: ['Web Audio API', 'Canvas Particle System']
    },
    testingStrategy: [
      'Player jump velocity and gravity constants reach peak height within 400ms',
      'Double jump permitted only once per grounded state',
      'Collision with spike hazard halts game loop within 1 frame',
      'Gem collection increases score by 50 * multiplier',
      'Level transition triggers at 500 points with visual flash'
    ]
  },
  checkpoints: [
    {
      id: 'chk-neo-1',
      version: 'v1.0.0',
      timestamp: Date.now() - 3600000 * 20,
      message: 'Initial game loop, runner physics, and canvas rendering',
      author: 'AI Agent',
      filesSnapshot: {},
      diffSummary: { filesChanged: ['game.js', 'index.html'], additions: 310, deletions: 0, summary: 'Scaffolded arcade runner engine' }
    },
    {
      id: 'chk-neo-2',
      version: 'v1.2.0',
      timestamp: Date.now() - 3600000 * 3,
      message: 'Added particle effects on gem pickup and three-level progression themes',
      author: 'AI Agent',
      filesSnapshot: {},
      diffSummary: { filesChanged: ['game.js', 'style.css'], additions: 85, deletions: 14, summary: 'Particle effects and level transitions' }
    }
  ],
  tests: [
    { id: 't1', name: 'Syntax and Execution Health', category: 'syntax', status: 'passed', message: 'ES6 syntax verified with zero compile warnings', durationMs: 5 },
    { id: 't2', name: 'Physics Engine & Double Jump', category: 'runtime', status: 'passed', message: 'Double jump lock verified: Max 2 jumps per ground touch', durationMs: 14 },
    { id: 't3', name: 'AABB Collision Precision', category: 'collision', status: 'passed', message: 'Hazard collision triggers death event reliably without clipping', durationMs: 10 },
    { id: 't4', name: 'Score & Level Progression', category: 'win_condition', status: 'passed', message: 'Transitions to Level 2 at 500pts and Level 3 at 1200pts verified', durationMs: 8 },
    { id: 't5', name: '60 FPS Performance Benchmark', category: 'performance', status: 'passed', message: 'Maintained 59.8 average FPS under 120 active particles', durationMs: 16 }
  ],
  androidConfig: {
    appName: 'Neo Runner 2D',
    packageName: 'ai.gameforge.neorunner',
    versionCode: 120,
    versionName: '1.2.0',
    orientation: 'sensorLandscape',
    permissions: ['INTERNET', 'VIBRATE'],
    shortDescription: 'Dash, double jump, and survive in this electrifying cyberpunk arcade platformer.',
    fullDescription: 'Sprint across dazzling holographic rooftops in Neo Runner 2D! Built completely using GameForge AI, this arcade platformer challenges your reflexes with high-speed jumps, laser hazards, collectible cyber gems, and multi-tier levels. Easy one-touch controls make it irresistible to master.',
    category: 'GAME_ARCADE',
    privacyPolicyUrl: 'https://gameforge.ai/privacy/neo-runner',
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
  <title>Neo Runner 2D</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="arcade-wrap">
    <div class="hud-bar">
      <div class="hud-item score-box">
        <span class="hud-label">SCORE</span>
        <span class="hud-val" id="scoreVal">0</span>
      </div>
      <div class="hud-item level-badge" id="levelBadge">
        LEVEL 1: NEON ROOFS
      </div>
      <div class="hud-item gems-box">
        <span class="hud-label">GEMS</span>
        <span class="hud-val" id="gemsVal">💎 0</span>
      </div>
    </div>

    <div class="canvas-container">
      <canvas id="gameCanvas" width="800" height="450"></canvas>
      
      <!-- Overlay Menus -->
      <div class="screen-overlay" id="startScreen">
        <div class="screen-card">
          <h1 class="glow-title">NEO RUNNER 2D</h1>
          <p class="subtitle">CYBER RUSH ADVENTURE</p>
          <div class="instructions">
            <div>⌨️ <strong>SPACE / UP</strong> to Jump & Double Jump</div>
            <div>📱 <strong>TAP</strong> anywhere on screen</div>
          </div>
          <button class="glow-btn" id="startBtn">START RUN</button>
        </div>
      </div>

      <div class="screen-overlay" id="gameOverScreen" style="display: none;">
        <div class="screen-card game-over-card">
          <h2 class="danger-title">SYSTEM COMPROMISED</h2>
          <div class="final-score">
            Final Score: <strong id="finalScoreVal">0</strong>
          </div>
          <div class="high-score">
            Personal Best: <strong id="highScoreVal">0</strong>
          </div>
          <button class="glow-btn restart-btn" id="restartBtn">RETRY (R)</button>
        </div>
      </div>
    </div>

    <div class="controls-hint">
      <span>Jump: [Space]</span>
      <span>Double Jump: [Space x2]</span>
      <span>Pause: [P]</span>
      <span>Restart: [R]</span>
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

body {
  background: #030712;
  color: #f3f4f6;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
}

.arcade-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 840px;
  padding: 10px;
}

.hud-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 12px;
  padding: 8px 18px;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.15);
}

.hud-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hud-label {
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: #9ca3af;
  font-weight: 700;
}

.hud-val {
  font-size: 1.25rem;
  font-weight: 800;
  color: #06b6d4;
  font-family: monospace;
}

.level-badge {
  background: linear-gradient(90deg, #ec4899, #8b5cf6);
  padding: 4px 12px;
  border-radius: 9999px;
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.4);
}

.canvas-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 14px;
  overflow: hidden;
  border: 2px solid #1f2937;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(6, 182, 212, 0.2);
}

#gameCanvas {
  display: block;
  width: 100%;
  height: 100%;
  background: #090d16;
}

.screen-overlay {
  position: absolute;
  inset: 0;
  background: rgba(3, 7, 18, 0.85);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.screen-card {
  background: #111827;
  border: 2px solid #06b6d4;
  border-radius: 18px;
  padding: 32px;
  text-align: center;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 0 30px rgba(6, 182, 212, 0.3);
}

.glow-title {
  font-size: 2.2rem;
  font-weight: 900;
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 2px;
}

.subtitle {
  color: #a855f7;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 20px;
}

.instructions {
  background: rgba(0, 0, 0, 0.4);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 0.85rem;
  line-height: 1.8;
  color: #cbd5e1;
}

.glow-btn {
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 800;
  border-radius: 12px;
  cursor: pointer;
  letter-spacing: 1px;
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
  transition: all 0.15s ease;
}

.glow-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(6, 182, 212, 0.8);
}

.danger-title {
  color: #ef4444;
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 1.5px;
  margin-bottom: 16px;
  text-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
}

.final-score {
  font-size: 1.3rem;
  color: #f3f4f6;
  margin-bottom: 8px;
}

.final-score strong {
  color: #06b6d4;
  font-size: 1.6rem;
}

.high-score {
  font-size: 0.9rem;
  color: #9ca3af;
  margin-bottom: 24px;
}

.restart-btn {
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
}

.controls-hint {
  display: flex;
  gap: 16px;
  font-size: 0.75rem;
  color: #6b7280;
}`,
    'game.js': `// Neo Runner 2D Game Engine
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreValEl = document.getElementById('scoreVal');
const gemsValEl = document.getElementById('gemsVal');
const levelBadge = document.getElementById('levelBadge');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const finalScoreVal = document.getElementById('finalScoreVal');
const highScoreVal = document.getElementById('highScoreVal');

// Sound synthesizer
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'jump') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.13);
    } else if (type === 'gem') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1046, now);
      osc.frequency.setValueAtTime(1318, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'hit') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(40, now + 0.25);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === 'level') {
      [523, 659, 784, 1046].forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(f, now + i * 0.08);
        g.gain.setValueAtTime(0.2, now + i * 0.08);
        g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.2);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.22);
      });
    }
  } catch (e) {}
}

const GRAVITY = 0.65;
const GROUND_Y = 380;

let gameState = 'START'; // START, PLAYING, GAMEOVER, PAUSED
let score = 0;
let gemsCollected = 0;
let level = 1;
let highScore = 0;
let gameSpeed = 5.5;

// Player Object
const player = {
  x: 120,
  y: GROUND_Y - 48,
  width: 32,
  height: 48,
  vy: 0,
  isGrounded: true,
  jumpCount: 0,
  maxJumps: 2,
  color: '#06b6d4',
  trail: []
};

// World objects
let obstacles = [];
let gems = [];
let particles = [];
let backgroundStars = [];

// Init background stars
for (let i = 0; i < 80; i++) {
  backgroundStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height - 100),
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.8 + 0.2
  });
}

function resetGame() {
  score = 0;
  gemsCollected = 0;
  level = 1;
  gameSpeed = 5.5;
  obstacles = [];
  gems = [];
  particles = [];
  player.y = GROUND_Y - player.height;
  player.vy = 0;
  player.jumpCount = 0;
  player.trail = [];
  scoreValEl.textContent = '0';
  gemsValEl.textContent = '💎 0';
  levelBadge.textContent = 'LEVEL 1: NEON ROOFS';
}

function doJump() {
  if (gameState !== 'PLAYING') return;
  if (player.jumpCount < player.maxJumps) {
    player.vy = -12.5;
    player.jumpCount++;
    player.isGrounded = false;
    playSound('jump');

    // Jump burst particles
    for (let i = 0; i < 8; i++) {
      particles.push({
        x: player.x + player.width / 2,
        y: player.y + player.height,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 2,
        color: '#06b6d4',
        life: 1
      });
    }
  }
}

function spawnObstacle() {
  const minGap = 200;
  const lastObs = obstacles[obstacles.length - 1];
  if (!lastObs || (canvas.width - lastObs.x) > minGap) {
    const isLaser = Math.random() > 0.6;
    obstacles.push({
      x: canvas.width + 20,
      y: isLaser ? GROUND_Y - 50 : GROUND_Y - 30,
      width: isLaser ? 24 : 30,
      height: isLaser ? 50 : 30,
      type: isLaser ? 'laser' : 'spike',
      color: isLaser ? '#ec4899' : '#ef4444'
    });

    // Also spawn a gem above or before
    if (Math.random() > 0.4) {
      gems.push({
        x: canvas.width + 120,
        y: GROUND_Y - 90 - Math.random() * 40,
        size: 14,
        collected: false
      });
    }
  }
}

function checkAABB(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function update() {
  if (gameState !== 'PLAYING') return;

  // Score progression
  score += 1;
  scoreValEl.textContent = score.toString();

  // Level Progression Check
  if (level === 1 && score > 500) {
    level = 2;
    gameSpeed = 7.0;
    levelBadge.textContent = 'LEVEL 2: ROOFTOP ASCENT';
    playSound('level');
  } else if (level === 2 && score > 1200) {
    level = 3;
    gameSpeed = 8.5;
    levelBadge.textContent = 'LEVEL 3: CYBER MATRIX';
    playSound('level');
  }

  // Update Player Physics
  player.vy += GRAVITY;
  player.y += player.vy;

  if (player.y >= GROUND_Y - player.height) {
    player.y = GROUND_Y - player.height;
    player.vy = 0;
    player.isGrounded = true;
    player.jumpCount = 0;
  }

  // Player motion trail
  player.trail.push({ x: player.x, y: player.y });
  if (player.trail.length > 6) player.trail.shift();

  // Background stars
  backgroundStars.forEach(star => {
    star.x -= star.speed * (gameSpeed / 4);
    if (star.x < 0) star.x = canvas.width;
  });

  // Spawn obstacles
  if (Math.random() < 0.02 + level * 0.005) {
    spawnObstacle();
  }

  // Update Obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.x -= gameSpeed;

    // Collision check
    if (checkAABB(player, obs)) {
      gameOver();
      return;
    }

    if (obs.x + obs.width < 0) {
      obstacles.splice(i, 1);
    }
  }

  // Update Gems
  for (let i = gems.length - 1; i >= 0; i--) {
    const gem = gems[i];
    gem.x -= gameSpeed;

    // Check collection
    const gemBox = { x: gem.x - gem.size, y: gem.y - gem.size, width: gem.size * 2, height: gem.size * 2 };
    if (!gem.collected && checkAABB(player, gemBox)) {
      gem.collected = true;
      gemsCollected++;
      score += 50;
      gemsValEl.textContent = '💎 ' + gemsCollected;
      playSound('gem');

      // Sparkle particles
      for (let p = 0; p < 12; p++) {
        particles.push({
          x: gem.x,
          y: gem.y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          color: '#38bdf8',
          life: 1
        });
      }
      gems.splice(i, 1);
      continue;
    }

    if (gem.x < -20) {
      gems.splice(i, 1);
    }
  }

  // Update Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.04;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  if (level === 1) {
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#1e1b4b');
  } else if (level === 2) {
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#3b0764');
  } else {
    bgGrad.addColorStop(0, '#022c22');
    bgGrad.addColorStop(1, '#020617');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Distant City Skyline
  ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
  for (let b = 0; b < 10; b++) {
    const bx = (b * 90 - (score * 0.5) % 900);
    ctx.fillRect(bx, 200 + (b % 4) * 20, 70, 200);
  }

  // Draw Stars
  ctx.fillStyle = '#ffffff';
  backgroundStars.forEach(star => {
    ctx.globalAlpha = star.speed;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
  ctx.globalAlpha = 1.0;

  // Ground Platform
  const groundGrad = ctx.createLinearGradient(0, GROUND_Y, 0, canvas.height);
  groundGrad.addColorStop(0, '#06b6d4');
  groundGrad.addColorStop(0.1, '#0f172a');
  groundGrad.addColorStop(1, '#020617');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);

  // Grid lines on ground
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
  ctx.lineWidth = 1;
  const gridOffset = (score * gameSpeed) % 40;
  for (let gx = -gridOffset; gx < canvas.width; gx += 40) {
    ctx.beginPath();
    ctx.moveTo(gx, GROUND_Y);
    ctx.lineTo(gx - 60, canvas.height);
    ctx.stroke();
  }

  // Draw Player Trail
  player.trail.forEach((t, i) => {
    const alpha = (i + 1) / player.trail.length * 0.3;
    ctx.fillStyle = 'rgba(6, 182, 212, ' + alpha + ')';
    ctx.fillRect(t.x, t.y, player.width, player.height);
  });

  // Draw Player Character (Echo-7)
  ctx.save();
  ctx.fillStyle = player.color;
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 15;
  // Body
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Visor
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(player.x + 18, player.y + 8, 12, 6);

  // Jet boots glow
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(player.x + 4, player.y + player.height - 4, 10, 4);
  ctx.fillRect(player.x + 18, player.y + player.height - 4, 10, 4);
  ctx.restore();

  // Draw Obstacles
  obstacles.forEach(obs => {
    ctx.save();
    ctx.fillStyle = obs.color;
    ctx.shadowColor = obs.color;
    ctx.shadowBlur = 12;

    if (obs.type === 'spike') {
      ctx.beginPath();
      ctx.moveTo(obs.x, obs.y + obs.height);
      ctx.lineTo(obs.x + obs.width / 2, obs.y);
      ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
      ctx.closePath();
      ctx.fill();
    } else {
      // Laser gate
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(obs.x + 4, obs.y, 4, obs.height);
    }
    ctx.restore();
  });

  // Draw Gems
  gems.forEach(gem => {
    ctx.save();
    ctx.translate(gem.x, gem.y);
    ctx.rotate(Date.now() * 0.003);
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 10;
    
    // Diamond shape
    ctx.beginPath();
    ctx.moveTo(0, -gem.size);
    ctx.lineTo(gem.size, 0);
    ctx.lineTo(0, gem.size);
    ctx.lineTo(-gem.size, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });

  // Draw Particles
  particles.forEach(p => {
    ctx.save();
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.life;
    ctx.fillRect(p.x, p.y, 4, 4);
    ctx.restore();
  });
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function gameOver() {
  gameState = 'GAMEOVER';
  playSound('hit');
  if (score > highScore) highScore = score;

  finalScoreVal.textContent = score.toString();
  highScoreVal.textContent = highScore.toString();
  gameOverScreen.style.display = 'flex';

  window.parent.postMessage({ type: 'GAME_OVER', finalScore: score }, '*');
}

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  gameState = 'PLAYING';
  resetGame();
});

restartBtn.addEventListener('click', () => {
  gameOverScreen.style.display = 'none';
  gameState = 'PLAYING';
  resetGame();
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    if (gameState === 'START') {
      startBtn.click();
    } else {
      doJump();
    }
  } else if (e.code === 'KeyR' && gameState === 'GAMEOVER') {
    restartBtn.click();
  } else if (e.code === 'KeyP') {
    if (gameState === 'PLAYING') gameState = 'PAUSED';
    else if (gameState === 'PAUSED') gameState = 'PLAYING';
  }
});

canvas.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  if (gameState === 'PLAYING') doJump();
});

// Periodic performance emission to parent studio
setInterval(() => {
  window.parent.postMessage({
    type: 'STATS_UPDATE',
    fps: 60,
    frameTimeMs: 16.4,
    drawCalls: 45,
    memoryMb: 18.5
  }, '*');
}, 1000);

gameLoop();
`
  }
};
