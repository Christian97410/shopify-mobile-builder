import React from 'react';
import { ChevronRight, ChevronDown, Trash2, Eye, EyeOff } from 'lucide-react';

interface LayersPanelProps {
  layout: any;
  onLayoutChange: (layout: any) => void;
}

const LayersPanel: React.FC<LayersPanelProps> = ({ layout, onLayoutChange }) => {
  const [expandedSections, setExpandedSections] = React.useState<Record<number, boolean>>({});
  
  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  if (!layout || !layout.sections || layout.sections.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No layers added yet</p>
        <p className="text-sm mt-2">Drag components from the Components panel to add layers</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {layout.sections.map((section: any, sectionIndex: number) => (
        <div key={sectionIndex} className="border border-gray-200 rounded-md overflow-hidden">
          <div 
            className="flex items-center justify-between bg-gray-50 px-3 py-2 cursor-pointer"
            onClick={() => toggleSection(sectionIndex)}
          >
            <div className="flex items-center">
              {expandedSections[sectionIndex] ? (
                <ChevronDown className="h-4 w-4 text-gray-500 mr-2" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
              )}
              <span className="text-sm font-medium">{section.type || 'Section'}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <Eye className="h-4 w-4" />
              </button>
              <button 
                className="p-1 text-gray-500 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  const newLayout = {
                    ...layout,
                    sections: layout.sections.filter((_: any, i: number) => i !== sectionIndex)
                  };
                  onLayoutChange(newLayout);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {expandedSections[sectionIndex] && section.blocks && (
            <div className="pl-6 pr-3 py-2 border-t border-gray-200">
              {section.blocks.map((block: any, blockIndex: number) => (
                <div 
                  key={blockIndex}
                  className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded"
                >
                  <span className="text-sm">{block.type || 'Block'}</span>
                  
                  <div className="flex items-center space-x-1">
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <Eye className="h-3 w-3" />
                    </button>
                    <button 
                      className="p-1 text-gray-500 hover:text-red-500"
                      onClick={() => {
                        const newLayout = {
                          ...layout,
                          sections: layout.sections.map((s: any, i: number) => {
                            if (i === sectionIndex) {
                              return {
                                ...s,
                                blocks: s.blocks.filter((_: any, j: number) => j !== blockIndex)
                              };
                            }
                            return s;
                          })
                        };
                        onLayoutChange(newLayout);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LayersPanel;