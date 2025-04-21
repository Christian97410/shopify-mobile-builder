import React from 'react';
import { Smartphone } from 'lucide-react';

interface BuilderCanvasProps {
  layout: any;
}

const BuilderCanvas: React.FC<BuilderCanvasProps> = ({ layout }) => {
  // This would be a simplified representation of the mobile app
  // In a real implementation, this would render components based on the layout JSON
  
  const renderPreview = () => {
    if (!layout || Object.keys(layout).length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Smartphone className="h-12 w-12 mb-2" />
          <p className="text-sm">Drag components from the sidebar to start building</p>
        </div>
      );
    }
    
    // Simple representation of the layout
    return (
      <div className="p-4">
        {layout.sections?.map((section: any, index: number) => (
          <div 
            key={index}
            className="border border-dashed border-gray-300 p-4 mb-4 rounded"
          >
            <div className="text-xs text-gray-500 mb-2">{section.type}</div>
            {section.blocks?.map((block: any, blockIndex: number) => (
              <div 
                key={blockIndex}
                className="bg-white border border-gray-200 p-3 mb-2 rounded shadow-sm"
              >
                <div className="text-xs font-medium">{block.type}</div>
                {block.settings && (
                  <div className="mt-1 text-xs text-gray-500">
                    {Object.keys(block.settings).map(key => (
                      <div key={key}>{key}: {JSON.stringify(block.settings[key])}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
      <div className="relative">
        {/* Phone mockup */}
        <div className="w-[320px] h-[640px] bg-white rounded-[36px] shadow-xl overflow-hidden border-8 border-gray-800">
          {/* Status bar */}
          <div className="h-6 bg-gray-800 flex items-center justify-between px-4">
            <div className="w-16 h-2 bg-gray-600 rounded-full"></div>
            <div className="w-4 h-2 bg-gray-600 rounded-full"></div>
          </div>
          
          {/* Content area */}
          <div className="h-[calc(100%-6rem)] overflow-y-auto">
            {renderPreview()}
          </div>
          
          {/* Navigation bar */}
          <div className="h-12 bg-gray-800 flex items-center justify-center">
            <div className="w-24 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderCanvas;