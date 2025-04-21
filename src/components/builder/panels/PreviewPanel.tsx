import React from 'react';
import { Smartphone, Tablet, Monitor, RefreshCw } from 'lucide-react';
import Button from '../../ui/Button';

interface PreviewPanelProps {
  projectId: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ projectId }) => {
  const [device, setDevice] = React.useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Preview Settings</h3>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Refresh
        </Button>
      </div>
      
      <div className="flex border border-gray-200 rounded-md p-1">
        <button
          className={`flex-1 flex items-center justify-center py-1.5 rounded ${
            device === 'mobile' ? 'bg-primary-50 text-primary-500' : 'text-gray-500'
          }`}
          onClick={() => setDevice('mobile')}
        >
          <Smartphone className="h-4 w-4 mr-1.5" />
          <span className="text-xs">Mobile</span>
        </button>
        <button
          className={`flex-1 flex items-center justify-center py-1.5 rounded ${
            device === 'tablet' ? 'bg-primary-50 text-primary-500' : 'text-gray-500'
          }`}
          onClick={() => setDevice('tablet')}
        >
          <Tablet className="h-4 w-4 mr-1.5" />
          <span className="text-xs">Tablet</span>
        </button>
        <button
          className={`flex-1 flex items-center justify-center py-1.5 rounded ${
            device === 'desktop' ? 'bg-primary-50 text-primary-500' : 'text-gray-500'
          }`}
          onClick={() => setDevice('desktop')}
        >
          <Monitor className="h-4 w-4 mr-1.5" />
          <span className="text-xs">Desktop</span>
        </button>
      </div>
      
      <div className="border border-gray-200 rounded-md p-3">
        <div className="text-sm font-medium text-gray-900 mb-2">Preview URL</div>
        <div className="flex">
          <input
            type="text"
            value={`/preview/${projectId}`}
            readOnly
            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm bg-gray-50"
          />
          <Button
            variant="secondary"
            className="rounded-l-none"
            onClick={() => window.open(`/preview/${projectId}`, '_blank')}
          >
            Open
          </Button>
        </div>
      </div>
      
      <div className="mt-4">
        <Button
          variant="primary"
          className="w-full"
          onClick={() => window.open(`/preview/${projectId}`, '_blank')}
        >
          Open Full Preview
        </Button>
      </div>
    </div>
  );
};

export default PreviewPanel;