import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../url';
import { Link } from 'react-router-dom';
import image from '../../images';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's a success message in the location state
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage);

      // Reset the state to prevent showing the toast again
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/login`, credentials);

      if (res.data.success) {
        localStorage.setItem('token', res.data.authToken);
        navigate('/', { state: { successMessage: 'Login successful!' } });
      } else {
        toast.error(res.data.error);
      }
    } catch (e) {
      console.error('Error logging in:', e);
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
            <img className="w-8 h-8 mr-2" src={image.logo} alt="logo" />
            EyePort
          </a>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
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
                value={credentials.email}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={credentials.password}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Login Button with Spinner */}
            <button
              type="submit"
              className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg text-center flex justify-center items-center ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
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
              {loading ? 'Logging in...' : 'Sign in'}
            </button>

            <p className="text-sm font-light text-gray-500 mt-4">
              Forgot Password?{' '}
              <Link
                to = "/forgotPassword"
                className="font-medium text-cyan-800 hover:underline"
              >
                Click here to reset
              </Link>
            </p>
            <p className="text-sm font-light text-gray-500">
              Don't have an account yet?{' '}
              <Link
                to="/signup"
                className="font-medium text-cyan-800 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* Toastify Container */}
      <ToastContainer/>
    </section>
  );
};

export default Login;
