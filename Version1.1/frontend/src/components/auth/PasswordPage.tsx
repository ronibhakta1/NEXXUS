import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react' 
import NexxusLogo from '@/assets/nexxus.svg'

const PasswordPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const isLengthValid = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasDigit = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  const handleNext = () => {
    if (!isLengthValid || !hasUpperCase || !hasDigit || !hasSpecialChar) {
      setError('Please meet all password requirements.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setError('')
    navigate('/picture')
  }

  const getClass = (condition: boolean) =>
    condition ? 'text-green-400' : 'text-gray-400'

  return (
    <div className="min-h-screen bg-[#1d1f23] flex justify-center items-center">
      <div className="bg-black text-white rounded-2xl w-[380px] p-6 shadow-xl relative">

        <div className="text-center mb-6">
           <div className="flex justify-center items-center mb-2">
            <img src={NexxusLogo} alt="Nexxus Logo" className="w-20 h-20" />
           </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">You’ll need a password</h2>
        <p className="text-sm text-gray-400 mb-4">Must meet the following requirements:</p>

        {/* Password Field */}
        <div className="relative mb-2">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-400"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="relative mb-2">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-400"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Password Requirements */}
        <div className="text-xs mb-3 space-y-1">
          <p className={getClass(isLengthValid)}>• At least 8 characters</p>
          <p className={getClass(hasUpperCase)}>• One uppercase letter (A-Z)</p>
          <p className={getClass(hasDigit)}>• One digit (0-9)</p>
          <p className={getClass(hasSpecialChar)}>• One special character (!@#$...)</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <p className="text-xs text-gray-500 mt-2 mb-5">
          By signing up, you agree to the{' '}
          <span className="text-blue-500 underline cursor-pointer">Terms of Service</span> and{' '}
          <span className="text-blue-500 underline cursor-pointer">Privacy Policy</span>, including{' '}
          <span className="text-blue-500 underline cursor-pointer">Cookie Use</span>.
        </p>

        <button
          onClick={handleNext}
          className="w-full bg-white text-black py-2 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PasswordPage
