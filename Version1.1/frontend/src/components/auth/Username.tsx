import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import NexxusLogo from '@/assets/nexxus.svg'

const Username: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!username || username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    navigate('/notification'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-lg w-full max-w-md shadow-xl">
         <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-2">
            <img src={NexxusLogo} alt="Nexxus Logo" className="w-20 h-20" />
          </div>
          </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Choose a Username</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Username;
