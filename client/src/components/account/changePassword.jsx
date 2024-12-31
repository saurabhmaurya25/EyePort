import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const user = useSelector((state) => state.user.user);
    const userId = user ? user._id : null;

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate new password and confirm password
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/changePassword`,
        {
          userId, // Include user ID in the request
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setLoading(false);

      if (response.data.success) {
        toast.success('Password changed successfully!');
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Failed to change password. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-5">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block mb-1">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            placeholder="Enter your current password"
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword" className="block mb-1">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            placeholder="Enter your new password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            placeholder="Confirm your new password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : null}
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;