import React from 'react';
import { Smartphone } from 'lucide-react';
import ProductGridSection from '../../sections/ProductGridSection'; // ✅ Assure-toi que ce chemin est correct

interface Section {
  type: string;
  props?: any;
}

interface BuilderCanvasProps {
  layout: {
    sections: Section[];
  };
}

const BuilderCanvas: React.FC<BuilderCanvasProps> = ({ layout }) => {
  const renderSection = (type: string, props: any) => {
    switch (type) {
      case 'product-grid':
        return <ProductGridSection {...props} />;
      // 🔽 Ajoute ici d'autres composants quand tu en crées
      // case 'header':
      //   return <HeaderSection {...props} />;
      default:
        return (
          <div className="text-sm text-gray-500">
            Composant inconnu : {type}
          </div>
        );
    }
  };

  const renderPreview = () => {
    if (!layout || !layout.sections || layout.sections.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Smartphone className="h-12 w-12 mb-2" />
          <p className="text-sm">Clique sur un composant pour commencer</p>
        </div>
      );
    }

    return (
      <div className="p-4 space-y-4">
        {layout.sections.map((section, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded shadow-sm p-4"
          >
            {renderSection(section.type, section.props)}
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
            <div className="w-16 h-2 bg-gray-600 rounded-full" />
            <div className="w-4 h-2 bg-gray-600 rounded-full" />
          </div>

          {/* Content area */}
          <div className="h-[calc(100%-6rem)] overflow-y-auto">
            {renderPreview()}
          </div>

          {/* Navigation bar */}
          <div className="h-12 bg-gray-800 flex items-center justify-center">
            <div className="w-24 h-1 bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderCanvas;
