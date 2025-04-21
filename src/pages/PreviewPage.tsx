import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';

const PreviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [layout, setLayout] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('layout')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        setLayout(data.layout);
      } catch (err: any) {
        setError(err.message || 'Failed to load preview');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchProject();
    }
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }
  
  if (!layout || !layout.sections || layout.sections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No content to preview yet</p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-primary-500 hover:text-primary-600"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Go back
          </button>
        </div>
      </div>
    );
  }
  
  // Render the app based on the layout
  return (
    <div className="min-h-screen bg-gray-100">
      {/* This is a simplified preview - in a real app, this would render actual components */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm">
        {layout.sections.map((section: any, index: number) => (
          <div key={index} className="border-b border-gray-200 p-4">
            <div className="text-sm font-medium text-gray-900 mb-2">
              {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
            </div>
            
            {section.blocks && section.blocks.length > 0 ? (
              <div className="space-y-3">
                {section.blocks.map((block: any, blockIndex: number) => (
                  <div key={blockIndex} className="bg-gray-50 p-3 rounded">
                    <div className="text-xs font-medium text-gray-700">
                      {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
                    </div>
                    {block.settings && Object.keys(block.settings).length > 0 && (
                      <div className="mt-1 text-xs text-gray-500">
                        {Object.entries(block.settings).map(([key, value]) => (
                          <div key={key}>
                            {key}: {JSON.stringify(value)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No blocks in this section</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewPage;