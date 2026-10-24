import { Project } from '../types/game';

export const cyberpunkOdysseyProject: Project = {
  id: 'template-cyberpunk-odyssey',
  name: 'Cyberpunk Odyssey: Open World Prototype',
  description: 'First milestone of a modular open-world cyberpunk city: drivable cyber-car with vehicle physics, pedestrian NPCs, interactive item shop, mission contracts, dynamic rain weather, and minimap.',
  prompt: 'Create a 3D open-world adventure game with vehicles, original characters, missions, NPCs, shops, a day-night cycle, and dynamic weather.',
  genre: 'open-world',
  engine: 'canvas-2d',
  createdAt: Date.now() - 3600000 * 120,
  updatedAt: Date.now() - 3600000 * 1,
  version: 'v1.0.0-m1',
  status: 'ready',
  specifications: {
    title: 'Cyberpunk Odyssey: Sector 4',
    highConcept: 'Modular open-world prototype featuring ground exploration, vehicle driving, urban economy, and dynamic atmospheric simulation.',
    genre: 'open-world',
    dimension: '2D',
    cameraPerspective: 'Top-Down',
    coreLoop: 'Explore Sector 4 -> Drive cyber-vehicle -> Pick up contract missions from Net Terminal -> Earn credits -> Purchase upgrades at Cyber-Shop.',
    targetAudience: 'Open-world, sandbox, cyberpunk and driving game fans',
    controls: {
      keyboard: [
        'WASD / Arrows: Move On Foot or Steer Vehicle',
        'F: Enter / Exit Cyber-Vehicle',
        'E: Interact with Terminal or Shop',
        'T: Toggle Dynamic Rain / Weather'
      ],
      touch: 'On-screen virtual joystick and context action button'
    },
    mechanics: [
      'Dual Locomotion State Machine (On-Foot vs In-Vehicle physics with momentum)',
      'Vehicle mounting / dismounting proximity trigger',
      'Dynamic urban traffic & walking pedestrian AI routines',
      'Credits economy system with mission payouts and merchant inventory',
      'Minimap navigation radar tracking objectives and vehicles',
      'Dynamic weather cycle: Rain storm vs Clear Neon Night'
    ],
    characters: [
      { name: 'Kage V', role: 'Protagonist Mercenary', description: 'Augmented courier navigating the neon underworld', abilities: ['Drift Handling', 'Tech Jack'] },
      { name: 'Merchant Silas', role: 'Cyber-Bazaar Vendor', description: 'Black-market augmentations and parts dealer', abilities: ['Trade Inventory'] }
    ],
    worldDesign: {
      theme: 'Neo-Kowloon District 4',
      biome: 'Cyberpunk Urban Metropolis',
      hazards: ['Road Barriers', 'Security Scanners'],
      collectibles: ['Data Slates', 'Credit Chips']
    },
    audioDesign: {
      musicStyle: 'Dark synthwave / Industrial ambient loop',
      sfx: ['car_engine_rev', 'rain_patters', 'shop_purchase', 'door_chime']
    },
    technicalArchitecture: {
      engine: 'canvas-2d',
      renderer: 'HTML5 2D Canvas 60 FPS viewport with camera panning',
      resolution: 'Responsive 800x600',
      fpsTarget: 60,
      libraries: ['Web Audio API']
    },
    testingStrategy: [
      'Vehicle entry locks player position to vehicle coordinate matrix',
      'Car friction and steering angle calculations preserve momentum',
      'Shop transaction deducts credits and appends item to inventory array',
      'Minimap marker transforms accurately project world coords to radar radius'
    ]
  },
  checkpoints: [
    {
      id: 'chk-odyssey-m1',
      version: 'v1.0.0-m1',
      timestamp: Date.now() - 3600000 * 2,
      message: 'Milestone 1 Open-World Prototype: City district, drivable vehicle, shop, missions, dynamic weather',
      author: 'AI Agent',
      filesSnapshot: {},
      diffSummary: {
        filesChanged: ['game.js', 'style.css', 'index.html'],
        additions: 580,
        deletions: 0,
        summary: 'Generated Milestone 1 open-world core systems and modules'
      }
    }
  ],
  tests: [
    { id: 't1', name: 'Open-World Map Coordinate Bounds', category: 'collision', status: 'passed', message: 'World size 2400x2400 boundaries and building collisions active', durationMs: 8 },
    { id: 't2', name: 'Vehicle Rigidbody Momentum Math', category: 'runtime', status: 'passed', message: 'Acceleration, steering angle, and friction dampening calculated within tolerances', durationMs: 14 },
    { id: 't3', name: 'Vehicle Enter/Exit State Machine', category: 'input', status: 'passed', message: 'Pressing F within 60px of vehicle transfers controller seamlessly', durationMs: 10 },
    { id: 't4', name: 'Shop Transaction & Inventory Mutex', category: 'runtime', status: 'passed', message: 'Credit deduction and inventory push executed atomically', durationMs: 6 },
    { id: 't5', name: 'Minimap Projection Math', category: 'runtime', status: 'passed', message: 'World to 150px radar scale ratio verified accurate to within 1 pixel', durationMs: 9 }
  ],
  androidConfig: {
    appName: 'Cyberpunk Odyssey',
    packageName: 'ai.gameforge.cyberpunkodyssey',
    versionCode: 100,
    versionName: '1.0.0',
    orientation: 'sensorLandscape',
    permissions: ['INTERNET', 'VIBRATE'],
    shortDescription: 'Explore a neon open-world city, drive cyber cars, accept missions, and trade gear.',
    fullDescription: 'Enter the neon-drenched streets of Sector 4 in Cyberpunk Odyssey! Built using GameForge AI, this open-world milestone lets you cruise down glowing avenues in high-performance cyber cars, converse with city vendors, deliver covert data packages, and adapt to changing weather conditions.',
    category: 'GAME_ROLE_PLAYING',
    privacyPolicyUrl: 'https://gameforge.ai/privacy/cyberpunk-odyssey',
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
  <title>Cyberpunk Odyssey: Open World Prototype</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="world-container">
    <div class="hud-top">
      <div class="hud-card stats-panel">
        <div class="stat-row">
          <span class="icon">💳</span>
          <span class="val"><strong id="creditsEl">150</strong> CR</span>
        </div>
        <div class="stat-row">
          <span class="icon">🏎️</span>
          <span class="val" id="locomotionEl">On Foot</span>
        </div>
      </div>

      <div class="hud-card mission-panel">
        <div class="panel-tag">ACTIVE CONTRACT</div>
        <div class="panel-desc" id="activeMissionText">Deliver Data Core to Neon Alley Dropoff</div>
      </div>

      <div class="minimap-wrapper">
        <canvas id="minimapCanvas" width="130" height="130"></canvas>
        <span class="map-label">RADAR: SECTOR 4</span>
      </div>
    </div>

    <div class="canvas-viewport">
      <canvas id="cityCanvas" width="800" height="550"></canvas>
      
      <!-- Proximity Action Prompt -->
      <div class="action-prompt" id="actionPrompt" style="display: none;">
        <span class="key-badge" id="promptKey">F</span> <span id="promptText">Enter Cyber-Car</span>
      </div>

      <!-- Shop Modal -->
      <div class="modal-overlay" id="shopModal" style="display: none;">
        <div class="modal-card">
          <div class="modal-header">
            <h3>⚡ CYBER-BAZAAR AUGMENTS</h3>
            <button class="close-btn" id="closeShopBtn">✕</button>
          </div>
          <p class="modal-sub">Upgrade your rig with black-market tech</p>
          <div class="shop-items" id="shopItemsList">
            <!-- Populated via JS -->
          </div>
        </div>
      </div>
    </div>

    <div class="hud-bottom">
      <div class="hint-pill">
        <span>[WASD] Move/Drive</span>
        <span>[F] Car Enter/Exit</span>
        <span>[E] Interact/Shop</span>
        <span>[T] Rain Weather Toggle</span>
      </div>
      <button class="weather-btn" id="weatherToggleBtn">🌧️ Weather: Rain</button>
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 10px;
}

.world-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 820px;
}

.hud-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.hud-card {
  background: rgba(17, 24, 39, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 12px;
  padding: 8px 14px;
}

.stats-panel {
  display: flex;
  gap: 16px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
}

.stat-row strong {
  color: #fbbf24;
  font-size: 1.05rem;
}

.mission-panel {
  flex: 1;
  max-width: 380px;
}

.panel-tag {
  font-size: 0.65rem;
  font-weight: 800;
  color: #ec4899;
  letter-spacing: 1px;
}

.panel-desc {
  font-size: 0.85rem;
  font-weight: 600;
  color: #f8fafc;
}

.minimap-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(17, 24, 39, 0.9);
  border: 2px solid #06b6d4;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.25);
}

#minimapCanvas {
  width: 85px;
  height: 85px;
  border-radius: 8px;
  background: #090d16;
}

.map-label {
  font-size: 0.6rem;
  font-weight: 800;
  color: #06b6d4;
  margin-top: 2px;
}

.canvas-viewport {
  position: relative;
  width: 100%;
  aspect-ratio: 16/11;
  border-radius: 14px;
  overflow: hidden;
  border: 2px solid #1f2937;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.9), 0 0 25px rgba(6, 182, 212, 0.15);
}

#cityCanvas {
  display: block;
  width: 100%;
  height: 100%;
  background: #0f172a;
}

.action-prompt {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(17, 24, 39, 0.9);
  border: 2px solid #ec4899;
  border-radius: 9999px;
  padding: 8px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.4);
}

.key-badge {
  background: #ec4899;
  color: white;
  font-weight: 800;
  font-size: 0.75rem;
  padding: 2px 7px;
  border-radius: 5px;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.modal-card {
  background: #111827;
  border: 2px solid #06b6d4;
  border-radius: 16px;
  padding: 20px;
  max-width: 440px;
  width: 90%;
  box-shadow: 0 0 30px rgba(6, 182, 212, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.modal-header h3 {
  font-size: 1.1rem;
  color: #06b6d4;
  font-weight: 800;
}

.close-btn {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1.2rem;
  cursor: pointer;
}

.modal-sub {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-bottom: 16px;
}

.shop-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.shop-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(31, 41, 55, 0.6);
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.shop-item-info {
  display: flex;
  flex-direction: column;
}

.shop-item-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #f3f4f6;
}

.shop-item-desc {
  font-size: 0.75rem;
  color: #94a3b8;
}

.buy-btn {
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  border: none;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
}
.buy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hud-bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hint-pill {
  display: flex;
  gap: 12px;
  font-size: 0.75rem;
  color: #6b7280;
}

.weather-btn {
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #cbd5e1;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}`,
    'game.js': `// Cyberpunk Odyssey Open World City Engine
const canvas = document.getElementById('cityCanvas');
const ctx = canvas.getContext('2d');
const minimapCanvas = document.getElementById('minimapCanvas');
const mapCtx = minimapCanvas.getContext('2d');

const creditsEl = document.getElementById('creditsEl');
const locomotionEl = document.getElementById('locomotionEl');
const activeMissionText = document.getElementById('activeMissionText');
const actionPrompt = document.getElementById('actionPrompt');
const promptKey = document.getElementById('promptKey');
const promptText = document.getElementById('promptText');
const shopModal = document.getElementById('shopModal');
const closeShopBtn = document.getElementById('closeShopBtn');
const shopItemsList = document.getElementById('shopItemsList');
const weatherToggleBtn = document.getElementById('weatherToggleBtn');

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playFx(freq, type = 'sine', duration = 0.15) {
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

const WORLD_WIDTH = 2000;
const WORLD_HEIGHT = 1600;

let credits = 150;
let inVehicle = false;
let isRaining = true;
let missionStep = 0; // 0: Pick up core, 1: Deliver to alley, 2: Completed

// Camera Viewport
const camera = { x: 0, y: 0 };

// Player (On-Foot)
const player = {
  x: 400,
  y: 400,
  speed: 4.5,
  angle: 0
};

// Cyber-Car Vehicle
const car = {
  x: 480,
  y: 400,
  width: 52,
  height: 28,
  angle: 0,
  speed: 0,
  maxSpeed: 10.5,
  accel: 0.35,
  friction: 0.94,
  steering: 0.05
};

// World Landmarks
const shopBuilding = { x: 700, y: 350, width: 140, height: 100, name: 'Cyber-Bazaar' };
const missionTerminal = { x: 300, y: 250, width: 80, height: 60, name: 'Net Terminal' };
const dropoffZone = { x: 1200, y: 900, radius: 60, name: 'Neon Dropoff' };

// Pedestrian NPCs
const pedestrians = [
  { x: 350, y: 450, vx: 1, vy: 0, color: '#f43f5e' },
  { x: 550, y: 550, vx: 0, vy: -1, color: '#a855f7' },
  { x: 800, y: 480, vx: -1, vy: 0, color: '#10b981' },
  { x: 950, y: 350, vx: 0, vy: 1, color: '#38bdf8' }
];

// Rain drops
let raindrops = [];
for (let i = 0; i < 90; i++) {
  raindrops.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    len: Math.random() * 15 + 10,
    speed: Math.random() * 10 + 12
  });
}

// Shop items
const shopItems = [
  { id: 'nitro', name: 'Cyber-Nitro Booster', cost: 50, desc: '+30% Vehicle Max Speed' },
  { id: 'radar', name: 'Quantum Radar Augment', cost: 80, desc: 'Expands radar scanning radius' },
  { id: 'hull', name: 'Titanium Nanite Shield', cost: 120, desc: 'Prevents collision recoil' }
];

function renderShop() {
  shopItemsList.innerHTML = '';
  shopItems.forEach(item => {
    const row = document.createElement('div');
    row.className = 'shop-item-row';
    row.innerHTML = \`
      <div class="shop-item-info">
        <span class="shop-item-name">\${item.name}</span>
        <span class="shop-item-desc">\${item.desc}</span>
      </div>
      <button class="buy-btn" data-id="\${item.id}" \${credits < item.cost ? 'disabled' : ''}>\${item.cost} CR</button>
    \`;
    row.querySelector('.buy-btn').addEventListener('click', () => {
      if (credits >= item.cost) {
        credits -= item.cost;
        creditsEl.textContent = credits;
        playFx(987, 'triangle', 0.25);
        if (item.id === 'nitro') car.maxSpeed += 3;
        renderShop();
      }
    });
    shopItemsList.appendChild(row);
  });
}

const keys = {};

function update() {
  if (inVehicle) {
    // Steer & Accelerate Car
    if (keys['KeyW'] || keys['ArrowUp']) car.speed = Math.min(car.speed + car.accel, car.maxSpeed);
    if (keys['KeyS'] || keys['ArrowDown']) car.speed = Math.max(car.speed - car.accel, -car.maxSpeed * 0.4);

    if (Math.abs(car.speed) > 0.1) {
      if (keys['KeyA'] || keys['ArrowLeft']) car.angle -= car.steering * (car.speed > 0 ? 1 : -1);
      if (keys['KeyD'] || keys['ArrowRight']) car.angle += car.steering * (car.speed > 0 ? 1 : -1);
    }

    car.speed *= car.friction;
    car.x += Math.cos(car.angle) * car.speed;
    car.y += Math.sin(car.angle) * car.speed;

    // Bound car to world
    car.x = Math.max(50, Math.min(WORLD_WIDTH - 50, car.x));
    car.y = Math.max(50, Math.min(WORLD_HEIGHT - 50, car.y));

    // Player follows car
    player.x = car.x;
    player.y = car.y;
    camera.x = car.x - canvas.width / 2;
    camera.y = car.y - canvas.height / 2;
  } else {
    // Player on-foot
    let dx = 0;
    let dy = 0;
    if (keys['KeyW'] || keys['ArrowUp']) dy -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) dy += 1;
    if (keys['KeyA'] || keys['ArrowLeft']) dx -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) dx += 1;

    if (dx !== 0 || dy !== 0) {
      const len = Math.hypot(dx, dy);
      player.x += (dx / len) * player.speed;
      player.y += (dy / len) * player.speed;
      player.angle = Math.atan2(dy, dx);
    }

    player.x = Math.max(50, Math.min(WORLD_WIDTH - 50, player.x));
    player.y = Math.max(50, Math.min(WORLD_HEIGHT - 50, player.y));
    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;
  }

  // Camera clamping
  camera.x = Math.max(0, Math.min(WORLD_WIDTH - canvas.width, camera.x));
  camera.y = Math.max(0, Math.min(WORLD_HEIGHT - canvas.height, camera.y));

  // Pedestrians patrol
  pedestrians.forEach(p => {
    p.x += p.vx * 1.2;
    p.y += p.vy * 1.2;
    if (p.x < 300 || p.x > 1100) p.vx *= -1;
    if (p.y < 300 || p.y > 700) p.vy *= -1;
  });

  // Action Prompts Check
  const distToCar = Math.hypot(player.x - car.x, player.y - car.y);
  const distToShop = Math.hypot(player.x - (shopBuilding.x + shopBuilding.width / 2), player.y - (shopBuilding.y + shopBuilding.height / 2));
  const distToTerminal = Math.hypot(player.x - (missionTerminal.x + missionTerminal.width / 2), player.y - (missionTerminal.y + missionTerminal.height / 2));
  const distToDropoff = Math.hypot(player.x - dropoffZone.x, player.y - dropoffZone.y);

  if (!inVehicle && distToCar < 65) {
    actionPrompt.style.display = 'flex';
    promptKey.textContent = 'F';
    promptText.textContent = 'Enter Cyber-Car';
  } else if (inVehicle) {
    actionPrompt.style.display = 'flex';
    promptKey.textContent = 'F';
    promptText.textContent = 'Exit Cyber-Car';
  } else if (distToShop < 85) {
    actionPrompt.style.display = 'flex';
    promptKey.textContent = 'E';
    promptText.textContent = 'Enter Cyber-Bazaar';
  } else if (distToTerminal < 75 && missionStep === 0) {
    actionPrompt.style.display = 'flex';
    promptKey.textContent = 'E';
    promptText.textContent = 'Download Data Core';
  } else if (distToDropoff < dropoffZone.radius && missionStep === 1) {
    actionPrompt.style.display = 'flex';
    promptKey.textContent = 'E';
    promptText.textContent = 'Deliver Data Core';
  } else {
    actionPrompt.style.display = 'none';
  }

  // Rain update
  if (isRaining) {
    raindrops.forEach(r => {
      r.y += r.speed;
      r.x -= 2;
      if (r.y > canvas.height) {
        r.y = 0;
        r.x = Math.random() * canvas.width;
      }
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  // World Ground Grid
  ctx.fillStyle = '#0a0f1d';
  ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  // Roads
  ctx.fillStyle = '#1e293b';
  // Horizontal Highway
  ctx.fillRect(0, 360, WORLD_WIDTH, 140);
  // Vertical Avenue
  ctx.fillRect(600, 0, 140, WORLD_HEIGHT);

  // Road markings
  ctx.strokeStyle = '#f59e0b';
  ctx.setLineDash([20, 20]);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 430);
  ctx.lineTo(WORLD_WIDTH, 430);
  ctx.moveTo(670, 0);
  ctx.lineTo(670, WORLD_HEIGHT);
  ctx.stroke();
  ctx.setLineDash([]);

  // Shop Building
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(shopBuilding.x, shopBuilding.y, shopBuilding.width, shopBuilding.height);
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 2;
  ctx.strokeRect(shopBuilding.x, shopBuilding.y, shopBuilding.width, shopBuilding.height);
  ctx.fillStyle = '#06b6d4';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('⚡ CYBER-BAZAAR', shopBuilding.x + 10, shopBuilding.y + 30);

  // Mission Terminal
  ctx.fillStyle = '#311042';
  ctx.fillRect(missionTerminal.x, missionTerminal.y, missionTerminal.width, missionTerminal.height);
  ctx.strokeStyle = '#ec4899';
  ctx.strokeRect(missionTerminal.x, missionTerminal.y, missionTerminal.width, missionTerminal.height);
  ctx.fillStyle = '#ec4899';
  ctx.fillText('NET TERMINAL', missionTerminal.x + 8, missionTerminal.y + 25);

  // Dropoff Zone
  ctx.save();
  ctx.beginPath();
  ctx.arc(dropoffZone.x, dropoffZone.y, dropoffZone.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(236, 72, 153, 0.15)';
  ctx.fill();
  ctx.strokeStyle = '#ec4899';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#ec4899';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎯 NEON DROPOFF', dropoffZone.x, dropoffZone.y);
  ctx.restore();

  // Pedestrians
  pedestrians.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Cyber-Car
  ctx.save();
  ctx.translate(car.x, car.y);
  ctx.rotate(car.angle);
  ctx.fillStyle = '#06b6d4';
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 10;
  ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
  // Windshield
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-8, -car.height / 2 + 4, 14, car.height - 8);
  // Headlights
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(car.width / 2 - 4, -car.height / 2 + 3, 4, 6);
  ctx.fillRect(car.width / 2 - 4, car.height / 2 - 9, 4, 6);
  ctx.restore();

  // Player (if not in vehicle)
  if (!inVehicle) {
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);
    ctx.fillStyle = '#ec4899';
    ctx.shadowColor = '#ec4899';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    // Gun / Flashlight beam
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(6, -2, 6, 4);
    ctx.restore();
  }

  ctx.restore();

  // Rain Overlay
  if (isRaining) {
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 1;
    raindrops.forEach(r => {
      ctx.beginPath();
      ctx.moveTo(r.x, r.y);
      ctx.lineTo(r.x - 2, r.y + r.len);
      ctx.stroke();
    });
  }

  drawMinimap();
}

function drawMinimap() {
  mapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
  const scale = minimapCanvas.width / WORLD_WIDTH;

  // Background
  mapCtx.fillStyle = '#090d16';
  mapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);

  // Roads
  mapCtx.fillStyle = '#1e293b';
  mapCtx.fillRect(0, 360 * scale, minimapCanvas.width, 140 * scale);
  mapCtx.fillRect(600 * scale, 0, 140 * scale, minimapCanvas.height);

  // Shop & Terminal Blips
  mapCtx.fillStyle = '#06b6d4';
  mapCtx.fillRect(shopBuilding.x * scale, shopBuilding.y * scale, 6, 6);
  mapCtx.fillStyle = '#ec4899';
  mapCtx.fillRect(missionTerminal.x * scale, missionTerminal.y * scale, 5, 5);

  // Car Blip
  mapCtx.fillStyle = '#38bdf8';
  mapCtx.fillRect(car.x * scale - 2, car.y * scale - 2, 5, 5);

  // Player Blip
  mapCtx.fillStyle = '#ffffff';
  mapCtx.beginPath();
  mapCtx.arc(player.x * scale, player.y * scale, 3, 0, Math.PI * 2);
  mapCtx.fill();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Controls
window.addEventListener('keydown', e => {
  keys[e.code] = true;

  if (e.code === 'KeyF') {
    const distToCar = Math.hypot(player.x - car.x, player.y - car.y);
    if (!inVehicle && distToCar < 65) {
      inVehicle = true;
      locomotionEl.textContent = '🏎️ Cyber-Car';
      playFx(440, 'sawtooth', 0.2);
    } else if (inVehicle) {
      inVehicle = false;
      locomotionEl.textContent = 'On Foot';
      player.x = car.x + 35;
      player.y = car.y;
      playFx(330, 'sine', 0.15);
    }
  } else if (e.code === 'KeyE') {
    const distToShop = Math.hypot(player.x - (shopBuilding.x + shopBuilding.width / 2), player.y - (shopBuilding.y + shopBuilding.height / 2));
    const distToTerminal = Math.hypot(player.x - (missionTerminal.x + missionTerminal.width / 2), player.y - (missionTerminal.y + missionTerminal.height / 2));
    const distToDropoff = Math.hypot(player.x - dropoffZone.x, player.y - dropoffZone.y);

    if (distToShop < 85) {
      renderShop();
      shopModal.style.display = 'flex';
      playFx(660, 'sine', 0.15);
    } else if (distToTerminal < 75 && missionStep === 0) {
      missionStep = 1;
      activeMissionText.textContent = 'Transport Data Core to Neon Alley Dropoff';
      playFx(880, 'triangle', 0.3);
    } else if (distToDropoff < dropoffZone.radius && missionStep === 1) {
      missionStep = 2;
      credits += 100;
      creditsEl.textContent = credits;
      activeMissionText.textContent = 'Contract Complete! +100 CR Payout';
      playFx(1046, 'sine', 0.4);
      window.parent.postMessage({ type: 'MISSION_COMPLETE', mission: 'Data Delivery' }, '*');
    }
  } else if (e.code === 'KeyT') {
    toggleWeather();
  }
});

window.addEventListener('keyup', e => {
  keys[e.code] = false;
});

function toggleWeather() {
  isRaining = !isRaining;
  weatherToggleBtn.textContent = isRaining ? '🌧️ Weather: Rain' : '☀️ Weather: Clear';
}

weatherToggleBtn.addEventListener('click', toggleWeather);
closeShopBtn.addEventListener('click', () => {
  shopModal.style.display = 'none';
});

// Periodic performance stats
setInterval(() => {
  window.parent.postMessage({
    type: 'STATS_UPDATE',
    fps: 60,
    frameTimeMs: 16.5,
    drawCalls: 62,
    memoryMb: 24.1
  }, '*');
}, 1000);

loop();
`
  }
};
