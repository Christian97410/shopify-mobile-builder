import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../lib/store';
import Button from '../components/ui/Button';
import ProjectCard from '../components/dashboard/ProjectCard';
import { Plus } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { projects, fetchProjects, isLoading } = useAppStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Apps</h1>
        <Button
          variant="primary"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => navigate('/dashboard/create')}
        >
          Create New App
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No apps yet</h3>
          <p className="text-gray-500 mb-6">Create your first mobile app to get started</p>
          <Button
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => navigate('/dashboard/create')}
          >
            Create New App
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;