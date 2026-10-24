export type GameGenre = 
  | 'arcade' 
  | 'board' 
  | 'platformer' 
  | '3d-adventure' 
  | 'shooter' 
  | 'puzzle' 
  | 'rpg' 
  | 'racing' 
  | 'open-world' 
  | 'custom';

export type EngineType = 'canvas-2d' | 'three-3d' | 'board-engine';

export interface ProjectSpecification {
  title: string;
  highConcept: string;
  genre: GameGenre;
  dimension: '2D' | '3D';
  cameraPerspective: 'Top-Down' | 'Side-Scrolling' | 'Third-Person' | 'First-Person' | 'Isometric' | 'Fixed Board';
  coreLoop: string;
  targetAudience: string;
  controls: {
    keyboard: string[];
    touch: string;
    gamepad?: string;
  };
  mechanics: string[];
  characters: {
    name: string;
    role: string;
    description: string;
    abilities: string[];
  }[];
  worldDesign: {
    theme: string;
    biome: string;
    hazards: string[];
    collectibles: string[];
  };
  audioDesign: {
    musicStyle: string;
    sfx: string[];
  };
  technicalArchitecture: {
    engine: EngineType;
    renderer: string;
    resolution: string;
    fpsTarget: number;
    libraries: string[];
  };
  testingStrategy: string[];
}

export interface ProjectCheckpoint {
  id: string;
  version: string;
  timestamp: number;
  message: string;
  author: 'AI Agent' | 'User Prompt' | 'Auto-Repair' | 'Manual Edit';
  diffSummary?: {
    filesChanged: string[];
    additions: number;
    deletions: number;
    summary: string;
  };
  filesSnapshot: Record<string, string>;
  testPassRate?: number;
}

export interface TestCaseResult {
  id: string;
  name: string;
  category: 'syntax' | 'runtime' | 'collision' | 'input' | 'win_condition' | 'performance';
  status: 'passed' | 'failed' | 'running' | 'queued';
  message: string;
  durationMs?: number;
}

export interface AndroidConfig {
  appName: string;
  packageName: string;
  versionCode: number;
  versionName: string;
  orientation: 'sensorPortrait' | 'sensorLandscape' | 'auto';
  permissions: string[];
  shortDescription: string;
  fullDescription: string;
  category: string;
  privacyPolicyUrl: string;
  contentRating: string;
  targetSdk: number;
  minSdk: number;
  releaseReady: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  prompt: string;
  genre: GameGenre;
  engine: EngineType;
  createdAt: number;
  updatedAt: number;
  version: string;
  status: 'draft' | 'generating' | 'ready' | 'error';
  specifications: ProjectSpecification;
  files: Record<string, string>; // e.g. 'index.html', 'game.js', 'style.css', 'project.json'
  checkpoints: ProjectCheckpoint[];
  tests: TestCaseResult[];
  androidConfig: AndroidConfig;
  thumbnailSvg?: string;
}

export interface AgentTask {
  id: string;
  agentName: string;
  title: string;
  description: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress: number;
  logs: string[];
  outputArtifact?: string;
  durationMs?: number;
}

export interface CharacterProfile {
  id: string;
  name: string;
  archetype: 'Hero' | 'Companion' | 'Enemy' | 'NPC Guide' | 'Boss' | 'Civilian';
  visualStyle: 'Pixel Art' | 'Vector Stylized' | 'Low-Poly 3D' | 'Cyber Stylized';
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
  };
  bodyProportions: {
    height: number; // 0.5 to 2.0
    build: 'slim' | 'athletic' | 'sturdy' | 'chibi';
  };
  accessories: string[];
  abilities: string[];
  lore: string;
  modelType: '2d-sprite' | '3d-procedural';
  animations: ('idle' | 'walk' | 'jump' | 'attack')[];
}

export interface LevelMap {
  id: string;
  name: string;
  biome: 'Emerald Forest' | 'Neon Cyberpunk' | 'Solar Desert' | 'Floating Islands' | 'Volcanic Dungeon';
  width: number;
  height: number;
  gridData: number[][]; // 0: empty, 1: solid, 2: hazard, 3: collectible, 4: spawn, 5: exit
  dayNightCycle: boolean;
  weather: 'Clear Sun' | 'Cyber Rain' | 'Ambient Fog' | 'Starlight';
  gravity: number;
  ambientColor: string;
}

export interface PerformanceStats {
  fps: number;
  frameTimeMs: number;
  drawCalls: number;
  entitiesCount: number;
  memoryUsageMb: number;
}
