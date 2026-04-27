import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';

import { LandingPage } from '../components/LandingPage';
import { RoleSelection } from '../components/RoleSelection';
import { Login } from '../components/auth/Login';
import { Signup } from '../components/auth/Signup';
import { DonorDashboard } from '../components/donor/DonorDashboard';
import { ReceiverDashboard } from '../components/receiver/ReceiverDashboard';
import { VolunteerDashboard } from '../components/volunteer/VolunteerDashboard';
import { NGODashboard } from '../components/ngo/NGODashboard';

const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;

  switch (user.role) {
    case 'donor':
      return <DonorDashboard user={user} />;
    case 'receiver':
      return <ReceiverDashboard user={user} />;
    case 'volunteer':
      return <VolunteerDashboard user={user} />;
    case 'ngo':
      return <NGODashboard user={user} />;
    default:
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error: Corrupted Session</h2>
          <p className="text-gray-600 mb-6">Your session state might be invalid or missing a user role.</p>
        </div>
      );
  }
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      
      {/* Protected Dashboard Route */}
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        } 
      />

      {/* 404 Catch All */}
      <Route 
        path="*" 
        element={
          <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
            <a href="/" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Return Home
            </a>
          </div>
        } 
      />
    </Routes>
  );
};
