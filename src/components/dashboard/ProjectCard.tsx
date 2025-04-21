import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Smartphone, Globe, ShoppingBag } from 'lucide-react';
import Card, { CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Project } from '../../lib/store';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  
  const getTemplateIcon = () => {
    switch (project.template) {
      case 'minimal':
        return <Smartphone className="h-8 w-8 text-gray-400" />;
      case 'ecommerce':
        return <ShoppingBag className="h-8 w-8 text-gray-400" />;
      default:
        return <Smartphone className="h-8 w-8 text-gray-400" />;
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-grow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
            <p className="mt-1 text-sm text-gray-500">
              Template: {project.template.charAt(0).toUpperCase() + project.template.slice(1)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Created: {new Date(project.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="ml-4">{getTemplateIcon()}</div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center">
            <div className={`h-2.5 w-2.5 rounded-full ${project.published ? 'bg-success-500' : 'bg-gray-300'} mr-2`}></div>
            <span className="text-sm text-gray-700">
              {project.published ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50">
        <div className="flex justify-between w-full">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Edit className="h-4 w-4" />}
            onClick={() => navigate(`/dashboard/projects/${project.id}`)}
          >
            Edit
          </Button>
          
          {project.published && (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Globe className="h-4 w-4" />}
              onClick={() => window.open(`/preview/${project.id}`, '_blank')}
            >
              View
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;