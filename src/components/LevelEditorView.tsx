import React, { useState } from 'react';
import { 
  MapPin, 
  Sparkles, 
  Sun, 
  Moon, 
  CloudRain, 
  Layers, 
  Save, 
  Wand2, 
  RotateCcw,
  Flag,
  AlertTriangle,
  Diamond
} from 'lucide-react';
import { LevelMap } from '../types/game';

interface LevelEditorViewProps {
  onApplyLevelToProject?: (level: LevelMap) => void;
}

export const LevelEditorView: React.FC<LevelEditorViewProps> = ({ onApplyLevelToProject }) => {
  const GRID_SIZE = 12; // 12x12 interactive grid
  const [levelName, setLevelName] = useState('Emerald Highlands - Sector 1');
  const [biome, setBiome] = useState<LevelMap['biome']>('Emerald Forest');
  const [weather, setWeather] = useState<LevelMap['weather']>('Clear Sun');
  const [isDay, setIsDay] = useState(true);
  const [gravity, setGravity] = useState(0.65);
  const [selectedBrush, setSelectedBrush] = useState<number>(1); // 0: empty, 1: solid, 2: hazard, 3: collectible, 4: spawn, 5: exit

  // Initialize 12x12 grid
  const [grid, setGrid] = useState<number[][]>(() => {
    const initial: number[][] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      const row: number[] = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        if (r === GRID_SIZE - 1) row.push(1); // Ground row
        else if (r === 7 && c >= 3 && c <= 7) row.push(1); // Platform
        else if (r === 6 && c === 5) row.push(3); // Gem
        else if (r === GRID_SIZE - 2 && c === 1) row.push(4); // Spawn
        else if (r === 6 && c === 7) row.push(5); // Exit
        else row.push(0);
      }
      initial.push(row);
    }
    return initial;
  });

  const brushTypes = [
    { id: 0, name: 'Air / Empty', color: 'rgba(255,255,255,0.05)', icon: '🌫️' },
    { id: 1, name: 'Solid Platform', color: '#4f46e5', icon: '🧱' },
    { id: 2, name: 'Hazard / Spike', color: '#ef4444', icon: '⚠️' },
    { id: 3, name: 'Collectible Gem', color: '#06b6d4', icon: '💎' },
    { id: 4, name: 'Player Spawn', color: '#10b981', icon: '🚩' },
    { id: 5, name: 'Exit Portal', color: '#fbbf24', icon: '🌀' }
  ];

  const handleCellClick = (r: number, c: number) => {
    const updated = grid.map((row, rowIdx) =>
      row.map((val, colIdx) => (rowIdx === r && colIdx === c ? selectedBrush : val))
    );
    setGrid(updated);
  };

  const handleGenerateProcedural = () => {
    const generated: number[][] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      const row: number[] = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        if (r === GRID_SIZE - 1) {
          row.push(1);
        } else if (r === GRID_SIZE - 2 && c === 1) {
          row.push(4); // Spawn
        } else if (r === 3 && c === GRID_SIZE - 2) {
          row.push(5); // Goal
        } else if (Math.random() < 0.18 && r > 2) {
          row.push(1); // Platform block
        } else if (Math.random() < 0.08 && r > 1) {
          row.push(3); // Gem
        } else if (Math.random() < 0.05 && r === GRID_SIZE - 2) {
          row.push(2); // Ground hazard
        } else {
          row.push(0);
        }
      }
      generated.push(row);
    }
    setGrid(generated);
  };

  const handleSaveLevel = () => {
    const levelMap: LevelMap = {
      id: 'level-' + Date.now().toString(36),
      name: levelName,
      biome,
      width: GRID_SIZE,
      height: GRID_SIZE,
      gridData: grid,
      dayNightCycle: isDay,
      weather,
      gravity,
      ambientColor: isDay ? '#f8fafc' : '#090d16'
    };

    if (onApplyLevelToProject) {
      onApplyLevelToProject(levelMap);
    }
    alert(`Level Map "${levelName}" saved and applied to active project!`);
  };

  return (
    <div style={{ maxWidth: 1180, margin: '24px auto', width: '100%', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div className="badge badge-primary" style={{ marginBottom: 6 }}>
            <MapPin size={14} />
            <span>World & Level Editor</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Visual Level Designer & Procedural Builder</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Paint terrain matrices, configure atmosphere and hazards, and export level layouts to your games.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" onClick={handleGenerateProcedural}>
            <Wand2 size={16} />
            <span>Auto-Generate Procedural Level</span>
          </button>
          <button className="btn btn-primary" onClick={handleSaveLevel}>
            <Save size={16} />
            <span>Apply to Project</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(420px, 1fr) 360px', gap: 24 }}>
        {/* Left: Interactive Grid Canvas */}
        <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Environment Banner */}
          <div 
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: 10,
              background: isDay ? 'linear-gradient(90deg, #38bdf8, #818cf8)' : 'linear-gradient(90deg, #090d16, #1e1b4b)',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
              {isDay ? <Sun size={18} /> : <Moon size={18} />}
              <span>{biome} • {weather}</span>
            </div>
            <button 
              className="btn btn-sm btn-secondary"
              onClick={() => setIsDay(!isDay)}
              style={{ padding: '3px 8px', fontSize: '0.75rem' }}
            >
              {isDay ? 'Switch to Night' : 'Switch to Day'}
            </button>
          </div>

          {/* Grid Layout */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gap: 3,
              background: '#090d16',
              padding: 10,
              borderRadius: 12,
              border: '2px solid #1e293b',
              width: '100%',
              maxWidth: 520,
              aspectRatio: '1/1'
            }}
          >
            {grid.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                const brush = brushTypes.find(b => b.id === cell) || brushTypes[0];
                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => handleCellClick(rIdx, cIdx)}
                    style={{
                      background: brush.color,
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      transition: 'transform 0.1s ease',
                      userSelect: 'none'
                    }}
                    title={`Row ${rIdx}, Col ${cIdx}: ${brush.name}`}
                  >
                    {cell > 1 ? brush.icon : ''}
                  </div>
                );
              })
            )}
          </div>

          <div style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            💡 Click on any grid cell to paint with selected brush.
          </div>
        </div>

        {/* Right: Brush Palette & Environmental Settings */}
        <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
            Paint Palette & Tools
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {brushTypes.map(brush => (
              <button
                key={brush.id}
                onClick={() => setSelectedBrush(brush.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: selectedBrush === brush.id ? '2px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                  background: selectedBrush === brush.id ? 'var(--brand-primary-light)' : 'var(--bg-subtle)',
                  color: selectedBrush === brush.id ? 'var(--brand-primary)' : 'var(--text-main)',
                  fontWeight: selectedBrush === brush.id ? 700 : 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{brush.icon}</span>
                <span>{brush.name}</span>
              </button>
            ))}
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8, marginTop: 8 }}>
            Environment Parameters
          </h3>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
              BIOME THEME
            </label>
            <select 
              className="input-text"
              value={biome}
              onChange={(e) => setBiome(e.target.value as LevelMap['biome'])}
            >
              <option value="Emerald Forest">Emerald Forest</option>
              <option value="Neon Cyberpunk">Neon Cyberpunk</option>
              <option value="Solar Desert">Solar Desert</option>
              <option value="Floating Islands">Floating Islands</option>
              <option value="Volcanic Dungeon">Volcanic Dungeon</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
              WEATHER SIMULATION
            </label>
            <select 
              className="input-text"
              value={weather}
              onChange={(e) => setWeather(e.target.value as LevelMap['weather'])}
            >
              <option value="Clear Sun">Clear Sun</option>
              <option value="Cyber Rain">Cyber Rain</option>
              <option value="Ambient Fog">Ambient Fog</option>
              <option value="Starlight">Starlight Aurora</option>
            </select>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
              <span>GRAVITY CONSTANT</span>
              <span>{gravity}G</span>
            </div>
            <input 
              type="range"
              min="0.2"
              max="1.5"
              step="0.05"
              value={gravity}
              onChange={(e) => setGravity(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
