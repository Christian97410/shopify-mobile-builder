import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Box, Palette, Eye, Code, Settings } from 'lucide-react';

type Tab = 'layers' | 'components' | 'design' | 'preview' | 'code' | 'settings';

interface BuilderSidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BuilderSidebar: React.FC<BuilderSidebarProps> = ({ activeTab, onTabChange }) => {
  const [hoveredTab, setHoveredTab] = useState<Tab | null>(null);
  
  const tabs = [
    { id: 'layers', icon: <Layers className="h-5 w-5" />, label: 'Layers' },
    { id: 'components', icon: <Box className="h-5 w-5" />, label: 'Components' },
    { id: 'design', icon: <Palette className="h-5 w-5" />, label: 'Design' },
    { id: 'preview', icon: <Eye className="h-5 w-5" />, label: 'Preview' },
    { id: 'code', icon: <Code className="h-5 w-5" />, label: 'Code' },
    { id: 'settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
  ];
  
  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="flex flex-col items-center py-4 space-y-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="relative"
            onMouseEnter={() => setHoveredTab(tab.id as Tab)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <button
              onClick={() => onTabChange(tab.id as Tab)}
              className={`
                p-2 rounded-md transition-colors relative
                ${activeTab === tab.id ? 'text-primary-500 bg-primary-50' : 'text-gray-500 hover:text-primary-500 hover:bg-gray-50'}
              `}
            >
              {tab.icon}
            </button>
            
            {hoveredTab === tab.id && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-10"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                {tab.label}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuilderSidebar;