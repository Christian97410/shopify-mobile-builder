import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../lib/store';
import { ShoppingBag, LogOut, Home } from 'lucide-react';
import Button from '../ui/Button';

const DashboardLayout: React.FC = () => {
  const { user, logout, checkSession } = useAppStore();
  const navigate = useNavigate();
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    // Appelé une seule fois au chargement
    checkSession().finally(() => setLoadingSession(false));
  }, []); // <--- dépendances VIDES, donc appelé une seule fois

  useEffect(() => {
    // Redirection seulement après chargement initial
    if (!loadingSession && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, loadingSession, navigate]);

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <ShoppingBag className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">App Builder</span>
              </div>
              <nav className="ml-6 flex space-x-8">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-primary-500"
                >
                  <Home className="h-5 w-5 mr-1" />
                  Dashboard
                </button>
              </nav>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-4">{user?.email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<LogOut className="h-4 w-4" />}
                  onClick={async () => {
                    await logout();
                    navigate('/login', { replace: true });
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
