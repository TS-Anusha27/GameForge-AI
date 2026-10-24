import React, { useState, useEffect } from 'react';
import { Navbar, NavigationTab } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CreateGameView } from './components/CreateGameView';
import { PlayableWorkspace } from './components/PlayableWorkspace';
import { TemplatesView } from './components/TemplatesView';
import { ProjectsLibraryView } from './components/ProjectsLibraryView';
import { CharacterStudio } from './components/CharacterStudio';
import { LevelEditorView } from './components/LevelEditorView';
import { TestingQAView } from './components/TestingQAView';
import { ExportPublishView } from './components/ExportPublishView';
import { DocsHelpView } from './components/DocsHelpView';
import { SettingsModal } from './components/SettingsModal';

import { Project, CharacterProfile, LevelMap } from './types/game';
import { StorageService } from './services/storage';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [projects, setProjects] = useState<Project[]>(() => StorageService.getProjects());
  const [activeProjectId, setActiveProjectId] = useState<string>(() => StorageService.getActiveProjectId());
  const [initialCreatePrompt, setInitialCreatePrompt] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Active Project Reference
  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0] || null;

  const reloadProjects = () => {
    const list = StorageService.getProjects();
    setProjects(list);
  };

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    StorageService.setActiveProjectId(id);
    setActiveTab('studio');
  };

  const handleUpdateProject = (updated: Project) => {
    StorageService.saveProject(updated);
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleCreateWithPrompt = (prompt: string) => {
    setInitialCreatePrompt(prompt);
    setActiveTab('create');
  };

  const handleForkTemplate = (template: Project) => {
    const forked = StorageService.duplicateProject(template.id);
    if (forked) {
      reloadProjects();
      setActiveProjectId(forked.id);
      StorageService.setActiveProjectId(forked.id);
      setActiveTab('studio');
    }
  };

  const handleCharacterSaved = (char: CharacterProfile) => {
    if (activeProject) {
      const updatedSpecs = {
        ...activeProject.specifications,
        characters: [
          ...activeProject.specifications.characters,
          {
            name: char.name,
            role: char.archetype,
            description: char.lore,
            abilities: char.abilities
          }
        ]
      };
      const updatedProject = { ...activeProject, specifications: updatedSpecs };
      handleUpdateProject(updatedProject);
    }
  };

  const handleLevelApplied = (level: LevelMap) => {
    if (activeProject) {
      const updatedSpecs = {
        ...activeProject.specifications,
        worldDesign: {
          ...activeProject.specifications.worldDesign,
          theme: level.biome,
          biome: `${level.biome} (${level.weather})`
        }
      };
      const updatedProject = { ...activeProject, specifications: updatedSpecs };
      handleUpdateProject(updatedProject);
    }
  };

  return (
    <div className="app-container">
      {/* Top Fixed Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        activeProject={activeProject}
        allProjects={projects}
        onSelectProject={handleSelectProject}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Routed Content Area */}
      <main className="main-content">
        {activeTab === 'home' && (
          <HomePage
            onCreateWithPrompt={handleCreateWithPrompt}
            onOpenProject={handleSelectProject}
            onExploreExamples={() => setActiveTab('templates')}
            recentProjects={projects.slice(0, 4)}
          />
        )}

        {activeTab === 'create' && (
          <CreateGameView
            initialPrompt={initialCreatePrompt}
            onGameCreated={(newProj) => {
              reloadProjects();
              setActiveProjectId(newProj.id);
              StorageService.setActiveProjectId(newProj.id);
            }}
            onOpenStudio={() => setActiveTab('studio')}
          />
        )}

        {activeTab === 'studio' && activeProject && (
          <PlayableWorkspace
            project={activeProject}
            onUpdateProject={handleUpdateProject}
            onOpenAndroidExport={() => setActiveTab('export-publish')}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesView
            onSelectProject={(p) => handleSelectProject(p.id)}
            onForkTemplate={handleForkTemplate}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsLibraryView
            projects={projects}
            activeProjectId={activeProjectId}
            onOpenProject={handleSelectProject}
            onCreateNew={() => {
              setInitialCreatePrompt('');
              setActiveTab('create');
            }}
            onProjectsChange={reloadProjects}
          />
        )}

        {activeTab === 'character-studio' && (
          <CharacterStudio onSaveCharacter={handleCharacterSaved} />
        )}

        {activeTab === 'level-editor' && (
          <LevelEditorView onApplyLevelToProject={handleLevelApplied} />
        )}

        {activeTab === 'testing-qa' && activeProject && (
          <TestingQAView
            project={activeProject}
            onUpdateProject={handleUpdateProject}
          />
        )}

        {activeTab === 'export-publish' && activeProject && (
          <ExportPublishView
            project={activeProject}
            onUpdateProject={handleUpdateProject}
          />
        )}

        {activeTab === 'docs' && <DocsHelpView />}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsSaved={reloadProjects}
      />
    </div>
  );
}

export default App;
