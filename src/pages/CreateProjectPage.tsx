import React from 'react';
import CreateProjectForm from '../components/dashboard/CreateProjectForm';

const CreateProjectPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New App</h1>
      <CreateProjectForm />
    </div>
  );
};

export default CreateProjectPage;