import { useState } from 'react';
import { Home, PlusCircle, Bell, User, Heart, LogOut, Menu, X } from 'lucide-react';
import { AcceptRejectFlow } from './AcceptRejectFlow';
import { NotificationCenter } from '../shared/NotificationCenter';
import { useAuth } from '../../context/AuthContext';

export function ReceiverDashboard({ user }) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notificationCount] = useState(3);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <AcceptRejectFlow user={user} />;
      case 'notifications':
        return <NotificationCenter role="receiver" />;
      case 'profile':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <h2 className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>Receiver Profile</h2>
            <p className="text-[#555555] mt-2">Profile content for {user.firstName || user.username}</p>
          </div>
        );
      default:
        return <AcceptRejectFlow user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3A6EA5] to-[#21A179] rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: '700' }}>FOOD KIND</h1>
                <p className="text-[#555555]" style={{ fontSize: '12px' }}>Receiver Dashboard</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveTab('home')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'home' ? 'bg-[#E6F2FF] text-[#3A6EA5]' : 'text-[#555555] hover:bg-[#F2F2F2]'}`} style={{ fontWeight: '600' }}>
                <Home className="w-5 h-5" />
                Home
              </button>
              <button onClick={() => setActiveTab('notifications')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative ${activeTab === 'notifications' ? 'bg-[#E6F2FF] text-[#3A6EA5]' : 'text-[#555555] hover:bg-[#F2F2F2]'}`} style={{ fontWeight: '600' }}>
                <Bell className="w-5 h-5" />
                Notifications
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4A4A] text-white rounded-full flex items-center justify-center" style={{ fontSize: '10px', fontWeight: '700' }}>{notificationCount}</span>
                )}
              </button>
              <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'profile' ? 'bg-[#E6F2FF] text-[#3A6EA5]' : 'text-[#555555] hover:bg-[#F2F2F2]'}`} style={{ fontWeight: '600' }}>
                <User className="w-5 h-5" />
                Profile
              </button>
              <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-[#FF4A4A] hover:bg-[#FFF5F5] rounded-lg transition-all" style={{ fontWeight: '600' }}>
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>

            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden p-2">
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {showMobileMenu && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <button onClick={() => { setActiveTab('home'); setShowMobileMenu(false); }} className="w-full text-left px-4 py-2 rounded-lg text-[#555555] hover:bg-[#F2F2F2]">Home</button>
              <button onClick={() => { setActiveTab('notifications'); setShowMobileMenu(false); }} className="w-full text-left px-4 py-2 rounded-lg text-[#555555] hover:bg-[#F2F2F2]">Notifications</button>
              <button onClick={() => { setActiveTab('profile'); setShowMobileMenu(false); }} className="w-full text-left px-4 py-2 rounded-lg text-[#555555] hover:bg-[#F2F2F2]">Profile</button>
              <button onClick={logout} className="w-full text-left px-4 py-2 rounded-lg text-[#FF4A4A] hover:bg-[#FFF5F5]">Logout</button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 px-4 py-2 ${activeTab === 'home' ? 'text-[#3A6EA5]' : 'text-[#B3B3B3]'}`}>
            <Home className="w-6 h-6" />
            <span style={{ fontSize: '10px', fontWeight: '600' }}>Home</span>
          </button>
          <button onClick={() => setActiveTab('notifications')} className={`flex flex-col items-center gap-1 px-4 py-2 relative ${activeTab === 'notifications' ? 'text-[#3A6EA5]' : 'text-[#B3B3B3]'}`}>
            <Bell className="w-6 h-6" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-2 w-4 h-4 bg-[#FF4A4A] text-white rounded-full flex items-center justify-center" style={{ fontSize: '8px' }}>{notificationCount}</span>
            )}
            <span style={{ fontSize: '10px', fontWeight: '600' }}>Alerts</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 px-4 py-2 ${activeTab === 'profile' ? 'text-[#3A6EA5]' : 'text-[#B3B3B3]'}`}>
            <User className="w-6 h-6" />
            <span style={{ fontSize: '10px', fontWeight: '600' }}>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}