import { useState } from 'react';
import { ArrowLeft, Upload, MapPin, Users, CheckCircle, Clock, Truck, X, Search, Star, Navigation } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'sonner';
import { PaymentGateway } from '../common/PaymentGateway';

export function DonateFoodFlow({ user, onBack }) {
  const [currentStep, setCurrentStep] = useState('details');
  const [foodData, setFoodData] = useState({
    photo: null,
    quantity: '',
    description: '',
    location: 'Auto-detected, Mumbai',
    ageGroup: 'Anyone',
    peopleToServe: '0'
  });
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [volunteerChoice, setVolunteerChoice] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const receivers = [
    {
      id: 1,
      name: 'Sunshine Orphanage',
      type: 'Orphanage',
      people: 45,
      distance: '1.2 km',
      urgency: 'high',
      rating: 4.8,
      verified: true
    },
    {
      id: 2,
      name: 'Hope Old Age Home',
      type: 'Old Age Home',
      people: 30,
      distance: '2.5 km',
      urgency: 'medium',
      rating: 4.9,
      verified: true
    },
    {
      id: 3,
      name: 'Rainbow Children Home',
      type: 'Orphanage',
      people: 60,
      distance: '3.8 km',
      urgency: 'low',
      rating: 4.7,
      verified: true
    }
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoodData({ ...foodData, photo: file });
    }
  };

  const handleFindReceivers = async () => {
    try {
      const requestData = {
        foodItem: foodData.description.split(',')[0].trim(), // Simple extraction
        quantity: parseInt(foodData.quantity),
        description: foodData.description,
        pickupLocation: foodData.location,
        suitableFor: foodData.ageGroup
      };

      const response = await api.post(`/donations?donorId=${user.userId}`, requestData);
      
      if (response.data?.data) {
        setFoodData({ ...foodData, id: response.data.data.id });
        setCurrentStep('matching');
      }
    } catch (error) {
      console.error('Donation creation error:', error);
      toast.error('Failed to create donation. Please try again.');
    }
  };

  const handleSelectReceiver = (receiver) => {
    setSelectedReceiver(receiver);
    setCurrentStep('waiting');
    
    // Simulate receiver acceptance after 3 seconds
    setTimeout(() => {
      setCurrentStep('accepted');
    }, 3000);
  };

  const handleVolunteerChoice = (choice) => {
    setVolunteerChoice(choice);
    
    if (choice === 'volunteer') {
      setPaymentAmount(49); // Nominal support fee
      setShowPayment(true);
    } else {
      setCurrentStep('tracking');
      // Simulate delivery completion after 5 seconds
      setTimeout(() => {
        setCurrentStep('success');
      }, 5000);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setCurrentStep('tracking');
    // Simulate delivery completion after 5 seconds
    setTimeout(() => {
      setCurrentStep('success');
    }, 5000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'details':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-[#1A1A1A] mb-6" style={{ fontSize: '28px', fontWeight: '700' }}>
                Donate Food
              </h2>

              <div className="space-y-6">
                {/* Photo Upload */}
                <div>
                  <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                    Food Photo *
                  </label>
                  <div className="border-2 border-dashed border-[#B3B3B3] rounded-xl p-8 text-center hover:border-[#21A179] transition-all cursor-pointer">
                    {foodData.photo ? (
                      <div className="relative">
                        <img
                          src={foodData.photo instanceof Blob ? URL.createObjectURL(foodData.photo) : ''}
                          alt="Food"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setFoodData({ ...foodData, photo: null })}
                          className="absolute top-2 right-2 w-8 h-8 bg-[#FF4A4A] text-white rounded-full flex items-center justify-center hover:bg-[#e63939]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Upload className="w-12 h-12 text-[#B3B3B3] mx-auto mb-2" />
                        <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                          Click to upload food photo
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                    Quantity (Number of people) *
                  </label>
                  <input
                    type="number"
                    value={foodData.quantity}
                    onChange={(e) => setFoodData({ ...foodData, quantity: e.target.value })}
                    placeholder="e.g., 30"
                    className="w-full px-4 py-3 border-2 border-[#F2F2F2] rounded-xl focus:outline-none focus:border-[#21A179]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                    Description *
                  </label>
                  <textarea
                    value={foodData.description}
                    onChange={(e) => setFoodData({ ...foodData, description: e.target.value })}
                    placeholder="e.g., Vegetable Biryani, Chapathi, Curry"
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-[#F2F2F2] rounded-xl focus:outline-none focus:border-[#21A179] resize-none"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                    Pickup Location
                  </label>
                  <div className="relative mb-4">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                    <input
                      type="text"
                      value={foodData.location}
                      onChange={(e) => setFoodData({ ...foodData, location: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#F2F2F2] rounded-xl focus:outline-none focus:border-[#21A179]"
                    />
                  </div>
                  {/* Mini Map Preview */}
                  <div className="bg-[#F2F2F2] rounded-xl h-40 overflow-hidden border-2 border-[#F2F2F2]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120663.45202613143!2d72.826264!3d19.082197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>

                {/* Age Group */}
                <div>
                  <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                    Suitable for
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Kids', 'Adults', 'Elders', 'Anyone'].map((group) => (
                      <button
                        key={group}
                        onClick={() => setFoodData({ ...foodData, ageGroup: group })}
                        className={`py-3 px-4 rounded-xl border-2 transition-all ${
                          foodData.ageGroup === group
                            ? 'border-[#21A179] bg-[#DFF5E6] text-[#21A179]'
                            : 'border-[#F2F2F2] text-[#555555] hover:border-[#21A179]'
                        }`}
                        style={{ fontWeight: '600', fontSize: '14px' }}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>

                {/* People to Serve */}
                <div>
                  <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                    Number of people available to help serve
                  </label>
                  <input
                    type="number"
                    value={foodData.peopleToServe}
                    onChange={(e) => setFoodData({ ...foodData, peopleToServe: e.target.value })}
                    placeholder="0 = Need volunteer"
                    className="w-full px-4 py-3 border-2 border-[#F2F2F2] rounded-xl focus:outline-none focus:border-[#21A179]"
                  />
                  <p className="text-[#B3B3B3] mt-1" style={{ fontSize: '12px' }}>
                    Enter 0 if you need a volunteer to pick up
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleFindReceivers}
                  disabled={!foodData.photo || !foodData.quantity || !foodData.description}
                  className="w-full bg-[#21A179] text-white py-4 rounded-xl hover:bg-[#1e8f6b] transition-all disabled:bg-[#B3B3B3] disabled:cursor-not-allowed"
                  style={{ fontWeight: '600', fontSize: '16px' }}
                >
                  Find Who Needs It
                </button>
              </div>
            </div>
          </div>
        );

      case 'matching':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#1A1A1A]" style={{ fontSize: '28px', fontWeight: '700' }}>
                  Who Needs Your Food?
                </h2>
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex items-center gap-2 text-[#21A179] hover:bg-[#DFF5E6] px-4 py-2 rounded-xl transition-all"
                  style={{ fontWeight: '600' }}
                >
                  <Search className="w-5 h-5" />
                  Search Manually
                </button>
              </div>

              {showSearch && (
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search for orphanages, old-age homes..."
                    className="w-full px-4 py-3 border-2 border-[#21A179] rounded-xl focus:outline-none"
                  />
                </div>
              )}

              <p className="text-[#555555] mb-6" style={{ fontSize: '14px' }}>
                Based on your location and quantity, here are the best matches:
              </p>
            </div>

            <div className="space-y-4">
              {receivers.map((receiver) => (
                <div
                  key={receiver.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border-2 border-transparent hover:border-[#21A179]"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Receiver Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: '700' }}>
                              {receiver.name}
                            </h3>
                            {receiver.verified && (
                              <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                            )}
                          </div>
                          <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                            {receiver.type}
                          </p>
                        </div>
                        {receiver.urgency === 'high' && (
                          <span className="bg-[#FF4A4A] text-white px-3 py-1 rounded-full" style={{ fontSize: '12px', fontWeight: '600' }}>
                            URGENT
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-[#555555]">
                          <Users className="w-4 h-4" />
                          <span style={{ fontSize: '14px' }}>{receiver.people} people</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#555555]">
                          <MapPin className="w-4 h-4" />
                          <span style={{ fontSize: '14px' }}>{receiver.distance} away</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#FFCF4A]">
                          <Star className="w-4 h-4 fill-current" />
                          <span style={{ fontSize: '14px', fontWeight: '600' }}>{receiver.rating}</span>
                        </div>
                      </div>

                      {/* Mini Map Placeholder */}
                      <div className="bg-[#F2F2F2] rounded-xl h-32 flex items-center justify-center mb-4">
                        <MapPin className="w-8 h-8 text-[#B3B3B3]" />
                        <span className="text-[#B3B3B3] ml-2">Map Preview</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 md:w-48">
                      <button
                        onClick={() => handleSelectReceiver(receiver)}
                        className="bg-[#21A179] text-white px-6 py-3 rounded-xl hover:bg-[#1e8f6b] transition-all"
                        style={{ fontWeight: '600' }}
                      >
                        Donate Here
                      </button>
                      <button
                        className="border-2 border-[#21A179] text-[#21A179] px-6 py-3 rounded-xl hover:bg-[#DFF5E6] transition-all"
                        style={{ fontWeight: '600' }}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                className="text-[#21A179] hover:underline"
                style={{ fontWeight: '600' }}
              >
                Show More Options
              </button>
            </div>
          </div>
        );

      case 'waiting':
        return (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-[#FFF8E7] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Clock className="w-12 h-12 text-[#FFCF4A]" />
              </div>
              <h2 className="text-[#1A1A1A] mb-4" style={{ fontSize: '28px', fontWeight: '700' }}>
                Waiting for Response
              </h2>
              <p className="text-[#555555] mb-6" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                Your donation request has been sent to <span style={{ fontWeight: '700' }}>{selectedReceiver?.name}</span>.
                They will respond shortly.
              </p>
              <div className="bg-[#F2F2F2] rounded-xl p-4 mb-6">
                <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                  This usually takes less than 5 minutes
                </p>
              </div>
              <button
                onClick={() => setCurrentStep('matching')}
                className="text-[#FF4A4A] hover:underline"
                style={{ fontWeight: '600' }}
              >
                Cancel Request
              </button>
            </div>
          </div>
        );

      case 'accepted':
        return (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-[#DFF5E6] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-[#21A179]" />
              </div>
              <h2 className="text-[#1A1A1A] mb-4" style={{ fontSize: '28px', fontWeight: '700' }}>
                Donation Accepted! 🎉
              </h2>
              <p className="text-[#555555] mb-6" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                <span style={{ fontWeight: '700' }}>{selectedReceiver?.name}</span> has accepted your food donation for {selectedReceiver?.people} people!
              </p>

              <div className="bg-[#FFF8E7] rounded-xl p-4 mb-8">
                <p className="text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                  How will you deliver the food?
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleVolunteerChoice('self')}
                  className="w-full bg-[#21A179] text-white px-6 py-4 rounded-xl hover:bg-[#1e8f6b] transition-all"
                  style={{ fontWeight: '600' }}
                >
                  I Will Deliver Personally
                </button>
                <button
                  onClick={() => handleVolunteerChoice('volunteer')}
                  className="w-full border-2 border-[#21A179] text-[#21A179] px-6 py-4 rounded-xl hover:bg-[#DFF5E6] transition-all"
                  style={{ fontWeight: '600' }}
                >
                  Assign a Volunteer
                </button>
              </div>
            </div>
          </div>
        );

      case 'tracking':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-[#1A1A1A] mb-6" style={{ fontSize: '28px', fontWeight: '700' }}>
                Live Tracking
              </h2>

              {/* Live Map Tracking */}
              <div className="bg-[#F2F2F2] rounded-xl h-64 overflow-hidden mb-6 relative border-2 border-[#21A179]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120663.45202613143!2d72.826264!3d19.082197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2 border border-[#21A179]">
                  <div className="w-2 h-2 bg-[#21A179] rounded-full animate-ping"></div>
                  <span className="text-[#21A179]" style={{ fontSize: '12px', fontWeight: '700' }}>TRACKING DONATION</span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#22C55E] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                      Donation Confirmed
                    </p>
                    <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                      2:30 PM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#FFCF4A] rounded-full flex items-center justify-center animate-pulse">
                    <Truck className="w-5 h-5 text-[#1A1A1A]" />
                  </div>
                  <div>
                    <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                      {volunteerChoice === 'volunteer' ? 'Volunteer on the way' : 'En route to receiver'}
                    </p>
                    <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                      ETA: 15 minutes
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 opacity-50">
                  <div className="w-10 h-10 bg-[#F2F2F2] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#B3B3B3]" />
                  </div>
                  <div>
                    <p className="text-[#555555]" style={{ fontSize: '16px', fontWeight: '600' }}>
                      Food Delivered
                    </p>
                    <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                      Pending
                    </p>
                  </div>
                </div>
              </div>

              {volunteerChoice === 'volunteer' && (
                <div className="mt-6 p-4 bg-[#E6F2FF] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#3A6EA5] rounded-full flex items-center justify-center text-white" style={{ fontSize: '18px', fontWeight: '700' }}>
                      V
                    </div>
                    <div>
                      <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                        Volunteer: Rajesh Kumar
                      </p>
                      <p className="text-[#555555]" style={{ fontSize: '12px' }}>
                        ⭐ 4.9 rating • 200+ deliveries
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-[#1A1A1A] mb-4" style={{ fontSize: '32px', fontWeight: '700' }}>
                Amazing Work!
              </h2>
              <p className="text-[#555555] mb-6" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                Your food has been successfully delivered to <span style={{ fontWeight: '700' }}>{selectedReceiver?.name}</span>!
              </p>

              <div className="bg-gradient-to-r from-[#21A179] to-[#3A6EA5] rounded-xl p-6 text-white mb-6">
                <p style={{ fontSize: '48px', fontWeight: '700' }} className="mb-2">
                  {selectedReceiver?.people}
                </p>
                <p style={{ fontSize: '16px' }}>
                  People fed today ❤️
                </p>
              </div>

              <div className="bg-[#FFF8E7] rounded-xl p-4 mb-6">
                <p className="text-[#FFCF4A]" style={{ fontSize: '14px', fontWeight: '600' }}>
                  🏆 Badge Unlocked: First Donation!
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onBack}
                  className="w-full bg-[#21A179] text-white px-6 py-4 rounded-xl hover:bg-[#1e8f6b] transition-all"
                  style={{ fontWeight: '600' }}
                >
                  Back to Home
                </button>
                <button
                  onClick={() => setCurrentStep('details')}
                  className="w-full border-2 border-[#21A179] text-[#21A179] px-6 py-4 rounded-xl hover:bg-[#DFF5E6] transition-all"
                  style={{ fontWeight: '600' }}
                >
                  Donate Again
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pb-24 md:pb-6">
      {/* Header */}
      {currentStep !== 'success' && (
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#555555] hover:text-[#21A179] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: '600' }}>Back to Dashboard</span>
          </button>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              {['Details', 'Match', 'Accept', 'Deliver'].map((step, index) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-[#21A179] text-white' : 'bg-[#F2F2F2] text-[#B3B3B3]'
                      }`}
                      style={{ fontSize: '14px', fontWeight: '700' }}
                    >
                      {index + 1}
                    </div>
                    <span
                      className="text-[#B3B3B3] mt-1 text-center"
                      style={{ fontSize: '10px' }}
                    >
                      {step}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className="flex-1 h-1 bg-[#F2F2F2] mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      {renderStepContent()}

      {/* Payment Gateway Modal */}
      {showPayment && (
        <PaymentGateway
          amount={paymentAmount}
          onCancel={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}