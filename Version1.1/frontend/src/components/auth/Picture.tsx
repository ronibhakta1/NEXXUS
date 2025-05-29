import React, { useRef, useState } from 'react'
import { CameraIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProfilePicture: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleSkip = () => {
    navigate('/username') // change this to your next route
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="bg-[#16181C] rounded-2xl w-full max-w-md p-6 shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1">Pick a profile picture</h2>
          <p className="text-sm text-gray-400 mb-6">
            Have a favorite selfie? Upload it now.
          </p>
        </div>

        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600 overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <CameraIcon className="h-10 w-10 text-gray-400" />
            )}
          </div>

          <button
            onClick={handleClick}
            className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-1 border border-gray-600"
          >
            <CameraIcon className="h-4 w-4 text-white" />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <button
          onClick={handleSkip}
          className="w-full mt-4 bg-transparent border border-gray-500 text-white rounded-full py-2 hover:bg-gray-800 transition"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}

export default ProfilePicture
