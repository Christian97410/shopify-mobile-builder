import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import BuilderHeader from '../components/builder/BuilderHeader';
import BuilderSidebar from '../components/builder/BuilderSidebar';
import BuilderCanvas from '../components/builder/BuilderCanvas';
import BuilderPanel from '../components/builder/BuilderPanel';
import LayersPanel from '../components/builder/panels/LayersPanel';
import ComponentsPanel from '../components/builder/panels/ComponentsPanel';
import DesignPanel from '../components/builder/panels/DesignPanel';
import CodePanel from '../components/builder/panels/CodePanel';
import PreviewPanel from '../components/builder/panels/PreviewPanel';
import SettingsPanel from '../components/builder/panels/SettingsPanel';

type Tab = 'layers' | 'components' | 'design' | 'preview' | 'code' | 'settings';

const BuilderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentProject, fetchProjectById, saveLayout, publishProject, isLoading } = useAppStore();

  const [activeTab, setActiveTab] = useState<Tab>('components');
  const [layout, setLayout] = useState<any>({});

  useEffect(() => {
    if (id) {
      fetchProjectById(id);
    }
  }, [id, fetchProjectById]);

  useEffect(() => {
    if (currentProject?.layout) {
      setLayout(currentProject.layout);
    } else {
      setLayout({
        sections: []
      });
    }
  }, [currentProject]);

  const handleSave = async () => {
    if (id) {
      await saveLayout(id, layout);
    }
  };

  const handlePublish = async () => {
    if (id) {
      await publishProject(id);
    }
  };

  const handleAddComponent = (component: any) => {
    const newSection = {
      type: component.id,
      props: {} // ✅ C’est ici qu’on alimente le layout avec la bonne forme
    };
console.log('Ajout du composant :', newSection); // 👀
    setLayout((prev: any) => ({
      ...prev,
      sections: [...(prev.sections || []), newSection]
    }));
  };

  const handleThemeChange = (theme: string) => {
    setLayout((prev: any) => ({
      ...prev,
      theme
    }));
  };

  if (isLoading || !currentProject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <BuilderHeader
        project={currentProject}
        onSave={handleSave}
        onPublish={handlePublish}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="w-16 flex-shrink-0">
          <BuilderSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <BuilderCanvas layout={layout} />

        {activeTab === 'layers' && (
          <BuilderPanel title="Layers" onClose={() => setActiveTab('components')}>
            <LayersPanel layout={layout} onLayoutChange={setLayout} />
          </BuilderPanel>
        )}

        {activeTab === 'components' && (
          <BuilderPanel title="Components" onClose={() => setActiveTab('layers')}>
            <ComponentsPanel onAddComponent={handleAddComponent} />
          </BuilderPanel>
        )}

        {activeTab === 'design' && (
          <BuilderPanel title="Design" onClose={() => setActiveTab('components')}>
            <DesignPanel onThemeChange={handleThemeChange} />
          </BuilderPanel>
        )}

        {activeTab === 'preview' && (
          <BuilderPanel title="Preview" onClose={() => setActiveTab('components')}>
            <PreviewPanel projectId={id || ''} />
          </BuilderPanel>
        )}

        {activeTab === 'code' && (
          <BuilderPanel title="Code" onClose={() => setActiveTab('components')}>
            <CodePanel
              layout={layout}
              onLayoutChange={setLayout}
              onSave={handleSave}
            />
          </BuilderPanel>
        )}

        {activeTab === 'settings' && (
          <BuilderPanel title="Settings" onClose={() => setActiveTab('components')}>
            <SettingsPanel project={currentProject} />
          </BuilderPanel>
        )}
      </div>
    </div>
  );
};

export default BuilderPage;
