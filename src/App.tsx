import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './lib/store';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CreateProjectPage from './pages/CreateProjectPage';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';

const App: React.FC = () => {
  const { checkSession } = useAppStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const init = async () => {
      await checkSession();
      setIsChecking(false);
    };
    init();
  }, []); // Appelé une seule fois

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="create" element={<CreateProjectPage />} />
        </Route>

        {/* Builder Route (Full Screen) */}
        <Route path="/dashboard/projects/:id" element={<BuilderPage />} />

        {/* Preview Route */}
        <Route path="/preview/:id" element={<PreviewPage />} />

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
