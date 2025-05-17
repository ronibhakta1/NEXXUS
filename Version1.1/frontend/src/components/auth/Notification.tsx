import React from 'react'
import { BellIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Notifications: React.FC = () => {
  const navigate = useNavigate()

  const handleAllow = () => {
    // You can integrate actual notification permissions here if needed
    navigate('/languages') // Update this path to your next step
  }

  const handleSkip = () => {
    navigate('/languages') // Update this path to your next step
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="bg-[#16181C] rounded-xl w-full max-w-sm p-6 text-center shadow-lg">
        <div className="flex justify-center mb-6">
          <BellIcon className="w-10 h-10 text-blue-500" />
        </div>

        <h2 className="text-xl font-bold mb-2">Turn on notifications</h2>
        <p className="text-sm text-gray-400 mb-6">
          Get the most out of Nexxus by staying up to date with what’s happening
        </p>

        <button
          onClick={handleAllow}
          className="w-full bg-white text-black font-semibold py-2 rounded-full mb-3 hover:bg-gray-200 transition"
        >
          Allow notification
        </button>

        <button
          onClick={handleSkip}
          className="w-full border border-gray-600 text-white py-2 rounded-full hover:bg-gray-800 transition"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}

export default Notifications
