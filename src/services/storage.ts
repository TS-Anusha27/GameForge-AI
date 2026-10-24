import { Project, ProjectCheckpoint } from '../types/game';
import { chennaiDetectiveProject } from '../projects/chennaiDetective';
import { solaria3DProject } from '../templates/solaria3D';
import { cyberpunkOdysseyProject } from '../templates/cyberpunkOdyssey';
import { snakesAndLaddersProject } from '../templates/snakesAndLadders';
import { galacticShooterProject } from '../templates/galacticShooter';

const STORAGE_KEY_PROJECTS = 'gameforge_ai_projects_v2';
const STORAGE_KEY_ACTIVE_PROJECT = 'gameforge_ai_active_project_id_v2';
const STORAGE_KEY_SETTINGS = 'gameforge_ai_settings_v2';

export interface UserSettings {
  apiKeyGemini: string;
  apiKeyOpenAI: string;
  selectedProvider: 'openai' | 'gemini' | 'anthropic' | 'custom';
  selectedModel: string;
  computeQuotaMax: number;
  computeQuotaUsed: number;
  theme: 'light' | 'dark' | 'system';
  enableSoundEffects: boolean;
  autoSaveCheckpoints: boolean;
}

const defaultSettings: UserSettings = {
  apiKeyGemini: '',
  apiKeyOpenAI: '',
  selectedProvider: 'openai',
  selectedModel: 'gpt-4o',
  computeQuotaMax: 1000,
  computeQuotaUsed: 15,
  theme: 'light',
  enableSoundEffects: true,
  autoSaveCheckpoints: true
};

const defaultProjects: Project[] = [
  chennaiDetectiveProject,
  cyberpunkOdysseyProject,
  solaria3DProject,
  galacticShooterProject,
  snakesAndLaddersProject
];

export class StorageService {
  public static getProjects(): Project[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (data) {
        const parsed = JSON.parse(data) as Project[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading projects from storage:', e);
    }

    StorageService.saveProjects(defaultProjects);
    return defaultProjects;
  }

  public static saveProjects(projects: Project[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Error writing projects to storage:', e);
    }
  }

  public static getProjectById(id: string): Project | undefined {
    const list = StorageService.getProjects();
    return list.find(p => p.id === id);
  }

  public static saveProject(project: Project): void {
    const list = StorageService.getProjects();
    const index = list.findIndex(p => p.id === project.id);
    const updated = { ...project, updatedAt: Date.now() };

    if (index >= 0) {
      list[index] = updated;
    } else {
      list.unshift(updated);
    }
    StorageService.saveProjects(list);
  }

  public static deleteProject(id: string): boolean {
    const list = StorageService.getProjects();
    const filtered = list.filter(p => p.id !== id);
    if (filtered.length !== list.length) {
      StorageService.saveProjects(filtered);
      return true;
    }
    return false;
  }

  public static duplicateProject(id: string): Project | null {
    const orig = StorageService.getProjectById(id);
    if (!orig) return null;

    const copy: Project = {
      ...JSON.parse(JSON.stringify(orig)),
      id: 'proj-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      name: `${orig.name} (Forked)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 'v1.0.0-fork'
    };

    StorageService.saveProject(copy);
    return copy;
  }

  public static getActiveProjectId(): string {
    const active = localStorage.getItem(STORAGE_KEY_ACTIVE_PROJECT);
    if (active && StorageService.getProjectById(active)) {
      return active;
    }
    const projects = StorageService.getProjects();
    const defaultId = projects[0]?.id || chennaiDetectiveProject.id;
    StorageService.setActiveProjectId(defaultId);
    return defaultId;
  }

  public static setActiveProjectId(id: string): void {
    localStorage.setItem(STORAGE_KEY_ACTIVE_PROJECT, id);
  }

  public static revertToCheckpoint(projectId: string, checkpointId: string): Project | null {
    const project = StorageService.getProjectById(projectId);
    if (!project) return null;

    const checkpoint = project.checkpoints?.find(c => c.id === checkpointId);
    if (!checkpoint || !checkpoint.filesSnapshot) return null;

    const rollbackCheckpoint: ProjectCheckpoint = {
      id: 'chk-rollback-' + Date.now(),
      version: checkpoint.version + '-restored',
      timestamp: Date.now(),
      message: `Reverted to version ${checkpoint.version} (${checkpoint.message})`,
      author: 'AI Agent',
      filesSnapshot: { ...checkpoint.filesSnapshot },
      diffSummary: {
        filesChanged: Object.keys(checkpoint.filesSnapshot),
        additions: 0,
        deletions: 0,
        summary: `Restored exact snapshot of ${checkpoint.version}`
      }
    };

    const restoredProject: Project = {
      ...project,
      version: rollbackCheckpoint.version,
      files: { ...checkpoint.filesSnapshot },
      checkpoints: [rollbackCheckpoint, ...project.checkpoints],
      updatedAt: Date.now()
    };

    StorageService.saveProject(restoredProject);
    return restoredProject;
  }

  public static getSettings(): UserSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (data) {
        return { ...defaultSettings, ...JSON.parse(data) };
      }
    } catch (e) {
      console.error('Error loading settings:', e);
    }
    return defaultSettings;
  }

  public static saveSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  }
}
