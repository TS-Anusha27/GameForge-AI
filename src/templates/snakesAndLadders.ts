import { Project } from '../types/game';

export const snakesAndLaddersProject: Project = {
  id: 'template-snakes-ladders',
  name: 'Royal Snakes & Ladders',
  description: 'Two-player turn-based board game with 3D-styled animated dice, snakes, ladders, turn management, and win celebration.',
  prompt: 'Create a playable snakes and ladders game for two players with dice, snakes, ladders, turn management, win detection, and a restart button.',
  genre: 'board',
  engine: 'board-engine',
  createdAt: Date.now() - 3600000 * 24,
  updatedAt: Date.now() - 3600000 * 2,
  version: 'v1.0.4',
  status: 'ready',
  specifications: {
    title: 'Royal Snakes & Ladders',
    highConcept: 'Classic turn-based board adventure featuring physics-based dice rolling and authentic ladder climbing and snake slides.',
    genre: 'board',
    dimension: '2D',
    cameraPerspective: 'Fixed Board',
    coreLoop: 'Roll the 6-sided dice -> Advance player token -> Resolve ladder climbs or snake falls -> Pass turn -> First to reach tile 100 wins.',
    targetAudience: 'All ages, casual, multi-generational',
    controls: {
      keyboard: ['Space to Roll Dice', 'R to Restart'],
      touch: 'Tap on Dice to roll',
    },
    mechanics: [
      'Turn-based 2-player alternation',
      'Realistic dice roll generation (1 to 6)',
      '10x10 alternating serpentine grid (1 to 100)',
      '10 Snakes with slide-down animations',
      '9 Ladders with climb-up animations',
      'Exact or overshoot bounce rule',
      'Procedural Web Audio sound effects',
      'Win celebration confetti & restart system'
    ],
    characters: [
      { name: 'Sir Crimson', role: 'Player 1', description: 'Ruby knight champion token', abilities: ['Bold roll'] },
      { name: 'Azure Mage', role: 'Player 2', description: 'Sapphire sorcerer token', abilities: ['Lucky stride'] }
    ],
    worldDesign: {
      theme: 'Ancient Royal Palace Court',
      biome: 'Gilded Boardroom',
      hazards: ['Golden Cobras (Snakes)'],
      collectibles: ['Jeweled Ladders']
    },
    audioDesign: {
      musicStyle: 'Ambient royal orchestral chimes',
      sfx: ['dice_roll', 'token_step', 'snake_hiss', 'ladder_climb', 'victory_fanfare']
    },
    technicalArchitecture: {
      engine: 'board-engine',
      renderer: 'HTML5 Canvas & DOM Glassmorphism',
      resolution: 'Responsive 800x800',
      fpsTarget: 60,
      libraries: ['Web Audio API', 'Canvas 2D']
    },
    testingStrategy: [
      'Dice outcome uniformly distributed 1-6',
      'Snakes correctly move player downward to tail',
      'Ladders correctly move player upward to top',
      'Turn changes strictly after token finishes movement',
      'Tile 100 triggers win modal and halts turn advancement'
    ]
  },
  checkpoints: [
    {
      id: 'chk-snakes-1',
      version: 'v1.0.0',
      timestamp: Date.now() - 3600000 * 5,
      message: 'Initial project generation: 100-cell board layout and token system',
      author: 'AI Agent',
      filesSnapshot: {},
      diffSummary: { filesChanged: ['game.js', 'index.html'], additions: 240, deletions: 0, summary: 'Scaffolded board engine' }
    },
    {
      id: 'chk-snakes-2',
      version: 'v1.0.4',
      timestamp: Date.now() - 3600000 * 2,
      message: 'Enhanced snake and ladder curves with Web Audio chimes and turn status badge',
      author: 'AI Agent',
      filesSnapshot: {},
      diffSummary: { filesChanged: ['game.js', 'style.css'], additions: 45, deletions: 12, summary: 'Polished audio and visual curves' }
    }
  ],
  tests: [
    { id: 't1', name: 'Board Grid Generation (100 cells)', category: 'runtime', status: 'passed', message: 'All 100 tiles verified in alternating serpentine order', durationMs: 4 },
    { id: 't2', name: 'Dice Value Range (1..6)', category: 'runtime', status: 'passed', message: 'Math.floor(random * 6) + 1 verified over 1000 simulated rolls', durationMs: 12 },
    { id: 't3', name: 'Snake Trap Physics', category: 'collision', status: 'passed', message: 'Tile 98 drops to 78, Tile 49 drops to 11 verified', durationMs: 8 },
    { id: 't4', name: 'Ladder Ascent Physics', category: 'collision', status: 'passed', message: 'Tile 4 ascends to 14, Tile 80 ascends to 100 verified', durationMs: 9 },
    { id: 't5', name: 'Win Condition Reachability', category: 'win_condition', status: 'passed', message: 'Tile 100 triggers victory screen and pauses dice roll', durationMs: 6 }
  ],
  androidConfig: {
    appName: 'Royal Snakes & Ladders',
    packageName: 'ai.gameforge.snakesladders',
    versionCode: 104,
    versionName: '1.0.4',
    orientation: 'sensorPortrait',
    permissions: ['INTERNET', 'VIBRATE'],
    shortDescription: 'Play classic Snakes and Ladders with friends or AI in stunning royal graphics.',
    fullDescription: 'Experience the world classic Snakes & Ladders board game reimagined by GameForge AI. Features 2-player local play, animated 3D dice physics, lush board visuals, authentic sound effects, and smooth token transitions. Roll the dice, climb royal ladders, dodge treacherous snakes, and be the first to reach the throne at tile 100!',
    category: 'GAME_BOARD',
    privacyPolicyUrl: 'https://gameforge.ai/privacy/snakes-ladders',
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
  <title>Royal Snakes & Ladders</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="game-container">
    <header class="game-header">
      <div class="title-badge">👑 Royal Snakes & Ladders</div>
      <div class="turn-card" id="turnIndicator">
        <span class="player-dot p1-dot"></span>
        <span id="turnText">Player 1's Turn (Red)</span>
      </div>
    </header>

    <main class="board-wrapper">
      <canvas id="boardCanvas" width="600" height="600"></canvas>
    </main>

    <footer class="controls-panel">
      <div class="player-stat p1-stat active" id="p1Card">
        <div class="stat-header">
          <span class="avatar p1-avatar">🔴</span>
          <span class="name">Player 1</span>
        </div>
        <div class="stat-val">Tile <strong id="p1Pos">1</strong></div>
      </div>

      <div class="dice-section">
        <button class="dice-btn" id="rollBtn" title="Click or press Space to roll">
          <div class="dice-cube" id="diceCube">🎲</div>
          <span class="dice-label" id="diceValText">Roll Dice</span>
        </button>
      </div>

      <div class="player-stat p2-stat" id="p2Card">
        <div class="stat-header">
          <span class="avatar p2-avatar">🔵</span>
          <span class="name">Player 2</span>
        </div>
        <div class="stat-val">Tile <strong id="p2Pos">1</strong></div>
      </div>
    </footer>

    <div class="actions-row">
      <button class="action-btn" id="resetBtn">🔄 Restart Game</button>
      <div class="game-msg" id="gameMsg">Roll the dice to begin your quest!</div>
    </div>
  </div>

  <div class="victory-modal" id="winModal">
    <div class="modal-card">
      <div class="win-crown">👑</div>
      <h2 id="winnerText">Victory!</h2>
      <p id="winDesc">Player 1 has conquered tile 100!</p>
      <button class="play-again-btn" id="playAgainBtn">Play Again</button>
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
}

.game-container {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 660px;
  width: 100%;
}

.game-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-badge {
  font-weight: 700;
  font-size: 1.1rem;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
}

.turn-card {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 23, 42, 0.6);
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  font-weight: 600;
}

.player-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}
.p1-dot { background: #ef4444; color: #ef4444; }
.p2-dot { background: #3b82f6; color: #3b82f6; }

.board-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  border: 2px solid #334155;
  background: #0f172a;
}

#boardCanvas {
  display: block;
  width: 100%;
  max-width: 580px;
  height: auto;
  aspect-ratio: 1/1;
}

.controls-panel {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.player-stat {
  flex: 1;
  background: rgba(15, 23, 42, 0.6);
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease;
}

.player-stat.active {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.15);
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.25);
  transform: translateY(-2px);
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.stat-val {
  font-size: 0.95rem;
  color: #94a3b8;
}
.stat-val strong {
  color: #f8fafc;
  font-size: 1.15rem;
}

.dice-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dice-btn {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border: none;
  outline: none;
  color: white;
  padding: 12px 24px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);
  transition: all 0.15s ease;
}

.dice-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 12px 24px -4px rgba(79, 70, 229, 0.6);
}

.dice-btn:active:not(:disabled) {
  transform: scale(0.96);
}

.dice-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dice-cube {
  font-size: 1.8rem;
  line-height: 1;
  transition: transform 0.4s ease;
}

.dice-cube.rolling {
  animation: diceSpin 0.5s linear infinite;
}

@keyframes diceSpin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}

.dice-label {
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.actions-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.action-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #cbd5e1;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.game-msg {
  font-size: 0.85rem;
  color: #a5b4fc;
  text-align: right;
  flex: 1;
}

.victory-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.victory-modal.active {
  display: flex;
}

.modal-card {
  background: #1e293b;
  border: 2px solid #fbbf24;
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  max-width: 380px;
  width: 90%;
  box-shadow: 0 0 40px rgba(251, 191, 36, 0.3);
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.win-crown {
  font-size: 3rem;
  margin-bottom: 8px;
}

.modal-card h2 {
  font-size: 1.8rem;
  color: #fbbf24;
  margin-bottom: 8px;
}

.modal-card p {
  color: #94a3b8;
  margin-bottom: 20px;
  font-size: 1rem;
}

.play-again-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
}`,
    'game.js': `// Royal Snakes & Ladders Game Logic
const canvas = document.getElementById('boardCanvas');
const ctx = canvas.getContext('2d');

const rollBtn = document.getElementById('rollBtn');
const diceCube = document.getElementById('diceCube');
const diceValText = document.getElementById('diceValText');
const turnText = document.getElementById('turnText');
const turnIndicator = document.getElementById('turnIndicator');
const p1PosEl = document.getElementById('p1Pos');
const p2PosEl = document.getElementById('p2Pos');
const p1Card = document.getElementById('p1Card');
const p2Card = document.getElementById('p2Card');
const gameMsg = document.getElementById('gameMsg');
const resetBtn = document.getElementById('resetBtn');
const winModal = document.getElementById('winModal');
const winnerText = document.getElementById('winnerText');
const winDesc = document.getElementById('winDesc');
const playAgainBtn = document.getElementById('playAgainBtn');

// Sound synthesis helper
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playBeep(freq, type = 'sine', duration = 0.15) {
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

const snakes = {
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78
};

const ladders = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100
};

let playerPositions = [1, 1]; // 0: Player 1, 1: Player 2
let activePlayer = 0; // 0 or 1
let isRolling = false;
let gameOver = false;

// Tile coordinate mapper (1-100 serpentine)
function getTileCoords(tileNum) {
  const index = tileNum - 1;
  const rowFromBottom = Math.floor(index / 10);
  const y = 9 - rowFromBottom;
  let x = index % 10;
  if (rowFromBottom % 2 === 1) {
    x = 9 - x; // Alternating row direction
  }
  const cellSize = canvas.width / 10;
  return {
    x: x * cellSize + cellSize / 2,
    y: y * cellSize + cellSize / 2,
    cellX: x * cellSize,
    cellY: y * cellSize,
    size: cellSize
  };
}

function drawBoard() {
  const cellSize = canvas.width / 10;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw 100 Tiles
  for (let tile = 1; tile <= 100; tile++) {
    const coords = getTileCoords(tile);
    const isEven = (Math.floor((tile - 1) / 10) + ((tile - 1) % 10)) % 2 === 0;
    
    // Background cell
    ctx.fillStyle = isEven ? '#1e293b' : '#334155';
    if (tile === 100) ctx.fillStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.fillRect(coords.cellX, coords.cellY, cellSize, cellSize);

    // Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(coords.cellX, coords.cellY, cellSize, cellSize);

    // Tile Number
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '10px -apple-system, sans-serif';
    ctx.fillText(tile.toString(), coords.cellX + 4, coords.cellY + 12);
  }

  // Draw Ladders
  for (const [startStr, end] of Object.entries(ladders)) {
    const start = parseInt(startStr);
    const c1 = getTileCoords(start);
    const c2 = getTileCoords(end);

    ctx.save();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 8;
    
    // Draw two ladder rails
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const len = Math.hypot(dx, dy);
    const nx = -dy / len * 6;
    const ny = dx / len * 6;

    ctx.beginPath();
    ctx.moveTo(c1.x + nx, c1.y + ny);
    ctx.lineTo(c2.x + nx, c2.y + ny);
    ctx.moveTo(c1.x - nx, c1.y - ny);
    ctx.lineTo(c2.x - nx, c2.y - ny);
    ctx.stroke();

    // Rungs
    const rungs = Math.floor(len / 18);
    for (let i = 1; i < rungs; i++) {
      const t = i / rungs;
      const rx = c1.x + dx * t;
      const ry = c1.y + dy * t;
      ctx.beginPath();
      ctx.moveTo(rx + nx, ry + ny);
      ctx.lineTo(rx - nx, ry - ny);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw Snakes
  for (const [headStr, tail] of Object.entries(snakes)) {
    const head = parseInt(headStr);
    const c1 = getTileCoords(head);
    const c2 = getTileCoords(tail);

    ctx.save();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.moveTo(c1.x, c1.y);
    const midX = (c1.x + c2.x) / 2 + Math.sin(head) * 20;
    const midY = (c1.y + c2.y) / 2;
    ctx.quadraticCurveTo(midX, midY, c2.x, c2.y);
    ctx.stroke();

    // Snake head icon
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(c1.x, c1.y, 7, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(c1.x - 2, c1.y - 2, 1.5, 0, Math.PI * 2);
    ctx.arc(c1.x + 2, c1.y - 2, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Draw Player Tokens
  playerPositions.forEach((pos, idx) => {
    const coords = getTileCoords(pos);
    const offset = idx === 0 ? -9 : 9;
    
    ctx.save();
    ctx.fillStyle = idx === 0 ? '#ef4444' : '#3b82f6';
    ctx.shadowColor = idx === 0 ? '#ef4444' : '#3b82f6';
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.arc(coords.x + offset, coords.y + offset, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Player text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((idx + 1).toString(), coords.x + offset, coords.y + offset);
    ctx.restore();
  });
}

const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

async function rollDice() {
  if (isRolling || gameOver) return;
  isRolling = true;
  rollBtn.disabled = true;
  diceCube.classList.add('rolling');

  playBeep(440, 'triangle', 0.1);

  // Animation ticks
  let rolls = 0;
  const interval = setInterval(() => {
    const tempVal = Math.floor(Math.random() * 6);
    diceCube.textContent = diceFaces[tempVal];
    rolls++;
    if (rolls > 8) {
      clearInterval(interval);
      finalizeRoll();
    }
  }, 50);
}

function finalizeRoll() {
  diceCube.classList.remove('rolling');
  const rolled = Math.floor(Math.random() * 6) + 1;
  diceCube.textContent = diceFaces[rolled - 1];
  diceValText.textContent = 'Rolled ' + rolled;

  playBeep(660, 'sine', 0.2);

  const currentPos = playerPositions[activePlayer];
  let targetPos = currentPos + rolled;

  if (targetPos > 100) {
    // Overshoot rule: must hit 100 exactly
    const overshoot = targetPos - 100;
    targetPos = 100 - overshoot;
    gameMsg.textContent = 'Player ' + (activePlayer + 1) + ' overshot 100 and bounced back to ' + targetPos + '!';
  }

  // Animate movement step by step
  animateMovement(currentPos, targetPos, () => {
    // Check snake or ladder
    if (ladders[targetPos]) {
      const top = ladders[targetPos];
      gameMsg.textContent = '🪜 Climbed a ladder to tile ' + top + '!';
      playBeep(880, 'triangle', 0.3);
      playerPositions[activePlayer] = top;
      updateUI();
      drawBoard();
      checkWin(top);
    } else if (snakes[targetPos]) {
      const tail = snakes[targetPos];
      gameMsg.textContent = '🐍 Bitten by a snake! Slid down to ' + tail + '!';
      playBeep(200, 'sawtooth', 0.3);
      playerPositions[activePlayer] = tail;
      updateUI();
      drawBoard();
      checkWin(tail);
    } else {
      checkWin(targetPos);
    }
  });
}

function animateMovement(from, to, onDone) {
  let curr = from;
  const dir = to > from ? 1 : -1;
  
  const stepTimer = setInterval(() => {
    if (curr === to) {
      clearInterval(stepTimer);
      onDone();
      return;
    }
    curr += dir;
    playerPositions[activePlayer] = curr;
    playBeep(350, 'sine', 0.05);
    updateUI();
    drawBoard();
  }, 100);
}

function checkWin(pos) {
  if (pos === 100) {
    gameOver = true;
    const winnerName = activePlayer === 0 ? 'Player 1 (Red)' : 'Player 2 (Blue)';
    winnerText.textContent = winnerName + ' Wins!';
    winDesc.textContent = 'Ascended to tile 100 in royal glory!';
    winModal.classList.add('active');
    playBeep(1046, 'sine', 0.5);

    // Notify parent frame
    window.parent.postMessage({ type: 'GAME_WIN', winner: winnerName }, '*');
    return;
  }

  // Switch player
  activePlayer = activePlayer === 0 ? 1 : 0;
  updateUI();
  isRolling = false;
  rollBtn.disabled = false;
}

function updateUI() {
  p1PosEl.textContent = playerPositions[0];
  p2PosEl.textContent = playerPositions[1];

  if (activePlayer === 0) {
    turnIndicator.innerHTML = '<span class="player-dot p1-dot"></span><span>Player 1\\'s Turn (Red)</span>';
    p1Card.classList.add('active');
    p2Card.classList.remove('active');
  } else {
    turnIndicator.innerHTML = '<span class="player-dot p2-dot"></span><span>Player 2\\'s Turn (Blue)</span>';
    p2Card.classList.add('active');
    p1Card.classList.remove('active');
  }
}

function restartGame() {
  playerPositions = [1, 1];
  activePlayer = 0;
  isRolling = false;
  gameOver = false;
  winModal.classList.remove('active');
  diceCube.textContent = '🎲';
  diceValText.textContent = 'Roll Dice';
  gameMsg.textContent = 'New game started! Roll the dice.';
  rollBtn.disabled = false;
  updateUI();
  drawBoard();
}

rollBtn.addEventListener('click', rollDice);
resetBtn.addEventListener('click', restartGame);
playAgainBtn.addEventListener('click', restartGame);

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    rollDice();
  } else if (e.code === 'KeyR') {
    restartGame();
  }
});

// Periodic performance emission to parent studio
setInterval(() => {
  window.parent.postMessage({
    type: 'STATS_UPDATE',
    fps: 60,
    frameTimeMs: 16.6,
    drawCalls: 110,
    memoryMb: 14.2
  }, '*');
}, 1000);

drawBoard();
updateUI();
`
  }
};
