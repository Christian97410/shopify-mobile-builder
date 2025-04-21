import React, { useState } from 'react';
import { useAppStore, Project } from '../../../lib/store';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { Save, Trash2 } from 'lucide-react';

interface SettingsPanelProps {
  project: Project;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [storeUrl, setStoreUrl] = useState(project.store_url || '');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { updateProject, isLoading } = useAppStore();
  
  const handleSave = async () => {
    await updateProject(project.id, {
      name,
      store_url: storeUrl || null,
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Project Settings</h3>
        
        <Input
          label="App Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <Input
          label="Shopify Store URL"
          value={storeUrl}
          onChange={(e) => setStoreUrl(e.target.value)}
          placeholder="https://your-store.myshopify.com"
          helperText="Connect your Shopify store to import products and data"
        />
        
        <div className="mt-4">
          <Button
            variant="primary"
            leftIcon={<Save className="h-4 w-4" />}
            onClick={handleSave}
            isLoading={isLoading}
            className="w-full"
          >
            Save Settings
          </Button>
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Danger Zone</h3>
        
        {!isDeleting ? (
          <Button
            variant="outline"
            className="w-full border-red-300 text-red-600 hover:bg-red-50"
            leftIcon={<Trash2 className="h-4 w-4" />}
            onClick={() => setIsDeleting(true)}
          >
            Delete Project
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
              Are you sure? This action cannot be undone.
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDeleting(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                isLoading={isLoading}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;