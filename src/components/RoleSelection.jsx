import { Heart, Users, Truck, Building2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function RoleSelection() {
  const navigate = useNavigate();
  const roles = [
    {
      id: 'donor',
      title: 'Donor',
      description: 'Share your extra food',
      details: 'Perfect for restaurants, function halls, individuals, and hostels who want to donate surplus food',
      icon: Heart,
      gradient: 'from-[#DFF5E6] to-[#21A179]/20',
      iconBg: '#21A179',
      features: ['Upload food with photos', 'Track your impact', 'Earn kindness badges']
    },
    {
      id: 'receiver',
      title: 'Receiver',
      description: 'Request food for your home',
      details: 'For orphanages, old-age homes, and shelters that need regular food support',
      icon: Users,
      gradient: 'from-[#E6F2FF] to-[#3A6EA5]/20',
      iconBg: '#3A6EA5',
      features: ['Accept food offers', 'Build donor relationships', 'Share thank-you posts']
    },
    {
      id: 'volunteer',
      title: 'Volunteer',
      description: 'Deliver kindness & earn rewards',
      details: 'Join as a verified volunteer to pick up and deliver food safely',
      icon: Truck,
      gradient: 'from-[#FFF8E7] to-[#FFCF4A]/20',
      iconBg: '#FFCF4A',
      features: ['Get delivery tasks', 'Earn rewards & ratings', 'Make an impact']
    },
    {
      id: 'ngo',
      title: 'NGO Admin',
      description: 'Manage donations & approvals',
      details: 'For NGOs to verify receivers, assign volunteers, and oversee the entire ecosystem',
      icon: Building2,
      gradient: 'from-[#F2F2F2] to-[#555555]/20',
      iconBg: '#555555',
      features: ['Verify organizations', 'Assign volunteers', 'Track all activities']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFF5E6] via-[#FFF8E7] to-[#E6F2FF]">
      {/* Header */}
      <div className="bg-white border-b border-[#F2F2F2] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#555555] hover:text-[#21A179] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: '600' }}>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Role Selection Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#21A179] to-[#3A6EA5] rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white fill-current" />
            </div>
          </div>
          <h1 className="text-[#1A1A1A] mb-4" style={{ fontSize: '48px', fontWeight: '700' }}>
            How Would You Like to Help?
          </h1>
          <p className="text-[#555555]" style={{ fontSize: '20px' }}>
            Choose your role and join the kindness ecosystem
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-[${role.iconBg}]`}
              onClick={() => navigate('/login', { state: { role: role.id } })}
            >
              {/* Icon */}
              <div className={`bg-gradient-to-br ${role.gradient} rounded-2xl p-6 mb-6 inline-block`}>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: role.iconBg }}
                >
                  <role.icon className={`w-8 h-8 ${role.iconBg === '#FFCF4A' ? 'text-[#1A1A1A]' : 'text-white'}`} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-[#1A1A1A] mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>
                {role.title}
              </h2>

              {/* Description */}
              <p className="text-[#21A179] mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>
                {role.description}
              </p>

              {/* Details */}
              <p className="text-[#555555] mb-6" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                {role.details}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {role.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: role.iconBg }}
                    >
                      <span className={`text-xs ${role.iconBg === '#FFCF4A' ? 'text-[#1A1A1A]' : 'text-white'}`}>✓</span>
                    </div>
                    <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className="w-full text-white px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg"
                style={{ backgroundColor: role.iconBg, fontWeight: '600' }}
              >
                <span>Continue as {role.title}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-md">
            <p className="text-[#555555] mb-4" style={{ fontSize: '16px' }}>
              Not sure which role fits you best?
            </p>
            <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>
              You can always switch roles later or create multiple accounts for different purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}