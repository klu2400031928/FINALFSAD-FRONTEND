import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ArrowLeft, Eye, EyeOff, Heart, Mail, Phone, Lock, RefreshCw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { toast } from 'sonner';

const schemaEmail = yup.object({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  captcha: yup.string().required('Captcha is required')
});

const schemaPhone = yup.object({
  phone: yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Must be exactly 10 digits'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  captcha: yup.string().required('Captcha is required')
});

export function Login() {
  const [loginMethod, setLoginMethod] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const canvasRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || 'donor';
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
    resolver: yupResolver(loginMethod === 'email' ? schemaEmail : schemaPhone),
    defaultValues: { email: '', phone: '', password: '', captcha: '' }
  });

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);
    setValue('captcha', '');
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'bold 24px monospace';
        ctx.fillStyle = '#374151';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 0; i < 5; i++) {
          ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
          ctx.beginPath();
          ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
          ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
          ctx.stroke();
        }
        ctx.fillText(captchaCode, canvas.width / 2, canvas.height / 2);
      }
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    drawCaptcha();
  }, [captchaCode]);

  // If user switches methods, clear errors
  useEffect(() => { reset(); }, [loginMethod, reset]);

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
    if (data.captcha !== captchaCode) {
      toast.error('Incorrect CAPTCHA code');
      return;
    }

    try {
      const loginPayload = {
        usernameOrEmail: loginMethod === 'email' ? data.email : data.phone,
        password: data.password,
      };

      const response = await api.post('/auth/login', loginPayload);
      if (response.data?.data) {
        login({ ...response.data.data, role: role || 'donor' });
        toast.success('Successfully logged in!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFF5E6] via-[#FFF8E7] to-[#E6F2FF]">
      <div className="bg-white border-b border-[#F2F2F2] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button onClick={() => navigate('/role-selection')} className="flex items-center gap-2 text-[#555555] hover:text-[#21A179]">
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: '600' }}>Back to Role Selection</span>
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: roleInfo.color }}>
                <Heart className={`w-7 h-7 ${roleInfo.color === '#FFCF4A' ? 'text-[#1A1A1A]' : 'text-white'} fill-current`} />
              </div>
            </div>
            <h1 className="text-[#1A1A1A] mb-2 font-bold text-3xl">Welcome Back!</h1>
            <p className="text-[#555555]">Login as <span style={{ color: roleInfo.color, fontWeight: '600' }}>{roleInfo.title}</span></p>
          </div>

          <div className="flex gap-2 mb-6 p-1 bg-[#F2F2F2] rounded-xl">
            <button onClick={() => setLoginMethod('email')} type="button" className={`flex-1 py-3 font-semibold rounded-lg ${loginMethod === 'email' ? 'bg-white text-[#21A179] shadow-sm' : 'text-[#555555]'}`}>Email</button>
            <button onClick={() => setLoginMethod('phone')} type="button" className={`flex-1 py-3 font-semibold rounded-lg ${loginMethod === 'phone' ? 'bg-white text-[#21A179] shadow-sm' : 'text-[#555555]'}`}>Phone</button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {loginMethod === 'email' ? (
              <div>
                <label className="block text-[#1A1A1A] mb-2 text-sm font-semibold">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                  <input {...register('email')} type="email" placeholder="your.email@example.com" className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.email ? 'border-[#FF4A4A]' : 'focus:border-[#21A179]'}`} />
                </div>
                {errors.email && <p className="text-[#FF4A4A] mt-1 text-xs">{errors.email.message}</p>}
              </div>
            ) : (
              <div>
                <label className="block text-[#1A1A1A] mb-2 text-sm font-semibold">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                  <input {...register('phone')} type="tel" maxLength={10} placeholder="1234567890" className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.phone ? 'border-[#FF4A4A]' : 'focus:border-[#21A179]'}`} />
                </div>
                {errors.phone && <p className="text-[#FF4A4A] mt-1 text-xs">{errors.phone.message}</p>}
              </div>
            )}

            <div>
              <label className="block text-[#1A1A1A] mb-2 text-sm font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B3B3B3]" />
                <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Enter password" className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.password ? 'border-[#FF4A4A]' : 'focus:border-[#21A179]'}`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-[#FF4A4A] mt-1 text-xs">{errors.password.message}</p>}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-[#1A1A1A] mb-2 text-sm font-semibold">Verify you are human</label>
              <div className="flex items-center gap-4 mb-3">
                <canvas ref={canvasRef} width="160" height="50" className="border border-gray-300 rounded-lg bg-white" />
                <button type="button" onClick={generateCaptcha} className="p-2 text-[#555555] hover:text-[#21A179]"><RefreshCw className="w-5 h-5" /></button>
              </div>
              <input {...register('captcha')} type="text" placeholder="Enter characters above" className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.captcha ? 'border-[#FF4A4A]' : 'focus:border-[#21A179]'}`} />
              {errors.captcha && <p className="text-[#FF4A4A] mt-1 text-xs">{errors.captcha.message}</p>}
            </div>

            <button type="submit" className="w-full text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all" style={{ backgroundColor: roleInfo.color }}>
              Login as {roleInfo.title}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[#555555]">
              Don't have an account? <button onClick={() => navigate('/register', { state: { role } })} className="text-[#21A179] font-semibold">Sign Up</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}