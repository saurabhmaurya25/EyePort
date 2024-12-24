import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../url';
import images from '../../images';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/forgotPassword`, { email });
        console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || 'Error sending reset instructions. Please try again.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gray-50">
      <div className="w-full max-w-md rounded-lg shadow-lg bg-white border border-gray-200">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <img className="w-8 h-8 mr-2" src={images.logo} alt="logo" />
            EyePort
          </a>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Forgot Password
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>

            {/* Submit Button with Spinner */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center flex justify-center items-center ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M12 2a10 10 0 00-10 10h4a6 6 0 016-6V2zM2 12a10 10 0 0010 10v-4a6 6 0 01-6-6H2z"
                  ></path>
                </svg>
              ) : null}
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </button>

            <p className="text-sm font-light text-gray-500 mt-4">
              Remember your password?{' '}
              <Link
                to="/login"
                className="font-medium text-cyan-800 hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* Toastify Container */}
      <ToastContainer />
    </section>
  );
};

export default ForgotPassword;
