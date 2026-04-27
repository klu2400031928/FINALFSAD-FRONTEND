import { useState } from 'react';
import { Home, PlusCircle, Bell, User, Heart, DollarSign, TrendingUp, Award, Users, LogOut, Menu, X } from 'lucide-react';
import { DonateFoodFlow } from './DonateFoodFlow';
import { DonorProfile } from './DonorProfile';
import { DonorFeed } from './DonorFeed';
import { NotificationCenter } from '../shared/NotificationCenter';
import { useAuth } from '../../context/AuthContext';

export function DonorDashboard({ user }) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notificationCount] = useState(5);

  const renderContent = () => {
    console.log('DonorDashboard: Rendering content for tab:', activeTab);
    switch (activeTab) {
      case 'home':
        return <DonorFeed user={user} onDonateClick={() => {
          console.log('DonorDashboard: Donate button clicked');
          setActiveTab('donate');
        }} />;
      case 'donate':
        return <DonateFoodFlow user={user} onBack={() => setActiveTab('home')} />;
      case 'notifications':
        return <NotificationCenter role="donor" />;
      case 'profile':
        return <DonorProfile user={user} />;
      default:
        return <DonorFeed user={user} onDonateClick={() => setActiveTab('donate')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Top Navigation Bar - Desktop */}
      <div className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#21A179] to-[#3A6EA5] rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: '700' }}>
                  FOOD KIND
                </h1>
                <p className="text-[#555555]" style={{ fontSize: '12px' }}>
                  Donor Dashboard
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'home'
                    ? 'bg-[#DFF5E6] text-[#21A179]'
                    : 'text-[#555555] hover:bg-[#F2F2F2]'
                }`}
                style={{ fontWeight: '600' }}
              >
                <Home className="w-5 h-5" />
                Home
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative ${
                  activeTab === 'notifications'
                    ? 'bg-[#DFF5E6] text-[#21A179]'
                    : 'text-[#555555] hover:bg-[#F2F2F2]'
                }`}
                style={{ fontWeight: '600' }}
              >
                <Bell className="w-5 h-5" />
                Notifications
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4A4A] text-white rounded-full flex items-center justify-center" style={{ fontSize: '10px', fontWeight: '700' }}>
                    {notificationCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'profile'
                    ? 'bg-[#DFF5E6] text-[#21A179]'
                    : 'text-[#555555] hover:bg-[#F2F2F2]'
                }`}
                style={{ fontWeight: '600' }}
              >
                {user?.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.firstName || user.username} className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <User className="w-5 h-5" />
                )}
                Profile
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-[#FF4A4A] hover:bg-[#FFF5F5] rounded-lg transition-all"
                style={{ fontWeight: '600' }}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <button
                onClick={() => {
                  setActiveTab('home');
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-[#555555] hover:bg-[#F2F2F2]"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveTab('notifications');
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-[#555555] hover:bg-[#F2F2F2] flex items-center justify-between"
              >
                Notifications
                {notificationCount > 0 && (
                  <span className="w-5 h-5 bg-[#FF4A4A] text-white rounded-full flex items-center justify-center" style={{ fontSize: '10px' }}>
                    {notificationCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-[#555555] hover:bg-[#F2F2F2]"
              >
                Profile
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 rounded-lg text-[#FF4A4A] hover:bg-[#FFF5F5]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === 'home' ? 'text-[#21A179]' : 'text-[#B3B3B3]'
            }`}
          >
            <Home className="w-6 h-6" />
            <span style={{ fontSize: '10px', fontWeight: '600' }}>Home</span>
          </button>
          <button
            onClick={() => setActiveTab('donate')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === 'donate' ? 'text-[#21A179]' : 'text-[#B3B3B3]'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center -mt-6 ${
              activeTab === 'donate' ? 'bg-[#21A179]' : 'bg-[#B3B3B3]'
            } shadow-lg`}>
              <PlusCircle className="w-6 h-6 text-white" />
            </div>
            <span style={{ fontSize: '10px', fontWeight: '600' }} className="mt-1">Donate</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center gap-1 px-4 py-2 relative ${
              activeTab === 'notifications' ? 'text-[#21A179]' : 'text-[#B3B3B3]'
            }`}
          >
            <Bell className="w-6 h-6" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-2 w-4 h-4 bg-[#FF4A4A] text-white rounded-full flex items-center justify-center" style={{ fontSize: '8px' }}>
                {notificationCount}
              </span>
            )}
            <span style={{ fontSize: '10px', fontWeight: '600' }}>Alerts</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === 'profile' ? 'text-[#21A179]' : 'text-[#B3B3B3]'
            }`}
          >
            <User className="w-6 h-6" />
            <span style={{ fontSize: '10px', fontWeight: '600' }}>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}