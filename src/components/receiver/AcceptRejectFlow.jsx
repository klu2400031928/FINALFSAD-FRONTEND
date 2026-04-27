import { useState } from 'react';
import { Heart, MapPin, Users, Clock, CheckCircle, X, Truck, Navigation } from 'lucide-react';
import { useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'sonner';

export function AcceptRejectFlow({ user }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/donations');
      if (response.data?.data && Array.isArray(response.data.data)) {
        // Map backend response to frontend structure
        const mapped = response.data.data.map(d => ({
          id: d.id,
          quantity: d.quantity,
          distance: '2.4 km', // Hardcoded for now
          eta: '30 mins',
          status: d.status.toLowerCase(),
          volunteer: d.volunteerName || 'Not assigned'
        }));
        setRequests(mapped);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
      toast.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const response = await api.patch(`/donations/${requestId}/accept?receiverId=${user.userId}`);
      if (response.data?.data) {
        toast.success('Donation accepted!');
        fetchRequests();
      }
    } catch (error) {
      console.error('Error accepting donation:', error);
      toast.error('Failed to accept donation');
    }
  };

  const handleReject = (requestId) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const activeRequests = requests.filter(r => r.status === 'accepted' || r.status === 'tracking');
  const completedRequests = requests.filter(r => r.status === 'delivered');

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#3A6EA5] to-[#21A179] rounded-2xl p-8 text-white">
        <h2 className="mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>
          Welcome, {user.firstName || user.username}! 👋
        </h2>
        <p className="mb-6" style={{ fontSize: '18px' }}>
          You have <span style={{ fontWeight: '700' }}>{pendingRequests.length} pending</span> donation requests
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>56</p>
            <p style={{ fontSize: '12px' }}>Meals Received Today</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>2</p>
            <p style={{ fontSize: '12px' }}>Pending Requests</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>24</p>
            <p style={{ fontSize: '12px' }}>Total Donors</p>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div>
          <h3 className="text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
            <Clock className="w-6 h-6 text-[#FFCF4A]" />
            Pending Requests
          </h3>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#FFCF4A]">
                {/* Request Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#21A179] to-[#3A6EA5] rounded-full flex items-center justify-center text-white" style={{ fontSize: '18px', fontWeight: '700' }}>
                    {request.donor[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: '700' }}>
                      {request.donor}
                    </h4>
                    <p className="text-[#555555]" style={{ fontSize: '12px' }}>
                      Wants to donate food
                    </p>
                  </div>
                  <span className="bg-[#FFCF4A] text-[#1A1A1A] px-3 py-1 rounded-full" style={{ fontSize: '12px', fontWeight: '700' }}>
                    NEW
                  </span>
                </div>

                {/* Food Image */}
                <div className="bg-[#F2F2F2] rounded-xl h-48 overflow-hidden mb-4">
                  <img 
                    src={[
                      'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=800&q=80', // Biryani
                      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', // Salad/Meal
                      'https://images.unsplash.com/photo-1589187151003-0dd3b6ad1474?w=800&q=80', // Indian Thali
                      'https://images.unsplash.com/photo-1601050690597-df056fb3ce09?w=800&q=80', // Samosa/Snacks
                      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', // Healthy Bowl
                      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'  // Mixed Food
                    ][request.id % 6]} 
                    alt={request.food} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Food Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Heart className="w-5 h-5 text-[#21A179] mt-0.5" />
                    <div>
                      <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                        {request.food}
                      </p>
                      <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                        Enough for {request.quantity} people
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#555555]">
                    <MapPin className="w-5 h-5" />
                    <span style={{ fontSize: '14px' }}>{request.distance} away</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#555555]">
                    <Clock className="w-5 h-5" />
                    <span style={{ fontSize: '14px' }}>ETA{request.eta}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#555555]">
                    <Truck className="w-5 h-5" />
                    <span style={{ fontSize: '14px' }}>Volunteer{request.volunteer}</span>
                  </div>
                </div>

                {/* Accept/Reject Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="flex-1 bg-[#21A179] text-white px-6 py-4 rounded-xl hover:bg-[#1e8f6b] transition-all flex items-center justify-center gap-2 shadow-lg"
                    style={{ fontWeight: '700', fontSize: '16px' }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Accept Donation
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex-1 bg-white border-2 border-[#FF4A4A] text-[#FF4A4A] px-6 py-4 rounded-xl hover:bg-[#FFF5F5] transition-all flex items-center justify-center gap-2"
                    style={{ fontWeight: '700', fontSize: '16px' }}
                  >
                    <X className="w-5 h-5" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Tracking */}
      {activeRequests.length > 0 && (
        <div>
          <h3 className="text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
            <Truck className="w-6 h-6 text-[#3A6EA5]" />
            Active Deliveries
          </h3>
          <div className="space-y-4">
            {activeRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#3A6EA5]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: '700' }}>
                      {request.food}
                    </h4>
                    <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                      From {request.donor}
                    </p>
                  </div>
                  <span className="bg-[#22C55E] text-white px-3 py-1 rounded-full" style={{ fontSize: '12px', fontWeight: '700' }}>
                    {request.status === 'accepted' ? 'CONFIRMED' : 'ON THE WAY'}
                  </span>
                </div>

                {/* Live Tracking */}
                {request.status === 'tracking' && (
                  <>
                    {/* Live Tracking Map */}
                    <div className="bg-[#F2F2F2] rounded-xl h-64 overflow-hidden mb-6 relative border-2 border-[#3A6EA5]">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120663.45202613143!2d72.826264!3d19.082197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2 border border-[#3A6EA5]">
                        <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-ping"></div>
                        <span className="text-[#3A6EA5]" style={{ fontSize: '12px', fontWeight: '700' }}>LIVE TRACKING</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>
                            Donation Accepted
                          </p>
                          <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                            Completed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FFCF4A] rounded-full flex items-center justify-center animate-pulse">
                          <Truck className="w-4 h-4 text-[#1A1A1A]" />
                        </div>
                        <div>
                          <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>
                            Volunteer on the way
                          </p>
                          <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                            ETA{request.eta}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 opacity-50">
                        <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-[#B3B3B3]" />
                        </div>
                        <div>
                          <p className="text-[#555555]" style={{ fontSize: '14px', fontWeight: '600' }}>
                            Food Delivered
                          </p>
                          <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                            Pending
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-[#E6F2FF] rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#3A6EA5] rounded-full flex items-center justify-center text-white" style={{ fontSize: '16px', fontWeight: '700' }}>
                          {request.volunteer[0]}
                        </div>
                        <div>
                          <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>
                            {request.volunteer}
                          </p>
                          <p className="text-[#555555]" style={{ fontSize: '12px' }}>
                            ⭐ 4.9 • 200+ deliveries
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {completedRequests.length > 0 && (
        <div>
          <h3 className="text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
            <CheckCircle className="w-6 h-6 text-[#22C55E]" />
            Delivered Today
          </h3>
          <div className="space-y-4">
            {completedRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '700' }}>
                      {request.food}
                    </h4>
                    <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                      {request.quantity} people • From {request.donor}
                    </p>
                  </div>
                  <span className="bg-[#DFF5E6] text-[#22C55E] px-3 py-1 rounded-full" style={{ fontSize: '12px', fontWeight: '700' }}>
                    DELIVERED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Requests */}
      {requests.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
          <div className="w-24 h-24 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-12 h-12 text-[#B3B3B3]" />
          </div>
          <h3 className="text-[#1A1A1A] mb-2" style={{ fontSize: '24px', fontWeight: '700' }}>
            No Pending Requests
          </h3>
          <p className="text-[#555555]">
            You're all caught up! New donation requests will appear here.
          </p>
        </div>
      )}
    </div>
  );
}