import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, Project } from '../../lib/store';
import Button from '../ui/Button';
import { Save, Upload, ArrowLeft } from 'lucide-react';

interface BuilderHeaderProps {
  project: Project;
  onSave: () => Promise<void>;
  onPublish: () => Promise<void>;
}

const BuilderHeader: React.FC<BuilderHeaderProps> = ({ project, onSave, onPublish }) => {
  const { isLoading } = useAppStore();
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{project.name}</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              leftIcon={<Save className="h-4 w-4" />}
              onClick={onSave}
              isLoading={isLoading}
            >
              Save
            </Button>
            
            <Button
              variant="primary"
              leftIcon={<Upload className="h-4 w-4" />}
              onClick={onPublish}
              isLoading={isLoading}
            >
              Publish
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BuilderHeader;