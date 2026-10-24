import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  UserPlus, 
  Sparkles, 
  Layers, 
  Play, 
  RotateCcw, 
  Box, 
  Palette, 
  Shield, 
  Zap, 
  Save, 
  CheckCircle2 
} from 'lucide-react';
import { CharacterProfile } from '../types/game';

interface CharacterStudioProps {
  onSaveCharacter?: (character: CharacterProfile) => void;
}

export const CharacterStudio: React.FC<CharacterStudioProps> = ({ onSaveCharacter }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Character Configuration State
  const [characterName, setCharacterName] = useState('Kaelen the Seeker');
  const [archetype, setArchetype] = useState<CharacterProfile['archetype']>('Hero');
  const [bodyBuild, setBodyBuild] = useState<'slim' | 'athletic' | 'sturdy' | 'chibi'>('athletic');
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');
  const [secondaryColor, setSecondaryColor] = useState('#06b6d4');
  const [accentColor, setAccentColor] = useState('#fbbf24');
  const [animState, setAnimState] = useState<'idle' | 'walk' | 'jump' | 'attack'>('idle');
  const [isWireframe, setIsWireframe] = useState(false);
  const [loreText, setLoreText] = useState('An adventurous sky explorer who harnesses ancient solar relics to glide between floating isles.');
  const [abilities, setAbilities] = useState(['Solar Dash', 'Relic Shockwave', 'Glide']);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Three.js References
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const leftArmRef = useRef<THREE.Mesh | null>(null);
  const rightArmRef = useRef<THREE.Mesh | null>(null);
  const leftLegRef = useRef<THREE.Mesh | null>(null);
  const rightLegRef = useRef<THREE.Mesh | null>(null);
  const companionBotRef = useRef<THREE.Mesh | null>(null);
  const materialsRef = useRef<{ torso?: THREE.MeshStandardMaterial; limbs?: THREE.MeshStandardMaterial }>({});

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(10, 10, 0x4f46e5, 0x1e293b);
    gridHelper.position.y = -1.5;
    scene.add(gridHelper);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 0.8);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfff3cc, 1.2);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 0.8);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    // --- Build 3D Stylized Character ---
    const charGroup = new THREE.Group();
    characterGroupRef.current = charGroup;

    // Materials
    const torsoMat = new THREE.MeshStandardMaterial({ color: primaryColor, roughness: 0.4, wireframe: isWireframe });
    const limbMat = new THREE.MeshStandardMaterial({ color: secondaryColor, roughness: 0.5, wireframe: isWireframe });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfbcfe8, roughness: 0.6 });
    const eyeMat = new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: 0.8 });

    materialsRef.current = { torso: torsoMat, limbs: limbMat };

    // Torso (Jacket)
    const torsoGeo = new THREE.BoxGeometry(1.1, 1.4, 0.7);
    const torsoMesh = new THREE.Mesh(torsoGeo, torsoMat);
    torsoMesh.position.y = 0.5;
    charGroup.add(torsoMesh);

    // Head
    const headGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.y = 1.7;
    charGroup.add(headMesh);

    // Hair / Helmet
    const hairGeo = new THREE.BoxGeometry(0.9, 0.35, 0.9);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b });
    const hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.position.y = 2.15;
    charGroup.add(hairMesh);

    // Glowing Eyes / Visor
    const eyeGeo = new THREE.BoxGeometry(0.6, 0.15, 0.1);
    const eyeMesh = new THREE.Mesh(eyeGeo, eyeMat);
    eyeMesh.position.set(0, 1.7, 0.42);
    charGroup.add(eyeMesh);

    // Left Arm
    const armGeo = new THREE.BoxGeometry(0.35, 1.1, 0.35);
    const leftArm = new THREE.Mesh(armGeo, limbMat);
    leftArm.position.set(-0.85, 0.5, 0);
    charGroup.add(leftArm);
    leftArmRef.current = leftArm;

    // Right Arm
    const rightArm = new THREE.Mesh(armGeo, limbMat);
    rightArm.position.set(0.85, 0.5, 0);
    charGroup.add(rightArm);
    rightArmRef.current = rightArm;

    // Left Leg
    const legGeo = new THREE.BoxGeometry(0.4, 1.2, 0.4);
    const leftLeg = new THREE.Mesh(legGeo, limbMat);
    leftLeg.position.set(-0.35, -0.7, 0);
    charGroup.add(leftLeg);
    leftLegRef.current = leftLeg;

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeo, limbMat);
    rightLeg.position.set(0.35, -0.7, 0);
    charGroup.add(rightLeg);
    rightLegRef.current = rightLeg;

    // Companion Drone Bot
    const botGeo = new THREE.OctahedronGeometry(0.3);
    const botMat = new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: 0.6 });
    const companionBot = new THREE.Mesh(botGeo, botMat);
    companionBot.position.set(1.4, 1.5, 0.4);
    charGroup.add(companionBot);
    companionBotRef.current = companionBot;

    scene.add(charGroup);

    // Interactive Orbit Mouse Dragging
    let isDragging = false;
    let prevMouseX = 0;
    const dom = renderer.domElement;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging && charGroup) {
        const delta = e.clientX - prevMouseX;
        charGroup.rotation.y += delta * 0.01;
        prevMouseX = e.clientX;
      }
    };
    const onMouseUp = () => { isDragging = false; };

    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let clock = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      clock += 0.05;

      // Companion bot orbiting
      if (companionBotRef.current) {
        companionBotRef.current.position.x = Math.cos(clock * 0.6) * 1.5;
        companionBotRef.current.position.z = Math.sin(clock * 0.6) * 1.5;
        companionBotRef.current.position.y = 1.6 + Math.sin(clock * 1.2) * 0.2;
        companionBotRef.current.rotation.y += 0.04;
      }

      // Skeletal Procedural Motion based on animState
      if (animState === 'idle') {
        charGroup.position.y = Math.sin(clock * 0.5) * 0.06;
        if (leftArmRef.current && rightArmRef.current) {
          leftArmRef.current.rotation.x = Math.sin(clock * 0.5) * 0.05;
          rightArmRef.current.rotation.x = -Math.sin(clock * 0.5) * 0.05;
        }
      } else if (animState === 'walk') {
        charGroup.position.y = Math.abs(Math.sin(clock * 1.2)) * 0.12;
        if (leftArmRef.current && rightArmRef.current && leftLegRef.current && rightLegRef.current) {
          const swing = Math.sin(clock * 1.2) * 0.6;
          leftArmRef.current.rotation.x = swing;
          rightArmRef.current.rotation.x = -swing;
          leftLegRef.current.rotation.x = -swing;
          rightLegRef.current.rotation.x = swing;
        }
      } else if (animState === 'jump') {
        charGroup.position.y = 0.8 + Math.sin(clock * 0.8) * 0.3;
        if (leftLegRef.current && rightLegRef.current) {
          leftLegRef.current.rotation.x = 0.5;
          rightLegRef.current.rotation.x = 0.5;
        }
      } else if (animState === 'attack') {
        charGroup.rotation.y += 0.15;
        if (rightArmRef.current) {
          rightArmRef.current.rotation.z = -1.2;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      if (mountRef.current?.contains(dom)) {
        mountRef.current.removeChild(dom);
      }
    };
  }, [animState, isWireframe]);

  // Update colors dynamically
  useEffect(() => {
    if (materialsRef.current.torso) materialsRef.current.torso.color.set(primaryColor);
    if (materialsRef.current.limbs) materialsRef.current.limbs.color.set(secondaryColor);
  }, [primaryColor, secondaryColor]);

  const handleSave = () => {
    const profile: CharacterProfile = {
      id: 'char-' + Date.now().toString(36),
      name: characterName,
      archetype,
      visualStyle: 'Low-Poly 3D',
      colorPalette: {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
        highlight: '#ffffff'
      },
      bodyProportions: {
        height: 1.0,
        build: bodyBuild
      },
      accessories: ['Holographic Visor', 'Companion Drone', 'Jet Boots'],
      abilities,
      lore: loreText,
      modelType: '3d-procedural',
      animations: ['idle', 'walk', 'jump', 'attack']
    };

    if (onSaveCharacter) {
      onSaveCharacter(profile);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div style={{ maxWidth: 1180, margin: '24px auto', width: '100%', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div className="badge badge-primary" style={{ marginBottom: 6 }}>
            <UserPlus size={14} />
            <span>Character Studio</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Original Character Generation & 3D Rigging</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Generate, customize, and inspect original 3D characters with real-time procedural animations.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={16} />
          <span>{saveSuccess ? 'Saved to Project!' : 'Save Character'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1fr) 420px', gap: 24 }}>
        {/* Left: Interactive Three.js 3D Viewport */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div 
            ref={mountRef} 
            style={{ width: '100%', height: 460, position: 'relative', background: '#090d16' }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                display: 'flex',
                gap: 8,
                zIndex: 10
              }}
            >
              <span className="badge badge-primary">3D Viewport (Drag to Orbit)</span>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setIsWireframe(!isWireframe)}
                style={{ padding: '3px 8px', fontSize: '0.75rem' }}
              >
                {isWireframe ? 'Solid Mesh' : 'Wireframe'}
              </button>
            </div>
          </div>

          {/* Animation Controls Bar */}
          <div 
            style={{
              padding: 14,
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--bg-subtle)'
            }}
          >
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              ANIMATION STATE:
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              {(['idle', 'walk', 'jump', 'attack'] as const).map(mode => (
                <button
                  key={mode}
                  className={`btn btn-sm ${animState === mode ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setAnimState(mode)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Character Attributes & Customizer */}
        <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
            Character Profile & Stats
          </h3>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
              CHARACTER NAME
            </label>
            <input 
              type="text" 
              className="input-text" 
              value={characterName} 
              onChange={(e) => setCharacterName(e.target.value)} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                ROLE / ARCHETYPE
              </label>
              <select 
                className="input-text" 
                value={archetype} 
                onChange={(e) => setArchetype(e.target.value as CharacterProfile['archetype'])}
              >
                <option value="Hero">Hero Protagonist</option>
                <option value="Companion">Companion</option>
                <option value="NPC Guide">NPC Guide</option>
                <option value="Enemy">Boss / Adversary</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
                BODY BUILD
              </label>
              <select 
                className="input-text" 
                value={bodyBuild} 
                onChange={(e) => setBodyBuild(e.target.value as any)}
              >
                <option value="athletic">Athletic</option>
                <option value="slim">Slim Agile</option>
                <option value="sturdy">Sturdy Armor</option>
                <option value="chibi">Chibi Stylized</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6, color: 'var(--text-secondary)' }}>
              MATERIAL COLOR PALETTE
            </label>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tunic / Body</span>
                <input 
                  type="color" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  style={{ width: '100%', height: 34, border: 'none', borderRadius: 8, cursor: 'pointer' }} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Limbs / Armor</span>
                <input 
                  type="color" 
                  value={secondaryColor} 
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  style={{ width: '100%', height: 34, border: 'none', borderRadius: 8, cursor: 'pointer' }} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Visor / Companion</span>
                <input 
                  type="color" 
                  value={accentColor} 
                  onChange={(e) => setAccentColor(e.target.value)}
                  style={{ width: '100%', height: 34, border: 'none', borderRadius: 8, cursor: 'pointer' }} 
                />
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
              SPECIAL ABILITIES
            </label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {abilities.map((ab, i) => (
                <span key={i} className="badge badge-cyan">
                  <Zap size={12} />
                  <span>{ab}</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-secondary)' }}>
              BACKSTORY & LORE
            </label>
            <textarea
              className="textarea-field"
              rows={3}
              value={loreText}
              onChange={(e) => setLoreText(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
