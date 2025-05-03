import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  phone: string;
  month: string;
  day: string;
  year: string;
}

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    month: '',
    day: '',
    year: '',
  });

  const [usePhone, setUsePhone] = useState(false); // Toggle between email and phone
  const [errors, setErrors] = useState<{ phone?: string }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Phone number validation
    if (name === 'phone') {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: 'Phone number must be exactly 10 digits.',
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.phone;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || (!formData.email && !formData.phone)) {
      alert('Please fill out required fields.');
      return;
    }

    // Phone number validation
    if (usePhone && !/^\d{10}$/.test(formData.phone)) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    // DOB validation
    if (!formData.month || !formData.day || !formData.year) {
      alert('Please select your complete Date of Birth.');
      return;
    }

    console.log(formData);
    navigate('/password');
  };

  const isFormValid =
    formData.name &&
    (formData.email || (/^\d{10}$/.test(formData.phone) && !errors.phone)) &&
    formData.month &&
    formData.day &&
    formData.year;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-lg w-full max-w-md shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none"
          required
        />

        {/* Email or Phone Field Toggle */}
        {usePhone ? (
          <>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 mb-2 rounded bg-zinc-800 text-white focus:outline-none"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mb-2">{errors.phone}</p>
            )}
          </>
        ) : (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none"
            required
          />
        )}

        <p className="text-sm text-gray-400 mb-2">
          <button
            type="button"
            onClick={() => setUsePhone((prev) => !prev)}
            className="text-blue-400 hover:underline"
          >
            {usePhone ? 'Use Email instead' : 'Use Phone instead'}
          </button>
        </p>

        <p className="text-sm text-gray-400 mb-2">
          Date of Birth<br />
          <span className="text-xs">This will not be shown publicly...</span>
        </p>

        <div className="flex gap-2 mb-6">
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-1/3 p-2 rounded bg-zinc-800 text-white"
            required
          >
            <option value="">Month</option>
            {[
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December',
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-1/3 p-2 rounded bg-zinc-800 text-white"
            required
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => {
              const day = String(i + 1).padStart(2, '0');
              return (
                <option key={day} value={day}>
                  {day}
                </option>
              );
            })}
          </select>

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-1/3 p-2 rounded bg-zinc-800 text-white"
            required
          >
            <option value="">Year</option>
            {Array.from({ length: 50 }, (_, i) => {
              const year = (new Date().getFullYear() - i).toString();
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className={`w-full font-semibold py-2 rounded transition ${
            isFormValid
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
          disabled={!isFormValid}
        >
          Next
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        <button className="w-full mb-4 bg-white text-black hover:bg-gray-200 flex items-center justify-center py-2 px-4 rounded-full font-bold">
          <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign in with Google
        </button>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{' '}
          <a href="/signinLatest" className="text-blue-400 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
