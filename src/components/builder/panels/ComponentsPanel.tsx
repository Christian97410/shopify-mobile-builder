import React from 'react';
import {
  Layout,
  Image,
  Type,
  ShoppingBag,
  Navigation,
  Search,
  List,
  Grid,
  CreditCard,
} from 'lucide-react';

// Importation des sections
import ProductGridSection from '../../../sections/ProductGridSection'; // à créer

interface ComponentDef {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  component: React.FC<any>; // le composant React à insérer
}

interface ComponentsPanelProps {
  onAddComponent: (section: { id: string; component: React.FC<any>; props?: any }) => void;
}

const COMPONENTS: ComponentDef[] = [
  {
    id: 'header',
    icon: <Layout className="h-5 w-5" />,
    label: 'Header',
    description: 'App header with title and actions',
    component: () => <div className="bg-blue-500 text-white p-4">Header</div>,
  },
  {
    id: 'banner',
    icon: <Image className="h-5 w-5" />,
    label: 'Banner',
    description: 'Full-width image with text overlay',
    component: () => <div className="h-32 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/600x200)' }}></div>,
  },
  {
    id: 'text',
    icon: <Type className="h-5 w-5" />,
    label: 'Text',
    description: 'Simple text block with formatting options',
    component: () => <p className="p-3">Texte éditable</p>,
  },
  {
    id: 'product-grid',
    icon: <Grid className="h-5 w-5" />,
    label: 'Product Grid',
    description: 'Grid of products from Storefront API',
    component: ProductGridSection, // c’est ici que ça appelle ton fichier dynamique
  },
  // Ajoute les autres blocs plus tard si besoin
];

const ComponentsPanel: React.FC<ComponentsPanelProps> = ({ onAddComponent }) => {
  return (
    <div className="p-4 space-y-4">
      <div className="text-sm text-gray-500">
        Clique pour ajouter un bloc à ton app mobile
      </div>

      <div className="grid grid-cols-1 gap-3">
        {COMPONENTS.map((comp) => (
          <button
            key={comp.id}
            onClick={() =>
              onAddComponent({
                id: comp.id,
                component: comp.component,
                props: {},
              })
            }
            className="flex items-start w-full p-3 border border-gray-200 rounded-md hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
          >
            <div className="text-primary-500 mr-3 mt-0.5">{comp.icon}</div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{comp.label}</h4>
              <p className="text-xs text-gray-500 mt-1">{comp.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComponentsPanel;
