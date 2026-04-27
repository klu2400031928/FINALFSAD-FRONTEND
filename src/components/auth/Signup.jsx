import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Heart, Mail, Phone, Lock, User, MapPin, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { toast } from 'sonner';

const schemaEmail = yup.object({
  name: yup.string().required('Full Name is required'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  location: yup.string().required('Location is required')
});

const schemaPhone = yup.object({
  name: yup.string().required('Full Name is required'),
  phone: yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Must be exactly 10 digits'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  location: yup.string().required('Location is required')
});

export function Signup() {
  const [signupMethod, setSignupMethod] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || 'donor';
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
    resolver: yupResolver(signupMethod === 'email' ? schemaEmail : schemaPhone),
    defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '', location: '', bio: '' }
  });

  const getRoleInfo = () => {
    switch (role) {
      case 'donor': return { title: 'Donor', color: '#21A179' };
      case 'receiver': return { title: 'Receiver', color: '#3A6EA5' };
      case 'volunteer': return { title: 'Volunteer', color: '#FFCF4A' };
      case 'ngo': return { title: 'NGO Admin', color: '#555555' };
      default: return { title: 'User', color: '#21A179' };
    }
  };
  const roleInfo = getRoleInfo();

  const onSubmit = async (data) => {
    try {
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || 'User';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Doe';
      
      const finalEmail = signupMethod === 'email' ? data.email : `${data.phone}@foodkind.app`;
      const tempUsername = finalEmail.split('@')[0] + Math.floor(Math.random() * 10000);

      const requestData = {
        firstName,
        lastName,
        username: tempUsername,
        email: finalEmail,
        phone: signupMethod === 'phone' ? data.phone : undefined,
        password: data.password,
        location: data.location,
        role: role || 'donor'
      };

      const response = await api.post('/auth/register', requestData);
      
      if (response.data?.data) {
        login({ ...response.data.data, role: role || 'donor' });
        toast.success('Account created successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFF5E6] via-[#FFF8E7] to-[#E6F2FF]">
      <div className="bg-white border-b border-[#F2F2F2] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button onClick={() => navigate('/login', { state: { role } })} className="flex items-center gap-2 text-[#555555] hover:text-[#21A179]">
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: '600' }}>Back to Login</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: roleInfo.color }}>
                <Heart className={`w-7 h-7 ${roleInfo.color === '#FFCF4A' ? 'text-[#1A1A1A]' : 'text-white'} fill-current`} />
              </div>
            </div>
            <h1 className="text-[#1A1A1A] mb-2 font-bold text-3xl">Join FOOD KIND</h1>
            <p className="text-[#555555]">Create your <span style={{ color: roleInfo.color, fontWeight: '600' }}>{roleInfo.title}</span> account</p>
          </div>

          <div className="flex gap-2 mb-6 p-1 bg-[#F2F2F2] rounded-xl">
            <button onClick={() => { setSignupMethod('email'); reset(); }} type="button" className={`flex-1 py-3 font-semibold rounded-lg ${signupMethod === 'email' ? 'bg-white text-[#21A179] shadow-sm' : 'text-[#555555]'}`}>Sign up with Email</button>
            <button onClick={() => { setSignupMethod('phone'); reset(); }} type="button" className={`flex-1 py-3 font-semibold rounded-lg ${signupMethod === 'phone' ? 'bg-white text-[#21A179] shadow-sm' : 'text-[#555555]'}`}>Sign up with Phone</button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[#1A1A1A] mb-2 font-semibold text-sm">Full Name / Organization Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                <input {...register('name')} type="text" placeholder="Enter your name" className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.name ? 'border-[#FF4A4A]' : 'focus:border-[#21A179]'}`} />
              </div>
              {errors.name && <p className="text-[#FF4A4A] mt-1 text-xs">{errors.name.message}</p>}
            </div>

            {signupMethod === 'email' ? (
              <div>
                <label className="block text-[#1A1A1A] mb-2 font-semibold text-sm">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                  <input {...register('email')} type="email" placeholder="your.email@example.com" className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.email ? 'border-[#FF4A4A]' : 'focus:border-[#21A179]'}`} />
                </div>
                {errors.email && <p className="text-[#FF4A4A] mt-1 text-xs">{errors.email.message}</p>}
              </div>
            ) : (
              <div>
                <label className="block text-[#1A1A1A] mb-2 font-semibold text-sm">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                  <input {...register('phone')} type="tel" maxLength={10} placeholder="1234567890" className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.phone ? 'border-[#FF4A4A]' : 'focus:border-[#21A179]'}`} />
                </div>
                {errors.phone && <p className="text-[#FF4A4A] mt-1 text-xs">{errors.phone.message}</p>}
              </div>
            )}

            <div>
              <label className="block text-[#1A1A1A] mb-2 font-semibold text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.password ? 'border-[#FF4A4A]' : 'focus:border-[#21A179]'}`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-[#FF4A4A] mt-1 text-xs">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-[#1A1A1A] mb-2 font-semibold text-sm">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                <input {...register('confirmPassword')} type={showPassword ? 'text' : 'password'} placeholder="Re-enter your password" className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.confirmPassword ? 'border-[#FF4A4A]' : 'focus:border-[#21A179]'}`} />
              </div>
              {errors.confirmPassword && <p className="text-[#FF4A4A] mt-1 text-xs">{errors.confirmPassword.message}</p>}
            </div>

            <div>
              <label className="block text-[#1A1A1A] mb-2 font-semibold text-sm">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                <input {...register('location')} type="text" placeholder="City, State" className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.location ? 'border-[#FF4A4A]' : 'focus:border-[#21A179]'}`} />
              </div>
              {errors.location && <p className="text-[#FF4A4A] mt-1 text-xs">{errors.location.message}</p>}
            </div>

            <button type="submit" className="w-full text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all" style={{ backgroundColor: roleInfo.color }}>
              Create {roleInfo.title} Account
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[#555555]">
              Already have an account? <button onClick={() => navigate('/login', { state: { role } })} className="text-[#21A179] font-semibold">Login</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}