import { Bell, Heart, Users, Truck, Award, CheckCircle, X } from 'lucide-react';

export function NotificationCenter({ role }) {
  const getDonorNotifications = () => [
    {
      id: 1,
      type: 'receiver',
      icon: Users,
      color: '#22C55E',
      title: 'Donation Accepted',
      message: 'Sunshine Orphanage accepted your food donation for 45 people',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'volunteer',
      icon: Truck,
      color: '#FFCF4A',
      title: 'Food Delivered',
      message: 'Volunteer successfully delivered your donation to Hope Home',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'ngo',
      icon: Heart,
      color: '#3A6EA5',
      title: 'Urgent Need Nearby',
      message: 'Rainbow Orphanage needs food for 60 children urgently',
      time: '1 day ago',
      read: false
    },
    {
      id: 4,
      type: 'system',
      icon: Award,
      color: '#FFCF4A',
      title: 'Badge Unlocked!',
      message: 'You earned the "First Donation" badge. Keep up the great work!',
      time: '2 days ago',
      read: false
    },
    {
      id: 5,
      type: 'system',
      icon: Users,
      color: '#21A179',
      title: 'New Follower',
      message: 'Hope Old Age Home is now following you',
      time: '3 days ago',
      read: true
    }
  ];

  const getReceiverNotifications = () => [
    {
      id: 1,
      type: 'donor',
      icon: Heart,
      color: '#21A179',
      title: 'New Donation Offer',
      message: 'Rajesh Restaurant wants to donate food for 30 people',
      time: 'Just now',
      read: false
    },
    {
      id: 2,
      type: 'volunteer',
      icon: Truck,
      color: '#FFCF4A',
      title: 'Volunteer En Route',
      message: 'Volunteer Priya is on the way with your food donation',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'volunteer',
      icon: CheckCircle,
      color: '#22C55E',
      title: 'Food Delivered',
      message: 'Your donation has arrived. Please confirm receipt.',
      time: '2 hours ago',
      read: true
    }
  ];

  const getVolunteerNotifications = () => [
    {
      id: 1,
      type: 'ngo',
      icon: Truck,
      color: '#FFCF4A',
      title: 'New Task Assigned',
      message: 'Pick up from Rajesh Restaurant and deliver to Sunshine Orphanage',
      time: '30 mins ago',
      read: false
    },
    {
      id: 2,
      type: 'system',
      icon: Award,
      color: '#FFCF4A',
      title: 'Payment Received',
      message: '₹500 has been credited to your account for 2 deliveries',
      time: '1 day ago',
      read: true
    }
  ];

  const getNGONotifications = () => [
    {
      id: 1,
      type: 'receiver',
      icon: Users,
      color: '#3A6EA5',
      title: 'New Receiver Registration',
      message: 'ABC Orphanage has requested to join the platform',
      time: 'Just now',
      read: false
    },
    {
      id: 2,
      type: 'volunteer',
      icon: Truck,
      color: '#FFCF4A',
      title: 'Volunteer Application',
      message: 'John Doe applied to become a volunteer',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'donor',
      icon: Heart,
      color: '#21A179',
      title: 'Large Donation Available',
      message: 'Grand Function Hall has 100+ meals to donate',
      time: '3 hours ago',
      read: true
    }
  ];

  const getNotifications = () => {
    switch (role) {
      case 'donor':
        return getDonorNotifications();
      case 'receiver':
        return getReceiverNotifications();
      case 'volunteer':
        return getVolunteerNotifications();
      case 'ngo':
        return getNGONotifications();
      default:
        return [];
    }
  };

  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#21A179] to-[#3A6EA5] rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>
                Notifications
              </h2>
              <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button className="text-[#21A179] hover:underline" style={{ fontSize: '14px', fontWeight: '600' }}>
            Mark all as read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={!notification.read ? { borderColor: notification.color } : {}}
            className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer ${
              !notification.read ? 'border-l-4' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${notification.color}20` }}
              >
                <notification.icon className="w-6 h-6" style={{ color: notification.color }} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3
                    className="text-[#1A1A1A]"
                    style={{
                      fontSize: '16px',
                      fontWeight: notification.read ? '600' : '700'
                    }}
                  >
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-[#21A179] ml-2 mt-2 flex-shrink-0" />
                  )}
                </div>
                <p
                  className="text-[#555555] mb-2"
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                >
                  {notification.message}
                </p>
                <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                  {notification.time}
                </p>
              </div>

              {/* Action Button */}
              <button className="text-[#B3B3B3] hover:text-[#555555] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
          <div className="w-24 h-24 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-12 h-12 text-[#B3B3B3]" />
          </div>
          <h3 className="text-[#1A1A1A] mb-2" style={{ fontSize: '24px', fontWeight: '700' }}>
            No Notifications
          </h3>
          <p className="text-[#555555]">
            You're all caught up! New notifications will appear here.
          </p>
        </div>
      )}
    </div>
  );
}