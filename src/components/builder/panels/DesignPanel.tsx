import React from 'react';
import { Palette, Grid, Type, Sliders } from 'lucide-react';
import Button from '../../ui/Button';

interface DesignPanelProps {
  onThemeChange: (theme: string) => void;
}

const DesignPanel: React.FC<DesignPanelProps> = ({ onThemeChange }) => {
  const [activeTab, setActiveTab] = React.useState('theme');
  
  const themes = [
    {
      id: 'default',
      name: 'Default',
      colors: ['#5C6AC4', '#50B83C', '#FFC58B', '#F49342'],
      preview: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      colors: ['#000000', '#FFFFFF', '#F5F5F5', '#E0E0E0'],
      preview: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 'bold',
      name: 'Bold',
      colors: ['#FF3366', '#33CCFF', '#FFCC00', '#00CC99'],
      preview: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];
  
  return (
    <div>
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'theme' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('theme')}
        >
          <div className="flex items-center">
            <Palette className="h-4 w-4 mr-1.5" />
            Theme
          </div>
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'typography' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('typography')}
        >
          <div className="flex items-center">
            <Type className="h-4 w-4 mr-1.5" />
            Typography
          </div>
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'spacing' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('spacing')}
        >
          <div className="flex items-center">
            <Grid className="h-4 w-4 mr-1.5" />
            Spacing
          </div>
        </button>
      </div>
      
      {activeTab === 'theme' && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Choose a Theme</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="border border-gray-200 rounded-md overflow-hidden hover:border-primary-300 transition-colors"
              >
                <div className="h-32 bg-gray-100 relative">
                  <img 
                    src={theme.preview} 
                    alt={theme.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900">{theme.name}</h4>
                    <div className="flex">
                      {theme.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full ml-1"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={() => onThemeChange(theme.id)}
                  >
                    Apply Theme
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'typography' && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Typography Settings</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Heading Font
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Inter</option>
                <option>SF Pro Display</option>
                <option>Roboto</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Body Font
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Inter</option>
                <option>SF Pro Text</option>
                <option>Roboto</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Base Font Size
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="12"
                  max="20"
                  defaultValue="16"
                  className="flex-1 mr-2"
                />
                <span className="text-sm text-gray-500">16px</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'spacing' && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Spacing Settings</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Content Padding
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="8"
                  max="32"
                  defaultValue="16"
                  className="flex-1 mr-2"
                />
                <span className="text-sm text-gray-500">16px</span>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Element Spacing
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="4"
                  max="24"
                  defaultValue="12"
                  className="flex-1 mr-2"
                />
                <span className="text-sm text-gray-500">12px</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignPanel;