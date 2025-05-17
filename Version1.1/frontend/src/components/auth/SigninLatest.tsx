import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NexxusLogo from '@/assets/nexxus.svg';

const SigninPage: React.FC = () => {
  const [showPasswordPage, setShowPasswordPage] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4 relative">
      <div className="bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-xl">
       
{/* Nexxus Logo */}
<div className="text-center mb-6">
  <div className="flex justify-center items-center mb-2">
    <img src={NexxusLogo} alt="Nexxus Logo" className="w-20 h-20" />
  </div>

          <div className="text-2xl font-bold">
            {showPasswordPage ? 'Enter your password' : 'Sign in to NEXXUS'}
          </div>
        </div>

        {!showPasswordPage ? (
          <>
            {/* Google Sign In */}
            <div className="flex items-center justify-between gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold mb-4 cursor-pointer">
              <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
             
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-700" />
              <span className="px-2 text-gray-500">or</span>
              <hr className="flex-grow border-gray-700" />
            </div>

            {/* Input for Email/Phone */}
            <input
              type="text"
              placeholder="Phone, email, or username"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-black border border-gray-600 rounded-lg p-3 mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Next Button */}
            <button
              onClick={() => setShowPasswordPage(true)}
              className="w-full bg-white text-black font-semibold py-2 rounded-full mb-3 hover:bg-gray-200 transition"
            >
              Next
            </button>

            {/* Forgot Password */}
            <button className="w-full border border-gray-600 text-white font-semibold py-2 rounded-full hover:bg-zinc-800 transition">
              Forgot password?
            </button>
          </>
        ) : (
          <>
            {/* Password Input */}
            <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-black border border-blue-500 rounded-md px-4 pt-5 pb-2 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <label className="absolute left-4 top-1 text-sm text-blue-500">Password</label>

              {/* Toggle Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Log In Button */}
            <button
              className="w-full bg-gray-500 text-white font-semibold py-2 rounded-full mb-4 hover:bg-gray-600 transition"
              onClick={() => navigate('/nexxus')}
            >
              Log In
            </button>
          </>
        )}

        {/* Sign up Link */}
        <div className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate('/signupLatest')}
          >
            Sign up
          </span>
        </div>
      </div>
     </div>
  );
};

export default SigninPage;
