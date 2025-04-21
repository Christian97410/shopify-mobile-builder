import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../lib/store';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card, { CardContent, CardHeader, CardFooter } from '../ui/Card';
import { Smartphone, ShoppingBag, Layout } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'default',
    name: 'Default',
    icon: <Layout className="h-8 w-8" />,
    description: 'A standard mobile app layout with navigation and common screens.',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    icon: <Smartphone className="h-8 w-8" />,
    description: 'Clean, minimalist design focused on content and usability.',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: <ShoppingBag className="h-8 w-8" />,
    description: 'Ready-to-use store layout with product listings and cart.',
  },
];

const CreateProjectForm: React.FC = () => {
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('default');
  const [storeUrl, setStoreUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const { createProject, isLoading } = useAppStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!name.trim()) {
      setError('Project name is required');
      return;
    }
    
    try {
      const projectId = await createProject({
        name,
        template,
        store_url: storeUrl || null,
      });
      
      navigate(`/dashboard/projects/${projectId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Create New App</h2>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent>
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            
            <Input
              label="App Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome App"
              required
            />
            
            <Input
              label="Shopify Store URL (Optional)"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              placeholder="https://your-store.myshopify.com"
              helperText="Connect your Shopify store to import products and data"
            />
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose a Template
              </label>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {TEMPLATES.map((t) => (
                  <div
                    key={t.id}
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-all
                      ${template === t.id ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500' : 'border-gray-200 hover:border-primary-300'}
                    `}
                    onClick={() => setTemplate(t.id)}
                  >
                    <div className="flex items-center mb-2">
                      <div className="text-primary-500">{t.icon}</div>
                      <h3 className="ml-2 text-sm font-medium text-gray-900">{t.name}</h3>
                    </div>
                    <p className="text-xs text-gray-500">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              className="mr-3"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
            >
              Create App
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateProjectForm;