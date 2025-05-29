import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Languages: React.FC = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const languages = [
    'English',
    'Hindi',
    'Marathi',
    'Kannada',
    'Tamil',
    'Telugu',
    'Gujarati',
    'Punjabi',
    'Bengali',
    'Malayalam',
  ];

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleFinish = () => {
    if (selectedLanguages.length === 0) {
      setError('Please select at least one language.');
      return;
    }

    setError('');
    console.log('Selected Languages:', selectedLanguages);
    navigate('/signinLatest'); 
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md shadow-xl text-center">
        <h1 className="text-2xl font-bold mb-4">Select Spoken Languages</h1>
        <p className="text-gray-400 mb-4 text-sm">Pick at least one language you speak.</p>

        <div className="grid grid-cols-2 gap-3 mb-4 text-left">
          {languages.map((lang) => (
            <label key={lang} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedLanguages.includes(lang)}
                onChange={() => toggleLanguage(lang)}
                className="form-checkbox text-blue-500"
              />
              {lang}
            </label>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleFinish}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition w-full"
        >
          Finish Setup
        </button>
      </div>
    </div>
  );
};

export default Languages;
