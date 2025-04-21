import React, { useState, useEffect } from 'react';
import Button from '../../ui/Button';
import { Save } from 'lucide-react';

interface CodePanelProps {
  layout: any;
  onLayoutChange: (layout: any) => void;
  onSave: () => Promise<void>;
}

const CodePanel: React.FC<CodePanelProps> = ({ layout, onLayoutChange, onSave }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setCode(JSON.stringify(layout, null, 2) || '{}');
  }, [layout]);
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    setError(null);
  };
  
  const handleApplyChanges = () => {
    try {
      const parsedLayout = JSON.parse(code);
      onLayoutChange(parsedLayout);
    } catch (err) {
      setError('Invalid JSON format');
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">Edit Layout JSON</h3>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleApplyChanges}
          >
            Apply Changes
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Save className="h-4 w-4" />}
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="mb-3 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="flex-1 relative">
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="w-full h-full p-3 font-mono text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          style={{ resize: 'none' }}
        />
      </div>
    </div>
  );
};

export default CodePanel;