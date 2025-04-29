import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import BuilderHeader from '../components/builder/BuilderHeader';
import BuilderSidebar from '../components/builder/BuilderSidebar';
import BuilderCanvas from '../components/builder/BuilderCanvas';
import SectionsPanel from '../components/builder/panels/SectionsPanel';
import DesignPanel from '../components/builder/panels/DesignPanel';
import CodePanel from '../components/builder/panels/CodePanel';
import PreviewPanel from '../components/builder/panels/PreviewPanel';
import SettingsPanel from '../components/builder/panels/SettingsPanel';
import { LayoutProvider, useLayout } from '../builder/context/LayoutContext';
import { NavigationProvider } from '../builder/context/NavigationContext';

type Tab = 'sections' | 'design' | 'preview' | 'code' | 'settings';
const LEFT_WIDTH = 64;
const DEFAULT_RIGHT_WIDTH = 320;
const EXPANDED_RIGHT_WIDTH = 800;

// -------------------
// Composant racine
// -------------------
const BuilderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    currentProject,
    saveLayout,
    publishProject,
    isLoading,
    fetchProjectById,
  } = useAppStore();
  const [activeTab, setActiveTab] = React.useState<Tab>('sections');

  useEffect(() => {
    if (id && !currentProject && !isLoading) {
      fetchProjectById(id);
    }
  }, [id, currentProject, isLoading, fetchProjectById]);

  if (!currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSave = async () => id && saveLayout(id, currentProject.layout);
  const handlePublish = async () => id && publishProject(id);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <BuilderHeader
        project={currentProject}
        onSave={handleSave}
        onPublish={handlePublish}
      />

      <LayoutProvider projectId={id!}>
        <NavigationProvider>
          <BuilderPageContent
            currentProject={currentProject}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSave={handleSave}
          />
        </NavigationProvider>
      </LayoutProvider>
    </div>
  );
};

export default BuilderPage;

// -------------------
// Contenu sous LayoutProvider
// -------------------
interface BuilderPageContentProps {
  currentProject: ReturnType<typeof useAppStore>['currentProject'];
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onSave: () => Promise<void>;
}

const BuilderPageContent: React.FC<BuilderPageContentProps> = ({
  currentProject,
  activeTab,
  setActiveTab,
  onSave,
}) => {
  // Hook sous LayoutProvider
  const { selectedSectionIndex } = useLayout();

  // Largeur dynamique : 320px ou 800px
  const rightWidth =
    activeTab === 'sections'
      ? selectedSectionIndex != null
        ? EXPANDED_RIGHT_WIDTH
        : DEFAULT_RIGHT_WIDTH
      : DEFAULT_RIGHT_WIDTH;

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar gauche fixe */}
      <div
        className="flex-shrink-0 h-full border-r border-gray-200 bg-white"
        style={{
          width: LEFT_WIDTH,
          minWidth: LEFT_WIDTH,
          maxWidth: LEFT_WIDTH,
        }}
      >
        <BuilderSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Canvas / Preview central */}
      <div className="flex-1 overflow-auto">
        <BuilderCanvas />
      </div>

      {/* Panel droite dynamique */}
      <div
        className="flex-shrink-0 h-full border-l border-gray-200 bg-white flex flex-col overflow-auto"
        style={{
          width: rightWidth,
          minWidth: rightWidth,
          maxWidth: rightWidth,
          transition: 'width 0.3s ease',
        }}
      >
        <div className="h-14 px-4 flex items-center border-b border-gray-100">
          <h3 className="text-sm font-semibold capitalize">
            {activeTab}
          </h3>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'sections' && <SectionsPanel />}
          {activeTab === 'design' && (
            <DesignPanel
              onThemeChange={() => onSave()}
            />
          )}
          {activeTab === 'preview' && (
            <PreviewPanel projectId={currentProject.id} />
          )}
          {activeTab === 'code' && (
            <CodePanel
              layout={currentProject.layout}
              onLayoutChange={() => onSave()}
              onSave={onSave}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsPanel project={currentProject} />
          )}
        </div>
      </div>
    </div>
  );
};
