import { Heart, DollarSign, TrendingUp, Award, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'sonner';

export function DonorFeed({ user, onDonateClick }) {
  const [stats, setStats] = useState({
    totalDonations: 0,
    peopleFed: 0
  });

  useEffect(() => {
    fetchMyDonations();
  }, []);

  const fetchMyDonations = async () => {
    try {
      const response = await api.get('/donations');
      if (response.data?.data && Array.isArray(response.data.data)) {
        // Filter for donations by this user
        const myDonations = response.data.data.filter(d => d.donorId === user?.userId);
        const totalFed = myDonations.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
        setStats({
          totalDonations: myDonations.length,
          peopleFed: totalFed
        });
      }
    } catch (error) {
      console.error('Error fetching my donations:', error);
    }
  };

  const posts = [
    {
      id: 1,
      type: 'thank-you',
      from: 'Sunshine Orphanage',
      fromImage: null,
      message: 'Thank you so much for the delicious biryani! Our 45 children enjoyed every bite. Your kindness means the world to us. 🙏',
      image: null,
      peopleFed: 45,
      time: '2 hours ago',
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      type: 'alert',
      from: 'Food Relief NGO',
      fromImage: null,
      message: 'URGENT: Old age home nearby needs food for 30 elderly people today. Can you help?',
      image: null,
      peopleFed: null,
      time: '5 hours ago',
      likes: 45,
      comments: 8,
      urgent: true
    },
    {
      id: 3,
      type: 'highlight',
      from: 'FOOD KIND',
      fromImage: null,
      message: 'Top Donor of the Month! Congratulations to all donors who helped feed 500+ people this month!',
      image: null,
      time: '1 day ago',
      likes: 120,
      comments: 34
    }
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#21A179] to-[#3A6EA5] rounded-2xl p-8 text-white">
        <h2 className="mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>
          Hi, {user.firstName || user.username}! 👋
        </h2>
        <p className="mb-6" style={{ fontSize: '18px' }}>
          You've fed <span style={{ fontWeight: '700' }}>{stats.peopleFed} people</span> today
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onDonateClick}
            className="bg-white text-[#21A179] px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            style={{ fontWeight: '600' }}
          >
            <Heart className="w-5 h-5" />
            Donate Food
          </button>
          <button
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
            style={{ fontWeight: '600' }}
          >
            <DollarSign className="w-5 h-5" />
            Donate Money
          </button>
          <button
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
            style={{ fontWeight: '600' }}
          >
            <TrendingUp className="w-5 h-5" />
            My Impact
          </button>
        </div>
      </div>

      {/* Today's Impact Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#DFF5E6] rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#21A179]" />
            </div>
            <div>
              <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>Total Donations</p>
              <p className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>{stats.totalDonations}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#E6F2FF] rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#3A6EA5]" />
            </div>
            <div>
              <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>People Fed</p>
              <p className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>{stats.peopleFed}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FFF8E7] rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-[#FFCF4A]" />
            </div>
            <div>
              <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>Badges Earned</p>
              <p className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>5</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#F2F2F2] rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#555555]" />
            </div>
            <div>
              <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>Followers</p>
              <p className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>48</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Title */}
      <div>
        <h3 className="text-[#1A1A1A] mb-4" style={{ fontSize: '24px', fontWeight: '700' }}>
          Your Feed
        </h3>
      </div>

      {/* Feed Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#21A179] to-[#3A6EA5] rounded-full flex items-center justify-center text-white" style={{ fontSize: '18px', fontWeight: '700' }}>
                {post.from[0]}
              </div>
              <div className="flex-1">
                <h4 className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                  {post.from}
                </h4>
                <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                  {post.time}
                </p>
              </div>
              {post.urgent && (
                <span className="bg-[#FF4A4A] text-white px-3 py-1 rounded-full" style={{ fontSize: '12px', fontWeight: '600' }}>
                  URGENT
                </span>
              )}
            </div>

            {/* Post Message */}
            <p className="text-[#555555] mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
              {post.message}
            </p>

            {/* People Fed Badge */}
            {post.peopleFed && (
              <div className="inline-flex items-center gap-2 bg-[#DFF5E6] text-[#21A179] px-4 py-2 rounded-full mb-4" style={{ fontSize: '14px', fontWeight: '600' }}>
                <Heart className="w-4 h-4 fill-current" />
                {post.peopleFed} people fed
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center gap-6 pt-4 border-t border-[#F2F2F2]">
              <button className="flex items-center gap-2 text-[#555555] hover:text-[#21A179] transition-colors">
                <Heart className="w-5 h-5" />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-[#555555] hover:text-[#21A179] transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-[#555555] hover:text-[#21A179] transition-colors ml-auto">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 text-[#555555] hover:text-[#21A179] transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}