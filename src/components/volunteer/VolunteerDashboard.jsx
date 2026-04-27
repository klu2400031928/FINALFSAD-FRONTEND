import { Home, Bell, User, LogOut, Menu, X, Truck, MapPin, CheckCircle, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'sonner';

export function VolunteerDashboard({ user }) {
  const { logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/donations?status=ACCEPTED');
      if (response.data?.data) {
        const mapped = response.data.data.map(d => ({
          id: d.id,
          pickup: d.pickupLocation,
          dropoff: d.receiverName || 'Pending Receiver',
          distance: '4.2 km',
          eta: '20 mins',
          status: 'assigned',
          food: d.foodItem,
          quantity: d.quantity
        }));
        setTasks(mapped);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFCF4A] to-[#21A179] rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#1A1A1A]" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: '700' }}>FOOD KIND</h1>
                <p className="text-[#555555]" style={{ fontSize: '12px' }}>Volunteer Dashboard</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FFF8E7] text-[#FFCF4A] rounded-lg" style={{ fontWeight: '600' }}>
                <Home className="w-5 h-5" />
                Home
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6 pb-24 md:pb-6">
          <div className="bg-gradient-to-r from-[#FFCF4A] to-[#21A179] rounded-2xl p-8 text-[#1A1A1A]">
            <h2 className="mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>
              Hi, {user.firstName || user.username}! 🚚
            </h2>
            <p className="mb-6" style={{ fontSize: '18px' }}>
              You have <span style={{ fontWeight: '700' }}>{tasks.length} active task</span>
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/90 rounded-xl p-4">
                <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>12</p>
                <p style={{ fontSize: '12px' }}>Total Deliveries</p>
              </div>
              <div className="bg-white/90 rounded-xl p-4">
                <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>₹540</p>
                <p style={{ fontSize: '12px' }}>Earned</p>
              </div>
              <div className="bg-white/90 rounded-xl p-4">
                <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>4.9</p>
                <p style={{ fontSize: '12px' }}>Rating</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
              <Truck className="w-6 h-6 text-[#FFCF4A]" />
              Active Tasks
            </h3>
            {tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="mb-4">
                  <h4 className="text-[#1A1A1A] mb-2" style={{ fontSize: '18px', fontWeight: '700' }}>
                    {task.food} • {task.quantity} people
                  </h4>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#21A179] mt-0.5" />
                    <div>
                      <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>Pickup</p>
                      <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>{task.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#3A6EA5] mt-0.5" />
                    <div>
                      <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>Drop-off</p>
                      <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>{task.dropoff}</p>
                    </div>
                  </div>
                </div>

                {/* Live Navigation Map */}
                <div className="bg-[#F2F2F2] rounded-xl h-64 overflow-hidden mb-6 relative border-2 border-[#FFCF4A]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120663.45202613143!2d72.826264!3d19.082197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2 border border-[#FFCF4A]">
                    <div className="w-2 h-2 bg-[#FFCF4A] rounded-full animate-pulse"></div>
                    <span className="text-[#1A1A1A]" style={{ fontSize: '12px', fontWeight: '700' }}>NAVIGATION ACTIVE</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-[#21A179] text-white px-6 py-4 rounded-xl hover:bg-[#1e8f6b] transition-all" style={{ fontWeight: '600' }}>
                    Start Pickup
                  </button>
                  <button className="flex-1 border-2 border-[#21A179] text-[#21A179] px-6 py-4 rounded-xl hover:bg-[#DFF5E6] transition-all" style={{ fontWeight: '600' }}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}