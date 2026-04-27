import { Building2, LogOut, Menu, X, Users, Truck, CheckCircle, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'sonner';

export function NGODashboard({ user }) {
  const { logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [stats, setStats] = useState({
    totalDonations: 0,
    activeReceivers: 85,
    volunteers: 120,
    donors: 250
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/donations');
      if (response.data?.data) {
        setStats(prev => ({
          ...prev,
          totalDonations: response.data.data.length
        }));
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const [pendingApprovals] = useState([
    { id: 1, name: 'New Orphanage ABC', type: 'receiver', date: 'Today' },
    { id: 2, name: 'Volunteer John Doe', type: 'volunteer', date: 'Yesterday' }
  ]);

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#555555] to-[#21A179] rounded-full flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: '700' }}>FOOD KIND</h1>
                <p className="text-[#555555]" style={{ fontSize: '12px' }}>NGO Admin Panel</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-[#FF4A4A] hover:bg-[#FFF5F5] rounded-lg transition-all" style={{ fontWeight: '600' }}>
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>

            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden p-2">
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6 pb-24 md:pb-6">
          <div className="bg-gradient-to-r from-[#555555] to-[#21A179] rounded-2xl p-8 text-white">
            <h2 className="mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>
              NGO Dashboard
            </h2>
            <p className="mb-6" style={{ fontSize: '18px' }}>
              Manage the entire FOOD KIND ecosystem
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>{stats.totalDonations}</p>
                <p style={{ fontSize: '12px' }}>Total Donations</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>{stats.activeReceivers}</p>
                <p style={{ fontSize: '12px' }}>Active Receivers</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>{stats.volunteers}</p>
                <p style={{ fontSize: '12px' }}>Volunteers</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>{stats.donors}</p>
                <p style={{ fontSize: '12px' }}>Donors</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
              <Clock className="w-6 h-6 text-[#FFCF4A]" />
              Pending Approvals ({pendingApprovals.length})
            </h3>
            <div className="space-y-3">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F2F2F2] rounded-full flex items-center justify-center">
                      {approval.type === 'receiver' ? (
                        <Users className="w-6 h-6 text-[#3A6EA5]" />
                      ) : (
                        <Truck className="w-6 h-6 text-[#FFCF4A]" />
                      )}
                    </div>
                    <div>
                      <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                        {approval.name}
                      </p>
                      <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                        {approval.type === 'receiver' ? 'Receiver' : 'Volunteer'} • {approval.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-[#21A179] text-white px-4 py-2 rounded-lg hover:bg-[#1e8f6b] transition-all" style={{ fontWeight: '600', fontSize: '14px' }}>
                      Approve
                    </button>
                    <button className="border-2 border-[#FF4A4A] text-[#FF4A4A] px-4 py-2 rounded-lg hover:bg-[#FFF5F5] transition-all" style={{ fontWeight: '600', fontSize: '14px' }}>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
              <MapPin className="w-6 h-6 text-[#21A179]" />
              Platform Live Map
            </h3>
            <div className="bg-white rounded-xl p-2 shadow-sm border-2 border-[#21A179] h-[400px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120663.45202613143!2d72.826264!3d19.082197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div>
            <h3 className="text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
              <TrendingUp className="w-6 h-6 text-[#21A179]" />
              Platform Analytics
            </h3>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-[#DFF5E6] rounded-xl">
                  <p className="text-[#21A179] mb-1" style={{ fontSize: '32px', fontWeight: '700' }}>15,430</p>
                  <p className="text-[#555555]" style={{ fontSize: '14px' }}>Meals Donated</p>
                </div>
                <div className="text-center p-4 bg-[#E6F2FF] rounded-xl">
                  <p className="text-[#3A6EA5] mb-1" style={{ fontSize: '32px', fontWeight: '700' }}>98%</p>
                  <p className="text-[#555555]" style={{ fontSize: '14px' }}>Success Rate</p>
                </div>
                <div className="text-center p-4 bg-[#FFF8E7] rounded-xl">
                  <p className="text-[#FFCF4A] mb-1" style={{ fontSize: '32px', fontWeight: '700' }}>28 mins</p>
                  <p className="text-[#555555]" style={{ fontSize: '14px' }}>Avg Delivery Time</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
              <DollarSign className="w-6 h-6 text-[#21A179]" />
              Fund Management
            </h3>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[#B3B3B3]" style={{ fontSize: '14px' }}>Total Funds Available</p>
                  <p className="text-[#1A1A1A]" style={{ fontSize: '32px', fontWeight: '700' }}>₹45,000</p>
                </div>
                <button className="bg-[#21A179] text-white px-6 py-3 rounded-xl hover:bg-[#1e8f6b] transition-all" style={{ fontWeight: '600' }}>
                  Assign Funds
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-[#F2F2F2] rounded-xl">
                  <div>
                    <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>Donor: Rajesh Kumar</p>
                    <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>Dec 15, 2024</p>
                  </div>
                  <p className="text-[#21A179]" style={{ fontSize: '16px', fontWeight: '700' }}>+₹5,000</p>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#F2F2F2] rounded-xl">
                  <div>
                    <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>Assigned to Volunteer: Priya</p>
                    <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>Dec 14, 2024</p>
                  </div>
                  <p className="text-[#FF4A4A]" style={{ fontSize: '16px', fontWeight: '700' }}>-₹500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}