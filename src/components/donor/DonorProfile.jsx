import { Award, Heart, Users, TrendingUp, Calendar } from 'lucide-react';

export function DonorProfile({ user }) {
  const badges = [
    { name: 'First Donation', icon: '🎉', earned: true },
    { name: 'Fed 100+ People', icon: '💯', earned: false },
    { name: 'Top Donor', icon: '🏆', earned: false },
    { name: 'Monthly Star', icon: '⭐', earned: false }
  ];

  const history = [
    { date: 'Dec 15, 2024', food: 'Vegetable Biryani', people: 45, receiver: 'Sunshine Orphanage', volunteer: 'Rajesh K.' },
    { date: 'Dec 10, 2024', food: 'Rice & Curry', people: 30, receiver: 'Hope Home', volunteer: 'Self Delivered' }
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#21A179] to-[#3A6EA5] rounded-full flex items-center justify-center text-white" style={{ fontSize: '32px', fontWeight: '700' }}>
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt={user.firstName || user.username} className="w-full h-full rounded-full object-cover" />
            ) : (
              (user.firstName ? user.firstName[0] : user.username?.[0] || 'U')
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-[#1A1A1A] mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>
              {user.firstName ? `${user.firstName} ${user.lastName}` : user.username}
            </h2>
            <p className="text-[#555555] mb-4">Donor • Member since Dec 2024</p>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              <div className="text-center">
                <p className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>12</p>
                <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>Donations</p>
              </div>
              <div className="text-center">
                <p className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>356</p>
                <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>People Fed</p>
              </div>
              <div className="text-center">
                <p className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>48</p>
                <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>Followers</p>
              </div>
              <div className="text-center">
                <p className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>32</p>
                <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>Following</p>
              </div>
            </div>
          </div>
          <button className="bg-[#21A179] text-white px-6 py-3 rounded-xl hover:bg-[#1e8f6b] transition-all" style={{ fontWeight: '600' }}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h3 className="text-[#1A1A1A] mb-6 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
          <Award className="w-6 h-6 text-[#FFCF4A]" />
          Badges & Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl text-center border-2 ${
                badge.earned
                  ? 'bg-gradient-to-br from-[#FFF8E7] to-[#FFCF4A]/20 border-[#FFCF4A]'
                  : 'bg-[#F2F2F2] border-transparent opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>
                {badge.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Donation History */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h3 className="text-[#1A1A1A] mb-6 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
          <Calendar className="w-6 h-6 text-[#3A6EA5]" />
          Donation History
        </h3>
        <div className="space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-[#F2F2F2] rounded-xl">
              <div className="w-12 h-12 bg-[#21A179] rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <div className="flex-1">
                <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                  {item.food} • {item.people} people
                </p>
                <p className="text-[#555555]" style={{ fontSize: '12px' }}>
                  {item.receiver} • {item.volunteer}
                </p>
                <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}