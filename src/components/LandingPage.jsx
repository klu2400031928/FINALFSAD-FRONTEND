import { Heart, Users, Truck, CheckCircle, ArrowRight, Menu, X, Bell, MapPin, Award } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-[#F2F2F2] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#21A179] to-[#3A6EA5] rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>
                FOOD KIND
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-[#555555] hover:text-[#21A179] transition-colors">
                How It Works
              </a>
              <a href="#impact" className="text-[#555555] hover:text-[#21A179] transition-colors">
                Impact
              </a>
              <a href="#testimonials" className="text-[#555555] hover:text-[#21A179] transition-colors">
                Testimonials
              </a>
              <button
                onClick={() => navigate('/role-selection')}
                className="bg-gradient-to-r from-[#21A179] to-[#3A6EA5] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
                style={{ fontWeight: '600' }}
              >
                Get Started
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
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#how-it-works" className="block text-[#555555] hover:text-[#21A179]">How It Works</a>
              <a href="#impact" className="block text-[#555555] hover:text-[#21A179]">Impact</a>
              <a href="#testimonials" className="block text-[#555555] hover:text-[#21A179]">Testimonials</a>
              <button
                onClick={() => { setShowMobileMenu(false); navigate('/role-selection'); }}
                className="w-full bg-gradient-to-r from-[#21A179] to-[#3A6EA5] text-white px-6 py-3 rounded-xl"
                style={{ fontWeight: '600' }}
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#DFF5E6] via-[#FFF8E7] to-[#E6F2FF] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white px-4 py-2 rounded-full mb-6 shadow-sm">
                <p className="text-[#21A179]" style={{ fontWeight: '600' }}>
                  Share Food • Spread Kindness
                </p>
              </div>
              <h1 className="text-[#1A1A1A] mb-6" style={{ fontSize: '56px', fontWeight: '700', lineHeight: '1.2' }}>
                Connect Food Givers With Food Seekers
              </h1>
              <p className="text-[#555555] mb-8" style={{ fontSize: '20px', lineHeight: '1.6' }}>
                Join FOOD KIND to make a real difference. Share surplus food, support orphanages and old-age homes, 
                or volunteer to deliver kindness. Together, we can end food waste and hunger.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/role-selection')}
                  className="bg-gradient-to-r from-[#21A179] to-[#3A6EA5] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  style={{ fontSize: '18px', fontWeight: '600' }}
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/role-selection')}
                  className="bg-white text-[#21A179] border-2 border-[#21A179] px-8 py-4 rounded-xl hover:bg-[#DFF5E6] transition-all"
                  style={{ fontSize: '18px', fontWeight: '600' }}
                >
                  Join as NGO
                </button>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#21A179] to-[#3A6EA5] border-2 border-white" />
                  ))}
                </div>
                <p className="text-[#555555]" style={{ fontWeight: '600' }}>
                  Join 10,000+ users making a difference
                </p>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#DFF5E6] to-[#21A179]/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-16 h-16 bg-[#21A179] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-8 h-8 text-white fill-current" />
                    </div>
                    <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>Donors</p>
                    <p className="text-[#7A7A7A]" style={{ fontSize: '12px' }}>Share Food</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#E6F2FF] to-[#3A6EA5]/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-16 h-16 bg-[#3A6EA5] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>Receivers</p>
                    <p className="text-[#7A7A7A]" style={{ fontSize: '12px' }}>Get Support</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#FFF8E7] to-[#FFCF4A]/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-16 h-16 bg-[#FFCF4A] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Truck className="w-8 h-8 text-[#1A1A1A]" />
                    </div>
                    <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>Volunteers</p>
                    <p className="text-[#7A7A7A]" style={{ fontSize: '12px' }}>Deliver</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#F2F2F2] to-[#555555]/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-16 h-16 bg-[#555555] rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>NGOs</p>
                    <p className="text-[#7A7A7A]" style={{ fontSize: '12px' }}>Manage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Counter */}
      <section id="impact" className="py-16 bg-gradient-to-r from-[#21A179] to-[#3A6EA5] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center mb-12" style={{ fontSize: '42px', fontWeight: '700' }}>
            Real Impact, Real People
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p style={{ fontSize: '56px', fontWeight: '700' }} className="mb-2">15,430+</p>
              <p style={{ fontSize: '18px' }} className="opacity-90">Meals Donated</p>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p style={{ fontSize: '56px', fontWeight: '700' }} className="mb-2">2,350+</p>
              <p style={{ fontSize: '18px' }} className="opacity-90">Active Donors</p>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p style={{ fontSize: '56px', fontWeight: '700' }} className="mb-2">185+</p>
              <p style={{ fontSize: '18px' }} className="opacity-90">Homes Supported</p>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p style={{ fontSize: '56px', fontWeight: '700' }} className="mb-2">520+</p>
              <p style={{ fontSize: '18px' }} className="opacity-90">Active Volunteers</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[#FFF8E7]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[#1A1A1A] text-center mb-4" style={{ fontSize: '42px', fontWeight: '700' }}>
            How FOOD KIND Works
          </h2>
          <p className="text-[#555555] text-center mb-12" style={{ fontSize: '18px' }}>
            Simple, safe, and smart food donation in 4 easy steps
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-[#DFF5E6] rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-[#21A179]" />
              </div>
              <div className="w-12 h-12 bg-[#21A179] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>1</span>
              </div>
              <h3 className="text-[#1A1A1A] mb-4" style={{ fontSize: '24px', fontWeight: '600' }}>
                Donor Posts Food
              </h3>
              <p className="text-[#555555]">
                Restaurants, individuals, or function halls share details of surplus food through our app with photos and quantity
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-[#E6F2FF] rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-[#3A6EA5]" />
              </div>
              <div className="w-12 h-12 bg-[#3A6EA5] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>2</span>
              </div>
              <h3 className="text-[#1A1A1A] mb-4" style={{ fontSize: '24px', fontWeight: '600' }}>
                Smart Matching
              </h3>
              <p className="text-[#555555]">
                Our system matches donors with nearby orphanages and old-age homes based on needs, location, and urgency
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-[#FFF8E7] rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10 text-[#FFCF4A]" />
              </div>
              <div className="w-12 h-12 bg-[#FFCF4A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: '700' }}>3</span>
              </div>
              <h3 className="text-[#1A1A1A] mb-4" style={{ fontSize: '24px', fontWeight: '600' }}>
                Volunteer Delivers
              </h3>
              <p className="text-[#555555]">
                Verified volunteers pick up and deliver food safely with live tracking, earning rewards for their service
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-[#555555]" />
              </div>
              <div className="w-12 h-12 bg-[#555555] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>4</span>
              </div>
              <h3 className="text-[#1A1A1A] mb-4" style={{ fontSize: '24px', fontWeight: '600' }}>
                Impact & Rewards
              </h3>
              <p className="text-[#555555]">
                Track your impact, earn badges, and celebrate kindness. NGOs verify and ensure transparency throughout
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[#1A1A1A] text-center mb-12" style={{ fontSize: '42px', fontWeight: '700' }}>
            Stories From Our Community
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#DFF5E6] rounded-2xl p-8 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#21A179] rounded-full flex items-center justify-center text-white" style={{ fontSize: '20px' }}>
                  R
                </div>
                <div>
                  <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>Ramesh Kumar</p>
                  <p className="text-[#555555]" style={{ fontSize: '12px' }}>Restaurant Owner</p>
                </div>
              </div>
              <p className="text-[#555555]" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                "FOOD KIND made it so easy to share our extra food. Instead of wasting, we now feed 30+ children 
                every week. It feels amazing to make a real difference!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#E6F2FF] rounded-2xl p-8 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#3A6EA5] rounded-full flex items-center justify-center text-white" style={{ fontSize: '20px' }}>
                  M
                </div>
                <div>
                  <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>Sister Maria</p>
                  <p className="text-[#555555]" style={{ fontSize: '12px' }}>Orphanage Director</p>
                </div>
              </div>
              <p className="text-[#555555]" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                "This platform has been a blessing. We receive fresh, nutritious food regularly, 
                and the children are so happy. Thank you to all the kind donors!"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#FFF8E7] rounded-2xl p-8 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FFCF4A] rounded-full flex items-center justify-center text-[#1A1A1A]" style={{ fontSize: '20px' }}>
                  P
                </div>
                <div>
                  <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>Priya Sharma</p>
                  <p className="text-[#555555]" style={{ fontSize: '12px' }}>Volunteer</p>
                </div>
              </div>
              <p className="text-[#555555]" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                "Volunteering with FOOD KIND is rewarding in every way. I earn money, stay active, 
                and most importantly, help people in need. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#21A179] to-[#3A6EA5] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="mb-6" style={{ fontSize: '48px', fontWeight: '700' }}>
            Ready to Make a Difference?
          </h2>
          <p className="mb-8 opacity-90" style={{ fontSize: '20px' }}>
            Join thousands of donors, receivers, and volunteers creating a hunger-free community
          </p>
          <button
            onClick={() => navigate('/role-selection')}
            className="bg-white text-[#21A179] px-10 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-3"
            style={{ fontSize: '20px', fontWeight: '600' }}
          >
            Get Started Today
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 fill-current text-[#21A179]" />
                <span style={{ fontSize: '20px', fontWeight: '700' }}>FOOD KIND</span>
              </div>
              <p className="text-[#B3B3B3]" style={{ fontSize: '14px' }}>
                Share Food. Spread Kindness.
              </p>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>Quick Links</h4>
              <ul className="space-y-2 text-[#B3B3B3]" style={{ fontSize: '14px' }}>
                <li><a href="#" className="hover:text-[#21A179]">About Us</a></li>
                <li><a href="#how-it-works" className="hover:text-[#21A179]">How It Works</a></li>
                <li><a href="#" className="hover:text-[#21A179]">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>For Organizations</h4>
              <ul className="space-y-2 text-[#B3B3B3]" style={{ fontSize: '14px' }}>
                <li><a href="#" className="hover:text-[#21A179]">Register NGO</a></li>
                <li><a href="#" className="hover:text-[#21A179]">Partner With Us</a></li>
                <li><a href="#" className="hover:text-[#21A179]">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontSize: '16px', fontWeight: '600' }}>Legal</h4>
              <ul className="space-y-2 text-[#B3B3B3]" style={{ fontSize: '14px' }}>
                <li><a href="#" className="hover:text-[#21A179]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#21A179]">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#21A179]">Food Safety</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#555555] pt-8 text-center">
            <p className="text-[#B3B3B3]" style={{ fontSize: '14px' }}>
              © 2025 FOOD KIND. All rights reserved. Made with ❤️ to end hunger.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}